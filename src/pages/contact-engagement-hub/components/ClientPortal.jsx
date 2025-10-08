import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProductDevelopmentHub = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setEmail('');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    }, 2000);
  };

  const productFeatures = [
    {
      icon: 'Rocket',
      title: 'Product Roadmap',
      description: 'Real-time updates on our AI-powered product development and launch timeline'
    },
    {
      icon: 'Brain',
      title: 'AI Innovation',
      description: 'Deep insights into our revolutionary AI technology and automation capabilities'
    },
    {
      icon: 'Users',
      title: 'Community Access',
      description: 'Connect with other early adopters and provide feedback on product development'
    },
    {
      icon: 'Calendar',
      title: 'Launch Updates',
      description: 'Exclusive notifications about beta testing, demos, and product launches'
    },
    {
      icon: 'Download',
      title: 'Early Access',
      description: 'Priority access to beta versions and exclusive features before public launch'
    },
    {
      icon: 'MessageCircle',
      title: 'Direct Communication',
      description: 'Direct line to our development team for feedback and feature requests'
    }
  ];

  const securityFeatures = [
    { title: 'SSL Encrypted Communication', icon: 'Shield' },
    { title: 'Two-Factor Authentication', icon: 'Key' },
    { title: 'Regular Security Audits', icon: 'Search' },
    { title: 'GDPR Compliant Data Handling', icon: 'Lock' }
  ];

  if (submitStatus === 'success') {
    return (
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-success rounded-full mb-6">
              <Icon name="Check" size={32} color="white" />
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Welcome to Clykur's Development Hub!
            </h3>
            <p className="text-text-secondary mb-6">
              You've been added to our exclusive development updates list. You'll receive regular updates about our AI-powered products and early access opportunities.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center space-x-2 text-success">
                <Icon name="Mail" size={20} />
                <span>Updates sent to your email</span>
              </div>
              <div className="flex items-center space-x-2 text-success">
                <Icon name="Rocket" size={20} />
                <span>Early access coming soon</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Clykur Development Hub
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Get exclusive access to our product development journey, early beta testing opportunities, and direct communication with our AI innovation team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* What's Inside */}
          <div>
            <h3 className="text-2xl font-bold text-text-primary mb-6">What's Inside Our Hub</h3>
            <div className="space-y-6">
              {productFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name={feature.icon} size={24} color="white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary mb-2">{feature.title}</h4>
                    <p className="text-text-secondary text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-primary rounded-xl">
              <h4 className="font-bold text-text-primary mb-4">Secure & Private</h4>
              <div className="grid grid-cols-2 gap-3">
                {securityFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <Icon name={feature.icon} size={16} className="text-success" />
                    <span className="text-text-secondary">{feature.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Access Form */}
          <div className="card p-8">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-text-primary mb-2">
                Get Development Hub Access
              </h3>
              <p className="text-text-secondary text-sm">
                Join our exclusive development community and be among the first to experience our revolutionary AI-powered products.
              </p>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Email Address *
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                loading={isSubmitting}
                iconName="Rocket"
                iconPosition="right"
                className="w-full"
              >
                {isSubmitting ? 'Joining...' : 'Join Development Hub'}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-primary rounded-lg">
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Info" size={16} />
                <span>Access will be granted as soon as our products enter beta testing phase</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-background border border-border rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-text-primary mb-4">
              Ready to Experience the Future?
            </h3>
            <p className="text-text-secondary mb-6">
              Join our development hub and be part of the AI revolution. Get early access to products that will transform how businesses work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#waitlist-form"
                className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors duration-200"
              >
                <Icon name="Rocket" size={20} className="mr-2" />
                Join Waitlist
              </a>
              <a
                href="#vision-session"
                className="inline-flex items-center justify-center px-6 py-3 border border-border text-text-primary rounded-lg hover:bg-surface transition-colors duration-200"
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

export default ProductDevelopmentHub;