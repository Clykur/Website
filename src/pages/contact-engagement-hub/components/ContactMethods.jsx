import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContactMethods = () => {
  const contactMethods = [
    {
      id: 'waitlist',
      title: 'Join Waitlist',
      description: 'Be among the first to access our AI-powered products',
      icon: 'Rocket',
      color: 'from-red-500 to-orange-500',
      responseTime: 'Immediate',
      features: ['Early access', 'Product updates', 'Launch notifications'],
      action: 'Join Now',
      href: '#waitlist-form'
    },
    {
      id: 'vision',
      title: 'Our Vision',
      description: 'Learn about our revolutionary AI-powered products',
      icon: 'Eye',
      color: 'from-secondary to-blue-600',
      responseTime: 'Instant',
      features: ['Product roadmap', 'AI features', 'Technology insights'],
      action: 'Learn More',
      href: '/about-philosophy'
    },
    {
      id: 'partnership',
      title: 'Partnership',
      description: 'Explore collaboration opportunities with Clykur',
      icon: 'Handshake',
      color: 'from-success to-green-600',
      responseTime: '48 hours',
      features: ['Partnership discussion', 'Integration opportunities', 'Strategic collaboration'],
      action: 'Partner With Us',
      href: 'mailto:partnerships@clykur.com'
    },
    {
      id: 'general',
      title: 'General Inquiry',
      description: 'Questions about our products, technology, or vision',
      icon: 'Mail',
      color: 'from-accent to-yellow-500',
      responseTime: '24 hours',
      features: ['Product information', 'Technology details', 'Company vision'],
      action: 'Send Message',
      href: 'mailto:clykur@outlook.com'
    }
  ];

  const handleContactClick = (href) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.open(href, '_blank');
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Choose Your Engagement Path
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Choose how you'd like to connect with Clykur and be part of the AI revolution. Select the option that best matches your interest and engagement level.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 items-stretch">
          {contactMethods.map((method) => (
            <div
              key={method.id}
              className="card p-4 sm:p-6 hover:shadow-xl transition-all duration-300 group cursor-pointer h-full flex flex-col"
              onClick={() => handleContactClick(method.href)}
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${method.color} rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon name={method.icon} size={20} color="white" className="sm:w-6 sm:h-6" />
              </div>
              
              <h3 className="text-lg sm:text-xl font-semibold text-text-primary mb-2">
                {method.title}
              </h3>
              
              <p className="text-text-secondary mb-3 sm:mb-4 text-sm leading-relaxed">
                {method.description}
              </p>
              
              <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                <Icon name="Clock" size={14} className="text-success sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm font-medium text-success">
                  Response: {method.responseTime}
                </span>
              </div>
              
              <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                {method.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2 text-xs sm:text-sm text-text-secondary">
                    <Icon name="Check" size={12} className="text-success mt-0.5 flex-shrink-0 sm:w-3.5 sm:h-3.5" />
                    <span className="leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-auto">
                <Button
                  variant="outline"
                  fullWidth
                  size="sm"
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="group-hover:bg-primary group-hover:text-secondary transition-colors duration-300 text-sm sm:text-base"
                >
                  {method.action}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactMethods;
