'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { containerVariants } from './lib/animations'
import HeaderSection from './components/sections/header-section'
import ProjectsSection from './components/sections/project-section'
import ExperienceSection from './components/sections/experience-section'
import AwardsSection from './components/sections/awards-section'
import FooterSection from './components/sections/footer-section'
import { ibmPlexSans } from './fonts'

export default function Home() {
  return (
    <motion.div
      className={`max-w-4xl mx-auto px-8 py-20 ${ibmPlexSans.className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      
      <motion.div 
        className="fixed top-6 right-6 z-50 md:block hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Link href="/moodboard">
          <motion.button
            className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors duration-200 shadow-lg backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Moodboard →
          </motion.button>
        </Link>
      </motion.div>
      <motion.div 
        className="fixed top-6 right-6 z-50 block md:hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Link href="https://www.adithyakrishnan.com/">
          <motion.button
            className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors duration-200 shadow-lg backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Portfolio →
          </motion.button>
        </Link>
      </motion.div>

      <HeaderSection />
      <ProjectsSection />
      <ExperienceSection />
      <AwardsSection />
      <FooterSection />
    </motion.div>
  )
}