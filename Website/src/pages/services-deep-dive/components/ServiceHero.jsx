import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceHero = ({ selectedService, onServiceChange }) => {
  const services = [
    {
      id: 'mvp',
      title: 'MVP Development',
      subtitle: 'From Idea to Market',
      description: 'Transform your vision into a market-ready product with our proven 5-phase development process.',
      icon: 'Rocket',
      gradient: 'from-blue-500 to-purple-600',
      stats: ['8-16 weeks', '$15K-$50K', '95% success rate']
    },
    {
      id: 'scaling',
      title: 'Application Scaling',
      subtitle: 'Growth Without Limits',
      description: 'Scale your application to handle 10x more users while reducing operational costs by up to 40%.',
      icon: 'TrendingUp',
      gradient: 'from-green-500 to-blue-600',
      stats: ['10x capacity', '40% cost reduction', '99.9% uptime']
    },
    {
      id: 'transformation',
      title: 'Digital Transformation',
      subtitle: 'Enterprise Evolution',
      description: 'Modernize your enterprise systems with cloud-native solutions and seamless integrations.',
      icon: 'Zap',
      gradient: 'from-orange-500 to-red-600',
      stats: ['Enterprise-grade', 'Full compliance', 'Seamless integration']
    }
  ];

  const currentService = services.find(s => s.id === selectedService) || services[0];

  return (
    <section className="relative bg-gradient-to-br from-primary via-background to-surface py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Service Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => onServiceChange(service.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedService === service.id
                  ? 'bg-secondary text-secondary-foreground shadow-lg scale-105'
                  : 'bg-background/80 text-text-secondary hover:bg-surface hover:text-text-primary'
              }`}
            >
              <Icon name={service.icon} size={16} className="inline mr-2" />
              {service.title}
            </button>
          ))}
        </div>

        {/* Hero Content */}
        <div className="text-center max-w-4xl mx-auto">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${currentService.gradient} mb-8 shadow-xl`}>
            <Icon name={currentService.icon} size={32} color="white" />
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold text-text-primary mb-4">
            {currentService.title}
          </h1>
          
          <p className="text-xl lg:text-2xl text-accent font-medium mb-6">
            {currentService.subtitle}
          </p>
          
          <p className="text-lg text-text-secondary mb-12 max-w-2xl mx-auto leading-relaxed">
            {currentService.description}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {currentService.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-secondary">{stat}</div>
                <div className="text-sm text-text-secondary">
                  {index === 0 ? 'Timeline' : index === 1 ? 'Investment' : 'Success Rate'}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="primary" 
              size="lg"
              iconName="MessageCircle" 
              iconPosition="left"
              className="shadow-lg hover:shadow-xl"
            >
              Start Your Project
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              iconName="Calendar" 
              iconPosition="left"
            >
              Schedule Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;