import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Target, TrendingUp, Eye, Clock, Award } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "Discipline First",
    description: "We enforce deadlines and accountability. Growth requires structure.",
  },
  {
    icon: Target,
    title: "Execution Focus",
    description: "Less talking, more building. Every program produces real outcomes.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description: "Build skills and a portfolio that actually gets you hired.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "Clear expectations, honest feedback, and no false promises.",
  },
  {
    icon: Clock,
    title: "Time-Bound Programs",
    description: "Focused sprints with clear start and end dates.",
  },
  {
    icon: Award,
    title: "Recognition",
    description: "Showcase your work and get recognized within the community.",
  },
];

const WhyUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-subtle" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-[100px]" />
      
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
              Why Us
              <span className="w-8 h-px bg-primary" />
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-display-sm font-bold mb-6">
              What Makes Us <span className="text-gradient">Different</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We're not trying to be everything for everyone. We're focused on one thing: 
              helping serious designers and developers grow through execution.
            </p>
          </motion.div>

          {/* Reasons Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="p-6 lg:p-8 rounded-2xl bg-card border border-border/60 hover:border-primary/30 hover:shadow-card transition-all duration-500 group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent mb-5 group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-500">
                  <reason.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{reason.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;