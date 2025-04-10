
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import BrandsSection from "@/components/landing/BrandsSection";
import NavBar from "@/components/landing/NavBar";
import Footer from "@/components/landing/Footer";
import TestimonialsSection from "@/components/landing/TestimonialsSection";

const Index = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <HeroSection onGetStarted={handleGetStarted} />
        <BrandsSection />
        <FeaturesSection />
        <TestimonialsSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
