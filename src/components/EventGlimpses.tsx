import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Camera, Sparkles } from "lucide-react";

const g1 = { url: "/assets/glimpses/g1.jpg" };
const g2 = { url: "/assets/glimpses/g2.jpg" };
const g3 = { url: "/assets/glimpses/g3.jpg" };
const g4 = { url: "/assets/glimpses/g4.jpg" };
const g5 = { url: "/assets/glimpses/g5.jpg" };
const g6 = { url: "/assets/glimpses/g6.jpg" };
const g7 = { url: "/assets/glimpses/g7.jpg" };
const g8 = { url: "/assets/glimpses/g8.jpg" };
const g9 = { url: "/assets/glimpses/g9.jpg" };
const g10 = { url: "/assets/glimpses/g10.jpg" };

const colA = [g1, g3, g5, g7, g9];
const colB = [g2, g4, g6, g8, g10];

const ImageCard = ({ src, alt }: { src: string; alt: string }) => (
  <div className="group relative overflow-hidden rounded-xl bg-card border border-border/60 shadow-card cursor-pointer transition-all duration-500 hover:shadow-card-hover hover:z-20">
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="w-full h-auto object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.18]"
    />
  </div>
);

const Column = ({
  items,
  direction,
}: {
  items: { url: string }[];
  direction: "up" | "down";
}) => {
  const loop = [...items, ...items];
  const animClass = direction === "up" ? "animate-marquee-y" : "animate-marquee-y-reverse";
  return (
    <div className="relative h-[560px] sm:h-[640px] lg:h-[720px] overflow-hidden rounded-2xl [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)]">
      <div className={`flex flex-col gap-2 sm:gap-2.5 ${animClass} group-hover/col:[animation-play-state:paused]`}>
        {loop.map((img, i) => (
          <ImageCard key={i} src={img.url} alt={`Past event ${(i % items.length) + 1}`} />
        ))}
      </div>
    </div>
  );
};

const EventGlimpses = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="glimpses" className="py-24 lg:py-32 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-subtle" />
      <div className="absolute top-1/4 -left-32 w-[400px] h-[400px] bg-brand-green/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-brand-blue/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Heading */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:sticky lg:top-32"
            >
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-5 tracking-wide uppercase">
                <span className="w-8 h-px bg-primary" />
                Past Events
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Glimpses of <span className="text-gradient">Real Moments</span> We Shipped Together
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                From late-night build sprints to packed meetups — every frame is a
                reminder that this community shows up, ships work, and grows in public.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border/60">
                  <Camera className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">15+ Events Captured</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border/60">
                  <Sparkles className="h-4 w-4 text-brand-green" />
                  <span className="text-sm font-medium">1K+ Makers</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Two vertical scrolling columns */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 gap-2 sm:gap-2.5"
            >
              <div className="group/col">
                <Column items={colA} direction="up" />
              </div>
              <div className="group/col">
                <Column items={colB} direction="down" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventGlimpses;
