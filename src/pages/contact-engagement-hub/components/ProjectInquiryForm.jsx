import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const WaitlistForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    interest: '',
    role: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const interestOptions = [
    { value: 'ai-assistant', label: 'AI Business Assistant' },
    { value: 'freelancer-network', label: 'Global Freelancer Network' },
    { value: 'project-management', label: 'Intelligent Project Management' },
    { value: 'business-hub', label: 'Unified Business Hub' },
    { value: 'analytics', label: 'AI-Powered Analytics' },
    { value: 'all-products', label: 'All Products' }
  ];

  const roleOptions = [
    { value: 'entrepreneur', label: 'Entrepreneur' },
    { value: 'business-owner', label: 'Business Owner' },
    { value: 'freelancer', label: 'Freelancer' },
    { value: 'developer', label: 'Developer' },
    { value: 'investor', label: 'Investor' },
    { value: 'other', label: 'Other' }
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
              Welcome to the Clykur Waitlist!
            </h3>
            <p className="text-text-secondary mb-6">
              Thank you for joining our waitlist! You'll be among the first to experience our revolutionary AI-powered products when we launch in Q2 2026.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center space-x-2 text-success">
                <Icon name="Mail" size={20} />
                <span>Confirmation sent to your email</span>
              </div>
              <div className="flex items-center space-x-2 text-success">
                <Icon name="Rocket" size={20} />
                <span>Launch updates coming soon</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="project-form" className="py-16 lg:py-24 bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Join Our Waitlist
          </h2>
          <p className="text-xl text-text-secondary">
            Be among the first to experience our revolutionary AI-powered products when we launch in Q2 2026.
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Product Interest *
                </label>
                <select
                  name="interest"
                  value={formData.interest}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent bg-background"
                >
                  <option value="">Select product interest</option>
                  {interestOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Your Role *
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent bg-background"
                  required
                >
                  <option value="">Select your role</option>
                  {roleOptions.map(role => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Message (Optional)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                placeholder="Tell us about your interest in our AI-powered products, your business needs, or any questions you have..."
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent bg-background resize-none"
              />
            </div>

            <div className="bg-primary p-4 rounded-lg">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="newsletter"
                  className="w-4 h-4 text-secondary focus:ring-secondary border-border rounded"
                />
                <span className="text-sm text-text-primary">
                  I want to receive updates about Clykur's product development and launch timeline
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
                {isSubmitting ? 'Joining...' : 'Join Waitlist'}
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

export default WaitlistForm;