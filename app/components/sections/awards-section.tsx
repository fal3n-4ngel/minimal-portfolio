"use client";

import { motion } from "framer-motion";
import SectionHeader from "../ui/section-header";
import { resumeData } from "@/app/data/resume-data";
import { itemVariants, sectionVariants } from "@/app/lib/animations";

export default function AwardsSection() {
  const { awards } = resumeData;

  return (
    <motion.section className="mb-16" variants={sectionVariants}>
      <SectionHeader>Awards.</SectionHeader>

      <div className="space-y-4">
        {awards.map((award, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <h3 className="text-neutral-900 font-medium text-sm mb-1">
              {award.title}
            </h3>
            <p className="text-neutral-500 text-sm">{award.organization}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
