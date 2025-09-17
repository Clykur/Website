import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const WhyClykurSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const differentiators = [
    {
      id: 1,
      title: "Startup-Speed Development",
      description: "Rapid prototyping and iterative development that keeps pace with your vision and market demands.",
      icon: "Zap",
      color: "success",
      caseStudy: {
        title: "FinTech MVP in 6 Weeks",
        description: "Delivered a complete financial management platform from concept to launch, enabling client to secure Series A funding.",
        metrics: "6 weeks delivery • $2M funding raised • 10K+ users in month 1",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop"
      }
    },
    {
      id: 2,
      title: "Enterprise-Grade Architecture",
      description: "Scalable, secure, and maintainable solutions built with industry best practices and future growth in mind.",
      icon: "Shield",
      color: "secondary",
      caseStudy: {
        title: "Healthcare Platform Scale-Up",
        description: "Architected a telemedicine platform that seamlessly scaled from 1K to 100K concurrent users without downtime.",
        metrics: "99.9% uptime • 100x user growth • HIPAA compliant • Zero security incidents",
        image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?w=400&h=200&fit=crop"
      }
    },
    {
      id: 3,
      title: "Partnership Approach",
      description: "We become your technical partner, providing strategic guidance beyond just development services.",
      icon: "Users",
      color: "accent",
      caseStudy: {
        title: "E-commerce Transformation",
        description: "Partnered with retail client to completely reimagine their digital presence, resulting in 300% revenue growth.",
        metrics: "300% revenue increase • 50% cost reduction • 95% customer satisfaction • 2 years partnership",
        image: "https://images.pixabay.com/photo/2017/10/04/09/56/laboratory-2815641_1280.jpg?w=400&h=200&fit=crop"
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
            Why Choose <span className="text-gradient">Clykur</span>?
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            We're not just another development agency. We're your technical partners who understand that great software transforms businesses.
          </p>
        </div>

        {/* Differentiators Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {differentiators.map((item) => {
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
                    <span className="text-sm font-medium mr-2">View Case Study</span>
                    <Icon name="ArrowRight" size={16} />
                  </div>
                </div>

                {/* Case Study Overlay */}
                <div className={`absolute inset-0 bg-background border-2 ${colors.border} rounded-lg p-6 transition-all duration-500 ${
                  isHovered ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}>
                  <div className="h-full flex flex-col">
                    <div className="aspect-video mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={item.caseStudy.image}
                        alt={item.caseStudy.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-bold text-text-primary mb-2">
                        {item.caseStudy.title}
                      </h4>
                      
                      <p className="text-sm text-text-secondary mb-4">
                        {item.caseStudy.description}
                      </p>
                      
                      <div className={`text-xs ${colors.text} font-medium bg-surface p-3 rounded-lg`}>
                        {item.caseStudy.metrics}
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