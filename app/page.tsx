'use client'

import { motion } from 'framer-motion'
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
      <HeaderSection />
      <ProjectsSection />
      <ExperienceSection />
      <AwardsSection />
      <FooterSection />
    </motion.div>
  )
}
