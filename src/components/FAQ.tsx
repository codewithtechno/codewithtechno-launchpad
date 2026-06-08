import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  HelpCircle,
  Users,
  ArrowRight,
  CalendarDays,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "What is CodeWithTechno?",
    a: "CodeWithTechno is an execution-first community for designers and developers. We run structured sprints, workshops, and meetups that turn learning into real shipped work.",
    icon: Users,
  },
  {
    q: "How can I join?",
    a: "Click 'Join CodeWithTechno' anywhere on this site. You'll be taken to our Commudle page where you can sign up and instantly access upcoming events and discussions.",
    icon: ArrowRight,
  },
  {
    q: "What kind of events are organized?",
    a: "We host hackathons, design sprints, dev workshops, fireside chats with industry experts, demo days, and informal networking meetups — both online and offline.",
    icon: CalendarDays,
  },
  {
    q: "What are the benefits of joining?",
    a: "Real projects in your portfolio, accountability cohorts, mentorship from senior practitioners, partner perks, and early access to job and collaboration opportunities.",
    icon: Sparkles,
  },
];

interface FAQItemProps {
  faq: (typeof faqs)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem = ({ faq, index, isOpen, onToggle }: FAQItemProps) => {
  const Icon = faq.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "group rounded-2xl border transition-all duration-500 ease-out",
        isOpen
          ? "border-primary/30 bg-gradient-to-br from-card to-accent/40 shadow-lg shadow-primary/5"
          : "border-border/60 bg-card hover:border-primary/20 hover:shadow-md"
      )}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
      >
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-500",
            isOpen
              ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
              : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <span
          className={cn(
            "flex-1 text-base font-semibold transition-colors duration-300",
            isOpen ? "text-primary" : "text-foreground"
          )}
        >
          {faq.q}
        </span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-muted-foreground transition-all duration-500 ease-out",
            isOpen && "rotate-180 text-primary"
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-6 pl-[4.25rem] text-muted-foreground leading-relaxed sm:px-6 sm:pl-[4.75rem]">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 lg:py-32 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent border border-primary/20 mb-6">
              <HelpCircle className="w-6 h-6 text-primary" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-display-sm font-bold mb-6">
              Frequently Asked{" "}
              <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Everything you need to know about joining and growing with the
              CodeWithTechno community.
            </p>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                index={index}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
