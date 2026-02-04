import React, { useState, useCallback, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { GitHubRepository } from '@/types';
import { NeonBadge } from '@/components/atoms';
import { fadeInUp } from '@/utils/helpers';

interface GitHubRepoCardProps {
  repo: GitHubRepository;
  index: number;
}

/**
 * GitHub repository card with 3D tilt effect and dynamic spotlight
 */
export const GitHubRepoCard = React.memo<GitHubRepoCardProps>(({ repo, index }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  return (
    <motion.a
      ref={ref}
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block p-6 rounded-xl backdrop-blur-glass bg-glass-white border border-neon-cyan/20 hover:border-neon-cyan/50 transition-all duration-300 overflow-hidden cursor-pointer"
      variants={fadeInUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        y: -8,
        rotateX: 5,
        rotateY: 5,
        transition: { duration: 0.3 },
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      {/* Dynamic spotlight effect */}
      {isHovering && (
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 200,
            height: 200,
            left: mousePosition.x - 100,
            top: mousePosition.y - 100,
            background:
              'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/0 to-neon-indigo/0 group-hover:from-neon-cyan/10 group-hover:to-neon-indigo/10 transition-all duration-500" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-neon-cyan group-hover:text-white transition-colors flex items-center gap-2">
            <svg
              className="w-5 h-5 opacity-70"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z" />
            </svg>
            {repo.name}
          </h3>

          {/* Stars */}
          <div className="flex items-center gap-1 text-yellow-400">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-mono">{repo.stargazers_count}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-300 text-sm mb-4 line-clamp-2 min-h-[40px]">
          {repo.description || 'No description available'}
        </p>

        {/* Footer */}
        <div className="flex items-center gap-4 text-xs text-slate-400">
          {repo.language && (
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-neon-cyan" />
              <span className="font-mono">{repo.language}</span>
            </span>
          )}
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <span className="font-mono">{repo.forks_count}</span>
          </span>
        </div>

        {/* Topics/Tags */}
        {repo.topics && repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {repo.topics.slice(0, 3).map((topic) => (
              <NeonBadge key={topic} variant="indigo" size="sm">
                {topic}
              </NeonBadge>
            ))}
          </div>
        )}
      </div>
    </motion.a>
  );
});

GitHubRepoCard.displayName = 'GitHubRepoCard';
