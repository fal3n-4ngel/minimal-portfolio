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
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
      <motion.div
        className="fixed top-3 right-3 sm:top-6 sm:right-6 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Link href="/">
          <motion.button
            className="bg-black text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors duration-200 shadow-lg backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="hidden sm:inline">View Portfolio →</span>
            <span className="sm:hidden">Portfolio</span>
          </motion.button>
        </Link>
      </motion.div>

      <div className="max-w-full mx-auto min-h-screen pt-3 sm:pt-5">
        {/* Mobile Layout - Stack vertically */}
        <div className="block lg:hidden space-y-4">
          {/* Digital Clock - Mobile */}
          <motion.div 
            className="h-32 bg-white shadow-sm border border-gray-200 overflow-hidden rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <DigitalClock />
          </motion.div>

          {/* Tech News - Mobile */}
          <motion.div 
            className="h-48 bg-white shadow-sm border border-gray-200 overflow-hidden rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <TechNews />
          </motion.div>

          {/* Terminal Chat - Mobile */}
          <motion.div 
            className="h-64 bg-white shadow-sm border border-gray-200 overflow-hidden rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <TerminalChat />
          </motion.div>

          {/* Tetris Game - Mobile */}
          <motion.div 
            className="h-80 bg-white shadow-sm border border-gray-200 overflow-hidden rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <TetrisGame />
          </motion.div>

          {/* Digital Signature - Mobile */}
          <motion.div 
            className="h-64 bg-white shadow-sm border border-gray-200 flex items-center justify-center rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <DigitalSignaturePad />
          </motion.div>

          {/* Contact Card - Mobile */}
          <motion.div 
            className="h-48 bg-white shadow-sm border border-gray-200 flex items-center justify-center rounded-lg mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <ContactCard />
          </motion.div>
        </div>

        {/* Tablet Layout - 2 columns */}
        <div className="hidden lg:block xl:hidden">
          <div className="grid grid-cols-2 gap-4 auto-rows-min">
            {/* Row 1 */}
            <motion.div 
              className="h-48 bg-white shadow-sm border border-gray-200 overflow-hidden rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <DigitalClock />
            </motion.div>
            <motion.div 
              className="h-48 bg-white shadow-sm border border-gray-200 overflow-hidden rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <TechNews />
            </motion.div>

            {/* Row 2 */}
            <motion.div 
              className="h-80 bg-white shadow-sm border border-gray-200 overflow-hidden rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <TerminalChat />
            </motion.div>
            <motion.div 
              className="h-80 bg-white shadow-sm border border-gray-200 overflow-hidden rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <TetrisGame />
            </motion.div>

            {/* Row 3 */}
            <motion.div 
              className="h-64 bg-white shadow-sm border border-gray-200 flex items-center justify-center rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <DigitalSignaturePad />
            </motion.div>
            <motion.div 
              className="h-64 bg-white shadow-sm border border-gray-200 flex items-center justify-center rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <ContactCard />
            </motion.div>
          </div>
        </div>

        {/* Desktop Layout - Original Bento Grid */}
        <div className="hidden xl:block h-[calc(100vh-2rem)]">
          <div className="grid grid-cols-15 grid-rows-8 gap-6 h-full">
            {/* Digital Clock - Top Left */}
            <motion.div 
              className="col-span-3 row-span-4 bg-white shadow-sm border border-gray-200 overflow-hidden rounded-lg"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <DigitalClock />
            </motion.div>

            {/* Tech News - Top Center (wide) */}
            <motion.div 
              className="col-span-8 row-span-4 bg-white shadow-sm border border-gray-200 overflow-hidden rounded-lg"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <TechNews />
            </motion.div>

            {/* Terminal Chat - Top Right */}
            <motion.div 
              className="col-span-4 row-span-5 bg-white shadow-sm border border-gray-200 overflow-hidden rounded-lg"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <TerminalChat />
            </motion.div>

            {/* Tetris Game - Bottom Left (large) */}
            <motion.div 
              className="md:block hidden col-span-5 row-span-4 bg-white shadow-sm border border-gray-200 overflow-hidden rounded-lg "
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <TetrisGame />
            </motion.div>

            {/* Digital Signature Pad */}
            <motion.div 
              className=" hidden col-span-6 row-span-4 bg-white shadow-sm border border-gray-200 md:flex items-center justify-center rounded-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <DigitalSignaturePad />
            </motion.div>

            {/* Contact Card */}
            <motion.div 
              className="col-span-4 row-span-3 bg-white shadow-sm border border-gray-200 flex items-center justify-center rounded-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <ContactCard />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoodboardPage;