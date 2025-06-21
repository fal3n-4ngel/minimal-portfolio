import { Timestamp } from "firebase/firestore"

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

export // Types
interface Message {
  id: string;
  text: string;
  username: string;
  userId: string;
  timestamp: Timestamp | null;
}

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}