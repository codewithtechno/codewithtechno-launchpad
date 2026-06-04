import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Camera, Sparkles } from "lucide-react";
import event1 from "@/assets/event-1.jpg";
import event2 from "@/assets/event-2.jpg";
import event3 from "@/assets/event-3.jpg";
import event4 from "@/assets/event-4.jpg";
import event5 from "@/assets/event-5.jpg";
import event6 from "@/assets/event-6.jpg";

const glimpses = [
  { img: event1, title: "Developer Meetup", location: "Delhi NCR" },
  { img: event2, title: "Build Sprint", location: "Online" },
  { img: event3, title: "Design Workshop", location: "Gurugram" },
  { img: event4, title: "Tech Talks", location: "Bengaluru" },
  { img: event5, title: "Networking Night", location: "Mumbai" },
  { img: event6, title: "Demo Day", location: "Hybrid" },
];

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

            {/* Right: Animated cards stack */}
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              {glimpses.map((g, i) => (
                <motion.div
                  key={g.title}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.15 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -6 }}
                  className={`group relative overflow-hidden rounded-2xl bg-card border border-border/60 shadow-card hover:shadow-card-hover transition-all duration-500 ${
                    i % 2 === 0 ? "lg:translate-y-6" : ""
                  }`}
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={g.img}
                      alt={g.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="font-display text-sm sm:text-base font-bold text-white leading-tight mb-1">
                      {g.title}
                    </h3>
                    <p className="text-xs text-white/70 font-medium">{g.location}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventGlimpses;
