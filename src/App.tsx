import React from "react";
import { motion } from "framer-motion";
import { CustomCursor } from "@/components/atoms";
import { HeroSection, StickyTimeline } from "@/components/organisms";
import { ProjectCard, GitHubRepoCard, FormField } from "@/components/molecules";
import { NeonButton, NeonBadge } from "@/components/atoms";
import { useGitHub } from "@/hooks/useGitHub";
import {
  EXPERIENCES,
  PROJECTS,
  GITHUB_USERNAME,
  SKILLS_BY_CATEGORY,
} from "@/data/constants";
import { useState, useCallback } from "react";
import type { ContactFormData, ContactFormErrors } from "@/types";
import "./index.css";

function App() {
  const { repos, loading: githubLoading } = useGitHub(GITHUB_USERNAME, {
    sort: "stars",
    per_page: 6,
  });

  // Contact form state
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validateField = useCallback(
    (field: keyof ContactFormData, value: string): string => {
      if (field === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? "Invalid email format" : "";
      }
      if (field === "name" && value.length < 2) {
        return "Name must be at least 2 characters";
      }
      if (field === "message" && value.length < 10) {
        return "Message must be at least 10 characters";
      }
      return "";
    },
    [],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      const field = name as keyof ContactFormData;

      setFormData((prev) => ({ ...prev, [field]: value }));

      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    },
    [validateField],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const newErrors: ContactFormErrors = {};
      let isValid = true;

      (Object.keys(formData) as Array<keyof ContactFormData>).forEach((key) => {
        const error = validateField(key, formData[key]);
        if (error) {
          newErrors[key] = error;
          isValid = false;
        }
      });

      setErrors(newErrors);

      if (isValid) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ name: "", email: "", message: "" });
        }, 3000);
      }
    },
    [formData, validateField],
  );

  return (
    <div className="min-h-screen bg-deep-slate text-white overflow-x-hidden">
      <CustomCursor />

      {/* Hero */}
      <HeroSection />

      {/* About Section */}
      <section className="relative py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl lg:text-6xl font-black mb-12 text-center">
              <span className="bg-gradient-to-r from-neon-cyan to-electric-indigo bg-clip-text text-transparent">
                About Me
              </span>
            </h2>

            <div className="backdrop-blur-glass bg-glass-white border border-neon-cyan/20 rounded-2xl p-8 lg:p-12">
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                I am a B.Tech graduate in Information Technology from{" "}
                <span className="text-neon-cyan font-semibold">
                  CHARUSAT University
                </span>
                , with a strong foundation in computer science fundamentals and
                a growing passion for building real-world web applications.
                During my academic journey, I developed a keen interest in
                frontend and full-stack development, which led me to focus on
                modern JavaScript technologies.
              </p>

              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                I am currently working as a Junior Full Stack Developer at{" "}
                <span className="text-electric-indigo font-semibold">
                  ThinkBiz Technologies Private Ltd.
                </span>
                , where I contribute to large-scale enterprise web applications.
                My role involves working across frontend and backend layers,
                understanding complex systems, debugging production issues, and
                implementing feature enhancements in existing platforms.
              </p>

              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                I enjoy writing clean, maintainable code using TypeScript,
                building intuitive user interfaces with React, and continuously
                improving my understanding of backend development, APIs, and
                system-level workflows. I believe in steady, hands-on learning
                and take pride in growing through real project experience.
              </p>

              {/* Skills grid */}
              <div className="space-y-6">
                {Object.entries(SKILLS_BY_CATEGORY).map(
                  ([category, skills], categoryIndex) => (
                    <div key={category}>
                      <h4 className="text-sm text-slate-400 font-mono mb-3 uppercase tracking-wider">
                        {category}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                          <NeonBadge
                            variant={
                              categoryIndex % 2 === 0 ? "cyan" : "indigo"
                            }
                          >
                            {skill}
                          </NeonBadge>
                        ))}
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Timeline */}
      <StickyTimeline experiences={EXPERIENCES} />

      {/* Projects Section */}
      <section id="projects" className="relative py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl lg:text-6xl font-black mb-16 text-center">
              <span className="bg-gradient-to-r from-neon-cyan to-electric-indigo bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PROJECTS.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* GitHub Section */}
      <section className="relative py-24 px-6 bg-deep-slate/50">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl lg:text-6xl font-black mb-16 text-center">
              <span className="bg-gradient-to-r from-neon-cyan to-electric-indigo bg-clip-text text-transparent">
                GitHub Repositories
              </span>
            </h2>

            {githubLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="w-16 h-16 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {repos.map((repo, index) => (
                    <GitHubRepoCard key={repo.id} repo={repo} index={index} />
                  ))}
                </div>

                <div className="text-center">
                  <NeonButton
                    as="a"
                    href={`https://github.com/${GITHUB_USERNAME}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="ghost"
                    size="lg"
                  >
                    <span className="flex items-center gap-2">
                      View All Repositories
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
                    </span>
                  </NeonButton>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl lg:text-6xl font-black mb-16 text-center">
              <span className="bg-gradient-to-r from-neon-cyan to-electric-indigo bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h2>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <FormField
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                />

                <FormField
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                />

                <FormField
                  name="message"
                  type="textarea"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  error={errors.message}
                  rows={5}
                />

                <NeonButton type="submit" variant="primary" size="lg" fullWidth>
                  {submitted ? "✓ Message Sent!" : "Send Message"}
                </NeonButton>
              </form>

              {/* Social links */}
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-6 text-neon-cyan">
                  Connect With Me
                </h3>

                <div className="space-y-4">
                  <motion.a
                    href="https://linkedin.com/in/chauhandishant"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg backdrop-blur-glass bg-glass-white border border-neon-cyan/20 hover:border-neon-cyan/50 transition-all group cursor-pointer"
                    whileHover={{ x: 10 }}
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-indigo flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-white group-hover:text-neon-cyan transition-colors">
                        LinkedIn
                      </p>
                      <p className="text-sm text-slate-400">
                        Professional Network
                      </p>
                    </div>
                  </motion.a>

                  <motion.a
                    href={`https://github.com/${GITHUB_USERNAME}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg backdrop-blur-glass bg-glass-white border border-neon-cyan/20 hover:border-neon-cyan/50 transition-all group cursor-pointer"
                    whileHover={{ x: 10 }}
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-white group-hover:text-neon-cyan transition-colors">
                        GitHub
                      </p>
                      <p className="text-sm text-slate-400">Code Repository</p>
                    </div>
                  </motion.a>

                  <div className="flex items-center gap-4 p-4 rounded-lg backdrop-blur-glass bg-glass-white border border-neon-cyan/20">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-neon-indigo to-electric-indigo flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-white"
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
                    </div>
                    <div>
                      <p className="font-bold text-white">Location</p>
                      <p className="text-sm text-slate-400">
                        Savarkundla, Gujarat, India
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-neon-cyan/20">
        <div className="container mx-auto text-center">
          <p className="text-slate-400 mb-4">
            Designed and built with passion by Dishant Chauhan
          </p>
          <p className="text-sm text-slate-500 font-mono">
            © 2026 All rights reserved • Powered by React + TypeScript +
            Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
