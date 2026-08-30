"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/app/data/resume-data";
import { itemVariants, sectionVariants } from "@/app/lib/animations";

export default function AwardsSection() {
  const { awards } = resumeData;

  return (
    <motion.div variants={sectionVariants}>
      <h2 className="cv-section-title">Recognition</h2>

      <div>
        {awards.map((award, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="award-row"
          >
            <span className="award-dot" />
            <div>
              <p style={{ fontSize: "13.5px", fontWeight: 500, color: "var(--fg)", marginBottom: "2px" }}>
                {award.title}
              </p>
              <p style={{ fontSize: "12px", color: "var(--fg-subtle)", fontFamily: "var(--font-mono)", letterSpacing: "0.02em" }}>
                {award.organization}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
