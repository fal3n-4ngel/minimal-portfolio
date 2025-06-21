"use client";
import { ContactCard } from "@/app/components/ui/contact-card";
import { DigitalClock } from "@/app/components/ui/digital-clock";
import DigitalSignaturePad from "@/app/components/ui/sign-board";
import TechNews from "@/app/components/ui/tech-news";
import { TerminalChat } from "@/app/components/ui/terminal-chat";
import TetrisGame from "@/app/components/ui/tetris-game";
import React from "react";

function MoodboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[95vw] mx-auto h-[95vh]">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-15 grid-rows-8 gap-6 h-full">
          {/* Digital Clock - Top Left */}
          <div className="col-span-3 row-span-4 bg-white  shadow-sm border border-gray-200 overflow-hidden">
            <DigitalClock />
          </div>

          {/* Tech News - Top Center (wide) */}
          <div className="col-span-8 row-span-4 bg-white  shadow-sm border border-gray-200 overflow-hidden">
            <TechNews />
          </div>

          {/* Terminal Chat - Top Right */}
          <div className="col-span-4 row-span-5 bg-white  shadow-sm border border-gray-200 overflow-hidden">
            <TerminalChat />
          </div>

          {/* Tetris Game - Bottom Left (large) */}
          <div className="col-span-5 row-span-4 bg-white shadow-sm border border-gray-200 overflow-hidden">
            <TetrisGame />
          </div>

         
          <div className="col-span-6 row-span-4 bg-white  shadow-sm border border-gray-200 flex items-center justify-center">
            <DigitalSignaturePad/>
          </div>
            <div className="col-span-4 row-span-3 bg-white  shadow-sm border border-gray-200 flex items-center justify-center">
            <ContactCard/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoodboardPage;
