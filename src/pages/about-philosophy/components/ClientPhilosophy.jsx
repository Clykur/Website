import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ClientPhilosophy = () => {
  const partnershipPrinciples = [
    {
      icon: "Handshake",
      title: "Partnership Over Vendor Relationship",
      description: "I don't just execute your requirements—I help shape them. Your success is my success, and I'm invested in your long-term growth."
    },
    {
      icon: "MessageCircle",
      title: "Transparent Communication",
      description: "Regular updates, honest feedback, and open dialogue. You'll always know where your project stands and why decisions are made."
    },
    {
      icon: "Users",
      title: "Collaborative Development",
      description: "Your team becomes my team. I work alongside your stakeholders to ensure everyone is aligned and contributing to the vision."
    },
    {
      icon: "TrendingUp",
      title: "Growth-Oriented Thinking",
      description: "Every technical decision considers your future needs. I build solutions that scale with your ambitions, not against them."
    }
  ];

  const collaborationExamples = [
    {
      client: "TechStart Inc.",
      challenge: "Needed to pivot their platform architecture mid-development",
      solution: "Worked together to redesign the system without losing momentum",
      outcome: "Launched 2 weeks ahead of schedule with improved scalability",
      duration: "18 months ongoing",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop"
    },
    {
      client: "GrowthCorp",
      challenge: "Struggling with technical debt from previous development",
      solution: "Gradual refactoring while maintaining business operations",
      outcome: "50% improvement in performance, 90% reduction in bugs",
      duration: "12 months ongoing",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop"
    },
    {
      client: "InnovateLab",
      challenge: "Needed rapid prototyping for investor presentations",
      solution: "Agile development with weekly stakeholder reviews",
      outcome: "Secured Series A funding, now scaling the platform",
      duration: "24 months ongoing",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
    }
  ];

  const supportAreas = [
    {
      icon: "Code",
      title: "Technical Architecture",
      description: "System design, technology selection, and scalability planning"
    },
    {
      icon: "Users",
      title: "Team Guidance",
      description: "Mentoring internal developers and establishing best practices"
    },
    {
      icon: "BarChart3",
      title: "Business Strategy",
      description: "Aligning technical decisions with business objectives"
    },
    {
      icon: "Shield",
      title: "Risk Management",
      description: "Identifying and mitigating technical and project risks"
    }
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Client Partnership Philosophy
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Building lasting relationships through trust, transparency, and shared success. Your growth is my priority.
          </p>
        </div>

        {/* Partnership Principles */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {partnershipPrinciples.map((principle, index) => (
            <div key={index} className="card p-8 card-hover">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={principle.icon} size={24} color="white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-text-primary mb-3">
                    {principle.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Long-term Collaboration Examples */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4">
              Long-term Partnership Success Stories
            </h3>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Real examples of how ongoing partnerships have driven business growth and technical excellence.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {collaborationExamples.map((example, index) => (
              <div key={index} className="card overflow-hidden card-hover">
                <div className="h-48 overflow-hidden">
                  <Image
                    src={example.image}
                    alt={`${example.client} collaboration`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-text-primary">
                      {example.client}
                    </h4>
                    <span className="bg-success/10 text-success text-xs px-2 py-1 rounded-full">
                      {example.duration}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <Icon name="AlertCircle" size={14} className="text-warning" />
                        <span className="text-sm font-medium text-text-primary">Challenge</span>
                      </div>
                      <p className="text-text-secondary text-sm">{example.challenge}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <Icon name="Lightbulb" size={14} className="text-secondary" />
                        <span className="text-sm font-medium text-text-primary">Solution</span>
                      </div>
                      <p className="text-text-secondary text-sm">{example.solution}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <Icon name="TrendingUp" size={14} className="text-success" />
                        <span className="text-sm font-medium text-text-primary">Outcome</span>
                      </div>
                      <p className="text-text-secondary text-sm">{example.outcome}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support Areas */}
        <div className="bg-background rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4">
              How I Support Your Business Growth
            </h3>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Beyond development, I provide strategic guidance across multiple areas of your business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportAreas.map((area, index) => (
              <div key={index} className="text-center p-6 card card-hover">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon name={area.icon} size={24} color="white" />
                </div>
                <h4 className="text-lg font-semibold text-text-primary mb-3">
                  {area.title}
                </h4>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {area.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-xl p-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Icon name="Heart" className="text-secondary" />
                <span className="text-xl font-semibold text-text-primary">Partnership Commitment</span>
              </div>
              <p className="text-text-secondary max-w-2xl mx-auto">
                When you work with Clykur, you're not just hiring a developer—you're gaining a technical partner who is genuinely invested in your success. I measure my success by your growth, not just project completion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientPhilosophy;