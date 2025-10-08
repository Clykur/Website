import React from 'react';
import Icon from '../../../components/AppIcon';

const TechnicalPhilosophy = () => {
  const philosophyPrinciples = [
    {
      icon: "Brain",
      title: "AI-First Innovation",
      description: "Every product decision is driven by artificial intelligence. We build systems that learn, adapt, and evolve with user needs.",
      example: "Neural networks that continuously learn from user behavior to optimize product features and predict user needs before they're expressed."
    },
    {
      icon: "Globe",
      title: "Global Digital Ecosystems",
      description: "Building products that transcend geographical boundaries, creating intelligent digital environments that adapt to local markets worldwide.",
      example: "AI-powered localization engines that automatically adapt product interfaces and functionality based on cultural and regional preferences."
    },
    {
      icon: "Shield",
      title: "Transparent Automation",
      description: "Every automated process is transparent and auditable. Users understand exactly how AI decisions are made.",
      example: "Open-source AI decision trees that show users exactly how our products make recommendations, building trust through complete transparency."
    },
    {
      icon: "Zap",
      title: "Intelligent Efficiency",
      description: "Our AI doesn't just automate tasks—it optimizes entire workflows, making businesses 10x more productive.",
      example: "Self-optimizing product algorithms that automatically improve performance, reduce resource usage, and enhance user experience without manual intervention."
    }
  ];


  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Product Innovation Philosophy
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Our approach to product development is rooted in AI-first principles that create intelligent, efficient, and transparent digital ecosystems.
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

      </div>
    </section>
  );
};

export default TechnicalPhilosophy;