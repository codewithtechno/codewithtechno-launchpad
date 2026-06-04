import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Calendar, Sparkles, ShieldCheck, Star } from "lucide-react";
import heroImage from "@/assets/hero-community.jpg.asset.json";

const COMMUDLE_URL = "https://www.commudle.com/communities/codewithtechno";

const Hero = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center pt-24 pb-12 sm:pb-16 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage.url}
          alt="CodeWithTechno community meetup"
          loading="eager"
          className="w-full h-full object-cover object-center"
        />
        {/* Layered overlays - lighter on mobile so the image shows clearly */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/55 to-background/85 sm:bg-gradient-to-r sm:from-background sm:via-background/85 sm:to-background/30" />
        <div className="absolute inset-0 hidden sm:block bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_hsl(var(--brand-green)/0.15),_transparent_60%)]" />
      </div>

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '64px 64px'
      }} />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl">
          {/* Live badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-md border border-primary/20 mb-8 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-sm font-medium text-foreground/80">
              Execution-First Tech & Design Community
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
          >
            Where Designers <br className="hidden sm:block" />
            & Developers <span className="text-gradient-animated">Build Together</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed"
          >
            Real sprints. Real projects. Real outcomes. Join India's most disciplined
            community of makers shipping work that matters.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12"
          >
            <a href={COMMUDLE_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="hero" size="lg" className="group">
                Join Community
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a href="#showcase">
              <Button variant="hero-outline" size="lg">
                Explore Events
              </Button>
            </a>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl bg-background/70 backdrop-blur-xl border border-border/60 shadow-card p-5 sm:p-6 max-w-2xl"
          >
            {/* Avatar stack + rating */}
            <div className="flex flex-wrap items-center gap-5 mb-5">
              <div className="flex -space-x-2">
                {[
                  "from-brand-green/80 to-brand-blue/80",
                  "from-brand-blue/80 to-primary/80",
                  "from-primary/80 to-brand-green/80",
                  "from-brand-green/70 to-brand-blue/60",
                ].map((g, i) => (
                  <div
                    key={i}
                    className={`w-9 h-9 rounded-full border-2 border-background bg-gradient-to-br ${g} flex items-center justify-center text-[10px] font-bold text-white`}
                  >
                    {["AR", "PK", "SM", "RV"][i]}
                  </div>
                ))}
                <div className="w-9 h-9 rounded-full border-2 border-background bg-muted text-foreground/70 flex items-center justify-center text-[10px] font-bold">
                  +98
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-foreground">4.9/5</span>
                <span className="text-sm text-muted-foreground">from members</span>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-5 border-t border-border/60">
              {[
                { icon: Users, value: "500+", label: "Active Members" },
                { icon: Calendar, value: "40+", label: "Events Hosted" },
                { icon: Sparkles, value: "20+", label: "Sprints Shipped" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <s.icon className="h-4 w-4 text-primary" />
                    <span className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                      {s.value}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Trust footnote */}
            <div className="flex items-center gap-2 mt-5 pt-4 border-t border-border/60">
              <ShieldCheck className="h-4 w-4 text-brand-green" />
              <span className="text-xs sm:text-sm text-muted-foreground">
                Backed by GDG, Commudle, Unstop & leading tech communities
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
