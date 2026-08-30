'use client'

import { resumeData } from '@/app/data/resume-data'
import { motion } from 'framer-motion'
import { itemVariants, sectionVariants } from '@/app/lib/animations'

export default function ExperienceSection() {
  const { experiences } = resumeData

  return (
    <motion.div variants={sectionVariants}>
      <h2 className="cv-section-title">Work Experience</h2>

      <div>
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="exp-row"
          >
            {/* Company logo square */}
            <span
              className="exp-logo"
              style={{ background: exp.logoColor ?? '#0d0d0d', borderRadius: '6px' }}
            >
              {exp.logoInitial}
            </span>

            {/* Company name with ↗ */}
            <span className="exp-company">
              {exp.company}
              <sup>↗</sup>
            </span>

            {/* Role */}
            <span className="exp-role">{exp.title}</span>

            {/* Period — right-aligned, muted */}
            <span className="exp-period">{exp.period}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}