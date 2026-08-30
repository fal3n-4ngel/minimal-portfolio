'use client'

import { resumeData } from '@/app/data/resume-data'
import { itemVariants, sectionVariants } from '@/app/lib/animations'
import { motion } from 'framer-motion'
import SectionHeader from '../ui/section-header'
import ProjectCard from '../ui/project-card'


export default function ProjectsSection() {
  const { personalProjects, clientProjects } = resumeData

  return (
    <motion.section className="mb-16" variants={sectionVariants}>
        <motion.p
              className={`text-md font-semibold uppercase tracking-widest text-neutral-400 mb-5 `}
              variants={itemVariants}
            >
             Projects
            </motion.p>
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