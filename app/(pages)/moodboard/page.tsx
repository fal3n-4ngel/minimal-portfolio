"use client";
import { ContactCard } from "@/app/components/ui/contact-card";
import { DigitalClock } from "@/app/components/ui/digital-clock";
import DigitalSignaturePad from "@/app/components/ui/sign-board";
import TechNews from "@/app/components/ui/tech-news";
import { TerminalChat } from "@/app/components/ui/terminal-chat";
import TetrisGame from "@/app/components/ui/tetris-game";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

function MoodboardPage() {
  return (
    <div className="max-h-screen bg-gray-50 p-6">
      <motion.div
        className="fixed top-6 right-6 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Link href="/">
          <motion.button
            className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors duration-200 shadow-lg backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Portfolio →
          </motion.button>
        </Link>
      </motion.div>
      <div className="max-w-[95vw] mx-auto h-[100vh] pt-5">
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
            <DigitalSignaturePad />
          </div>
          <div className="col-span-4 row-span-3 bg-white  shadow-sm border border-gray-200 flex items-center justify-center">
            <ContactCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoodboardPage;
