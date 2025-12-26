import logo from "@/assets/logo.png";
import { Twitter, Linkedin, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <a href="#" className="flex items-center gap-3 mb-4">
                <img src={logo} alt="CodeWithTechno" className="h-10 w-auto" />
                <span className="font-semibold text-lg">
                  CodeWith<span className="text-gradient">Techno</span>
                </span>
              </a>
              <p className="text-muted-foreground mb-6 max-w-sm">
                An execution-first community for designers and developers. 
                Building real skills through real projects.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://x.com/codewithtechno?t=g2rIghIyrX05xkDf_lTuqQ&s=08"
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/codewithtechno/"
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/codewithtechno.in/"
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://www.youtube.com/channel/UCw8ni83XFNvkoFjLfwx5YUQ"
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
                <a
                  href="https://www.commudle.com/communities/codewithtechno"
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Commudle"
                >
                  <Commudle className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <a href="#about" className="hover:text-foreground transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#programs" className="hover:text-foreground transition-colors">
                    Programs
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-foreground transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#vision" className="hover:text-foreground transition-colors">
                    Vision 2026
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Get In Touch</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <a href="mailto:hello@codewithtechno.com" className="hover:text-foreground transition-colors">
                    contat@codewithtechno.in
                  </a>
                </li>
                <li>
                  <span>India</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} CodeWithTechno. All rights reserved.
            </p>
            {/* <p className="text-sm text-muted-foreground">
              Built with <span className="text-primary">execution</span> in mind.
            </p> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
