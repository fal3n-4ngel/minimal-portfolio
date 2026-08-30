'use client'

import { resumeData } from '@/app/data/resume-data'
import { itemVariants } from '@/app/lib/animations'
import { motion } from 'framer-motion'

export default function HeaderSection() {
  const { personalInfo } = resumeData

  return (
    <motion.header variants={itemVariants}>
      {/* Name */}
      <motion.h1
        variants={itemVariants}
        style={{
          fontSize: '22px',
          fontWeight: 600,
          color: 'var(--fg)',
          letterSpacing: '-0.02em',
          marginBottom: '12px',
          lineHeight: 1.2,
        }}
      >
        {personalInfo.name}
      </motion.h1>

      {/* Bio */}
      {personalInfo.description.map((p, i) => (
        <motion.p
          key={i}
          variants={itemVariants}
          style={{
            fontSize: '13.5px',
            color: 'var(--fg-muted)',
            lineHeight: '1.7',
            maxWidth: '540px',
            marginBottom: '20px',
          }}
        >
          {p}
        </motion.p>
      ))}

      {/* Download PDF */}
      <motion.div variants={itemVariants} style={{ marginBottom: '36px' }}>
        <a
          href="https://www.adithyakrishnan.com/Resume%20Adithya%20Krishnan.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="download-btn"
        >
          <span style={{ fontSize: '14px' }}>⬇</span>
          Download PDF
        </a>
      </motion.div>

      {/* Contact section */}
      <motion.div variants={itemVariants}>
        <h2 className="cv-section-title">Contact</h2>
        <div>
          {[
            { label: 'Email', value: 'hello@adithyakrishnan.com', href: 'mailto:hello@adithyakrishnan.com' },
            { label: 'LinkedIn', value: 'fal3n-4ngel', href: 'https://www.linkedin.com/in/fal3n-4ngel' },
            { label: 'GitHub', value: 'fal3n-4ngel', href: 'https://github.com/fal3n-4ngel' },
          ].map((item) => (
            <div key={item.label} className="contact-row">
              <span className="contact-label">{item.label}</span>
              <a
                href={item.href}
                target={item.href.startsWith('mailto') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="contact-value"
                style={{ transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--fg)')}
              >
                {item.value}
              </a>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.header>
  )
}