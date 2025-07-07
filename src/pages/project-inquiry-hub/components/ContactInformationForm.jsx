import React from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ContactInformationForm = ({ formData, onFormChange, onNext, onBack }) => {
  const handleInputChange = (field, value) => {
    onFormChange({ ...formData, [field]: value });
  };

  const communicationPreferences = [
    { value: 'email', label: 'Email', icon: 'Mail', description: 'Detailed updates via email' },
    { value: 'phone', label: 'Phone', icon: 'Phone', description: 'Quick calls for urgent matters' },
    { value: 'video', label: 'Video Calls', icon: 'Video', description: 'Regular video check-ins' },
    { value: 'slack', label: 'Slack/Teams', icon: 'MessageCircle', description: 'Real-time collaboration' }
  ];

  const hearAboutOptions = [
    'Google Search',
    'LinkedIn',
    'Referral from colleague',
    'Previous client',
    'Social media',
    'Industry event',
    'Other'
  ];

  const isFormValid = formData.fullName && formData.email && formData.phone && formData.role;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-text-primary mb-3">Let's connect</h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          We'll use this information to prepare for our consultation and send you the preliminary project roadmap.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Contact Details */}
        <div className="bg-background border border-border rounded-xl p-6 space-y-6">
          <h3 className="text-lg font-semibold text-text-primary flex items-center">
            <Icon name="User" size={20} className="mr-2 text-secondary" />
            Contact Information
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Full Name *
              </label>
              <Input
                type="text"
                placeholder="John Smith"
                value={formData.fullName || ''}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Email Address *
              </label>
              <Input
                type="email"
                placeholder="john@company.com"
                value={formData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Phone Number *
              </label>
              <Input
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone || ''}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Your Role *
              </label>
              <select
                value={formData.role || ''}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent bg-background"
              >
                <option value="">Select your role</option>
                <option value="founder">Founder/CEO</option>
                <option value="cto">CTO/Technical Lead</option>
                <option value="product-manager">Product Manager</option>
                <option value="business-owner">Business Owner</option>
                <option value="marketing-director">Marketing Director</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              LinkedIn Profile
            </label>
            <Input
              type="url"
              placeholder="https://linkedin.com/in/yourprofile"
              value={formData.linkedin || ''}
              onChange={(e) => handleInputChange('linkedin', e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        {/* Communication Preferences */}
        <div className="bg-background border border-border rounded-xl p-6 space-y-6">
          <h3 className="text-lg font-semibold text-text-primary flex items-center">
            <Icon name="MessageSquare" size={20} className="mr-2 text-secondary" />
            Communication Preferences
          </h3>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {communicationPreferences.map((pref) => (
              <div
                key={pref.value}
                onClick={() => {
                  const currentPrefs = formData.communicationPrefs || [];
                  const isSelected = currentPrefs.includes(pref.value);
                  const newPrefs = isSelected 
                    ? currentPrefs.filter(p => p !== pref.value)
                    : [...currentPrefs, pref.value];
                  handleInputChange('communicationPrefs', newPrefs);
                }}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  (formData.communicationPrefs || []).includes(pref.value)
                    ? 'border-secondary bg-primary' :'border-border bg-surface hover:border-secondary/50'
                }`}
              >
                <div className="flex items-start">
                  <Icon name={pref.icon} size={20} className={`mr-3 mt-1 ${
                    (formData.communicationPrefs || []).includes(pref.value) ? 'text-secondary' : 'text-text-secondary'
                  }`} />
                  <div>
                    <div className="font-medium text-text-primary text-sm">{pref.label}</div>
                    <div className="text-xs text-text-secondary mt-1">{pref.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How did you hear about us */}
        <div className="bg-background border border-border rounded-xl p-6 space-y-6">
          <h3 className="text-lg font-semibold text-text-primary flex items-center">
            <Icon name="Search" size={20} className="mr-2 text-secondary" />
            How did you hear about Clykur?
          </h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {hearAboutOptions.map((option) => (
              <div
                key={option}
                onClick={() => handleInputChange('hearAbout', option)}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 text-center ${
                  formData.hearAbout === option
                    ? 'border-secondary bg-primary' :'border-border bg-surface hover:border-secondary/50'
                }`}
              >
                <span className="text-sm font-medium text-text-primary">{option}</span>
              </div>
            ))}
          </div>

          {formData.hearAbout === 'Other' && (
            <div className="mt-4">
              <Input
                type="text"
                placeholder="Please specify..."
                value={formData.hearAboutOther || ''}
                onChange={(e) => handleInputChange('hearAboutOther', e.target.value)}
                className="w-full"
              />
            </div>
          )}
        </div>

        {/* Additional Notes */}
        <div className="bg-background border border-border rounded-xl p-6 space-y-6">
          <h3 className="text-lg font-semibold text-text-primary flex items-center">
            <Icon name="FileText" size={20} className="mr-2 text-secondary" />
            Anything else we should know?
          </h3>
          
          <textarea
            placeholder="Any specific questions, concerns, or additional context about your project or business?"
            value={formData.additionalNotes || ''}
            onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent resize-none"
          />
        </div>

        {/* Privacy Notice */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex items-start">
            <Icon name="Shield" size={20} className="text-success mr-3 mt-1 flex-shrink-0" />
            <div className="text-sm text-text-secondary">
              <p className="font-medium text-text-primary mb-2">Privacy & Security</p>
              <p>
                Your information is encrypted and secure. We'll only use it to prepare for our consultation 
                and send you the preliminary project roadmap. We never share your details with third parties.
              </p>
            </div>
          </div>
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
            Generate Roadmap
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactInformationForm;