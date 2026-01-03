import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Send, UserCheck, BookOpen, Rocket, Trophy } from "lucide-react";

const steps = [
  {
    icon: Send,
    title: "Apply",
    description: "Submit your application with your goals and skill level.",
  },
  {
    icon: UserCheck,
    title: "Get Selected",
    description: "We review and select committed individuals.",
  },
  {
    icon: BookOpen,
    title: "Learn & Execute",
    description: "Join structured programs with clear milestones.",
  },
  {
    icon: Rocket,
    title: "Build Projects",
    description: "Work on actual projects that solve real problems.",
  },
  {
    icon: Trophy,
    title: "Showcase",
    description: "Present your work and grow your portfolio.",
  },
];

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="py-24 lg:py-32 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-subtle" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-5 tracking-wide uppercase">
              <span className="w-8 h-px bg-primary" />
              Process
              <span className="w-8 h-px bg-primary" />
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-display-sm font-bold mb-6">
              Your Journey to <span className="text-gradient">Real Skills</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A structured path from application to outcomes. No endless tutorials—just 
              focused execution with clear goals.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="relative">
            {/* Connection Line - Desktop */}
            <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10"
                >
                  <div className="flex flex-col items-center text-center group">
                    {/* Step Icon */}
                    <div className="relative mb-5">
                      <div className="w-16 h-16 rounded-2xl bg-card border-2 border-border/60 flex items-center justify-center shadow-sm group-hover:border-primary/40 group-hover:shadow-card transition-all duration-500">
                        <step.icon className="h-7 w-7 text-primary" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground shadow-glow-green">
                        {index + 1}
                      </div>
                    </div>
                    
                    <h3 className="font-display text-base lg:text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Differentiator */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 p-8 lg:p-10 rounded-2xl bg-card border border-primary/20 text-center shadow-sm"
          >
            <p className="text-lg font-semibold mb-2">
              This is <span className="text-primary">NOT</span> a webinar or seminar series.
            </p>
            <p className="text-muted-foreground">
              Every program is designed for active participation, real deadlines, and tangible outcomes.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;