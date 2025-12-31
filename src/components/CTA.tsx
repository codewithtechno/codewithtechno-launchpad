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
      <div className="absolute inset-0 bg-gradient-card" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-green/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-blue/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-primary/20 mb-8">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Ready to Start?</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Be Part of the Future of{" "}
              <span className="text-gradient">Tech & Design</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join a community where execution matters. Whether you're a designer or developer, 
              there's a place for you at CodeWithTechno.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/auth">
                <Button variant="hero" size="lg">
                  Join CodeWithTechno
                  <ArrowRight className="h-5 w-5" />
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
