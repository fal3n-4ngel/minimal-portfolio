"use client";

import { ibmPlexSans } from "@/app/fonts";
import { projectVariants } from "@/app/lib/animations";
import { Project } from "@/app/types";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const handleClick = () => {
    window.open(project.url, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      className={`cursor-pointer p-2  rounded-lg  ${ibmPlexSans.className}  transition-all group`}
      variants={projectVariants}
      whileHover={{
        backgroundColor: "#fdfdfd",
        transition: { duration: 0.2 },
      }}
      onClick={handleClick}
    >
      <h3 className="text-neutral-900 font-medium text-sm mb-2 group-hover:underline underline-offset-2">
        {project.title}
      </h3>
      <p className="text-neutral-600 text-sm leading-relaxed">
        {project.description}
      </p>
    </motion.div>
  );
}
