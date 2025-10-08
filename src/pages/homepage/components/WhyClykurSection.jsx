import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const WhyClykurSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const startupVision = [
    {
      id: 1,
      title: "Revolutionary AI Matching",
      description: "Our proprietary AI algorithm analyzes project requirements, skills, and work styles to create perfect business-freelancer matches in seconds.",
      icon: "Zap",
      color: "success",
      vision: {
        title: "The Future of Work Matching",
        description: "Imagine never having to sift through hundreds of proposals. Our AI instantly finds the perfect match based on project complexity, budget, timeline, and cultural fit.",
        impact: "95% match accuracy • 10x faster hiring • 80% cost reduction • Perfect fit guarantee",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop"
      }
    },
    {
      id: 2,
      title: "Global Talent Access",
      description: "Break geographical barriers and access the world's best freelancers through our intelligent global marketplace with real-time collaboration tools.",
      icon: "Globe",
      color: "secondary",
      vision: {
        title: "Worldwide Talent Network",
        description: "Connect with top-tier freelancers from Silicon Valley to Singapore, with AI-powered translation, timezone optimization, and cultural intelligence.",
        impact: "150+ countries • 24/7 availability • Instant translation • Cultural intelligence",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop"
      }
    },
    {
      id: 3,
      title: "Intelligent Automation",
      description: "From project scoping to payment processing, our AI handles the entire workflow, letting you focus on what matters most - growing your business.",
      icon: "Bot",
      color: "accent",
      vision: {
        title: "Fully Automated Workflows",
        description: "Our AI handles everything: project briefs, milestone tracking, quality assurance, and payments. You just approve and watch your business grow.",
        impact: "90% automation • Zero manual work • 5x productivity • 24/7 operation",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop"
      }
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      success: {
        bg: 'bg-success/10',
        text: 'text-success',
        border: 'border-success/20',
        hover: 'hover:bg-success/20'
      },
      secondary: {
        bg: 'bg-secondary/10',
        text: 'text-secondary',
        border: 'border-secondary/20',
        hover: 'hover:bg-secondary/20'
      },
      accent: {
        bg: 'bg-accent/10',
        text: 'text-accent',
        border: 'border-accent/20',
        hover: 'hover:bg-accent/20'
      }
    };
    return colorMap[color];
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Why <span className="text-gradient">Clykur</span> Will Change Everything
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            We're not just another freelancing platform. We're building the future of work with AI that understands your business better than you do.
          </p>
        </div>

        {/* Startup Vision Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {startupVision.map((item) => {
            const colors = getColorClasses(item.color);
            const isHovered = hoveredCard === item.id;
            
            return (
              <div
                key={item.id}
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Main Card */}
                <div className={`card p-8 h-full transition-all duration-500 ${
                  isHovered ? 'transform -translate-y-2 shadow-xl' : 'hover:shadow-lg'
                }`}>
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${colors.bg} ${colors.text} mb-6`}>
                    <Icon name={item.icon} size={24} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-text-primary mb-4">
                    {item.title}
                  </h3>
                  
                  <p className="text-text-secondary leading-relaxed">
                    {item.description}
                  </p>

                  {/* Hover Indicator */}
                  <div className={`mt-6 flex items-center ${colors.text} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                    <span className="text-sm font-medium mr-2">See Our Vision</span>
                    <Icon name="ArrowRight" size={16} />
                  </div>
                </div>

                {/* Vision Overlay */}
                <div className={`absolute inset-0 bg-background border-2 ${colors.border} rounded-lg p-6 transition-all duration-500 ${
                  isHovered ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}>
                  <div className="h-full flex flex-col">
                    <div className="aspect-video mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={item.vision.image}
                        alt={item.vision.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-bold text-text-primary mb-2">
                        {item.vision.title}
                      </h4>
                      
                      <p className="text-sm text-text-secondary mb-4">
                        {item.vision.description}
                      </p>
                      
                      <div className={`text-xs ${colors.text} font-medium bg-surface p-3 rounded-lg`}>
                        {item.vision.impact}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyClykurSection;