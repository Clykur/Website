import React from 'react';
import Icon from '../../../components/AppIcon';

const ClientLogoMarquee = () => {
  const technologies = [
    {
      name: "AI & Machine Learning",
      icon: "Brain",
      description: "GPT-4, Neural Networks, Predictive Analytics"
    },
    {
      name: "Cloud Infrastructure",
      icon: "Cloud",
      description: "AWS, Azure, Global CDN, Microservices"
    },
    {
      name: "Real-time Communication",
      icon: "MessageCircle",
      description: "WebRTC, WebSockets, Live Collaboration"
    },
    {
      name: "Data Intelligence",
      icon: "BarChart",
      description: "Big Data, Analytics, Business Intelligence"
    },
    {
      name: "Security & Compliance",
      icon: "Shield",
      description: "End-to-end Encryption, GDPR, SOC2"
    },
    {
      name: "Mobile & Web",
      icon: "Smartphone",
      description: "React Native, Progressive Web Apps"
    },
    {
      name: "API Integration",
      icon: "Zap",
      description: "RESTful APIs, GraphQL, Third-party Integrations"
    },
    {
      name: "Automation",
      icon: "Bot",
      description: "Workflow Automation, Smart Triggers"
    }
  ];

  // Duplicate for seamless loop
  const duplicatedTechnologies = [...technologies, ...technologies];

  return (
    <section className="py-16 bg-surface border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
            <Icon name="Zap" size={16} className="mr-2" />
            🚀 Technology Stack
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
            Built with <span className="text-gradient">Cutting-Edge</span> Technology
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
            Our platform leverages the latest AI, cloud, and automation technologies to deliver unprecedented business intelligence and global scalability.
          </p>
          <div className="flex justify-center items-center space-x-8 text-sm text-text-secondary">
            <div className="flex items-center px-3 py-1.5 bg-success/10 text-success rounded-full">
              <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
              AI-Powered
            </div>
            <div className="flex items-center px-3 py-1.5 bg-secondary/10 text-secondary rounded-full">
              <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
              Cloud-Native
            </div>
            <div className="flex items-center px-3 py-1.5 bg-accent/10 text-accent rounded-full">
              <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
              Global Scale
            </div>
          </div>
        </div>

        {/* Technology Marquee Container */}
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee space-x-6 sm:space-x-8">
            {duplicatedTechnologies.map((tech, index) => (
              <div
                key={`${tech.name}-${index}`}
                className="flex-shrink-0 group"
              >
                <div className="relative bg-background rounded-xl p-6 shadow-sm border border-border hover:shadow-lg hover:border-accent/20 transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1">
                  {/* Icon Container */}
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-secondary/10 to-accent/10 group-hover:from-secondary/20 group-hover:to-accent/20 transition-all duration-300">
                    <Icon 
                      name={tech.icon} 
                      size={28} 
                      className="text-secondary group-hover:text-accent transition-colors duration-300" 
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-sm font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors duration-300">
                      {tech.name}
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {tech.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-surface to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-surface to-transparent pointer-events-none"></div>
        </div>

        {/* Technology Stats Row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-background rounded-xl p-6 border border-border hover:border-accent/20 hover:shadow-md transition-all duration-300 group">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-success/10 text-success mb-3 group-hover:scale-110 transition-transform duration-300">
                <Icon name="Layers" size={20} />
              </div>
              <div className="text-2xl font-bold text-text-primary mb-1">8+</div>
              <div className="text-sm text-text-secondary font-medium">Core Technologies</div>
            </div>
          </div>
          
          <div className="bg-background rounded-xl p-6 border border-border hover:border-accent/20 hover:shadow-md transition-all duration-300 group">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-secondary/10 text-secondary mb-3 group-hover:scale-110 transition-transform duration-300">
                <Icon name="Brain" size={20} />
              </div>
              <div className="text-2xl font-bold text-text-primary mb-1">100%</div>
              <div className="text-sm text-text-secondary font-medium">AI-Powered</div>
            </div>
          </div>
          
          <div className="bg-background rounded-xl p-6 border border-border hover:border-accent/20 hover:shadow-md transition-all duration-300 group">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 text-accent mb-3 group-hover:scale-110 transition-transform duration-300">
                <Icon name="Globe" size={20} />
              </div>
              <div className="text-2xl font-bold text-text-primary mb-1">50+</div>
              <div className="text-sm text-text-secondary font-medium">Target Countries</div>
            </div>
          </div>
          
          <div className="bg-background rounded-xl p-6 border border-border hover:border-accent/20 hover:shadow-md transition-all duration-300 group">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-success/10 text-success mb-3 group-hover:scale-110 transition-transform duration-300">
                <Icon name="Zap" size={20} />
              </div>
              <div className="text-2xl font-bold text-text-primary mb-1">90%</div>
              <div className="text-sm text-text-secondary font-medium">Automation Rate</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-marquee {
          animation: marquee 24s linear infinite;
        }
        
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        
        @media (min-width: 640px) {
          .animate-marquee {
            animation-duration: 30s;
          }
        }
      `}</style>
    </section>
  );
};

export default ClientLogoMarquee;