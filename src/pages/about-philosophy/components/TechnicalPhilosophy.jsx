import React from 'react';
import Icon from '../../../components/AppIcon';

const TechnicalPhilosophy = () => {
  const philosophyPrinciples = [
    {
      icon: "Users",
      title: "User-First Design",
      description: "Every technical decision starts with the end user. Beautiful code means nothing if it doesn't solve real problems elegantly.",
      example: "Implementing progressive loading for better perceived performance, even when the backend is lightning fast."
    },
    {
      icon: "Layers",
      title: "Scalable Architecture",
      description: "Building systems that grow with your business, not against it. Today's solution should enable tomorrow's opportunities.",
      example: "Microservices architecture that allows individual components to scale independently as user demand grows."
    },
    {
      icon: "Shield",
      title: "Maintainable Code",
      description: "Code is read more often than it's written. Clean, documented, and tested code is an investment in your future.",
      example: "Comprehensive test coverage and clear documentation that allows any developer to contribute confidently."
    },
    {
      icon: "Zap",
      title: "Performance Obsession",
      description: "Speed is a feature. Every millisecond matters when it comes to user experience and business conversion.",
      example: "Optimizing bundle sizes and implementing smart caching strategies for sub-second load times."
    }
  ];

  const technicalApproach = [
    {
      phase: "Discovery & Planning",
      description: "Deep dive into business requirements, user needs, and technical constraints",
      tools: ["User Story Mapping", "Technical Architecture Review", "Risk Assessment"]
    },
    {
      phase: "Architecture Design",
      description: "Creating scalable, maintainable system architecture with future growth in mind",
      tools: ["System Design", "Database Modeling", "API Specification"]
    },
    {
      phase: "Iterative Development",
      description: "Agile development with continuous feedback and rapid iteration cycles",
      tools: ["Sprint Planning", "Code Reviews", "Automated Testing"]
    },
    {
      phase: "Quality Assurance",
      description: "Comprehensive testing and optimization before deployment",
      tools: ["Unit Testing", "Integration Testing", "Performance Optimization"]
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Technical Philosophy
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            My approach to development is rooted in four core principles that ensure every project delivers exceptional value and long-term success.
          </p>
        </div>

        {/* Philosophy Principles */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {philosophyPrinciples.map((principle, index) => (
            <div key={index} className="card p-8 card-hover">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={principle.icon} size={24} color="white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
              
              <div className="bg-surface border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Lightbulb" size={16} className="text-accent" />
                  <span className="text-sm font-medium text-text-primary">Real Example</span>
                </div>
                <p className="text-sm text-text-secondary italic">
                  {principle.example}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Approach */}
        <div className="bg-surface rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4">
              Development Approach
            </h3>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              A proven methodology that ensures project success from concept to deployment and beyond.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {technicalApproach.map((phase, index) => (
              <div key={index} className="relative">
                {/* Connection Line */}
                {index < technicalApproach.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-secondary to-accent transform translate-x-4 z-0"></div>
                )}
                
                <div className="relative z-10 bg-background border border-border rounded-xl p-6 card-hover">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center mb-4">
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  
                  <h4 className="text-lg font-semibold text-text-primary mb-3">
                    {phase.phase}
                  </h4>
                  
                  <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                    {phase.description}
                  </p>
                  
                  <div className="space-y-2">
                    {phase.tools.map((tool, toolIndex) => (
                      <div key={toolIndex} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                        <span className="text-xs text-text-secondary">{tool}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalPhilosophy;