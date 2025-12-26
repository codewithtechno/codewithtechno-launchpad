import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Palette, Code, GraduationCap, Users2 } from "lucide-react";

const programs = [
  {
    icon: Palette,
    title: "Design Sprints",
    description: "Intensive, time-boxed programs where designers tackle real challenges and build portfolio-worthy projects.",
    color: "primary",
    bgColor: "bg-accent",
  },
  {
    icon: Code,
    title: "Development Sprints",
    description: "Hands-on coding sprints focused on building real applications using modern technologies.",
    color: "secondary",
    bgColor: "bg-brand-blue-light",
  },
  {
    icon: GraduationCap,
    title: "Cohort Programs",
    description: "Structured learning journeys with mentorship, deadlines, and peer accountability.",
    color: "primary",
    bgColor: "bg-accent",
  },
  {
    icon: Users2,
    title: "Community Growth",
    description: "Connect with peers, share work, get feedback, and grow together as a community.",
    color: "secondary",
    bgColor: "bg-brand-blue-light",
  },
];

const Programs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="programs" className="py-24 lg:py-32" ref={ref}>
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
              What We Do
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Programs Built for <span className="text-gradient">Real Growth</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We don't do generic webinars. Every program is designed for hands-on 
              execution with clear outcomes and accountability.
            </p>
          </motion.div>

          {/* Program Cards */}
          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/30 shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${program.bgColor} mb-6`}>
                  <program.icon className={`h-7 w-7 ${program.color === "primary" ? "text-primary" : "text-secondary"}`} />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {program.title}
                </h3>
                <p className="text-muted-foreground">
                  {program.description}
                </p>
                
                {/* Hover Gradient */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-card opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;
