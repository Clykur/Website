import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustMetrics = [
    { icon: 'Users', value: '50+', label: 'Projects Delivered' },
    { icon: 'Star', value: '4.9/5', label: 'Client Rating' },
    { icon: 'Clock', value: '48hr', label: 'Response Time' },
    { icon: 'Shield', value: '100%', label: 'Confidential' }
  ];

  const certifications = [
    { name: 'SSL Secured', icon: 'Lock', color: 'text-success' },
    { name: 'GDPR Compliant', icon: 'Shield', color: 'text-secondary' },
    { name: 'Privacy Protected', icon: 'Eye', color: 'text-accent' }
  ];

  const clientLogos = [
    { name: 'TechFlow', logo: 'https://via.placeholder.com/120x40/E3F2FD/1976D2?text=TechFlow' },
    { name: 'DataSync', logo: 'https://via.placeholder.com/120x40/E3F2FD/1976D2?text=DataSync' },
    { name: 'CloudBase', logo: 'https://via.placeholder.com/120x40/E3F2FD/1976D2?text=CloudBase' },
    { name: 'InnovateLab', logo: 'https://via.placeholder.com/120x40/E3F2FD/1976D2?text=InnovateLab' }
  ];

  return (
    <div className="bg-surface border-t border-border py-12">
      <div className="max-w-6xl mx-auto px-4 space-y-12">
        {/* Trust Metrics */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-text-primary mb-6">Trusted by Growing Businesses</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name={metric.icon} size={20} className="text-secondary" />
                </div>
                <div className="text-2xl font-bold text-text-primary">{metric.value}</div>
                <div className="text-sm text-text-secondary">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Logos */}
        <div className="text-center">
          <p className="text-sm text-text-secondary mb-6">Trusted by innovative companies</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {clientLogos.map((client, index) => (
              <img
                key={index}
                src={client.logo}
                alt={client.name}
                className="h-8 grayscale hover:grayscale-0 transition-all duration-300"
              />
            ))}
          </div>
        </div>

        {/* Security Certifications */}
        <div className="text-center">
          <div className="flex flex-wrap justify-center items-center gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <Icon name={cert.icon} size={16} className={cert.color} />
                <span className="text-text-secondary">{cert.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Process Guarantee */}
        <div className="bg-background border border-border rounded-xl p-6 text-center max-w-2xl mx-auto">
          <Icon name="Award" size={32} className="text-accent mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-text-primary mb-2">Our Commitment</h4>
          <p className="text-text-secondary text-sm">
            Every consultation includes a detailed project roadmap, realistic timeline estimates, 
            and transparent pricing. No hidden costs, no surprises - just honest expertise 
            to help you make informed decisions about your project.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;