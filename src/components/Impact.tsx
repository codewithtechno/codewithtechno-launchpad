import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Zap, Users, FolderOpen } from "lucide-react";

const stats = [
  {
    icon: Calendar,
    value: "15+",
    label: "Events Organized",
    color: "text-primary",
  },
  {
    icon: Zap,
    value: "20+",
    label: "Sprints Conducted",
    color: "text-secondary",
  },
  {
    icon: Users,
    value: "500+",
    label: "Community Members",
    color: "text-primary",
  },
  {
    icon: FolderOpen,
    value: "50+",
    label: "Projects Built",
    color: "text-secondary",
  },
];

const Impact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-32" ref={ref}>
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
              Our Impact
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Numbers That <span className="text-gradient">Speak</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We measure success by outcomes, not attendance. Here's what we've achieved so far.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative p-6 lg:p-8 rounded-2xl bg-gradient-card border border-border text-center group hover:shadow-card transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-muted mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="text-4xl lg:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;
