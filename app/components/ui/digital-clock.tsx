
"use client"
import { ibmPlexSans} from '@/app/fonts';
import React, { useState, useEffect } from 'react'

export const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white  font-mono h-full flex flex-col">
      <div className="border-b border-gray-300 p-2 bg-gray-50 text-xs">
        <div className="font-bold">System Time</div>
        <div className="text-gray-600">Local timezone</div>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center">
          <div className={`text-4xl font-mono  mb-2 ${ibmPlexSans.className}`}>
            {time.toLocaleTimeString('en-US', { hour12: false })}
          </div>
          <div className="text-sm opacity-75 mb-4">
            {time.toLocaleDateString('en-US', { 
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>
      </div>
    </div>
  );
};