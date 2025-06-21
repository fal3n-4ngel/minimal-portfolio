'use client'

import { resumeData } from '@/app/data/resume-data'
import { sectionVariants } from '@/app/lib/animations'
import { motion } from 'framer-motion'
import SectionHeader from '../ui/section-header'
import ProjectCard from '../ui/project-card'


export default function ProjectsSection() {
  const { personalProjects, clientProjects } = resumeData

  return (
    <motion.section className="mb-16" variants={sectionVariants}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <motion.div variants={sectionVariants}>
          <SectionHeader>Personal.</SectionHeader>
          <div className="space-y-1">
            {personalProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </motion.div>

        <motion.div variants={sectionVariants}>
          <SectionHeader>Client.</SectionHeader>
          <div className="space-y-1">
            {clientProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}