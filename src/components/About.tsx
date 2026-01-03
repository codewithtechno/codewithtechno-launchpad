import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Zap, Users, ArrowUpRight } from "lucide-react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Target,
      title: "Execution Over Theory",
      description: "We believe in learning by doing. Every program is project-based.",
      color: "primary",
    },
    {
      icon: Zap,
      title: "Structured Growth",
      description: "Clear pathways, cohort programs, and disciplined sprints.",
      color: "secondary",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Learn alongside peers who share your drive and ambition.",
      color: "primary",
    },
  ];

  return (
    <section id="about" className="py-24 lg:py-32 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-subtle" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-5 tracking-wide uppercase">
                <span className="w-8 h-px bg-primary" />
                About Us
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-display-sm font-bold mb-6">
                More Than a Community.{" "}
                <span className="text-gradient">A Growth Engine.</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-5 leading-relaxed">
                CodeWithTechno is not just another tech community. We're an execution-first 
                platform built for designers and developers who want to move beyond tutorials 
                and actually build things that matter.
              </p>
              <p className="text-muted-foreground mb-10 leading-relaxed">
                Founded with a simple belief: real skills come from real execution. 
                We provide structured programs, accountability, and a community of 
                like-minded individuals all focused on turning potential into outcomes.
              </p>

              <div className="space-y-5">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-start gap-4 group"
                  >
                    <div className={`flex-shrink-0 w-11 h-11 rounded-xl ${feature.color === 'primary' ? 'bg-accent' : 'bg-brand-blue-light'} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className={`h-5 w-5 ${feature.color === 'primary' ? 'text-primary' : 'text-secondary'}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-foreground">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Visual Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl bg-card border border-border/60 p-10 lg:p-14 shadow-card hover:shadow-card-hover transition-all duration-500 group">
                <div className="h-full flex flex-col justify-center items-center text-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center mb-8 shadow-glow-green group-hover:scale-105 transition-transform duration-500">
                    <span className="text-2xl font-bold font-display text-primary-foreground">CWT</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To create a trusted national-level community where designers and 
                    developers grow through execution, not just events.
                  </p>
                  <div className="mt-10 pt-6 border-t border-border w-full flex items-center justify-center gap-2">
                    <span className="text-sm text-muted-foreground">Est. 2024</span>
                    <ArrowUpRight className="h-4 w-4 text-primary" />
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-green/15 rounded-full blur-3xl" />
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-brand-blue/15 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;