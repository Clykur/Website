import React from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ProjectDetailsForm = ({ formData, onFormChange, projectType, onNext, onBack }) => {
  const handleInputChange = (field, value) => {
    onFormChange({ ...formData, [field]: value });
  };

  const budgetRanges = [
    { value: '15k-30k', label: '$15K - $30K', description: 'MVP & Simple Applications' },
    { value: '30k-75k', label: '$30K - $75K', description: 'Complex Applications & Features' },
    { value: '75k-150k', label: '$75K - $150K', description: 'Enterprise Solutions' },
    { value: '150k+', label: '$150K+', description: 'Large-Scale Transformations' }
  ];

  const timelineOptions = [
    { value: 'asap', label: 'ASAP (Rush Project)', icon: 'Zap' },
    { value: '1-3months', label: '1-3 Months', icon: 'Calendar' },
    { value: '3-6months', label: '3-6 Months', icon: 'Clock' },
    { value: '6months+', label: '6+ Months', icon: 'Timer' }
  ];

  const technologyPreferences = [
    { value: 'react', label: 'React/Next.js', icon: 'Code' },
    { value: 'mobile', label: 'Mobile App', icon: 'Smartphone' },
    { value: 'fullstack', label: 'Full-Stack Web', icon: 'Globe' },
    { value: 'ai-ml', label: 'AI/ML Integration', icon: 'Brain' },
    { value: 'ecommerce', label: 'E-commerce', icon: 'ShoppingCart' },
    { value: 'not-sure', label: 'Not Sure Yet', icon: 'HelpCircle' }
  ];

  const isFormValid = formData.projectName && formData.projectDescription && formData.budget && formData.timeline;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-text-primary mb-3">Tell us about your project</h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          The more details you provide, the better we can understand your needs and provide accurate estimates.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Project Basic Info */}
        <div className="bg-background border border-border rounded-xl p-6 space-y-6">
          <h3 className="text-lg font-semibold text-text-primary flex items-center">
            <Icon name="FileText" size={20} className="mr-2 text-secondary" />
            Project Information
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Project Name *
              </label>
              <Input
                type="text"
                placeholder="e.g., TaskFlow Mobile App"
                value={formData.projectName || ''}
                onChange={(e) => handleInputChange('projectName', e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Company/Organization
              </label>
              <Input
                type="text"
                placeholder="Your company name"
                value={formData.company || ''}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Project Description *
            </label>
            <textarea
              placeholder="Describe your project goals, target audience, and key features you envision..."
              value={formData.projectDescription || ''}
              onChange={(e) => handleInputChange('projectDescription', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent resize-none"
            />
          </div>
        </div>

        {/* Budget Range */}
        <div className="bg-background border border-border rounded-xl p-6 space-y-6">
          <h3 className="text-lg font-semibold text-text-primary flex items-center">
            <Icon name="DollarSign" size={20} className="mr-2 text-secondary" />
            Investment Range *
          </h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {budgetRanges.map((range) => (
              <div
                key={range.value}
                onClick={() => handleInputChange('budget', range.value)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  formData.budget === range.value
                    ? 'border-secondary bg-primary' :'border-border bg-surface hover:border-secondary/50'
                }`}
              >
                <div className="text-center">
                  <div className="font-semibold text-text-primary mb-1">{range.label}</div>
                  <div className="text-xs text-text-secondary">{range.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-background border border-border rounded-xl p-6 space-y-6">
          <h3 className="text-lg font-semibold text-text-primary flex items-center">
            <Icon name="Calendar" size={20} className="mr-2 text-secondary" />
            Preferred Timeline *
          </h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {timelineOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => handleInputChange('timeline', option.value)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  formData.timeline === option.value
                    ? 'border-secondary bg-primary' :'border-border bg-surface hover:border-secondary/50'
                }`}
              >
                <div className="text-center">
                  <Icon name={option.icon} size={24} className={`mx-auto mb-2 ${
                    formData.timeline === option.value ? 'text-secondary' : 'text-text-secondary'
                  }`} />
                  <div className="font-medium text-text-primary text-sm">{option.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Preferences */}
        <div className="bg-background border border-border rounded-xl p-6 space-y-6">
          <h3 className="text-lg font-semibold text-text-primary flex items-center">
            <Icon name="Settings" size={20} className="mr-2 text-secondary" />
            Technology Preferences
          </h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {technologyPreferences.map((tech) => (
              <div
                key={tech.value}
                onClick={() => {
                  const currentTech = formData.technology || [];
                  const isSelected = currentTech.includes(tech.value);
                  const newTech = isSelected 
                    ? currentTech.filter(t => t !== tech.value)
                    : [...currentTech, tech.value];
                  handleInputChange('technology', newTech);
                }}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  (formData.technology || []).includes(tech.value)
                    ? 'border-secondary bg-primary' :'border-border bg-surface hover:border-secondary/50'
                }`}
              >
                <div className="flex items-center">
                  <Icon name={tech.icon} size={20} className={`mr-3 ${
                    (formData.technology || []).includes(tech.value) ? 'text-secondary' : 'text-text-secondary'
                  }`} />
                  <span className="font-medium text-text-primary text-sm">{tech.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Requirements */}
        <div className="bg-background border border-border rounded-xl p-6 space-y-6">
          <h3 className="text-lg font-semibold text-text-primary flex items-center">
            <Icon name="MessageSquare" size={20} className="mr-2 text-secondary" />
            Additional Requirements
          </h3>
          
          <textarea
            placeholder="Any specific requirements, integrations, or constraints we should know about?"
            value={formData.additionalRequirements || ''}
            onChange={(e) => handleInputChange('additionalRequirements', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent resize-none"
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-6">
          <Button
            variant="outline"
            onClick={onBack}
            iconName="ArrowLeft"
            iconPosition="left"
          >
            Back
          </Button>
          
          <Button
            variant="primary"
            onClick={onNext}
            disabled={!isFormValid}
            iconName="ArrowRight"
            iconPosition="right"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsForm;