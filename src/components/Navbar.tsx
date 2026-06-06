import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, LogOut, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo.png";

const COMMUDLE_URL = "https://www.commudle.com/communities/codewithtechno";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "What We Do", href: "#showcase" },
  { name: "Partners", href: "#partners" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-premium ${
        isScrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="/" className="flex items-center gap-2 sm:gap-3 group min-w-0">
            <img src={logo} alt="CodeWithTechno" className="h-8 sm:h-9 w-auto flex-shrink-0 transition-transform duration-300 group-hover:scale-105" />
            <span className="font-display font-semibold text-base sm:text-lg truncate">
              CodeWith<span className="text-gradient">Techno</span>
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-medium group"
              >
                {link.name}
                <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <a href={COMMUDLE_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="default" size="sm" className="shadow-glow-green font-medium">
                Join CodeWithTechno
                <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
            {user && (
              <>
                <Link to={isAdmin ? "/admin" : "/dashboard"}>
                  <Button variant="ghost" size="sm" className="font-medium">
                    <User className="h-4 w-4 mr-2" />
                    {isAdmin ? "Admin" : "Dashboard"}
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleSignOut} className="font-medium">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            )}
          </div>

          <button
            className="lg:hidden p-2.5 -mr-2 rounded-xl hover:bg-accent transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-6 space-y-2 border-t border-border/50">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="font-medium">{link.name}</span>
                    <ChevronRight className="h-4 w-4 opacity-50" />
                  </motion.a>
                ))}
                <div className="pt-4 space-y-3">
                  <a href={COMMUDLE_URL} target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="default" className="w-full shadow-glow-green">
                      Join CodeWithTechno
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </a>
                  {user && (
                    <>
                      <Link to={isAdmin ? "/admin" : "/dashboard"} onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start">
                          <User className="h-4 w-4 mr-2" />
                          {isAdmin ? "Admin Dashboard" : "My Dashboard"}
                        </Button>
                      </Link>
                      <Button variant="outline" className="w-full" onClick={() => { handleSignOut(); setIsMobileMenuOpen(false); }}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
