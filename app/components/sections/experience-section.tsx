'use client'

import { resumeData } from '@/app/data/resume-data'
import { motion } from 'framer-motion'
import SectionHeader from '../ui/section-header'
import { itemVariants, sectionVariants } from '@/app/lib/animations'


export default function ExperienceSection() {
  const { experiences } = resumeData

  return (
    <motion.section className="mb-16" variants={sectionVariants}>
      <SectionHeader>Experience.</SectionHeader>

      <div className="space-y-6">
        {experiences.map((experience, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <h3 className="text-neutral-900 font-medium mb-1">
              {experience.title}
            </h3>
            <p className="text-neutral-500 text-sm mb-2">
              {experience.period}
            </p>
            <p className="text-neutral-600 text-sm leading-relaxed">
              {experience.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}