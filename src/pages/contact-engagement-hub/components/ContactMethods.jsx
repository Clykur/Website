import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContactMethods = () => {
  const contactMethods = [
    {
      id: 'urgent',
      title: 'Urgent Project',
      description: 'Time-sensitive opportunities with immediate needs',
      icon: 'Zap',
      color: 'from-red-500 to-orange-500',
      responseTime: '24 hours',
      features: ['Priority handling', 'Direct founder contact', 'Expedited proposal'],
      action: 'Get Urgent Help',
      href: 'mailto:urgent@clykur.com?subject=Urgent Project Inquiry'
    },
    {
      id: 'consultation',
      title: 'Technical Consultation',
      description: '30-minute strategy session with Chandu Kalluru',
      icon: 'Calendar',
      color: 'from-secondary to-blue-600',
      responseTime: 'Same day',
      features: ['Free consultation', 'Project roadmap', 'Technology recommendations'],
      action: 'Book Consultation',
      href: '#consultation-booking'
    },
    {
      id: 'project',
      title: 'Project Inquiry',
      description: 'Detailed project discussion and proposal request',
      icon: 'Briefcase',
      color: 'from-success to-green-600',
      responseTime: '48 hours',
      features: ['Detailed proposal', 'Timeline estimation', 'Budget discussion'],
      action: 'Start Project',
      href: '#project-form'
    },
    {
      id: 'general',
      title: 'General Inquiry',
      description: 'Questions about services, process, or collaboration',
      icon: 'Mail',
      color: 'from-accent to-yellow-500',
      responseTime: '72 hours',
      features: ['Service information', 'Process overview', 'Partnership discussion'],
      action: 'Send Message',
      href: '#general-contact'
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
            Different projects have different needs. Select the communication channel that best matches your timeline and requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactMethods.map((method) => (
            <div
              key={method.id}
              className="card p-6 hover:shadow-xl transition-all duration-300 group cursor-pointer"
              onClick={() => handleContactClick(method.href)}
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon name={method.icon} size={24} color="white" />
              </div>
              
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                {method.title}
              </h3>
              
              <p className="text-text-secondary mb-4 text-sm">
                {method.description}
              </p>
              
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Clock" size={16} className="text-success" />
                <span className="text-sm font-medium text-success">
                  Response: {method.responseTime}
                </span>
              </div>
              
              <ul className="space-y-2 mb-6">
                {method.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm text-text-secondary">
                    <Icon name="Check" size={14} className="text-success" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                variant="outline"
                fullWidth
                iconName="ArrowRight"
                iconPosition="right"
                className="group-hover:bg-primary group-hover:text-secondary transition-colors duration-300"
              >
                {method.action}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactMethods;