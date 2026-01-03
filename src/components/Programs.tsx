import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Palette, Code, GraduationCap, Users2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const programs = [
  {
    icon: Palette,
    title: "Design Sprints",
    description: "Intensive, time-boxed programs where designers tackle real challenges and build portfolio-worthy projects.",
    color: "primary",
    href: "/sprints",
  },
  {
    icon: Code,
    title: "Development Sprints",
    description: "Hands-on coding sprints focused on building real applications using modern technologies.",
    color: "secondary",
    href: "/sprints",
  },
  {
    icon: GraduationCap,
    title: "Cohort Programs",
    description: "Structured learning journeys with mentorship, deadlines, and peer accountability.",
    color: "primary",
    href: "/sprints",
  },
  {
    icon: Users2,
    title: "Community Events",
    description: "Connect with peers, share work, get feedback, and grow together as a community.",
    color: "secondary",
    href: "/events",
  },
];

const Programs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="programs" className="py-24 lg:py-32 relative" ref={ref}>
      <div className="container mx-auto px-4">
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
              What We Do
              <span className="w-8 h-px bg-primary" />
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-display-sm font-bold mb-6">
              Programs Built for <span className="text-gradient">Real Growth</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
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
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link to={program.href} className="block h-full">
                  <div className="group relative h-full p-8 lg:p-10 rounded-2xl bg-card border border-border/60 hover:border-primary/30 shadow-sm hover:shadow-card transition-all duration-500 hover-lift">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${program.color === "primary" ? "bg-accent" : "bg-brand-blue-light"} mb-6 group-hover:scale-110 transition-transform duration-500`}>
                      <program.icon className={`h-7 w-7 ${program.color === "primary" ? "text-primary" : "text-secondary"}`} />
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                      {program.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {program.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      Learn more
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;