'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { resumeData } from './data/resume-data'

const ACCENT = '#c0410a'
const FG = '#0d0d0d'
const FG_MUTED = '#5d5d5d'
const FG_SUBTLE = '#9a9a9a'
const BORDER = '#e8e8e8'
const FONT_SANS = "'DM Sans', system-ui, sans-serif"
const FONT_MONO = "'DM Mono', monospace"

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Awards', href: '#awards' },
  { label: 'CV', href: 'https://www.adithyakrishnan.com/Resume%20Adithya%20Krishnan.pdf', active: true },
]

const contactItems = [
  { label: 'Email', value: 'hello@adithyakrishnan.com', href: 'mailto:hello@adithyakrishnan.com' },
  { label: 'LinkedIn', value: 'fal3n-4ngel', href: 'https://www.linkedin.com/in/fal3n-4ngel' },
  { label: 'GitHub', value: 'fal3n-4ngel', href: 'https://github.com/fal3n-4ngel' },
  { label: 'Portfolio', value: 'adithyakrishnan.com', href: 'https://www.adithyakrishnan.com' },
]

function NavLink({ label, href, active }: { label: string; href: string; active?: boolean }) {
  const isExternal = href.startsWith('http')
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      style={{
        display: 'block',
        fontSize: '13.5px',
        fontFamily: FONT_SANS,
        color: active ? FG : FG_SUBTLE,
        fontWeight: active ? 600 : 400,
        lineHeight: '1.4',
        padding: '1px 0',
        transition: 'color 0.15s',
        textDecoration: 'none',
      }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.color = FG }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.color = FG_SUBTLE }}
    >
      {label}
    </a>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontSize: '18px',
      fontWeight: 600,
      color: FG,
      fontFamily: FONT_SANS,
      letterSpacing: '-0.01em',
      marginBottom: '18px',
      marginTop: '0',
    }}>
      {children}
    </h2>
  )
}

function Divider() {
  return <div style={{ borderTop: `1px solid ${BORDER}`, margin: '36px 0' }} />
}

function LogoBadge({ initial, color }: { initial: string; color: string }) {
  const isLight = color === '#f3eeef' || color.startsWith('#f') || color === '#fff'
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '26px',
      height: '26px',
      borderRadius: '5px',
      background: color,
      color: isLight ? FG : '#fff',
      fontSize: '11px',
      fontWeight: 700,
      fontFamily: FONT_MONO,
      flexShrink: 0,
      border: isLight ? `1px solid ${BORDER}` : 'none',
    }}>
      {initial}
    </span>
  )
}

