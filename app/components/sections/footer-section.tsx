'use client'

import { footerVariants } from '@/app/lib/animations'
import { motion } from 'framer-motion'

export default function FooterSection() {
  return (
    <motion.footer
      variants={footerVariants}
      style={{
        marginTop: '48px',
        paddingTop: '20px',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px',
      }}
    >
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--fg-subtle)', letterSpacing: '0.03em' }}>
        © {new Date().getFullYear()} Adithya Krishnan
      </p>
      <a
        href="https://www.adithyakrishnan.com"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--fg-subtle)',
          letterSpacing: '0.03em',
          transition: 'color 0.15s',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--fg)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--fg-subtle)')}
      >
        adithyakrishnan.com ↗
      </a>
    </motion.footer>
  )
}