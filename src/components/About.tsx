import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Zap, Users } from "lucide-react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 lg:py-32 bg-gradient-subtle" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-sm font-medium text-primary mb-4">
                About CodeWithTechno
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                More Than a Community.{" "}
                <span className="text-gradient">A Growth Engine.</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                CodeWithTechno is not just another tech community. We're an execution-first 
                platform built for designers and developers who want to move beyond tutorials 
                and actually build things that matter.
              </p>
              <p className="text-muted-foreground mb-8">
                Founded with a simple belief: real skills come from real execution. 
                We provide structured programs, accountability, and a community of 
                like-minded individuals all focused on turning potential into outcomes.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Execution Over Theory</h4>
                    <p className="text-sm text-muted-foreground">
                      We believe in learning by doing. Every program is project-based.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-brand-blue-light flex items-center justify-center">
                    <Zap className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Structured Growth</h4>
                    <p className="text-sm text-muted-foreground">
                      Clear pathways, cohort programs, and disciplined sprints.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Community Driven</h4>
                    <p className="text-sm text-muted-foreground">
                      Learn alongside peers who share your drive and ambition.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl bg-gradient-card border border-border/50 p-8 lg:p-12 shadow-card">
                <div className="h-full flex flex-col justify-center items-center text-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 shadow-glow-green">
                    <span className="text-3xl font-bold text-primary-foreground">CWT</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
                  <p className="text-muted-foreground">
                    To create a trusted national-level community where designers and 
                    developers grow through execution, not just events.
                  </p>
                  <div className="mt-8 pt-6 border-t border-border w-full">
                    <p className="text-sm text-muted-foreground">Est. 2024</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-green/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-brand-blue/20 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
