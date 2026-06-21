import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import event1 from "@/assets/event-1.jpg";
import event2 from "@/assets/event-2.jpg";
import event3 from "@/assets/design-breakthrough-banner.jpg.asset.json";
import event4 from "@/assets/ux-pathway-banner.png.asset.json";
import event5 from "@/assets/portfolio-sprint-banner.png.asset.json";
import event6 from "@/assets/uiux-navigator-banner.png.asset.json";

const events = [
  { img: event1, title: "Design Fusion Season 3", tag: "Design Seminar", date: "PW Head Office Noida" },
  { img: event2, title: "Design Kickstart", tag: "Design Workshop", date: "PW IOI Noida" },
  { img: event3.url, title: "Design Breakthrough", tag: "Design Webinar", date: "Google Meet" },
  { img: event4.url, title: "UX-Pathway", tag: "Design Webinar", date: "Google Meet" },
  { img: event5.url, title: "Portfolio Sprint", tag: "10 Days Design Sprint", date: "Discord" },
  { img: event6, title: "UI/UX Navigator", tag: "Online Webinar", date: "Google Meet" },
];

const EventShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="showcase" className="py-24 lg:py-32 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-5 tracking-wide uppercase">
              <span className="w-8 h-px bg-primary" />
              What We Do
              <span className="w-8 h-px bg-primary" />
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-display-sm font-bold mb-6">
              Moments from Our <span className="text-gradient">Community</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A glimpse into the meetups, workshops, hackathons, and demo days where
              CodeWithTechno members build, ship, and grow together.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-2xl bg-card border border-border/60 shadow-card hover:shadow-card-hover transition-all duration-500 cursor-pointer"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={event.img}
                    alt={event.title}
                    width={1280}
                    height={720}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1.2s] ease-premium group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-background/90 backdrop-blur-sm text-xs font-semibold text-primary border border-primary/20">
                      {event.tag}
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <h3 className="font-display text-xl lg:text-2xl font-bold text-white mb-2 leading-tight">
                      {event.title}
                    </h3>
                    <p className="text-sm text-white/80 font-medium">
                      {event.date}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventShowcase;
