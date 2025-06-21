import { ResumeData } from "../types";


export const resumeData: ResumeData = {
  personalInfo: {
    name: "Adithya Krishnan",
    title: "Hello, I'm Adithya Krishnan",
    description: [
      "Software developer focused on building scalable web applications and distributed systems. I work with modern technologies to create efficient solutions for complex problems.",
      "Currently exploring peer-to-peer architectures, blockchain applications, and AI-powered platforms while contributing to open-source projects."
    ],
    profileImage: "/dp.png"
  },
  socialLinks: [
    { 
      href: 'https://www.adithyakrishnan.com/Resume%20Adithya%20Krishnan.pdf', 
      text: 'Resume',
      external: true
    },
    { 
      href: 'https://github.com/fal3n-4ngel', 
      text: 'GitHub',
      external: true
    },
    { 
      href: 'https://www.linkedin.com/in/fal3n-4ngel', 
      text: 'LinkedIn',
      external: true
    },
    { 
      href: 'mailto:hello@adithyakrishnan.com', 
      text: 'Email',
      external: false
    },
    { 
      href: 'https://www.adithyakrishnan.com', 
      text: 'View Portfolio',
      external: true
    },
  ],
  personalProjects: [
    {
      title: 'Dash-Desktop',
      description: 'Peer-to-peer serverless hosting with AI task scheduling.',
      url: 'https://dash-webpage.vercel.app/',
    },
    {
      title: 'Flash Drive',
      description: 'AI image generator with custom Stable Diffusion model.',
      url: 'https://flashdrive-f2an.vercel.app/',
    },
    {
      title: 'Tuples',
      description: 'Social platform with AI-powered recommendations.',
      url: 'https://github.com/Chackoz/Tuples',
    },
    {
      title: 'Smart-Certify',
      description: 'Blockchain certificate verification system.',
      url: 'https://github.com/Deflated-Pappadam/Smart-Certify',
    },
  ],
  clientProjects: [
    {
      title: 'Define3',
      description: 'A 24hr Hackathon by CS department of MBCET.',
      url: 'https://www.define3.xyz/',
    },
    {
      title: 'Ayada Cliff',
      description: 'Luxury resort website with immersive design.',
      url: 'https://www.ayadacliff.com/',
    },
    {
      title: 'Blossom Flora',
      description: 'Elegant floral business with responsive interface.',
      url: 'https://www.blossomflora.in/',
    },
    {
      title: 'Gamior Interiors',
      description: 'Interior design portfolio showcasing premium work.',
      url: 'https://gamior.vercel.app/',
    },
  ],
  experiences: [
    {
      title: 'Software Developer Intern — Nissan Digital',
      period: 'July 2024 - Dec 2024',
      description: 'Engineered RESTful APIs using .NET (C#) for migrating desktop applications to web-based solutions. Developed responsive Angular interfaces with seamless backend integration.',
    },
    {
      title: 'Full Stack Developer Intern — Oronium',
      period: 'April 2024 - July 2024',
      description: 'Built and maintained a cloud management web application using Next.js and Tailwind CSS. Implemented responsive, intuitive user interfaces.',
    },
    {
      title: 'Google Cloud Facilitator — GDSC MBCET',
      period: 'Nov 2022 - Dec 2023',
      description: 'Earned Google Cloud certification while organizing cloud-focused events. Mentored participants in Google Cloud tools and solutions.',
    },
  ],
  awards: [
    {
      title: 'Web3 for India 2023 Winner',
      organization: 'BlockHash - Kerala Blockchain Academy',
    },
    {
      title: 'Best Frontend Design & First Runner Up',
      organization: 'CodeCrypt Hackathon — CUSAT, 2023',
    },
    {
      title: 'Cloud Digital Leader',
      organization: 'Google Cloud Certified, Nov 2022 - Nov 2025',
    },
  ],
}