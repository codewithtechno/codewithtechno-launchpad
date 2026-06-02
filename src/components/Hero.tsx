import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import logo from "@/assets/logo.png";

const COMMUDLE_URL = "https://www.commudle.com/communities/codewithtechno";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute top-1/4 left-[10%] w-[500px] h-[500px] bg-brand-green/8 rounded-full blur-[100px] animate-pulse-soft" />
      <div className="absolute bottom-1/4 right-[10%] w-[600px] h-[600px] bg-brand-blue/8 rounded-full blur-[100px] animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-green/5 rounded-full blur-[120px]" />

      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '64px 64px'
      }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/80 backdrop-blur-sm border border-primary/15 mb-10"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm font-medium text-foreground/80">
              Execution-First Tech & Design Community
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 flex justify-center"
          >
            <div className="relative w-40 h-40 lg:w-48 lg:h-48 mx-auto flex items-center justify-center">
              {/* Animated radial glow halo */}
              <div
                className="absolute inset-0 rounded-full blur-2xl opacity-70"
                style={{
                  background: "radial-gradient(circle, hsl(var(--brand-green) / 0.55), hsl(var(--brand-blue) / 0.45) 50%, transparent 75%)",
                  animation: "pulse-soft 3.5s ease-in-out infinite",
                }}
              />
              {/* Rotating conic ring */}
              <div
                className="absolute inset-2 rounded-full opacity-80"
                style={{
                  background: "conic-gradient(from 0deg, transparent 0deg, hsl(var(--brand-green)) 90deg, transparent 180deg, hsl(var(--brand-blue)) 270deg, transparent 360deg)",
                  animation: "spin 8s linear infinite",
                  mask: "radial-gradient(circle, transparent 58%, black 60%, black 70%, transparent 72%)",
                  WebkitMask: "radial-gradient(circle, transparent 58%, black 60%, black 70%, transparent 72%)",
                }}
              />
              {/* Counter-rotating outer dotted ring */}
              <div
                className="absolute inset-0 rounded-full border-2 border-dashed border-primary/25"
                style={{ animation: "spin 20s linear infinite reverse" }}
              />
              {/* Orbiting accent dots */}
              <div className="absolute inset-0" style={{ animation: "spin 12s linear infinite" }}>
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2.5 h-2.5 rounded-full bg-brand-green shadow-[0_0_12px_hsl(var(--brand-green))]" />
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-2 h-2 rounded-full bg-brand-blue shadow-[0_0_12px_hsl(var(--brand-blue))]" />
              </div>
              {/* Logo center */}
              <div className="relative z-10 animate-float">
                <img
                  src={logo}
                  alt="CodeWithTechno"
                  className="h-20 lg:h-24 w-auto drop-shadow-[0_8px_24px_hsl(var(--brand-blue)/0.35)]"
                />
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-display-lg font-bold leading-[1.1] mb-7 tracking-tight"
          >
            Building the Future of{" "}
            <span className="text-gradient-animated">Designers</span>
            <br className="hidden sm:block" />
            <span className="text-gradient-animated">&</span>{" "}
            <span className="text-gradient-animated">Developers</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Structured sprints, real projects, and disciplined execution.
            Join a community that transforms potential into outcomes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href={COMMUDLE_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="hero" size="lg" className="group">
                Join Community
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
