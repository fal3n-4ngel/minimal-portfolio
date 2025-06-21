"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  ref,
  push,
  onValue,
  query,
  orderByChild,
  limitToLast,
  serverTimestamp,
  off,
  startAt,
  get,
} from "firebase/database";
import { Message } from "@/app/types";
import { rtdb } from "@/app/lib/firebase";
import {
  generateAnonymousName,
  generateUserId,
  getUserIdentifier,
} from "@/app/lib/utils";

interface TerminalChatProps {
  height?: string;
  width?: string;
  className?: string;
  maxMessages?: number;
}

export const TerminalChat: React.FC<TerminalChatProps> = ({
  height = "100%",
  width = "100%",
  className = "",
  maxMessages = 50,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isUserInitialized, setIsUserInitialized] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [activeUsers, setActiveUsers] = useState<number>(1);
  const [loadingText, setLoadingText] = useState<string>("");
  const [connectionTime, setConnectionTime] = useState(0);
  const [lastMessageTimestamp, setLastMessageTimestamp] = useState<number>(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesListenerRef = useRef<(() => void) | null>(null);
  const lastActiveUsersUpdate = useRef<number>(0);
  const initializationRetryCount = useRef<number>(0);
  const maxRetries = 3;

  const loadingSequence: string[] = [
    "Connecting to terminal...",
    "Initializing user...",
    "Loading chat history...",
    "Establishing connection...",
    "Ready.",
  ];

  // Debounced function to update active users count
  const updateActiveUsers = useCallback(() => {
    const now = Date.now();
    // Only update active users every 5 seconds to reduce calculations
    if (now - lastActiveUsersUpdate.current < 5000) return;
    
    const fiveSecAgo = now - 5 * 1000;
    const recentUsers = new Set<string>();
    
    // Only count users from messages in the last 5 sec
    messages.forEach(msg => {
      const msgTime =
        msg.timestamp && typeof msg.timestamp === 'object' && 'toMillis' in msg.timestamp
          ? msg.timestamp.toMillis()
          : typeof msg.timestamp === 'number'
          ? msg.timestamp
          : 0;
      
      if (msgTime > fiveSecAgo) {
        recentUsers.add(msg.userId);
      }
    });
    
    setActiveUsers(Math.max(1, recentUsers.size));
    lastActiveUsersUpdate.current = now;
  }, [messages]);

  const initializeUser = async (): Promise<boolean> => {
    try {
      const userIdentifier = await getUserIdentifier();
      const storedUsername = localStorage.getItem(
        `terminal_username_${userIdentifier}`
      );
      const storedUserId = localStorage.getItem(
        `terminal_userid_${userIdentifier}`
      );

      let finalUsername, finalUserId;

      if (storedUsername && storedUserId) {
        finalUsername = storedUsername;
        finalUserId = storedUserId;
      } else {
        finalUserId = generateUserId();
        finalUsername = generateAnonymousName();
        localStorage.setItem(
          `terminal_username_${userIdentifier}`,
          finalUsername
        );
        localStorage.setItem(
          `terminal_userid_${userIdentifier}`,
          finalUserId
        );
      }

      // Validate that we have proper values
      if (!finalUsername || !finalUserId || finalUsername.trim() === '' || finalUserId.trim() === '') {
        throw new Error('Failed to generate valid username or userId');
      }

      setUserId(finalUserId);
      setUsername(finalUsername);
      setConnectionTime(Date.now());
      console.log("User initialized:", finalUsername, finalUserId);
      console.log("User Connected at:", Date.now());
      
      return true;
    } catch (error) {
      console.error("Error initializing user:", error);
      
      // Fallback with session-only storage
      try {
        const sessionUserId = generateUserId();
        const sessionUsername = generateAnonymousName();
        
        if (!sessionUsername || !sessionUserId || sessionUsername.trim() === '' || sessionUserId.trim() === '') {
          throw new Error('Failed to generate fallback credentials');
        }
        
        setUserId(sessionUserId);
        setUsername(sessionUsername);
        setConnectionTime(Date.now());
        console.log("User initialized (session only):", sessionUsername, sessionUserId);
        console.log("User Connected at:", Date.now());
        
        return true;
      } catch (fallbackError) {
        console.error("Error with fallback initialization:", fallbackError);
        return false;
      }
    }
  };

  useEffect(() => {
    const attemptInitialization = async () => {
      const success = await initializeUser();
      
      if (success) {
        setIsUserInitialized(true);
        initializationRetryCount.current = 0;
      } else {
        initializationRetryCount.current++;
        
        if (initializationRetryCount.current < maxRetries) {
          console.log(`Retrying user initialization (${initializationRetryCount.current}/${maxRetries})...`);
          setTimeout(attemptInitialization, 1000); // Retry after 1 second
        } else {
          console.error("Failed to initialize user after maximum retries");
          // You might want to show an error state here
        }
      }
    };

    let currentStep = 0;
    const loadingInterval = setInterval(() => {
      if (currentStep < loadingSequence.length) {
        setLoadingText(loadingSequence[currentStep]);
        currentStep++;
      } else {
        clearInterval(loadingInterval);
        setTimeout(() => {
          setIsLoading(false);
          setIsConnected(true);
           setConnectionTime(Date.now());
        }, 500);
      }
    }, 600);

    attemptInitialization();
  

    return () => clearInterval(loadingInterval);
  }, []);

  useEffect(() => {
    // Only proceed if both connection is established AND user is properly initialized
    if (!isConnected || !isUserInitialized || !username || !userId) {
      console.log("Waiting for initialization:", { isConnected, isUserInitialized, username: !!username, userId: !!userId });
      return;
    }

    console.log("Setting up message listener - user fully initialized");

    const setupMessageListener = async () => {
      // First, load initial messages with a single read
      const messagesRef = ref(rtdb, "messages");
      const initialQuery = query(
        messagesRef,
        orderByChild("timestamp"),
        limitToLast(maxMessages)
      );

      try {
        const initialSnapshot = await get(initialQuery);
        if (initialSnapshot.exists()) {
          const data = initialSnapshot.val();
          const initialMessages: Message[] = Object.keys(data)
            .map((key) => ({
              id: key,
              text: data[key].text,
              username: data[key].username,
              userId: data[key].userId,
              timestamp: data[key].timestamp,
            }))
            .filter((msg) => msg.timestamp > connectionTime - 5000);
            
          console.log("Initial messages loaded:", initialMessages);
          console.log("Connection time:", connectionTime);
          console.log("Current time:", Date.now());

          setMessages(initialMessages);
          
          // Set the timestamp for listening to new messages only
          if (initialMessages.length > 0) {
            const lastMsg = initialMessages[initialMessages.length - 1];
            const lastTime =
              lastMsg.timestamp != null
                ? (typeof lastMsg.timestamp === 'object' && 'toMillis' in lastMsg.timestamp
                    ? lastMsg.timestamp.toMillis()
                    : typeof lastMsg.timestamp === 'number'
                    ? lastMsg.timestamp
                    : Date.now())
                : Date.now();
            setLastMessageTimestamp(lastTime);
          } else {
            setLastMessageTimestamp(Date.now());
          }
        } else {
          setLastMessageTimestamp(Date.now());
        }
      } catch (error) {
        console.error("Error loading initial messages:", error);
        setLastMessageTimestamp(Date.now());
      }

      // Set up listener for only NEW messages after initial load
      const newMessagesQuery = query(
        messagesRef,
        orderByChild("timestamp"),
        (lastMessageTimestamp > 0 ? startAt(lastMessageTimestamp + 1) : startAt(connectionTime + 1))
      );

      const unsubscribe = onValue(newMessagesQuery, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const newMessages: Message[] = Object.keys(data)
            .map((key) => ({
              id: key,
              text: data[key].text,
              username: data[key].username,
              userId: data[key].userId,
              timestamp: data[key].timestamp,
            }))
            .sort((a, b) => {
              const aTime = typeof a.timestamp === 'object' && 'toMillis' in a.timestamp 
                ? a.timestamp.toMillis() 
                : typeof a.timestamp === 'number' ? a.timestamp : 0;
              const bTime = typeof b.timestamp === 'object' && 'toMillis' in b.timestamp 
                ? b.timestamp.toMillis() 
                : typeof b.timestamp === 'number' ? b.timestamp : 0;
              return aTime - bTime;
            });

          // Only add truly new messages
          setMessages(prevMessages => {
            const existingIds = new Set(prevMessages.map(msg => msg.id));
            const actuallyNewMessages = newMessages.filter(msg => !existingIds.has(msg.id));
            
            if (actuallyNewMessages.length === 0) return prevMessages;
            
            const combined = [...prevMessages, ...actuallyNewMessages];
            // Keep only the most recent maxMessages
            return combined.slice(-maxMessages);
          });
        }
      });

      messagesListenerRef.current = () => off(messagesRef, "value", unsubscribe);
    };

    setupMessageListener();

    if (inputRef.current) {
      inputRef.current.focus();
    }

    // Cleanup listener on unmount
    return () => {
      if (messagesListenerRef.current) {
        messagesListenerRef.current();
      }
    };
  }, [isConnected, isUserInitialized, username, userId, maxMessages, connectionTime]);

  // Update active users count periodically instead of on every message
  useEffect(() => {
    updateActiveUsers();
    const interval = setInterval(updateActiveUsers, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, [updateActiveUsers]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (): Promise<void> => {
    if (!inputValue.trim() || !isUserInitialized || !username || !userId) {
      console.log("Cannot send message - user not properly initialized");
      return;
    }

    const messageText = inputValue.trim();
    setInputValue("");

    try {
      const messagesRef = ref(rtdb, "messages");
      await push(messagesRef, {
        text: messageText,
        username: username,
        userId: userId,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error sending message:", error);
      // Restore input value on error
      setInputValue(messageText);
    }
  };

  const formatTime = useCallback((timestamp: number | null): string => {
    if (!timestamp) return "";
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  if (isLoading || !isUserInitialized) {
    return (
      <div
        className={`bg-white text-black font-mono flex items-center justify-center ${className}`}
        style={{ height, width }}
      >
        <div className="text-center">
          <div className="mb-4">
            <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <div className="text-sm font-bold">Terminal</div>
          </div>
          <div className="text-xs">
            <div className="typing-effect">{loadingText}</div>
            <div className="mt-2 flex justify-center">
              <div className="w-1 h-1 bg-black rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .typing-effect {
            overflow: hidden;
            white-space: nowrap;
            min-height: 1em;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      className={`bg-white text-black font-mono flex flex-col ${className}`}
      style={{ height, width }}
    >
      {/* Header */}
      <div className="border-b border-gray-300 p-2 bg-gray-50 flex-shrink-0">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm font-bold">Terminal Chat</div>
            <div className="text-xs text-gray-600">{username}</div>
          </div>
          <div className="text-xs text-gray-600">{activeUsers} online</div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-2 flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto mb-2 space-y-1">
          {/* System message */}
          <div className="text-gray-500 text-xs mb-2 pb-1 border-b border-gray-200">
            <div>Terminal chat • Connected</div>
          </div>

          {/* Messages */}
          {messages.map((message: Message) => {
            const isOwnMessage = message.userId === userId;
            return (
              <div
                key={message.id}
                className="flex items-start gap-2 py-0.5 hover:bg-gray-50 px-1 rounded text-xs"
              >
                <div className="text-gray-500 text-xs w-8 flex-shrink-0 text-right">
                  {formatTime(
                    message.timestamp &&
                      typeof message.timestamp === "object" &&
                      "toMillis" in message.timestamp
                      ? message.timestamp.toMillis()
                      : typeof message.timestamp === "number"
                      ? message.timestamp
                      : null
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <span
                    className={`text-xs mr-1 font-medium ${
                      isOwnMessage ? "text-black" : "text-gray-700"
                    }`}
                  >
                    {message.username}
                  </span>
                  <span className="text-black break-words">{message.text}</span>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-300 pt-2 flex-shrink-0">
          <div className="flex items-center gap-1">
            <span className="text-gray-500 text-xs font-bold">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-transparent border-none outline-none text-xs text-black placeholder-gray-400 focus:bg-gray-50 px-1 py-0.5 rounded"
              placeholder="Type a message..."
              autoComplete="off"
              disabled={!isUserInitialized || !username || !userId}
            />
            <button
              onClick={sendMessage}
              disabled={!isUserInitialized || !username || !userId}
              className="text-gray-600 hover:text-black transition-colors text-xs px-1 py-0.5 border border-gray-300 rounded hover:bg-gray-100 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              send
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        ::-webkit-scrollbar {
          width: 4px;
        }

        ::-webkit-scrollbar-track {
          background: #f5f5f5;
          border-radius: 2px;
        }

        ::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 2px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #999;
        }
      `}</style>
    </div>
  );
};