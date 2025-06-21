'use client'

import { itemVariants } from '@/app/lib/animations'
import { motion } from 'framer-motion'


interface SectionHeaderProps {
  children: React.ReactNode
  className?: string
}

export default function SectionHeader({ children, className = '' }: SectionHeaderProps) {
  return (
    <motion.h2
      className={`text-neutral-400 mb-4 font-mono text-sm ${className}`}
      variants={itemVariants}
    >
      {children}
    </motion.h2>
  )
}