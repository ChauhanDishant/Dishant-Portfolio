import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Experience } from "@/types";
import { NeonBadge } from "@/components/atoms";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { fadeInLeft } from "@/utils/helpers";
import "./../../styles/main.css";

interface TimelineItemProps {
  experience: Experience;
  index: number;
}

const TimelineItem = React.memo<TimelineItemProps>(({ experience, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="relative pl-12 pb-16 last:pb-0"
      variants={fadeInLeft}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay: index * 0.2, duration: 0.6 }}
    >
      {/* Timeline dot with pulse */}
      <motion.div
        className="absolute left-0 top-2 w-4 h-4 -ml-2 rounded-full bg-neon-cyan z-10"
        animate={{
          boxShadow: [
            "0 0 0 0 rgba(6, 182, 212, 0.7)",
            "0 0 0 12px rgba(6, 182, 212, 0)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: index * 0.3,
        }}
      />

      {/* Card */}
      <div className="backdrop-blur-glass bg-glass-white border border-neon-cyan/20 rounded-xl p-6 hover:border-neon-cyan/50 transition-all duration-300 group">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-3">
          <div>
            <h3 className="text-2xl font-bold text-neon-cyan group-hover:text-white transition-colors">
              {experience.title}
            </h3>
            <p className="text-electric-indigo text-lg mt-1">
              {experience.company}
            </p>
            <p className="text-slate-400 text-sm mt-1 flex items-center gap-2">
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
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {experience.location}
            </p>
          </div>
          <span className="text-slate-400 font-mono text-sm whitespace-nowrap px-3 py-1 rounded-full bg-neon-indigo/10 border border-neon-indigo/30">
            {experience.period}
          </span>
        </div>

        <p className="text-slate-300 mb-4 leading-relaxed">
          {experience.description}
        </p>

        {/* Highlights */}
        <ul className="space-y-3 mb-4">
          {experience.highlights.map((highlight, i) => (
            <motion.li
              key={i}
              className="flex items-start gap-3 text-slate-400"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.2 + i * 0.1 }}
            >
              <span className="text-neon-cyan mt-1 flex-shrink-0">▹</span>
              <span className="leading-relaxed">{highlight}</span>
            </motion.li>
          ))}
        </ul>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {experience.technologies.map((tech, i) => (
            <NeonBadge
              key={i}
              variant={i % 2 === 0 ? "cyan" : "indigo"}
              size="sm"
            >
              {tech}
            </NeonBadge>
          ))}
        </div>
      </div>
    </motion.div>
  );
});

TimelineItem.displayName = "TimelineItem";

interface StickyTimelineProps {
  experiences: Experience[];
}

/**
 * Sticky timeline with scroll progress indicator and fixed height scrollable container
 */
export const StickyTimeline = React.memo<StickyTimelineProps>(
  ({ experiences }) => {
    const timelineRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScrollProgress({ target: timelineRef });

    return (
      <section className="relative py-24 px-6 bg-deep-slate/50">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl lg:text-6xl font-black mb-16 text-center">
              <span className="bg-gradient-to-r from-neon-cyan via-electric-indigo to-neon-cyan bg-clip-text text-transparent">
                Experience Timeline
              </span>
            </h2>

            {/* Scrollable Timeline Container with Fixed Height */}
            <div className="relative">
              {/* Container with fixed height and custom scrollbar */}
              <div
                ref={timelineRef}
                className="relative max-h-[600px] overflow-y-auto pr-4 scroll-smooth scrollbar-hidden"
              >
                {/* Timeline line */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-700 to-transparent" />

                {/* Progress indicator */}
                <motion.div
                  className="absolute left-0 top-0 w-px bg-gradient-to-b from-neon-cyan via-electric-indigo to-neon-indigo origin-top"
                  style={{
                    scaleY: scrollYProgress,
                  }}
                />

                {/* Timeline items */}
                <div className="space-y-0">
                  {experiences.map((exp, index) => (
                    <TimelineItem key={exp.id} experience={exp} index={index} />
                  ))}
                </div>
              </div>

              {/* Scroll indicators - Top gradient fade */}
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-deep-slate/50 to-transparent pointer-events-none z-20" />

              {/* Scroll indicators - Bottom gradient fade */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-deep-slate/50 to-transparent pointer-events-none z-20" />

              {/* Scroll hint - appears when content is scrollable */}
              {experiences.length > 3 && (
                <motion.div
                  className="absolute bottom-4 right-8 flex items-center gap-2 text-neon-cyan text-sm font-mono z-30"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span>Scroll for more</span>
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
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Custom scrollbar styles - Add to your global CSS */}
        <style>{`
          /* Custom scrollbar for WebKit browsers (Chrome, Safari, Edge) */
          div::-webkit-scrollbar {
            width: 8px;
          }

          div::-webkit-scrollbar-track {
            background: transparent;
          }

          div::-webkit-scrollbar-thumb {
            background: rgba(6, 182, 212, 0.3);
            border-radius: 4px;
          }

          div::-webkit-scrollbar-thumb:hover {
            background: rgba(6, 182, 212, 0.5);
          }
        `}</style>
      </section>
    );
  },
);

StickyTimeline.displayName = "StickyTimeline";
