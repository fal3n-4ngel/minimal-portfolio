'use client'

import { itemVariants } from '@/app/lib/animations'
import { motion } from 'framer-motion'


interface SectionHeaderProps {
  children: React.ReactNode
  className?: string
  label?: boolean
}

export default function SectionHeader({ children, className = '', label = false }: SectionHeaderProps) {
  if (label) {
    return (
      <motion.p
        className={`text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-5 ${className}`}
        variants={itemVariants}
      >
        {children}
      </motion.p>
    )
  }

  return (
    <motion.h2
      className={`text-neutral-900 font-bold text-2xl mb-5 tracking-tight ${className}`}
      variants={itemVariants}
    >
      {children}
    </motion.h2>
  )
}