"use client"
import React, { useState, useEffect } from 'react'

interface NewsItem {
  id: number;
  title: string;
  source: string;
  time: string;
  url: string;
  description: string;
}

interface ApiResponse {
  status: string;
  message?: string;
  articles: Array<{
    title: string;
    source: { name: string };
    publishedAt: string;
    url: string;
    description: string;
  }>;
}

const TechNews: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = '1c1cc0d966774661a4eefce33c562f24'; 
  const NEWS_API_URL = `https://newsapi.org/v2/everything?q=tech&language=en&sortBy=publishedAt&pageSize=10&apiKey=${API_KEY}`;

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

  const fetchNews = async (): Promise<void> => {
   

    setLoading(true);
    setError(null);
        
    try {
      const response = await fetch(NEWS_API_URL);
      const data: ApiResponse = await response.json();
            
      if (data.status === 'ok') {
        const formattedNews: NewsItem[] = data.articles.map((article, index) => ({
          id: index + Date.now(),
          title: article.title || 'No title available',
          source: article.source?.name || 'Unknown source',
          time: formatTimeAgo(article.publishedAt),
          url: article.url || '#',
          description: article.description || 'No description available'
        }));
        setNews(formattedNews);
      } else {
        setError(data.message || 'Failed to fetch news');
      }
    } catch {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const refreshNews = (): void => {
    fetchNews();
  };
return (
    <div className="bg-white  font-mono text-sm h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-300 p-2 bg-gray-50 flex justify-between items-center">
        <div className="text-xs">
          <div className="font-bold">Tech News</div>
          <div className="text-gray-600">Random updates</div>
        </div>
        <button
          onClick={refreshNews}
          disabled={loading}
          className="text-gray-600 hover:text-black text-xs px-1 border border-gray-300 rounded disabled:text-gray-400"
        >
          {loading ? "..." : "↻"}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-2 overflow-y-auto space-y-2 min-h-0">
        {/* Error Message */}
        {error && (
          <div className="text-xs text-gray-600 border border-gray-300 p-1">
            Error: {error}
          </div>
        )}

        {/* Loading State */}
        {loading && news.length === 0 && (
          <div className="text-xs text-gray-500 text-center py-4">
            Loading news...
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
              className="text-xs text-gray-600 hover:text-black border border-gray-300 px-2 py-1 rounded"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechNews;