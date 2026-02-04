import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HexagonalFrame, NeonButton } from "@/components/atoms";
import { fadeInUp, fadeInDown, staggerContainer } from "@/utils/helpers";
import "../../styles/main.css";

const PersonalPhoto = new URL(
  "../../assets/images/Personal Photo.jpeg",
  import.meta.url,
).href;

/**
 * Particle system for hero background
 */
const ParticleField: React.FC = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Particle[] = [];
    const particleCount = 100;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update(): void {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;
      }

      draw(): void {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${this.opacity})`;
        ctx.fill();
      }
    }

    const resize = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationFrameId: number;

    const animate = (): void => {
      ctx.fillStyle = "rgba(10, 10, 10, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
});

ParticleField.displayName = "ParticleField";

/**
 * Typing effect for role rotation
 */
const TypingEffect: React.FC<{ phrases: string[] }> = React.memo(
  ({ phrases }) => {
    const [currentPhrase, setCurrentPhrase] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
      const phrase = phrases[currentPhrase];
      let timeout: ReturnType<typeof setTimeout>;

      if (!isDeleting) {
        if (currentText.length < phrase.length) {
          timeout = setTimeout(() => {
            setCurrentText(phrase.slice(0, currentText.length + 1));
          }, 100);
        } else {
          timeout = setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentPhrase((prev) => (prev + 1) % phrases.length);
        } else {
          timeout = setTimeout(() => {
            setCurrentText(phrase.slice(0, currentText.length - 1));
          }, 50);
        }
      }

      return () => clearTimeout(timeout);
    }, [currentText, isDeleting, currentPhrase, phrases]);

    return (
      <span className="font-mono text-neon-cyan">
        {currentText}
        <motion.span
          className="text-electric-indigo"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          |
        </motion.span>
      </span>
    );
  },
);

TypingEffect.displayName = "TypingEffect";

/**
 * Hero section organism
 */
export const HeroSection: React.FC = React.memo(() => {
  const roles = [
    "Junior Full Stack Developer",
    "React & TypeScript Developer",
    "Node.js Developer",
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleField />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/20 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-indigo/20 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "3s" }}
      />

      <motion.div
        className="relative z-10 container mx-auto px-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Text content */}
          <motion.div
            variants={fadeInUp}
            className="flex-1 text-center lg:text-left max-w-2xl"
          >
            <motion.div
              className="inline-block mb-6 px-5 py-2.5 rounded-full backdrop-blur-glass bg-neon-cyan/10 border border-neon-cyan/30"
              variants={fadeInDown}
            >
              <span className="text-neon-cyan font-mono text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-neon-cyan rounded-full animate-glow-pulse" />
                Open to growth opportunities
              </span>
            </motion.div>

            <h1 className="text-6xl lg:text-8xl font-black mb-6 bg-gradient-to-r from-white via-neon-cyan to-electric-indigo bg-clip-text text-transparent leading-tight">
              Dishant Chauhan
            </h1>

            <div className="text-3xl lg:text-4xl text-slate-300 mb-8 h-16 flex items-center justify-center lg:justify-start">
              <TypingEffect phrases={roles} />
            </div>

            <p className="text-xl text-slate-400 mb-12 leading-relaxed">
              Building reliable and scalable web applications using modern
              frontend and backend technologies. Focused on clean code,
              real-world problem solving, and continuous learning through
              hands-on experience.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <NeonButton as="a" href="#contact" variant="primary" size="lg">
                Get In Touch
              </NeonButton>
              <NeonButton as="a" href="#projects" variant="ghost" size="lg">
                View Work
              </NeonButton>
            </div>
          </motion.div>

          {/* Holographic photo */}
          <motion.div variants={fadeInUp} transition={{ delay: 0.4 }}>
            <HexagonalFrame size={400} glowColor="gradient">
              <img
                src={PersonalPhoto}
                alt="Dishant Chauhan - Full Stack Developer"
                className="w-full h-full object-cover scale-10 image-position"
              />
            </HexagonalFrame>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-neon-cyan/50 flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 bg-neon-cyan rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";
