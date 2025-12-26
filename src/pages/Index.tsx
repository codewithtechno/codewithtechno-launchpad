import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Programs from "@/components/Programs";
import HowItWorks from "@/components/HowItWorks";
import Vision from "@/components/Vision";
import Impact from "@/components/Impact";
import WhyUs from "@/components/WhyUs";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Programs />
      <HowItWorks />
      <Vision />
      <Impact />
      <WhyUs />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;
