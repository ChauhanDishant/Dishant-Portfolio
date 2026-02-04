import React, { useState, useCallback, useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Project } from "@/types";
import { NeonBadge, NeonButton } from "@/components/atoms";
import { scaleIn } from "@/utils/helpers";

interface ProjectCardProps {
  project: Project;
  index: number;
}

/**
 * Project card with 3D tilt, spotlight effect, and featured badge
 */
export const ProjectCard = React.memo<ProjectCardProps>(
  ({ project, index }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setMousePosition({ x, y });
      },
      [],
    );

    return (
      <motion.div
        ref={ref}
        className="group relative rounded-xl overflow-hidden backdrop-blur-glass bg-glass-white border border-neon-cyan/20 hover:border-neon-cyan/50 transition-all duration-300 cursor-pointer h-full"
        variants={scaleIn}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        whileHover={{
          y: -8,
          rotateX: 2,
          rotateY: 2,
          transition: { duration: 0.3 },
        }}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        {/* Dynamic spotlight */}
        {isHovering && (
          <motion.div
            className="absolute rounded-full pointer-events-none z-10"
            style={{
              width: 300,
              height: 300,
              left: mousePosition.x - 150,
              top: mousePosition.y - 150,
              background:
                "radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}

        {/* Project preview area */}
        <div className="relative h-56 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/20 to-neon-indigo/20 group-hover:opacity-50 transition-opacity" />

          {/* Icon/Image */}
          <div className="absolute inset-0 flex items-center justify-center text-7xl">
            {project.icon}
          </div>

          {/* Featured badge */}
          {project.featured && (
            <motion.div
              className="absolute top-4 right-4 px-4 py-2 rounded-full bg-gradient-to-r from-neon-cyan to-neon-indigo text-white text-xs font-bold uppercase tracking-wider"
              initial={{ scale: 0, rotate: -12 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 500 }}
            >
              ★ Featured
            </motion.div>
          )}

          {/* Animated grid overlay */}
          <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  "linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 relative z-10 w-full h-full flex flex-col">
          <h3 className="text-2xl font-bold text-neon-cyan mb-2 group-hover:text-white transition-colors">
            {project.title}
          </h3>

          <p className="text-slate-300 mb-4 leading-relaxed">
            {project.description}
          </p>

          {/* Tech stack badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, i) => (
              <NeonBadge
                key={i}
                variant={i % 2 === 0 ? "cyan" : "indigo"}
                size="sm"
              >
                {tech}
              </NeonBadge>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            {project.link && (
              <NeonButton
                as="a"
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="sm"
                className="flex-1"
              >
                <span className="flex items-center justify-center gap-2">
                  View Project
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </span>
              </NeonButton>
            )}

            {project.githubUrl && (
              <NeonButton
                as="a"
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                size="sm"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </NeonButton>
            )}
          </div>
        </div>
      </motion.div>
    );
  },
);

ProjectCard.displayName = "ProjectCard";
