import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Users, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { icon: Users, value: "2,500+", label: "Members" },
  { icon: Zap, value: "50+", label: "Projects Built" },
  { icon: Trophy, value: "100%", label: "Execution Rate" },
];

const CTA = forwardRef<HTMLElement>((_, forwardedRef) => {
  const localRef = useRef(null);
  const ref = forwardedRef || localRef;
  const isInView = useInView(localRef, { once: true, margin: "-100px" });

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-subtle" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-green/6 rounded-full blur-[140px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/6 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative rounded-3xl bg-gradient-to-br from-card via-card to-accent/30 border border-border/60 p-8 sm:p-12 lg:p-16 shadow-premium overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-green/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-brand-blue/10 rounded-full blur-3xl" />

            <div className="relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/80 border border-primary/15 mb-8"
              >
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-foreground/80">Ready to Start?</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-display text-4xl sm:text-5xl lg:text-display-md font-bold mb-5 leading-tight"
              >
                Be Part of the{" "}
                <span className="text-gradient">Future</span>
                <br className="hidden sm:block" />{" "}
                of Tech & Design
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed"
              >
                Join a community where execution matters. Whether you're a designer or developer,
                there's a place for you at CodeWithTechno.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
              >
                <Link to="/auth">
                  <Button
                    variant="hero"
                    size="lg"
                    className="group px-8 py-6 text-base shadow-glow-green hover:shadow-glow-mixed transition-shadow duration-500"
                  >
                    Join CodeWithTechno
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
                <Link to="/sprints">
                  <Button
                    variant="hero-outline"
                    size="lg"
                    className="px-8 py-6 text-base hover:bg-accent transition-colors duration-300"
                  >
                    Explore Programs
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex items-center justify-center gap-8 sm:gap-12"
              >
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-accent mb-2">
                      <stat.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="font-display text-xl sm:text-2xl font-bold text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

CTA.displayName = "CTA";

export default CTA;