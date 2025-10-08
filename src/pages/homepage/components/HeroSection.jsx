import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [currentFeature, setCurrentFeature] = useState(0);

  const upcomingFeatures = [
    {
      id: 1,
      title: "AI Business Assistant",
      description: "Your intelligent co-pilot that automates workflows, predicts needs, and scales your business operations",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
      status: "Coming Soon",
      tech: ["GPT-4 Integration", "Workflow Automation", "Predictive Analytics"]
    },
    {
      id: 2,
      title: "Global Freelancer Network",
      description: "Connect with top talent worldwide through our AI-powered matching system that finds the perfect fit",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
      status: "In Development",
      tech: ["Smart Matching", "Global Marketplace", "Quality Assurance"]
    },
    {
      id: 3,
      title: "Intelligent Project Management",
      description: "AI-driven project orchestration that adapts to your workflow and optimizes team performance in real-time",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      status: "Beta Testing",
      tech: ["Adaptive Algorithms", "Real-time Optimization", "Performance Analytics"]
    },
    {
      id: 4,
      title: "Unified Business Hub",
      description: "One platform that integrates all your business tools, clients, and projects with seamless AI automation",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      status: "Early Access",
      tech: ["API Integration", "Smart Automation", "Unified Dashboard"]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % upcomingFeatures.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [upcomingFeatures.length]);

  const feature = upcomingFeatures[currentFeature];

  return (
    <section className="relative min-h-screen bg-background overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-32 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 fade-in">
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-accent/10 text-accent rounded-full text-xs sm:text-sm font-medium">
                <Icon name="Rocket" size={14} className="mr-1.5 sm:mr-2 sm:size-4" />
                🚀 Launching Q2 2026 • Early Access Available
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-text-primary leading-tight">
                The{' '}
                <span className="text-gradient">AI Revolution</span>{' '}
                Starts Here
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl">
                We're building the world's first AI-powered platform that connects businesses with global freelancers through intelligent automation. Join the waitlist and be among the first to experience the future of work.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
              <Link to="/contact-engagement-hub" className="flex-1 xs:flex-none">
                <Button 
                  variant="primary" 
                  size="lg"
                  iconName="Mail" 
                  iconPosition="right"
                  className="w-full xs:w-auto shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  Join Waitlist
                </Button>
              </Link>
              <Link to="/about-philosophy" className="flex-1 xs:flex-none">
                <Button 
                  variant="outline" 
                  size="lg"
                  iconName="Eye" 
                  iconPosition="left"
                  className="w-full xs:w-auto"
                >
                  Our Vision
                </Button>
              </Link>
            </div>

            {/* Startup Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-4 sm:flex sm:flex-wrap">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-text-primary">2</div>
                <div className="text-xs sm:text-sm text-text-secondary">Founding Team</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-text-primary">Q2 2026</div>
                <div className="text-xs sm:text-sm text-text-secondary">Launch Date</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-text-primary">6</div>
                <div className="text-xs sm:text-sm text-text-secondary">Months to Launch</div>
              </div>
            </div>
          </div>

          {/* Right Content - Upcoming Features Showcase */}
          <div className="relative">
            <div className="relative bg-background rounded-2xl shadow-xl overflow-hidden card-hover">
              <div className="aspect-video relative">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Feature Info Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <span className="bg-accent/20 text-accent text-xs px-2 py-1 rounded-full font-medium">
                      {feature.status}
                    </span>
                  </div>
                  <p className="text-sm opacity-90 mb-3">{feature.description}</p>
                  
                  {/* Technology Stack */}
                  <div className="flex flex-wrap gap-2">
                    {feature.tech.map((tech) => (
                      <span key={tech} className="bg-white/20 backdrop-blur-sm text-xs px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Navigation Dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {upcomingFeatures.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFeature(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentFeature 
                      ? 'bg-secondary scale-125' :'bg-border hover:bg-text-secondary'
                  }`}
                  aria-label={`View feature ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Removed scroll indicator for minimal style */}
    </section>
  );
};

export default HeroSection;