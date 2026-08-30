"use client";

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
      className="cursor-pointer py-2.5 px-0 border-b border-neutral-100 last:border-b-0 group"
      variants={projectVariants}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-neutral-800 font-medium text-sm group-hover:underline underline-offset-2 transition-all">
          {project.title}
        </h3>
        <span className="text-neutral-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          ↗
        </span>
      </div>
      <p className="text-neutral-500 text-xs leading-relaxed mt-0.5">
        {project.description}
      </p>
    </motion.div>
  );
}
