import React from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import ClientLogoMarquee from './components/ClientLogoMarquee';
import WhyClykurSection from './components/WhyClykurSection';
import TestimonialCarousel from './components/TestimonialCarousel';
import RecentLaunchesSection from './components/RecentLaunchesSection';
import PerformanceMetricsCounter from './components/PerformanceMetricsCounter';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <HeroSection />
        <ClientLogoMarquee />
        <WhyClykurSection />
        <TestimonialCarousel />
        <RecentLaunchesSection />
        <PerformanceMetricsCounter />
      </main>

      {/* Mobile Sticky CTA - Only visible on mobile */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40">
        <div className="bg-gradient-to-r from-secondary to-accent rounded-full p-1 shadow-lg">
          <a
            href="/project-inquiry-hub"
            className="flex items-center justify-center w-full py-3 px-6 bg-background rounded-full text-text-primary font-medium hover:bg-surface transition-colors duration-200"
          >
            <span className="mr-2">🚀</span>
            Start Your Project Today
          </a>
        </div>
      </div>
    </div>
  );
};

export default Homepage;