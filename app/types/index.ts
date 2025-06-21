export interface PersonalInfo {
  name: string
  title: string
  description: string[]
  profileImage: string
}

export interface SocialLink {
  href: string
  text: string
  external?: boolean
}

export interface Project {
  title: string
  description: string
  url: string
}

export interface Experience {
  title: string
  period: string
  description: string
}

export interface Award {
  title: string
  organization: string
}

export interface ResumeData {
  personalInfo: PersonalInfo
  socialLinks: SocialLink[]
  personalProjects: Project[]
  clientProjects: Project[]
  experiences: Experience[]
  awards: Award[]
}