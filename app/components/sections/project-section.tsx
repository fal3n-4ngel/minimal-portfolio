'use client'

import { resumeData } from '@/app/data/resume-data'
import { motion } from 'framer-motion'
import { itemVariants, sectionVariants } from '@/app/lib/animations'

export default function ProjectsSection() {
  const { personalProjects, clientProjects } = resumeData

  const allProjects = [
    ...personalProjects.map(p => ({ ...p, tag: 'Personal' })),
    ...clientProjects.map(p => ({ ...p, tag: 'Client' })),
  ]

  return (
    <motion.div variants={sectionVariants}>
      <h2 className="cv-section-title">Projects</h2>

      <div className="project-grid">
        {allProjects.map((project, i) => (
          <motion.a
            key={project.title}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card"
            variants={itemVariants}
            custom={i}
          >
            <div className="project-tag">{project.tag} ↗</div>
            <div className="project-title">{project.title}</div>
            <div className="project-desc">{project.description}</div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  )
}