import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import EventShowcase from "@/components/EventShowcase";
import HowItWorks from "@/components/HowItWorks";
import TrustedPartners from "@/components/TrustedPartners";
import FAQ from "@/components/FAQ";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <TrustedPartners />
      <EventShowcase />
      <HowItWorks />
      <FAQ />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
