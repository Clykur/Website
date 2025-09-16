import React from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import FounderStory from './components/FounderStory';
import TechnicalPhilosophy from './components/TechnicalPhilosophy';
import CredentialsSection from './components/CredentialsSection';
import WhyClykur from './components/WhyClykur';
import ClientPhilosophy from './components/ClientPhilosophy';
import BehindTheScenes from './components/BehindTheScenes';
import ConsultationCTA from './components/ConsultationCTA';

const AboutPhilosophy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <HeroSection />
        <FounderStory />
        <TechnicalPhilosophy />
        <CredentialsSection />
        <WhyClykur />
        <ClientPhilosophy />
        <BehindTheScenes />
        <ConsultationCTA />
      </main>
    </div>
  );
};

export default AboutPhilosophy;