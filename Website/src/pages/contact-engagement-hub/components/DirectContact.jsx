import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DirectContact = () => {
  const contactInfo = [
    {
      type: 'email',
      label: 'Email',
      value: 'clykur@outlook.com',
      description: 'For general inquiries and project discussions',
      icon: 'Mail',
      action: 'mailto:clykur@outlook.com',
      responseTime: '24-48 hours'
    },
    {
      type: 'phone',
      label: 'Phone',
      value: '+91 81792 99096',
      description: 'For urgent matters and direct conversations',
      icon: 'Phone',
      action: 'tel:+918179299096',
      responseTime: 'Business hours'
    },
    {
      type: 'linkedin',
      label: 'LinkedIn',
      value: 'Clykur',
      description: 'Professional networking and industry discussions',
      icon: 'Linkedin',
      action: 'https://www.linkedin.com/company/clykur',
      responseTime: '1-2 days'
    },
    {
      type: 'whatsapp',
      label: 'WhatsApp',
      value: '+91 8179299096',
      description: 'Quick questions and project updates',
      icon: 'MessageCircle',
      action: 'https://wa.me/918179299096',
      responseTime: 'Same day'
    }
  ];

  const officeHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM EST' },
    { day: 'Saturday', hours: '10:00 AM - 2:00 PM EST' },
    { day: 'Sunday', hours: 'Emergency only' }
  ];

  const handleContactClick = (action) => {
    if (action.startsWith('http')) {
      window.open(action, '_blank');
    } else {
      window.location.href = action;
    }
  };

  return (
    <section id="general-contact" className="py-16 lg:py-24 bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Direct Contact Options
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Choose your preferred communication channel. I'm committed to responsive communication and will get back to you within the specified timeframes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Methods */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactInfo.map((contact) => (
                <div
                  key={contact.type}
                  className="card p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => handleContactClick(contact.action)}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon name={contact.icon} size={24} color="white" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-text-primary mb-1">
                        {contact.label}
                      </h3>
                      <p className="text-secondary font-medium mb-2">
                        {contact.value}
                      </p>
                      <p className="text-text-secondary text-sm mb-3">
                        {contact.description}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Icon name="Clock" size={14} className="text-success" />
                        <span className="text-xs text-success font-medium">
                          Response: {contact.responseTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Office Hours & Response Times */}
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center space-x-2">
                <Icon name="Clock" size={20} className="text-secondary" />
                <span>Office Hours</span>
              </h3>
              <div className="space-y-3">
                {officeHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-text-secondary text-sm">{schedule.day}</span>
                    <span className="text-text-primary text-sm font-medium">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-6 bg-primary">
              <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center space-x-2">
                <Icon name="Shield" size={20} className="text-success" />
                <span>Response Guarantee</span>
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2 text-sm">
                  <Icon name="Check" size={14} className="text-success" />
                  <span className="text-text-secondary">Urgent: 24 hours</span>
                </li>
                <li className="flex items-center space-x-2 text-sm">
                  <Icon name="Check" size={14} className="text-success" />
                  <span className="text-text-secondary">Projects: 48 hours</span>
                </li>
                <li className="flex items-center space-x-2 text-sm">
                  <Icon name="Check" size={14} className="text-success" />
                  <span className="text-text-secondary">General: 72 hours</span>
                </li>
              </ul>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Emergency Contact
              </h3>
              <p className="text-text-secondary text-sm mb-4">
                For critical issues with existing projects or time-sensitive opportunities.
              </p>
              <Button
                variant="outline"
                fullWidth
                iconName="Phone"
                iconPosition="left"
                onClick={() => handleContactClick('tel:+15551234567')}
              >
                Call Emergency Line
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6 text-center">
            <Icon name="Calendar" size={32} className="text-secondary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Schedule a Call
            </h3>
            <p className="text-text-secondary text-sm mb-4">
              Book a convenient time for a detailed discussion
            </p>
            <Button
              variant="primary"
              fullWidth
              onClick={() => document.querySelector('#consultation-booking').scrollIntoView({ behavior: 'smooth' })}
            >
              Book Now
            </Button>
          </div>

          <div className="card p-6 text-center">
            <Icon name="Send" size={32} className="text-secondary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Send Project Brief
            </h3>
            <p className="text-text-secondary text-sm mb-4">
              Share your project details for a detailed proposal
            </p>
            <Button
              variant="primary"
              fullWidth
              onClick={() => document.querySelector('#project-form').scrollIntoView({ behavior: 'smooth' })}
            >
              Send Brief
            </Button>
          </div>

          <div className="card p-6 text-center">
            <Icon name="MessageSquare" size={32} className="text-secondary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Quick Question
            </h3>
            <p className="text-text-secondary text-sm mb-4">
              Get fast answers to your development questions
            </p>
            <Button
              variant="primary"
              fullWidth
              onClick={() => handleContactClick('mailto:hello@clykur.com?subject=Quick Question')}
            >
              Ask Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DirectContact;