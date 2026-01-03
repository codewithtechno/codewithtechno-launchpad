import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-[10%] w-[500px] h-[500px] bg-brand-green/8 rounded-full blur-[100px] animate-pulse-soft" />
      <div className="absolute bottom-1/4 right-[10%] w-[600px] h-[600px] bg-brand-blue/8 rounded-full blur-[100px] animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-green/5 rounded-full blur-[120px]" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '64px 64px'
      }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
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

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            <img
              src={logo}
              alt="CodeWithTechno"
              className="h-16 lg:h-20 w-auto mx-auto animate-float"
            />
          </motion.div>

          {/* Main Headline */}
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

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Structured sprints, real projects, and disciplined execution. 
            Join a community that transforms potential into outcomes.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/sprints">
              <Button variant="hero" size="lg" className="group">
                Explore Programs
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="hero-outline" size="lg" className="group">
                <Play className="h-4 w-4 group-hover:scale-110 transition-transform" />
                Join Community
              </Button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-20"
          >
            <p className="text-sm text-muted-foreground mb-6 font-medium">
              Trusted by designers and developers across India
            </p>
            <div className="inline-flex items-center gap-6 sm:gap-10 px-8 py-5 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/50 shadow-card">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold font-display text-foreground">500+</div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">Members</div>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold font-display text-foreground">20+</div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">Sprints</div>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold font-display text-foreground">50+</div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">Projects</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;