export default function Home() {
  const { personalInfo, experiences, awards, personalProjects, clientProjects } = resumeData
  const allProjects = [
    ...personalProjects.map(p => ({ ...p, tag: 'Personal' })),
    ...clientProjects.map(p => ({ ...p, tag: 'Client' })),
  ]

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      maxWidth: '900px',
      margin: '0 auto',
      padding: '0 28px',
      fontFamily: FONT_SANS,
      background: '#fff',
    }}>

      {/* ─── LEFT SIDEBAR ─── */}
      <motion.aside
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          width: '160px',
          flexShrink: 0,
          position: 'sticky',
          top: 0,
          height: '100vh',
          paddingTop: '48px',
          paddingRight: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        {/* Avatar */}
        <div style={{ marginBottom: '32px' }}>
          <Image
            src={personalInfo.profileImage}
            alt={personalInfo.name}
            width={80}
            height={80}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              objectFit: 'cover',
              display: 'block',
            }}
            priority
          />
        </div>

        {/* Nav */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {navLinks.map(link => (
            <NavLink key={link.label} {...link} />
          ))}
        </nav>
      </motion.aside>

      {/* ─── MAIN CONTENT ─── */}
      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        style={{
          flex: 1,
          paddingTop: '48px',
          paddingBottom: '80px',
          paddingLeft: '40px',
          borderLeft: `1px solid ${BORDER}`,
          minWidth: 0,
        }}
      >

        {/* ── Name & Bio ── */}
        <section style={{ marginBottom: '28px' }}>
          <h1 style={{
            fontSize: '21px',
            fontWeight: 600,
            color: FG,
            fontFamily: FONT_SANS,
            letterSpacing: '-0.02em',
            marginBottom: '10px',
            lineHeight: 1.25,
          }}>
            {personalInfo.name}
          </h1>

          {personalInfo.description.map((p, i) => (
            <p key={i} style={{
              fontSize: '13.5px',
              color: FG_MUTED,
              lineHeight: '1.7',
              maxWidth: '520px',
              marginBottom: '0',
              fontFamily: FONT_SANS,
            }}>
              {p}
            </p>
          ))}
        </section>

        {/* ── Download PDF button ── */}
        <section style={{ marginBottom: '36px' }}>
          <a
            href="https://www.adithyakrishnan.com/Resume_Adithya_Krishnan.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              border: `1px solid ${BORDER}`,
              borderRadius: '7px',
              padding: '7px 14px',
              fontSize: '13px',
              color: FG_MUTED,
              background: '#fff',
              fontFamily: FONT_SANS,
              cursor: 'pointer',
              transition: 'border-color 0.15s, color 0.15s',
              textDecoration: 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = FG_SUBTLE
              e.currentTarget.style.color = FG
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = BORDER
              e.currentTarget.style.color = FG_MUTED
            }}
          >
            <span style={{ fontSize: '13px' }}>⬇</span>
            Download PDF
          </a>
        </section>

        {/* ── Contact ── */}
        <section style={{ marginBottom: '40px' }}>
          <SectionTitle>Contact</SectionTitle>
          <div>
            {contactItems.map((item, i) => (
              <div
                key={item.label}
                style={{
                  display: 'flex',
                  gap: '40px',
                  padding: '10px 0',
                  borderTop: i === 0 ? `1px solid ${BORDER}` : 'none',
                  borderBottom: `1px solid ${BORDER}`,
                  alignItems: 'baseline',
                }}
              >
                <span style={{
                  fontSize: '13px',
                  color: ACCENT,
                  width: '72px',
                  flexShrink: 0,
                  fontFamily: FONT_SANS,
                }}>
                  {item.label}
                </span>
                <a
                  href={item.href}
                  target={item.href.startsWith('mailto') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '13.5px',
                    color: FG,
                    fontFamily: FONT_SANS,
                    transition: 'color 0.15s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = ACCENT}
                  onMouseLeave={e => e.currentTarget.style.color = FG}
                >
                  {item.value}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ── Work Experience ── */}
        <section id="experience" style={{ marginBottom: '40px' }}>
          <SectionTitle>Work Experience</SectionTitle>
          <div>
            {experiences.map((exp, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 0',
                  borderBottom: i < experiences.length - 1 ? `1px solid ${BORDER}` : 'none',
                }}
              >
                <LogoBadge initial={exp.logoInitial ?? exp.company[0]} color={exp.logoColor ?? '#333'} />

                <span style={{
                  fontSize: '13.5px',
                  fontWeight: 500,
                  color: FG,
                  fontFamily: FONT_SANS,
                  minWidth: '130px',
                  whiteSpace: 'nowrap',
                }}>
                  {exp.company}
                  <sup style={{ fontSize: '9px', color: FG_SUBTLE, marginLeft: '2px' }}>↗</sup>
                </span>

                <span style={{
                  fontSize: '13.5px',
                  color: FG_MUTED,
                  fontFamily: FONT_SANS,
                  flex: 1,
                }}>
                  {exp.title}
                </span>

                <span style={{
                  fontFamily: FONT_MONO,
                  fontSize: '11.5px',
                  color: FG_SUBTLE,
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.02em',
                }}>
                  {exp.period}
                </span>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── Projects ── */}
        <section id="work" style={{ marginBottom: '40px' }}>
          <SectionTitle>Projects</SectionTitle>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
            gap: '1px',
            background: BORDER,
            border: `1px solid ${BORDER}`,
            borderRadius: '8px',
            overflow: 'hidden',
          }}>
            {allProjects.map((project) => (
              <a
                key={project.title}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#fff',
                  padding: '14px 16px',
                  display: 'block',
                  textDecoration: 'none',
                  transition: 'background 0.12s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#f9f9f7')}
                onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '6px',
                }}>
                  <span style={{
                    fontFamily: FONT_MONO,
                    fontSize: '9px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase' as const,
                    color: FG_SUBTLE,
                  }}>
                    {project.tag}
                  </span>
                  <span style={{ color: FG_SUBTLE, fontSize: '11px' }}>↗</span>
                </div>
                <div style={{ fontSize: '13px', fontWeight: 500, color: FG, marginBottom: '3px', fontFamily: FONT_SANS }}>
                  {project.title}
                </div>
                <div style={{ fontSize: '12px', color: FG_MUTED, lineHeight: '1.5', fontFamily: FONT_SANS }}>
                  {project.description}
                </div>
              </a>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── Awards / Recognition ── */}
        <section id="awards" style={{ marginBottom: '40px' }}>
          <SectionTitle>Recognition</SectionTitle>
          <div>
            {awards.map((award, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '10px 0',
                  borderBottom: i < awards.length - 1 ? `1px solid ${BORDER}` : 'none',
                }}
              >
                <span style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  background: BORDER,
                  flexShrink: 0,
                  marginTop: '7px',
                  display: 'inline-block',
                }} />
                <div>
                  <p style={{ fontSize: '13.5px', fontWeight: 500, color: FG, marginBottom: '2px', fontFamily: FONT_SANS }}>
                    {award.title}
                  </p>
                  <p style={{ fontSize: '12px', color: FG_SUBTLE, fontFamily: FONT_MONO, letterSpacing: '0.02em' }}>
                    {award.organization}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Footer ── */}
        <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: '20px', marginTop: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: '8px' }}>
          <span style={{ fontFamily: FONT_MONO, fontSize: '11px', color: FG_SUBTLE }}>
            © {new Date().getFullYear()} Adithya Krishnan
          </span>
          <a
            href="https://www.adithyakrishnan.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: FONT_MONO, fontSize: '11px', color: FG_SUBTLE, textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.color = FG}
            onMouseLeave={e => e.currentTarget.style.color = FG_SUBTLE}
          >
            adithyakrishnan.com ↗
          </a>
        </div>

      </motion.main>
    </div>
  )
}