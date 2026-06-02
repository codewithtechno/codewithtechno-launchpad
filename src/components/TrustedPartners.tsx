import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import pwioiLogo from "@/assets/partners/pwioi.png";
import gdgLogo from "@/assets/partners/gdg.png";
import commudleLogo from "@/assets/partners/commudle.png";
import unstopLogo from "@/assets/partners/unstop.png";
import designlandLogo from "@/assets/partners/designland.jpg";

const partners = [
  { name: "PW IOI", logo: pwioiLogo, href: "https://www.pwioi.com" },
  { name: "GDG Gurugram", logo: gdgLogo, href: "https://gdg.community.dev/gdg-gurugram/" },
  { name: "Commudle", logo: commudleLogo, href: "https://www.commudle.com" },
  { name: "Unstop", logo: unstopLogo, href: "https://unstop.com" },
  { name: "Designland", logo: designlandLogo, href: "https://www.designland.hu" },
];

const PartnerCard = ({ name, logo, href }: { name: string; logo: string; href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex-shrink-0 mx-4 group"
  >
    <div className="flex items-center gap-4 px-8 py-5 rounded-2xl bg-card border border-border/60 hover:border-primary/30 hover:shadow-card transition-all duration-500 min-w-[240px]">
      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center overflow-hidden border border-border/50 group-hover:scale-110 transition-transform duration-500">
        <img src={logo} alt={`${name} logo`} className="w-10 h-10 object-contain" loading="lazy" />
      </div>
      <span className="font-display font-semibold text-lg text-foreground whitespace-nowrap">{name}</span>
    </div>
  </a>
);

const TrustedPartners = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const loop = [...partners, ...partners];

  return (
    <section id="partners" className="py-16 lg:py-20 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-subtle" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary tracking-wide uppercase">
            <span className="w-8 h-px bg-primary" />
            Trusted Partners
            <span className="w-8 h-px bg-primary" />
          </span>
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
