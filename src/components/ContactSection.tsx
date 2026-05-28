import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const COMMUDLE_URL = "https://www.commudle.com/communities/codewithtechno";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  subject: z.string().trim().min(1, "Subject is required").max(200),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

const ContactSection = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    toast({ title: "Message sent!", description: "We'll get back to you shortly." });
    setFormData({ name: "", email: "", subject: "", message: "" });
    setLoading(false);
  };

  return (
    <section id="contact" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-subtle" />
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-brand-green/8 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-brand-blue/8 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-5 tracking-wide uppercase">
            <span className="w-8 h-px bg-primary" />
            Get In Touch
            <span className="w-8 h-px bg-primary" />
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-display-sm font-bold mb-6">
            Let's Build <span className="text-gradient">Something Together</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Questions about programs? Want to collaborate or partner with us? Drop a
            message — we read every single one.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="bg-card rounded-3xl p-8 lg:p-10 border border-border/60 shadow-card">
              <h3 className="font-display text-2xl font-bold mb-3">Start a conversation</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Whether you're a designer, developer, partner or simply curious — we're
                always open to a chat.
              </p>

              <div className="space-y-5">
                <a href="mailto:contact@codewithtechno.in" className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-0.5">Email</div>
                    <span className="text-muted-foreground group-hover:text-primary transition-colors">
                      contact@codewithtechno.in
                    </span>
                  </div>
                </a>

                <a href="tel:+918532070669" className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-blue-light flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-0.5">Phone</div>
                    <span className="text-muted-foreground group-hover:text-primary transition-colors">
                      +91 8532070669
                    </span>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-0.5">Location</div>
                    <span className="text-muted-foreground">Meerut, Uttar Pradesh, India</span>
                  </div>
                </div>
              </div>
            </div>

            <a href={COMMUDLE_URL} target="_blank" rel="noopener noreferrer" className="block">
              <div className="bg-gradient-primary rounded-3xl p-8 text-primary-foreground shadow-glow-green hover:shadow-xl transition-all duration-500 group">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold mb-1">Join the Community</h3>
                    <p className="text-primary-foreground/85 text-sm">
                      Find us on Commudle and never miss an event.
                    </p>
                  </div>
                  <ExternalLink className="h-6 w-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </a>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-card rounded-3xl p-8 lg:p-10 border border-border/60 shadow-card space-y-5"
          >
            <h3 className="font-display text-2xl font-bold mb-2">Send us a message</h3>
            <p className="text-muted-foreground text-sm mb-4">We typically reply within 24 hours.</p>

            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" className={errors.name ? "border-destructive" : ""} />
              {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" className={errors.email ? "border-destructive" : ""} />
              {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="What's this about?" className={errors.subject ? "border-destructive" : ""} />
              {errors.subject && <p className="text-sm text-destructive mt-1">{errors.subject}</p>}
            </div>

            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell us more..." rows={5} className={errors.message ? "border-destructive" : ""} />
              {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
              {loading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
              ) : (
                <><Send className="mr-2 h-4 w-4" /> Send Message</>
              )}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
