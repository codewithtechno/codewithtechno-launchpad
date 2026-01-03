import { forwardRef } from "react";
import logo from "@/assets/logo.png";
import { Twitter, Linkedin, Instagram, Youtube, Users, ArrowUpRight } from "lucide-react";

const Footer = forwardRef<HTMLElement>((_, ref) => {
  const socialLinks = [
    { icon: Twitter, href: "https://x.com/codewithtechno?t=g2rIghIyrX05xkDf_lTuqQ&s=08", label: "Twitter" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/codewithtechno/", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/codewithtechno.in/", label: "Instagram" },
    { icon: Youtube, href: "https://www.youtube.com/channel/UCw8ni83XFNvkoFjLfwx5YUQ", label: "YouTube" },
    { icon: Users, href: "https://www.commudle.com/communities/codewithtechno", label: "Commudle" },
  ];

  return (
    <footer className="py-20 border-t border-border/50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-green/5 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 lg:gap-16 mb-16">
            {/* Brand */}
            <div className="md:col-span-2">
              <a href="#" className="inline-flex items-center gap-3 mb-5 group">
                <img src={logo} alt="CodeWithTechno" className="h-10 w-auto transition-transform duration-300 group-hover:scale-105" />
                <span className="font-display font-semibold text-lg">
                  CodeWith<span className="text-gradient">Techno</span>
                </span>
              </a>
              <p className="text-muted-foreground mb-8 max-w-sm leading-relaxed">
                An execution-first community for designers and developers. 
                Building real skills through real projects.
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display font-semibold mb-5">Quick Links</h4>
              <ul className="space-y-3 text-muted-foreground">
                {[
                  { name: "About", href: "#about" },
                  { name: "Programs", href: "#programs" },
                  { name: "How It Works", href: "#how-it-works" },
                  { name: "Vision 2026", href: "#vision" },
                ].map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="inline-flex items-center gap-1 hover:text-foreground transition-colors group">
                      {link.name}
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display font-semibold mb-5">Get In Touch</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <a href="mailto:contact@codewithtechno.in" className="hover:text-foreground transition-colors">
                    contact@codewithtechno.in
                  </a>
                </li>
                <li>
                  <span>India</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} CodeWithTechno. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Built with <span className="text-primary font-medium">execution</span> in mind.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;