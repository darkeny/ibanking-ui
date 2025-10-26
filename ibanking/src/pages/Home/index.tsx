import { useState } from "react";
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";
import { HeroCarousel } from "../../components/HeroCarousel";

export function Home() {
  const [language, setLanguage] = useState<'PT' | 'EN'>('PT');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'PT' ? 'EN' : 'PT');
  };

  return (
    <>
      <Navbar language={language} toggleLanguage={toggleLanguage} />
      <HeroCarousel language={language} />
      <Footer language={language} />
    </>
  );
}
