// Core type definitions for the portfolio

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  startDate: string;
  endDate: string | null;
  type: 'current' | 'internship';
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  featured: boolean;
  icon: string;
  link?: string;
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: React.ReactNode;
  description: string;
}

export interface AnimationVariant {
  hidden: Record<string, unknown>;
  visible: Record<string, unknown>;
  [key: string]: unknown;
}

export interface CursorPosition {
  x: number;
  y: number;
}

export interface TiltState {
  x: number;
  y: number;
}

export interface ScrollProgress {
  scrollY: number;
  scrollYProgress: number;
}
