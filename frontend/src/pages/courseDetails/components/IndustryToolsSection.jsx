import React from "react";
import { motion } from "framer-motion";
import { Monitor, Layers, Rocket, Award } from "lucide-react";
import "./IndustryToolsSection.css";

// 4 Universal Standard Tools & Normal Signs (Uniform for every course at ThirdEye)
const UNIVERSAL_STANDARD_TOOLS = [
  {
    id: "workstation",
    name: "Dedicated Workstations",
    icon: <Monitor size={46} strokeWidth={1.8} color="#f6d96b" />,
    glowColor: "rgba(246, 217, 107, 0.32)",
  },
  {
    id: "software",
    name: "Licensed Pro Suites",
    icon: <Layers size={46} strokeWidth={1.8} color="#f6d96b" />,
    glowColor: "rgba(246, 217, 107, 0.32)",
  },
  {
    id: "projects",
    name: "Live Practical Projects",
    icon: <Rocket size={46} strokeWidth={1.8} color="#f6d96b" />,
    glowColor: "rgba(246, 217, 107, 0.32)",
  },
  {
    id: "certification",
    name: "Govt & ISO Certification",
    icon: <Award size={46} strokeWidth={1.8} color="#f6d96b" />,
    glowColor: "rgba(246, 217, 107, 0.32)",
  },
];

export default function IndustryToolsSection({
  title = "Industry Tools & Standards You'll Master",
  badge = "INDUSTRY ECOSYSTEM",
  containerTitle = "CORE TOOLS & INDUSTRY ECOSYSTEM",
  _tools = null,
}) {
  // Enforce the 4 universal normal signs so they are consistent across every course
  const displayTools = UNIVERSAL_STANDARD_TOOLS;

  return (
    <section className="industry-tools-section">
      <div className="industry-tools-wrapper">
        
        {/* Ambient Glow */}
        <div className="industry-tools-glow" />

        {/* Section Header */}
        <div className="industry-tools-header">
          <motion.div
            className="industry-tools-badge"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span>{badge}</span>
          </motion.div>

          <motion.h2
            className="industry-tools-title"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {title}
          </motion.h2>
        </div>

        {/* Outer Container Box for Tools */}
        <motion.div
          className="industry-tools-box"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Inner Header: CORE TOOLS & INDUSTRY ECOSYSTEM */}
          <div className="industry-tools-box-title">
            <span>{containerTitle}</span>
          </div>

          {/* Exactly 4 Cards Grid */}
          <div className="industry-tools-grid">
            {displayTools.map((tool, idx) => {
              const glow = tool.glowColor || "rgba(246, 217, 107, 0.28)";

              return (
                <motion.div
                  key={tool.id || `tool-${idx}`}
                  className="industry-tool-card"
                  whileHover={{ y: -6, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                >
                  {/* Tool Icon with Ambient Glow */}
                  <div className="industry-tool-icon-wrap" style={{ "--glow-color": glow }}>
                    <div className="industry-tool-icon-aura" />
                    <div className="industry-tool-svg">{tool.icon}</div>
                  </div>

                  {/* Tool Name */}
                  <span className="industry-tool-name">{tool.name}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
