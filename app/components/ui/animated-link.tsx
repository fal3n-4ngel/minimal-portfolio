
'use client'

import { linkVariants } from '@/app/lib/animations'
import { SocialLink } from '@/app/types'
import { motion } from 'framer-motion'

interface AnimatedLinkProps {
  link: SocialLink
  index: number
}

export default function AnimatedLink({ link, index }: AnimatedLinkProps) {
  return (
    <motion.a
      href={link.href}
      className="text-neutral-500 hover:text-neutral-900 transition-colors duration-200"
      variants={linkVariants}
      custom={index}
      target={link.external ? '_blank' : '_self'}
      rel={link.external ? 'noopener noreferrer' : ''}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
    >
      {link.text}
    </motion.a>
  )
}