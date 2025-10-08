import React from 'react';
import Icon from '../../../components/AppIcon';

const FounderStory = () => {
  const storyPoints = [
    {
      icon: "GraduationCap",
      title: "R&D Foundation",
      description: "Deep roots in Computer Science research and development, with extensive experience in building scalable web technologies and AI-powered systems."
    },
    {
      icon: "Building2",
      title: "Product Innovation",
      description: "Years of experience in product development taught us that the future belongs to companies that build intelligent, self-evolving digital products."
    },
    {
      icon: "Lightbulb",
      title: "The Vision",
      description: "We recognized that the digital economy needs revolutionary products—AI-powered platforms that understand the intersection of technology, automation, and human potential."
    },
    {
      icon: "Rocket",
      title: "Clykur's Mission",
      description: "We're building the world's first AI-powered product platform that creates intelligent, self-evolving digital ecosystems for the future of work."
    }
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="pt-8 text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            From R&D to Product Innovation
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Our journey from research backgrounds to building Clykur—a product-driven technology company creating revolutionary AI-powered products that transform the digital economy.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Story Content */}
          <div className="space-y-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-text-secondary leading-relaxed">
                Our journey began in research and development, where we spent years building cutting-edge web technologies and AI systems. While the technical challenges were fascinating, we noticed a fundamental opportunity in the digital economy: the potential to create intelligent products that could revolutionize how work gets done.
              </p>
              
              <p className="text-text-secondary leading-relaxed">
                We envisioned a world where AI-powered products could understand business needs, predict market demands, and automatically connect the right people at the right time. The opportunity wasn't just better matching—it was building intelligent products that could scale globally and learn continuously.
              </p>
              
              <p className="text-text-secondary leading-relaxed">
                That's when we realized our calling: to build Clykur—the world's first AI-powered product platform that creates intelligent, self-evolving digital ecosystems that transform the future of work through technology innovation.
              </p>
            </div>

            <div className="bg-background border border-border rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="Quote" size={24} color="white" />
                </div>
                <div>
                  <blockquote className="text-text-primary font-medium italic">
                    "We're building revolutionary AI-powered products that understand business needs, predict market demands, and automatically orchestrate the future of work through intelligent technology."
                  </blockquote>
                  <cite className="text-text-secondary text-sm mt-2 block">— Chandu Kalluru & Karthik Naramala</cite>                </div>
              </div>
            </div>
          </div>

          {/* Story Timeline */}
          <div className="space-y-6">
            {storyPoints.map((point, index) => (
              <div key={index} className="flex items-start space-x-4 group">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                  <Icon name={point.icon} size={20} color="white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {point.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderStory;