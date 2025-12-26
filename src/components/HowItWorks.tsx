import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Send, UserCheck, BookOpen, Rocket, Trophy } from "lucide-react";

const steps = [
  {
    icon: Send,
    title: "Apply",
    description: "Submit your application with your goals and current skill level.",
  },
  {
    icon: UserCheck,
    title: "Get Selected",
    description: "We review applications and select committed individuals.",
  },
  {
    icon: BookOpen,
    title: "Learn & Execute",
    description: "Join structured programs with clear milestones and deadlines.",
  },
  {
    icon: Rocket,
    title: "Build Real Projects",
    description: "Work on actual projects that solve real problems.",
  },
  {
    icon: Trophy,
    title: "Showcase Outcomes",
    description: "Present your work and add real projects to your portfolio.",
  },
];

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-gradient-subtle" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-sm font-medium text-primary mb-4">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Your Journey to <span className="text-gradient">Real Skills</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A structured path from application to outcomes. No endless tutorials—just 
              focused execution with clear goals.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="relative">
            {/* Connection Line - Desktop */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 z-0" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative z-10"
                >
                  <div className="flex flex-col items-center text-center">
                    {/* Step Number */}
                    <div className="relative mb-4">
                      <div className="w-16 h-16 rounded-2xl bg-card border-2 border-primary/20 flex items-center justify-center shadow-card group-hover:border-primary transition-colors">
                        <step.icon className="h-7 w-7 text-primary" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                        {index + 1}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Differentiator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 p-8 rounded-2xl bg-card border border-primary/20 text-center"
          >
            <p className="text-lg font-medium mb-2">
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
