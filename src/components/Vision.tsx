import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Building, Handshake, Globe } from "lucide-react";

const visionPoints = [
  {
    icon: Target,
    title: "Trusted Community",
    description: "Becoming a recognized name in the design & tech community space across India.",
  },
  {
    icon: Building,
    title: "Strong Execution Culture",
    description: "Building a reputation where outcomes speak louder than promises.",
  },
  {
    icon: Handshake,
    title: "Industry Collaboration",
    description: "Partnering with companies to create real opportunities for our members.",
  },
  {
    icon: Globe,
    title: "National Presence",
    description: "Expanding our reach while maintaining quality and execution standards.",
  },
];

const Vision = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="vision" className="py-24 lg:py-32 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-green/8 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-blue/8 rounded-full blur-[120px]" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)`,
        backgroundSize: '80px 80px'
      }} />
      
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
              Vision 2026
              <span className="w-8 h-px bg-primary" />
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-display-sm font-bold mb-6 text-background">
              Building for the <span className="text-gradient">Long Term</span>
            </h2>
            <p className="text-lg text-background/60 max-w-2xl mx-auto leading-relaxed">
              Our vision extends beyond events. We're building a sustainable ecosystem 
              where designers and developers thrive through execution and real opportunities.
            </p>
          </motion.div>

          {/* Vision Points */}
          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            {visionPoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="p-8 lg:p-10 rounded-2xl bg-background/5 border border-background/10 backdrop-blur-sm hover:bg-background/8 hover:border-background/20 transition-all duration-500 group"
              >
                <div className="inline-flex items-center justify-center w-13 h-13 rounded-xl bg-gradient-primary mb-5 group-hover:scale-110 transition-transform duration-500">
                  <point.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3 text-background">{point.title}</h3>
                <p className="text-background/60 leading-relaxed">{point.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-6 px-10 py-5 rounded-full bg-background/8 border border-background/15 backdrop-blur-sm">
              <span className="text-background/50 font-medium">Est. 2024</span>
              <div className="w-16 h-0.5 bg-gradient-primary rounded-full" />
              <span className="text-2xl font-bold font-display text-gradient">2026</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Vision;