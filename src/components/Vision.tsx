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
      <div className="absolute inset-0 bg-foreground" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-sm font-medium text-primary mb-4">
              Vision 2026
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-background">
              Building for the <span className="text-gradient">Long Term</span>
            </h2>
            <p className="text-lg text-background/70 max-w-2xl mx-auto">
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
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 lg:p-8 rounded-2xl bg-background/5 border border-background/10 backdrop-blur-sm hover:bg-background/10 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-primary mb-4">
                  <point.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-background">{point.title}</h3>
                <p className="text-background/70">{point.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-background/10 border border-background/20">
              <span className="text-background/70">Est. 2024</span>
              <div className="w-12 h-0.5 bg-gradient-primary" />
              <span className="text-xl font-bold text-gradient">2026</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
