import React from 'react';
import Icon from '../../../components/AppIcon';

const ProjectTypeSelector = ({ selectedType, onTypeSelect }) => {
  const projectTypes = [
    {
      id: 'new-application',
      title: 'Build New Application',
      description: 'Transform your innovative idea into a scalable digital product from the ground up.',
      icon: 'Rocket',
      features: ['MVP Development', 'Full-Stack Architecture', 'User Experience Design', 'Market Validation'],
      budgetRange: '$15K - $75K+',
      timeline: '8-24 weeks'
    },
    {
      id: 'scale-existing',
      title: 'Scale Existing Product',
      description: 'Enhance performance, add features, and optimize your current application for growth.',
      icon: 'TrendingUp',
      features: ['Performance Optimization', 'Feature Enhancement', 'Database Scaling', 'Code Refactoring'],
      budgetRange: '$20K - $50K+',
      timeline: '6-16 weeks'
    },
    {
      id: 'digital-transformation',
      title: 'Digital Transformation',
      description: 'Modernize legacy systems and digitize business processes for competitive advantage.',
      icon: 'Zap',
      features: ['Legacy Migration', 'Process Automation', 'System Integration', 'Cloud Migration'],
      budgetRange: '$30K - $100K+',
      timeline: '12-32 weeks'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-text-primary mb-3">What type of project are you planning?</h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Choose the option that best describes your project needs. This helps us provide you with the most relevant questions and accurate estimates.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {projectTypes.map((type) => (
          <div
            key={type.id}
            onClick={() => onTypeSelect(type.id)}
            className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
              selectedType === type.id
                ? 'border-secondary bg-primary shadow-md'
                : 'border-border bg-background hover:border-secondary/50'
            }`}
          >
            <div className="text-center mb-4">
              <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
                selectedType === type.id ? 'bg-secondary text-white' : 'bg-surface text-secondary'
              }`}>
                <Icon name={type.icon} size={28} />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">{type.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{type.description}</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-text-primary">Key Services:</h4>
                <ul className="space-y-1">
                  {type.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-xs text-text-secondary">
                      <Icon name="Check" size={14} className="text-success mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-border">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-text-secondary">Investment:</span>
                  <span className="font-medium text-text-primary">{type.budgetRange}</span>
                </div>
                <div className="flex justify-between items-center text-xs mt-1">
                  <span className="text-text-secondary">Timeline:</span>
                  <span className="font-medium text-text-primary">{type.timeline}</span>
                </div>
              </div>
            </div>

            {selectedType === type.id && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                <Icon name="Check" size={14} className="text-white" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectTypeSelector;