import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const visionStatements = [
    {
      id: 1,
      content: `"We're building the future of work where AI understands your business better than you do, connecting you with the perfect talent instantly."`,
      author: "The Clykur Team",
      role: "Product Vision"
    },
    {
      id: 2,
      content: `"Our AI-powered products will revolutionize how businesses operate, making intelligent automation accessible to everyone."`,
      author: "Chandu Kalluru",
      role: "Founder & CEO"
    },
    {
      id: 3,
      content: `"We're not just building another platform—we're creating intelligent, self-evolving digital ecosystems that transform the digital economy."`,
      author: "Karthik Naramala",
      role: "Co-Founder & CTO"
    }
  ];

  const productMetrics = [
    { value: '5+', label: 'AI Products', icon: 'Brain' },
    { value: 'Q2 2026', label: 'Launch Timeline', icon: 'Rocket' },
    { value: '100%', label: 'AI-Powered', icon: 'Zap' },
    { value: '2', label: 'Founding Team', icon: 'Users' }
  ];

  const technologyStack = [
    { name: 'GPT-4 Integration', icon: 'Brain' },
    { name: 'Neural Networks', icon: 'Network' },
    { name: 'Predictive Analytics', icon: 'TrendingUp' },
    { name: 'Real-time Automation', icon: 'Zap' },
    { name: 'Global Infrastructure', icon: 'Globe' },
    { name: 'Cultural AI', icon: 'Users' }
  ];

  const securityFeatures = [
    { name: 'SSL Certificate (A+ Rating)', icon: 'Shield' },
    { name: 'GDPR Compliant Data Handling', icon: 'Lock' },
    { name: 'Regular Security Audits', icon: 'Search' },
    { name: 'Encrypted Communication', icon: 'Key' }
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Trusted by Visionary Teams
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            See what our team says about Clykur's revolutionary AI-powered products and the trust signals that demonstrate our commitment to innovation.
          </p>
        </div>

        {/* Vision Statements */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-text-primary mb-8 text-center">Our Vision for the Future</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {visionStatements.map((statement) => (
              <div key={statement.id} className="card p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Quote" size={24} color="white" />
                </div>
                <blockquote className="text-text-primary font-medium italic mb-4">
                  {statement.content}
                </blockquote>
                <div className="border-t border-border pt-4">
                  <div className="font-semibold text-text-primary">{statement.author}</div>
                  <div className="text-sm text-text-secondary">{statement.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Metrics */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-text-primary mb-8 text-center">Product Innovation Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {productMetrics.map((metric, index) => (
              <div key={index} className="bg-background rounded-xl p-6 border border-border hover:border-accent/20 hover:shadow-md transition-all duration-300 group">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-success/10 text-success mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Icon name={metric.icon} size={20} />
                </div>
                <div className="text-2xl font-bold text-text-primary mb-1">{metric.value}</div>
                <div className="text-sm text-text-secondary font-medium">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-text-primary mb-8 text-center">Revolutionary Technology Stack</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {technologyStack.map((tech, index) => (
              <div key={index} className="bg-background rounded-lg p-4 border border-border text-center hover:border-accent/20 transition-colors duration-300">
                <Icon name={tech.icon} size={24} className="text-secondary mx-auto mb-2" />
                <div className="text-sm font-medium text-text-primary">{tech.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Security & Privacy */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-text-primary mb-8 text-center">Security & Privacy</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="bg-background rounded-lg p-4 border border-border flex items-center space-x-3">
                <Icon name={feature.icon} size={20} className="text-success flex-shrink-0" />
                <span className="text-sm text-text-primary">{feature.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary to-surface rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Ready to Experience This Level of Innovation?
            </h3>
            <p className="text-text-secondary mb-8 text-lg">
              Join our waitlist and be among the first to experience our revolutionary AI-powered products when we launch in Q2 2026.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#waitlist-form"
                className="inline-flex items-center justify-center px-8 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors duration-200 font-medium"
              >
                <Icon name="Rocket" size={20} className="mr-2" />
                Join Waitlist
              </a>
              <a
                href="#vision-session"
                className="inline-flex items-center justify-center px-8 py-3 border border-border text-text-primary rounded-lg hover:bg-background transition-colors duration-200 font-medium"
              >
                <Icon name="Eye" size={20} className="mr-2" />
                Learn About Our Vision
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;