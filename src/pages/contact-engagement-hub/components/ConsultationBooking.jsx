import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProductVisionSession = () => {
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
    { value: 'partnership', label: 'Partnership Opportunities' }
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
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          company: '',
          interest: '',
          role: '',
          message: ''
        });
        setSubmitStatus(null);
      }, 3000);
    }, 2000);
  };

  if (submitStatus === 'success') {
    return (
      <section id="vision-session" className="py-16 lg:py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-success rounded-full mb-6">
              <Icon name="Check" size={32} color="white" />
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Thank You for Your Interest!
            </h3>
            <p className="text-text-secondary mb-6">
              We've received your information and will reach out to you soon with more details about our revolutionary AI-powered products and how they can transform your business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center space-x-2 text-success">
                <Icon name="Mail" size={20} />
                <span>Confirmation sent to your email</span>
              </div>
              <div className="flex items-center space-x-2 text-success">
                <Icon name="Rocket" size={20} />
                <span>Product updates coming soon</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="vision-session" className="py-16 lg:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Learn About Our Vision
          </h2>
          <p className="text-xl text-text-secondary">
            Discover how our revolutionary AI-powered products will transform your business and get early access to our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* What You'll Learn */}
          <div>
            <h3 className="text-2xl font-bold text-text-primary mb-6">What You'll Learn</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="Check" size={14} color="white" />
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">AI Product Roadmap</h4>
                  <p className="text-text-secondary text-sm">Detailed overview of our 5 revolutionary AI-powered products launching in Q2 2026</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="Check" size={14} color="white" />
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Technology Insights</h4>
                  <p className="text-text-secondary text-sm">Deep dive into our AI-first architecture and revolutionary automation capabilities</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="Check" size={14} color="white" />
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Business Impact</h4>
                  <p className="text-text-secondary text-sm">How our products will revolutionize your workflow and boost productivity by 10x</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="Check" size={14} color="white" />
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Early Access</h4>
                  <p className="text-text-secondary text-sm">Priority access to beta testing and exclusive launch features</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-primary rounded-xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-xl flex items-center justify-center">
                  <Icon name="Users" size={24} color="white" />
                </div>
                <div>
                  <h4 className="font-bold text-text-primary">Direct Access to Clykur Team</h4>
                  <p className="text-text-secondary text-sm">Founders with deep R&D backgrounds building the future of AI-powered business automation</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-secondary">100%</div>
                  <div className="text-xs text-text-secondary">Free Session</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary">30min</div>
                  <div className="text-xs text-text-secondary">Focused Session</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary">Q2 2026</div>
                  <div className="text-xs text-text-secondary">Launch Timeline</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
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
                  placeholder="Tell us about your business needs, questions about our products, or how you'd like to collaborate..."
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent bg-background resize-none"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                loading={isSubmitting}
                iconName="Send"
                iconPosition="right"
                className="w-full"
              >
                {isSubmitting ? 'Sending...' : 'Learn About Our Vision'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductVisionSession;