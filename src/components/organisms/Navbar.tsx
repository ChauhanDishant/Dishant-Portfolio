import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogoMark } from "@/components/atoms/LogoMark";
import { NavLink } from "@/components/molecules/NavLink";
import { NeonButton } from "@/components/atoms";
import { useActiveSection } from "@/hooks/useActiveSection";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const activeSection = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[9998] transition-all ${
        scrolled
          ? "backdrop-blur-xl bg-deep-slate/70 border-b border-neon-cyan/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <LogoMark />

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-10">
          <NavLink
            label="About"
            targetId="about"
            active={activeSection === "about"}
          />
          <NavLink
            label="Experience"
            targetId="experience"
            active={activeSection === "experience"}
          />
          <NavLink
            label="Projects"
            targetId="projects"
            active={activeSection === "projects"}
          />
          <NavLink
            label="Contact"
            targetId="contact"
            active={activeSection === "contact"}
          />
        </nav>

        <div className="hidden md:block">
          <NeonButton
            as="a"
            href="#contact"
            size="md"
            variant="ghost"
            className="px-5 py-2 border-neon-cyan/50 hover:border-neon-cyan"
          >
            Let’s Talk
          </NeonButton>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-neon-cyan"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-deep-slate/95 backdrop-blur-xl border-t border-neon-cyan/20"
          >
            <div className="px-6 py-6 flex flex-col gap-6">
              {["about", "experience", "projects", "contact"].map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className="text-lg text-slate-300 hover:text-neon-cyan"
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
