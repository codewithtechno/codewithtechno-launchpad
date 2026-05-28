import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const partners = [
  { name: "PW IOI", initials: "PW" },
  { name: "GDG Gurugram", initials: "GDG" },
  { name: "Commudle", initials: "Cm" },
  { name: "Unstop", initials: "Un" },
  { name: "Designland", initials: "Dl" },
];

const PartnerCard = ({ name, initials }: { name: string; initials: string }) => (
  <div className="flex-shrink-0 mx-4 group">
    <div className="flex items-center gap-4 px-8 py-5 rounded-2xl bg-card border border-border/60 hover:border-primary/30 hover:shadow-card transition-all duration-500 min-w-[240px]">
      <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow-green group-hover:scale-110 transition-transform duration-500">
        <span className="font-display font-bold text-primary-foreground text-base">{initials}</span>
      </div>
      <span className="font-display font-semibold text-lg text-foreground whitespace-nowrap">{name}</span>
    </div>
  </div>
);

const TrustedPartners = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const loop = [...partners, ...partners];

  return (
    <section id="partners" className="py-24 lg:py-32 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-subtle" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-5 tracking-wide uppercase">
            <span className="w-8 h-px bg-primary" />
            Trusted Partners
            <span className="w-8 h-px bg-primary" />
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-display-sm font-bold mb-6">
            Backed by <span className="text-gradient">Leading Communities</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We collaborate with the best in tech and design to deliver exceptional
            experiences for our community.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="overflow-hidden">
            <div className="flex animate-marquee">
              {loop.map((p, i) => (
                <PartnerCard key={`${p.name}-${i}`} {...p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedPartners;
