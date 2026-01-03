import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Zap, Users, FolderOpen } from "lucide-react";

const stats = [
  {
    icon: Calendar,
    value: "15+",
    label: "Events Organized",
    color: "primary",
  },
  {
    icon: Zap,
    value: "20+",
    label: "Sprints Conducted",
    color: "secondary",
  },
  {
    icon: Users,
    value: "500+",
    label: "Community Members",
    color: "primary",
  },
  {
    icon: FolderOpen,
    value: "50+",
    label: "Projects Built",
    color: "secondary",
  },
];

const Impact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-32 relative" ref={ref}>
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
              Impact
              <span className="w-8 h-px bg-primary" />
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-display-sm font-bold mb-6">
              Numbers That <span className="text-gradient">Speak</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We measure success by outcomes, not attendance. Here's what we've achieved so far.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative p-8 lg:p-10 rounded-2xl bg-card border border-border/60 text-center group hover:shadow-card hover:border-primary/20 transition-all duration-500"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${stat.color === 'primary' ? 'bg-accent' : 'bg-brand-blue-light'} mb-5 group-hover:scale-110 transition-transform duration-500`}>
                  <stat.icon className={`h-7 w-7 ${stat.color === 'primary' ? 'text-primary' : 'text-secondary'}`} />
                </div>
                <div className="font-display text-4xl lg:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;