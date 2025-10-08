import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialCarousel = () => {
  const [currentVision, setCurrentVision] = useState(0);

  const visionStatements = [
    {
      id: 1,
      quote: `We're building the future of work where AI understands your business better than you do. Our platform will connect the world's best freelancers with businesses through intelligent automation.`,
      author: "The Clykur Team",
      position: "Founding Team",
      company: "Clykur",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&h=80&fit=crop&crop=face",
      companyLogo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=120&h=40&fit=crop",
      metrics: {
        vision: "AI-Powered Platform",
        timeline: "6 months to launch",
        impact: "Global marketplace"
      },
      rating: 5
    },
    {
      id: 2,
      quote: `Imagine never having to sift through hundreds of proposals. Our AI will instantly find the perfect match based on project complexity, budget, timeline, and cultural fit.`,
      author: "The Clykur Team",
      position: "Product Vision",
      company: "Clykur",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&h=80&fit=crop&crop=face",
      companyLogo: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?w=120&h=40&fit=crop",
      metrics: {
        accuracy: "95% match rate",
        speed: "Instant matching",
        global: "150+ countries"
      },
      rating: 5
    },
    {
      id: 3,
      quote: `We're not just building another freelancing platform. We're creating an intelligent ecosystem that automates everything from project scoping to payment processing.`,
      author: "The Clykur Team",
      position: "Technical Vision",
      company: "Clykur",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&h=80&fit=crop&crop=face",
      companyLogo: "https://images.pixabay.com/photo/2016/12/27/21/03/lone-tree-1934897_1280.jpg?w=120&h=40&fit=crop",
      metrics: {
        automation: "90% automated",
        efficiency: "10x productivity",
        uptime: "99.9% availability"
      },
      rating: 5
    },
    {
      id: 4,
      quote: `Our AI will handle everything: project briefs, milestone tracking, quality assurance, and payments. You just approve and watch your business grow.`,
      author: "The Clykur Team",
      position: "Automation Vision",
      company: "Clykur",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&h=80&fit=crop&crop=face",
      companyLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=40&fit=crop",
      metrics: {
        features: "4+ AI modules",
        integration: "500+ tools",
        scale: "1M+ users target"
      },
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVision((prev) => (prev + 1) % visionStatements.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [visionStatements.length]);

  const nextVision = () => {
    setCurrentVision((prev) => (prev + 1) % visionStatements.length);
  };

  const prevVision = () => {
    setCurrentVision((prev) => (prev - 1 + visionStatements.length) % visionStatements.length);
  };

  const current = visionStatements[currentVision];

  return (
    <section className="py-20 bg-gradient-to-br from-surface to-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Our <span className="text-gradient">Vision</span> for the Future
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            We're not just building another platform—we're creating the future of work. Here's our vision for how AI will transform business and freelancing globally.
          </p>
        </div>

        {/* Main Vision Statement */}
        <div className="relative max-w-5xl mx-auto">
          <div className="card p-8 lg:p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
              <Icon name="Lightbulb" size={128} className="text-secondary" />
            </div>

            <div className="relative grid lg:grid-cols-3 gap-8 items-center">
              {/* Vision Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Vision Badge */}
                <div className="flex space-x-1">
                  <div className="inline-flex items-center px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                    <Icon name="Rocket" size={14} className="mr-1" />
                    Vision Statement
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-lg lg:text-xl text-text-primary leading-relaxed font-medium">
                  "{current.quote}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                    <Icon name="Users" size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-text-primary">{current.author}</div>
                    <div className="text-text-secondary text-sm">{current.position}</div>
                    <div className="text-secondary text-sm font-medium">{current.company}</div>
                  </div>
                </div>

                {/* Clykur Logo */}
                <div className="pt-4">
                  <div className="inline-flex items-center px-4 py-2 bg-secondary/10 text-secondary rounded-lg font-semibold">
                    <Icon name="Zap" size={16} className="mr-2" />
                    Clykur
                  </div>
                </div>
              </div>

              {/* Vision Metrics Panel */}
              <div className="space-y-4">
                <h4 className="font-semibold text-text-primary mb-4">Vision Impact</h4>
                {Object.entries(current.metrics).map(([key, value]) => (
                  <div key={key} className="bg-surface rounded-lg p-4 border border-border">
                    <div className="text-2xl font-bold text-secondary mb-1">{value}</div>
                    <div className="text-sm text-text-secondary capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={prevVision}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-background border border-border hover:bg-surface transition-colors duration-200"
              aria-label="Previous vision"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {visionStatements.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentVision(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentVision 
                      ? 'bg-secondary scale-125' :'bg-border hover:bg-text-secondary'
                  }`}
                  aria-label={`View vision ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextVision}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-background border border-border hover:bg-surface transition-colors duration-200"
              aria-label="Next vision"
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>
        </div>

        {/* Bottom Vision Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-text-primary">4</div>
            <div className="text-sm text-text-secondary">Vision Pillars</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-text-primary">95%</div>
            <div className="text-sm text-text-secondary">AI Match Accuracy</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-text-primary">2</div>
            <div className="text-sm text-text-secondary">Founding Team</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-text-primary">100%</div>
            <div className="text-sm text-text-secondary">AI-Powered Vision</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;