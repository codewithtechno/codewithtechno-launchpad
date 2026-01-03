import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = forwardRef<HTMLElement>((_, forwardedRef) => {
  const localRef = useRef(null);
  const ref = forwardedRef || localRef;
  const isInView = useInView(localRef, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-subtle" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-green/8 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-blue/8 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/80 backdrop-blur-sm border border-primary/15 mb-10">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-foreground/80">Ready to Start?</span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl lg:text-display-sm font-bold mb-6">
              Be Part of the Future of{" "}
              <span className="text-gradient">Tech & Design</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Join a community where execution matters. Whether you're a designer or developer, 
              there's a place for you at CodeWithTechno.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/auth">
                <Button variant="hero" size="lg" className="group">
                  Join CodeWithTechno
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/sprints">
                <Button variant="hero-outline" size="lg">
                  Explore Programs
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

CTA.displayName = "CTA";

export default CTA;