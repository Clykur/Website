import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProjectInquiryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    description: '',
    urgency: 'normal'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const projectTypes = [
    { value: 'web-app', label: 'Web Application' },
    { value: 'mobile-app', label: 'Mobile Application' },
    { value: 'ecommerce', label: 'E-commerce Platform' },
    { value: 'saas', label: 'SaaS Product' },
    { value: 'api', label: 'API Development' },
    { value: 'consulting', label: 'Technical Consulting' },
    { value: 'other', label: 'Other' }
  ];

  const budgetRanges = [
    { value: '5k-15k', label: '$5,000 - $15,000' },
    { value: '15k-30k', label: '$15,000 - $30,000' },
    { value: '30k-50k', label: '$30,000 - $50,000' },
    { value: '50k-100k', label: '$50,000 - $100,000' },
    { value: '100k+', label: '$100,000+' },
    { value: 'discuss', label: 'Let\'s Discuss' }
  ];

  const timelines = [
    { value: '1-2months', label: '1-2 Months' },
    { value: '3-4months', label: '3-4 Months' },
    { value: '5-6months', label: '5-6 Months' },
    { value: '6months+', label: '6+ Months' },
    { value: 'flexible', label: 'Flexible' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          company: '',
          projectType: '',
          budget: '',
          timeline: '',
          description: '',
          urgency: 'normal'
        });
        setSubmitStatus(null);
      }, 3000);
    }, 2000);
  };

  if (submitStatus === 'success') {
    return (
      <section id="project-form" className="py-16 lg:py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-success rounded-full mb-6">
              <Icon name="Check" size={32} color="white" />
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Thank You for Your Inquiry!
            </h3>
            <p className="text-text-secondary mb-6">
              I've received your project details and will respond within 48 hours with a detailed proposal and next steps.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center space-x-2 text-success">
                <Icon name="Mail" size={20} />
                <span>Confirmation sent to your email</span>
              </div>
              <div className="flex items-center space-x-2 text-success">
                <Icon name="Calendar" size={20} />
                <span>Response within 48 hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="project-form" className="py-16 lg:py-24 bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Start Your Project
          </h2>
          <p className="text-xl text-text-secondary">
            Tell me about your vision and I'll provide a detailed proposal with timeline and investment details.
          </p>
        </div>

        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Full Name *
                </label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Email Address *
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Company/Organization
              </label>
              <Input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Your company name (optional)"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Project Type *
                </label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent bg-background"
                >
                  <option value="">Select project type</option>
                  {projectTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Budget Range
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent bg-background"
                >
                  <option value="">Select budget range</option>
                  {budgetRanges.map(budget => (
                    <option key={budget.value} value={budget.value}>
                      {budget.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Timeline
                </label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent bg-background"
                >
                  <option value="">Select timeline</option>
                  {timelines.map(timeline => (
                    <option key={timeline.value} value={timeline.value}>
                      {timeline.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Project Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={6}
                placeholder="Describe your project vision, key features, target audience, and any specific requirements..."
                required
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent bg-background resize-none"
              />
            </div>

            <div className="bg-primary p-4 rounded-lg">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="urgency"
                  checked={formData.urgency === 'urgent'}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    urgency: e.target.checked ? 'urgent' : 'normal'
                  }))}
                  className="w-4 h-4 text-secondary focus:ring-secondary border-border rounded"
                />
                <span className="text-sm text-text-primary">
                  This is an urgent project (24-hour response guarantee)
                </span>
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                type="submit"
                variant="primary"
                loading={isSubmitting}
                iconName="Send"
                iconPosition="right"
                className="flex-1"
              >
                {isSubmitting ? 'Sending...' : 'Send Project Inquiry'}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                iconName="Calendar"
                iconPosition="left"
                onClick={() => document.querySelector('#consultation-booking').scrollIntoView({ behavior: 'smooth' })}
              >
                Book Consultation Instead
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProjectInquiryForm;