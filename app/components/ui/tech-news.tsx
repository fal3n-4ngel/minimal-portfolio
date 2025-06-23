"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";

interface NewsItem {
  id: number;
  title: string;
  source: string;
  time: string;
  url: string;
  description: string;
}

interface GNewsApiResponse {
  totalArticles: number;
  articles: Array<{
    title: string;
    source: { name: string; url: string };
    publishedAt: string;
    url: string;
    description: string;
  }>;
}

interface CachedNews {
  data: NewsItem[];
  timestamp: number;
}

const TechNews: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFetch, setLastFetch] = useState<number>(0);
  const [requestCount, setRequestCount] = useState<number>(0);
  const [nextRefreshTime, setNextRefreshTime] = useState<number>(0);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isFetchingRef = useRef<boolean>(false);

  const API_KEY = process.env.NEXT_PUBLIC_GNEWS_API_KEY;
  const GNEWS_API_URL = `https://gnews.io/api/v4/search?q=technology&lang=en&sortby=publishedAt&max=10&token=${API_KEY}`;
  
  // Cache and rate limiting configuration
  const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes cache
  const MIN_REQUEST_INTERVAL = 5 * 60 * 1000; // 5 minutes between requests
  const MAX_REQUESTS_PER_HOUR = 10;
  const HOURLY_RESET_INTERVAL = 60 * 60 * 1000; // 1 hour
  const CACHE_KEY = 'tech_news_cache';

  // Load cached data and request count from memory
  const loadFromCache = useCallback((): CachedNews | null => {
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {   
      const parsedData: CachedNews = JSON.parse(cachedData);
      return parsedData;
    }
    
    return null;
  }, []);

  const saveToCache = useCallback((data: NewsItem[]): void => {
    const cacheData: CachedNews = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  }, []);

  const formatTimeAgo = (dateString: string): string => {
    const now = new Date();
    const publishedDate = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const formatCountdown = (milliseconds: number): string => {
    const minutes = Math.ceil(milliseconds / (1000 * 60));
    return `${minutes}m`;
  };

  const canMakeRequest = useCallback((): boolean => {
    const now = Date.now();
    const timeSinceLastFetch = now - lastFetch;
    
    // Check if enough time has passed since last request
    if (timeSinceLastFetch < MIN_REQUEST_INTERVAL) {
      return false;
    }
    
    // Check hourly request limit
    if (requestCount >= MAX_REQUESTS_PER_HOUR) {
      return false;
    }
    
    return true;
  }, [lastFetch, requestCount, MIN_REQUEST_INTERVAL, MAX_REQUESTS_PER_HOUR]);

  const isCacheValid = useCallback((cachedData: CachedNews): boolean => {
    const now = Date.now();
    return (now - cachedData.timestamp) < CACHE_DURATION;
  }, [CACHE_DURATION]);

  const fetchNews = useCallback(async (forceRefresh: boolean = false): Promise<void> => {
    // Prevent multiple simultaneous requests
    if (isFetchingRef.current) return;
    
    // Check cache first (unless force refresh)
    if (!forceRefresh) {
      const cached = loadFromCache();
      if (cached && isCacheValid(cached)) {
        setNews(cached.data);
        setError(null);
        return;
      }
    }

    if (!canMakeRequest()) {
      const now = Date.now();
      const timeUntilNextRequest = MIN_REQUEST_INTERVAL - (now - lastFetch);
      
      if (requestCount >= MAX_REQUESTS_PER_HOUR) {
        setError("Hourly request limit reached. Please wait before refreshing.");
      } else {
        setError(`Please wait ${formatCountdown(timeUntilNextRequest)} before refreshing.`);
      }
      return;
    }

    isFetchingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(GNEWS_API_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: GNewsApiResponse = await response.json();

      if (data.articles) {
        const formattedNews: NewsItem[] = data.articles.map((article, index) => ({
          id: index + Date.now(),
          title: article.title || "No title available",
          source: article.source?.name || "Unknown source",
          time: formatTimeAgo(article.publishedAt),
          url: article.url || "#",
          description: article.description || "No description available",
        }));
        
        setNews(formattedNews);
        saveToCache(formattedNews);
        
        // Update rate limiting state
        const now = Date.now();
        setLastFetch(now);
        setRequestCount(prev => prev + 1);
        setNextRefreshTime(now + MIN_REQUEST_INTERVAL);
        
      } else {
        setError("No articles found in response.");
      }
    } catch (err) {
      setError(`Network error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [canMakeRequest, loadFromCache, isCacheValid, saveToCache, GNEWS_API_URL, MIN_REQUEST_INTERVAL, requestCount, lastFetch, formatCountdown]);

  // Reset request count every hour
  useEffect(() => {
    const resetInterval = setInterval(() => {
      setRequestCount(0);
    }, HOURLY_RESET_INTERVAL);

    return () => clearInterval(resetInterval);
  }, [HOURLY_RESET_INTERVAL]);

  // Initialize component - fetch news only once on mount
  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true);
      fetchNews();
    }
  }, [isInitialized, fetchNews]);

  // Set up auto-refresh timer
  useEffect(() => {
    if (!isInitialized) return;

    const scheduleNextRefresh = () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }

      // Schedule next refresh after cache expires
      refreshTimeoutRef.current = setTimeout(() => {
        if (canMakeRequest()) {
          fetchNews();
        }
        scheduleNextRefresh(); // Reschedule
      }, CACHE_DURATION);
    };

    scheduleNextRefresh();

    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, [isInitialized, canMakeRequest, fetchNews, CACHE_DURATION]);

  const refreshNews = (): void => {
    fetchNews(true); // Force refresh
  };

  // const getRemainingRequests = (): number => {
  //   return Math.max(0, MAX_REQUESTS_PER_HOUR - requestCount);
  // };

  const getTimeUntilNextRefresh = (): string => {
    const now = Date.now();
    const timeLeft = nextRefreshTime - now;
    
    if (timeLeft <= 0) return "Now";
    return formatCountdown(timeLeft);
  };

  // const getCacheStatus = (): string => {
  //   if (news.length === 0) return "No cache";
    
  //   const cached = loadFromCache();
  //   if (!cached) return "No cache";
    
  //   const cacheAge = Date.now() - cached.timestamp;
  //   const remaining = CACHE_DURATION - cacheAge;
    
  //   if (remaining <= 0) return "Cache expired";
  //   return `Cache: ${formatCountdown(remaining)} left`;
  // };

  return (
    <div className="bg-white font-mono text-sm h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-300 p-2 bg-gray-50 flex justify-between items-center">
        <div className="text-xs">
          <div className="font-bold">Tech News</div>
          <div className="text-gray-600">
            Requests: {requestCount}/{MAX_REQUESTS_PER_HOUR} | 
            Next: {getTimeUntilNextRefresh()}
          </div>
        </div>
        <button
          onClick={refreshNews}
          disabled={loading || !canMakeRequest()}
          className="text-gray-600 hover:text-black text-xs px-1 border border-gray-300 rounded disabled:text-gray-400 disabled:cursor-not-allowed"
          title={!canMakeRequest() ? "Rate limit active" : "Force refresh"}
        >
          {loading ? "..." : "↻"}
        </button>
      </div>

      {/* Cache and Rate Limit Info
      <div className="px-2 py-1 bg-yellow-50 border-b border-gray-200 text-xs text-gray-600">
        <div className="flex justify-between">
          <span>Remaining requests: {getRemainingRequests()}</span>
          <span>Auto-refresh: {CACHE_DURATION / (1000 * 60)}min | {getCacheStatus()}</span>
        </div>
      </div> */}

      {/* Content */}
      <div className="flex-1 p-2 overflow-y-auto space-y-2 min-h-0">
        {/* Error Message */}
        {error && (
          <div className="text-xs text-gray-600 border border-gray-300 p-1 bg-red-50">
            Error: {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-xs text-gray-500 text-center py-4">
            {news.length === 0 ? "Loading news..." : "Refreshing news..."}
          </div>
        )}

        {/* News Articles */}
        {news.map((item) => (
          <div 
            key={item.id}
            className="border-b border-gray-200 pb-2 last:border-b-0 cursor-pointer hover:bg-gray-50 p-1 -m-1"
            onClick={() => window.open(item.url, '_blank', 'noopener,noreferrer')}
          >
            <div className="text-xs font-bold text-black mb-1 leading-tight">
              {item.title}
            </div>
            
            <div className="text-xs text-gray-600 mb-1 leading-relaxed">
              {item.description}
            </div>
            
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>{item.source}</span>
              <span>{item.time}</span>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {!loading && news.length === 0 && !error && (
          <div className="text-center py-4">
            <div className="text-xs text-gray-500 mb-2">No articles found</div>
            <button
              onClick={refreshNews}
              disabled={!canMakeRequest()}
              className="text-xs text-gray-600 hover:text-black border border-gray-300 px-2 py-1 rounded disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              {canMakeRequest() ? "Retry" : `Wait ${getTimeUntilNextRefresh()}`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechNews;