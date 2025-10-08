import React from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import FounderStory from './components/FounderStory';
import TechnicalPhilosophy from './components/TechnicalPhilosophy';

const AboutPhilosophy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <FounderStory />
        <TechnicalPhilosophy />
        <HeroSection />
      </main>
    </div>
  );
};

export default AboutPhilosophy;