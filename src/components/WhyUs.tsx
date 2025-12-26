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
    <section className="py-24 lg:py-32 bg-gradient-subtle" ref={ref}>
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
              Why CodeWithTechno
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              What Makes Us <span className="text-gradient">Different</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're not trying to be everything for everyone. We're focused on one thing: 
              helping serious designers and developers grow through execution.
            </p>
          </motion.div>

          {/* Reasons Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-accent mb-4 group-hover:bg-primary/10 transition-colors">
                  <reason.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{reason.title}</h3>
                <p className="text-sm text-muted-foreground">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
