import { ResumeData } from "../types";

export const resumeData: ResumeData = {
  personalInfo: {
    name: "Adithya Krishnan",
    title: "Adithya Krishnan.",
    description: [
      "Software engineer crafting exceptional digital experiences. Specialized in full-stack development, cloud architecture, and modern web technologies. I love to build with code — it's how I ship fast, test ideas early, and deliver with confidence.",
    ],
    profileImage: "/dp.png",
  },
  socialLinks: [
    {
      href: "https://www.adithyakrishnan.com/Resume%20Adithya%20Krishnan.pdf",
      text: "Resume",
      external: true,
    },
    {
      href: "https://github.com/fal3n-4ngel",
      text: "GitHub",
      external: true,
    },
    {
      href: "https://www.linkedin.com/in/fal3n-4ngel",
      text: "LinkedIn",
      external: true,
    },
    {
      href: "mailto:hello@adithyakrishnan.com",
      text: "Email",
      external: false,
    },
    {
      href: "https://www.adithyakrishnan.com",
      text: "View Portfolio",
      external: true,
    },
  ],
  personalProjects: [
    {
      title: "Continuum-Home",
      description: "Personal dashboard for watchlists, expense tracking, books, and notes.",
      url: "https://github.com/fal3n-4ngel/Continuum-Home",
    },
    {
      title: "Monolith",
      description: "Central domain-event ingest service built with Java 21 & Spring Boot.",
      url: "https://github.com/fal3n-4ngel/Monolith",
    },
    {
      title: "Dash-Desktop",
      description: "Peer-to-peer serverless hosting with AI task scheduling.",
      url: "https://dash-webpage.vercel.app/",
    },
    {
      title: "Flash Drive",
      description: "AI image generator with custom Stable Diffusion model.",
      url: "https://flashdrive-f2an.vercel.app/",
    },
    {
      title: "Tuples",
      description: "Social platform with AI-powered recommendations.",
      url: "https://github.com/Chackoz/Tuples",
    },
    {
      title: "Smart-Certify",
      description: "Blockchain certificate verification system.",
      url: "https://github.com/Deflated-Pappadam/Smart-Certify",
    },
  ],
  clientProjects: [
    {
      title: "Define3",
      description: "A 24hr Hackathon by CS department of MBCET.",
      url: "https://define25.vercel.app/",
    },
    {
      title: "Ayada Cliff",
      description: "Luxury resort website with immersive design.",
      url: "https://www.ayadacliff.com/",
    },
    {
      title: "Blossom Flora",
      description: "Elegant floral business with responsive interface.",
      url: "https://www.blossomflora.in/",
    }
  ],
  experiences: [
    {
      title: "Software Engineer",
      company: "Equifax",
      period: "Feb 2025 – Present",
      description:
        "Building scalable data platforms and backend services. Working on full-stack solutions using Java, Spring Boot, and modern cloud infrastructure to enhance credit data systems.",
      logoColor: "#C8102E",
      logoInitial: "E",
      logoUrl: "/equifax.png",
    },
    {
      title: "Software Engineer Intern",
      company: "Nissan Digital LLP",
      period: "July 2024 – Dec 2024",
      description:
        "Engineered RESTful APIs using .NET (C#) for migrating desktop applications to web-based solutions. Developed responsive Angular interfaces with seamless backend integration.",
      logoColor: "#f3eeef",
      logoInitial: "N",
      logoUrl: "/nissan2.png",
    },
    {
      title: "Developer Intern",
      company: "Oronium",
      period: "April 2024 – July 2024",
      description:
        "Built and maintained a cloud management web application using Next.js and Tailwind CSS. Implemented responsive, intuitive user interfaces.",
      logoColor: "#4F46E5",
      logoInitial: "O",
      logoUrl: "/oronium.png",
    },
  ],
  awards: [
    {
      title: "Web3 for India 2023 Winner",
      organization: "BlockHash - Kerala Blockchain Academy",
    },
    {
      title: "Best Frontend Design & First Runner Up",
      organization: "CodeCrypt Hackathon — CUSAT, 2023",
    },
    {
      title: "Associate Cloud Engineer",
      organization: "Google Cloud Certified, Nov 2025",
    },
  ],
};
