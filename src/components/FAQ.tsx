import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What is CodeWithTechno?",
    a: "CodeWithTechno is an execution-first community for designers and developers. We run structured sprints, workshops, and meetups that turn learning into real shipped work.",
  },
  {
    q: "How can I join?",
    a: "Click 'Join CodeWithTechno' anywhere on this site. You'll be taken to our Commudle page where you can sign up and instantly access upcoming events and discussions.",
  },
  {
    q: "What kind of events are organized?",
    a: "We host hackathons, design sprints, dev workshops, fireside chats with industry experts, demo days, and informal networking meetups — both online and offline.",
  },
  {
    q: "What are the benefits of joining?",
    a: "Real projects in your portfolio, accountability cohorts, mentorship from senior practitioners, partner perks, and early access to job and collaboration opportunities.",
  },
];

const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="py-24 lg:py-32 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent border border-primary/20 mb-6">
              <HelpCircle className="w-6 h-6 text-primary" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-display-sm font-bold mb-6">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Everything you need to know about joining and growing with the
              CodeWithTechno community.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card rounded-2xl border border-border/60 px-6 shadow-sm data-[state=open]:shadow-card data-[state=open]:border-primary/30 transition-all duration-300"
                >
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary hover:no-underline py-5 text-base">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
