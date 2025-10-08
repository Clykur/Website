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
      <Header showMobileStickyCta={false} />
      
      <main>
        <HeroSection />
        <ClientLogoMarquee />
        <WhyClykurSection />
        <TestimonialCarousel />
        <RecentLaunchesSection />
        <PerformanceMetricsCounter />
      </main>

      {/* Mobile Sticky Dual CTA - side by side */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40 safe-bottom">
        <div className="grid grid-cols-2 gap-3">
          <a
            href="/contact-engagement-hub"
            className="inline-flex items-center justify-center w-full py-3 px-4 rounded-lg bg-secondary text-secondary-foreground font-medium shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <span className="mr-2">📧</span>
            Join Waitlist
          </a>
          <a
            href="/about-philosophy"
            className="inline-flex items-center justify-center w-full py-3 px-4 rounded-lg bg-background border border-border text-text-primary font-medium shadow-lg hover:bg-surface transition-colors duration-200"
          >
            <span className="mr-2">👁️</span>
            Our Vision
          </a>
        </div>
      </div>
    </div>
  );
};

export default Homepage;