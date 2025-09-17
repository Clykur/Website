import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSignals = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Founder, TechStart',
      company: 'TechStart Inc.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      content: `Chandu's communication throughout our project was exceptional. He provided daily updates, was always available for questions, and delivered exactly what we envisioned. The response time was incredible - never waited more than a few hours for a reply.`,
      rating: 5,
      projectType: 'SaaS Platform'
    },
    {
      id: 2,
      name: 'Michael Rodriguez',role: 'CTO, GrowthCorp',company: 'GrowthCorp Solutions',avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      content: `Working with Clykur was a game-changer for our startup. The technical expertise combined with clear communication made the entire development process smooth. Chandu understood our vision and delivered beyond expectations.`,
      rating: 5,
      projectType: 'Mobile App'
    },
    {
      id: 3,
      name: 'Emily Johnson',role: 'Product Manager, InnovateLab',company: 'InnovateLab',avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',content: `The responsiveness and professionalism were outstanding. Every email was answered within hours, every concern was addressed immediately. It felt like having a dedicated technical co-founder on our team.`,rating: 5,projectType: 'Web Application'
    }
  ];

  const certifications = [
    {
      name: 'AWS Certified Developer',
      issuer: 'Amazon Web Services',
      icon: 'Award',
      year: '2023'
    },
    {
      name: 'React Professional Certification',
      issuer: 'Meta',
      icon: 'Code',
      year: '2023'
    },
    {
      name: 'Google Cloud Professional',
      issuer: 'Google Cloud',
      icon: 'Cloud',
      year: '2022'
    }
  ];

  const metrics = [
    {
      value: '50+',
      label: 'Projects Completed',
      icon: 'Briefcase'
    },
    {
      value: '98%',
      label: 'Client Satisfaction',
      icon: 'Heart'
    },
    {
      value: '24hr',
      label: 'Avg Response Time',
      icon: 'Clock'
    },
    {
      value: '100%',
      label: 'On-Time Delivery',
      icon: 'CheckCircle'
    }
  ];

  const securityFeatures = [
    'SSL Certificate (A+ Rating)',
    'GDPR Compliant Data Handling',
    'Regular Security Audits',
    'Encrypted Communication',
    'Privacy Policy Compliance',
    'Professional Insurance Coverage'
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Trusted by Ambitious Teams
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            See what clients say about working with Clykur and the trust signals that demonstrate our commitment to excellence.
          </p>
        </div>

        {/* Client Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="card p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-text-secondary mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center space-x-4">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-text-primary">
                    {testimonial.name}
                  </h4>
                  <p className="text-text-secondary text-sm">
                    {testimonial.role}
                  </p>
                  <p className="text-secondary text-xs font-medium">
                    {testimonial.projectType}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name={metric.icon} size={24} color="white" />
              </div>
              <div className="text-3xl font-bold text-text-primary mb-2">
                {metric.value}
              </div>
              <div className="text-text-secondary text-sm">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Certifications & Credentials */}
          <div className="card p-8">
            <h3 className="text-2xl font-semibold text-text-primary mb-6 flex items-center space-x-2">
              <Icon name="Award" size={24} className="text-secondary" />
              <span>Professional Certifications</span>
            </h3>
            
            <div className="space-y-4 mb-8">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-surface rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-success to-green-600 rounded-lg flex items-center justify-center">
                    <Icon name={cert.icon} size={20} color="white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-text-primary">
                      {cert.name}
                    </h4>
                    <p className="text-text-secondary text-sm">
                      {cert.issuer} • {cert.year}
                    </p>
                  </div>
                  <Icon name="ExternalLink" size={16} className="text-text-secondary" />
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-6">
              <h4 className="font-semibold text-text-primary mb-4">
                Professional Memberships
              </h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Icon name="Check" size={14} className="text-success" />
                  <span className="text-text-secondary">React Developer Community</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Icon name="Check" size={14} className="text-success" />
                  <span className="text-text-secondary">AWS Community Builder</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Icon name="Check" size={14} className="text-success" />
                  <span className="text-text-secondary">Indie Hackers Community</span>
                </div>
              </div>
            </div>
          </div>

          {/* Security & Privacy */}
          <div className="card p-8">
            <h3 className="text-2xl font-semibold text-text-primary mb-6 flex items-center space-x-2">
              <Icon name="Shield" size={24} className="text-success" />
              <span>Security & Privacy</span>
            </h3>
            
            <div className="space-y-4 mb-8">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Icon name="Check" size={16} className="text-success" />
                  <span className="text-text-secondary">{feature}</span>
                </div>
              ))}
            </div>

            <div className="bg-primary p-4 rounded-lg mb-6">
              <div className="flex items-center space-x-3 mb-2">
                <Icon name="Lock" size={20} className="text-success" />
                <span className="font-semibold text-text-primary">Data Protection</span>
              </div>
              <p className="text-text-secondary text-sm">
                All client data is encrypted in transit and at rest. I follow industry best practices for data security and never share client information with third parties.
              </p>
            </div>

            <div className="flex items-center justify-between p-4 bg-surface rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={20} className="text-success" />
                <span className="font-medium text-text-primary">SSL Rating</span>
              </div>
              <span className="bg-success text-white px-3 py-1 rounded-full text-sm font-medium">
                A+
              </span>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <div className="card p-8 bg-gradient-to-r from-primary to-surface">
            <h3 className="text-2xl font-semibold text-text-primary mb-4">
              Ready to Experience This Level of Service?
            </h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Join the growing list of satisfied clients who trust Clykur with their most important digital projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => document.querySelector('#project-form').scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center px-8 py-3 bg-secondary text-white rounded-lg hover:bg-blue-800 transition-colors duration-200"
              >
                <Icon name="Rocket" size={20} className="mr-2" />
                Start Your Project
              </button>
              <button
                onClick={() => document.querySelector('#consultation-booking').scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center px-8 py-3 border border-secondary text-secondary rounded-lg hover:bg-secondary hover:text-white transition-colors duration-200"
              >
                <Icon name="Calendar" size={20} className="mr-2" />
                Book Free Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;