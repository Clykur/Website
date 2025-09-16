import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ServiceContactForm = ({ selectedService }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: selectedService,
    budget: '',
    timeline: '',
    description: '',
    features: [],
    priority: 'medium'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const serviceQuestions = {
    mvp: {
      title: 'MVP Development Inquiry',
      questions: [
        {
          id: 'stage',
          label: 'What stage is your idea in?',
          type: 'select',
          options: [
            'Just an idea',
            'Have wireframes/mockups',
            'Have detailed requirements',
            'Started development elsewhere'
          ]
        },
        {
          id: 'users',
          label: 'Expected number of initial users?',
          type: 'select',
          options: [
            'Under 1,000',
            '1,000 - 10,000',
            '10,000 - 100,000',
            'Over 100,000'
          ]
        },
        {
          id: 'monetization',
          label: 'How do you plan to monetize?',
          type: 'select',
          options: [
            'Subscription model',
            'One-time purchases',
            'Freemium',
            'Advertising',
            'Not sure yet'
          ]
        }
      ],
      features: [
        'User Authentication',
        'Payment Integration',
        'Admin Dashboard',
        'Mobile App',
        'API Development',
        'Analytics Integration',
        'Email Notifications',
        'Social Media Integration'
      ]
    },
    scaling: {
      title: 'Application Scaling Inquiry',
      questions: [
        {
          id: 'currentUsers',
          label: 'Current number of active users?',
          type: 'select',
          options: [
            'Under 10,000',
            '10,000 - 50,000',
            '50,000 - 200,000',
            'Over 200,000'
          ]
        },
        {
          id: 'issues',
          label: 'What performance issues are you experiencing?',
          type: 'select',
          options: [
            'Slow page load times',
            'Database timeouts',
            'Server crashes',
            'High infrastructure costs',
            'All of the above'
          ]
        },
        {
          id: 'growth',
          label: 'Expected growth rate?',
          type: 'select',
          options: [
            '2x in 6 months',
            '5x in 6 months',
            '10x in 6 months',
            'Unpredictable spikes'
          ]
        }
      ],
      features: [
        'Load Balancing',
        'Database Optimization',
        'Caching Strategy',
        'Auto-scaling',
        'Performance Monitoring',
        'CDN Implementation',
        'Microservices Migration',
        'Cost Optimization'
      ]
    },
    transformation: {
      title: 'Digital Transformation Inquiry',
      questions: [
        {
          id: 'systemAge',
          label: 'How old is your current system?',
          type: 'select',
          options: [
            'Less than 5 years',
            '5-10 years',
            '10-15 years',
            'Over 15 years'
          ]
        },
        {
          id: 'compliance',
          label: 'Do you need compliance certifications?',
          type: 'select',
          options: [
            'HIPAA (Healthcare)',
            'SOC 2 (Security)',
            'GDPR (Privacy)',
            'PCI DSS (Payments)',
            'Multiple/Other'
          ]
        },
        {
          id: 'integration',
          label: 'How many systems need integration?',
          type: 'select',
          options: [
            '2-5 systems',
            '6-10 systems',
            '11-20 systems',
            'Over 20 systems'
          ]
        }
      ],
      features: [
        'Legacy System Migration',
        'System Integration',
        'Workflow Automation',
        'Compliance Setup',
        'Staff Training',
        'Security Audit',
        'Data Migration',
        'Change Management'
      ]
    }
  };

  const currentService = serviceQuestions[selectedService] || serviceQuestions.mvp;

  const budgetRanges = {
    mvp: [
      'Under $25,000',
      '$25,000 - $50,000',
      '$50,000 - $100,000',
      'Over $100,000'
    ],
    scaling: [
      'Under $30,000',
      '$30,000 - $60,000',
      '$60,000 - $120,000',
      'Over $120,000'
    ],
    transformation: [
      'Under $50,000',
      '$50,000 - $100,000',
      '$100,000 - $200,000',
      'Over $200,000'
    ]
  };

  const timelineOptions = [
    'ASAP (Rush)',
    '1-3 months',
    '3-6 months',
    '6+ months',
    'Flexible'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFeatureToggle = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          projectType: selectedService,
          budget: '',
          timeline: '',
          description: '',
          features: [],
          priority: 'medium'
        });
        setSubmitStatus(null);
      }, 3000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            {currentService.title}
          </h2>
          <p className="text-lg text-text-secondary">
            Tell us about your project and we'll provide a detailed proposal within 24 hours.
          </p>
        </div>

        <div className="bg-surface rounded-2xl p-8 lg:p-12 shadow-xl border border-border">
          {submitStatus === 'success' ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="CheckCircle" size={32} color="white" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">
                Thank You!
              </h3>
              <p className="text-text-secondary mb-6">
                We've received your inquiry and will get back to you within 24 hours with a detailed proposal.
              </p>
              <Button 
                variant="primary"
                onClick={() => setSubmitStatus(null)}
              >
                Submit Another Inquiry
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@company.com"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">
                    Company Name
                  </label>
                  <Input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Your Company"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    className="w-full"
                  />
                </div>
              </div>

              {/* Service-Specific Questions */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-text-primary">
                  Project Details
                </h3>
                
                {currentService.questions.map((question, index) => (
                  <div key={question.id}>
                    <label className="block text-sm font-semibold text-text-primary mb-3">
                      {question.label}
                    </label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {question.options.map((option, optionIndex) => (
                        <button
                          key={optionIndex}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, [question.id]: option }))}
                          className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                            formData[question.id] === option
                              ? 'border-secondary bg-primary text-secondary' :'border-border bg-background hover:border-secondary/50'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Budget and Timeline */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-3">
                    Budget Range
                  </label>
                  <div className="space-y-2">
                    {budgetRanges[selectedService].map((range, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, budget: range }))}
                        className={`w-full p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                          formData.budget === range
                            ? 'border-secondary bg-primary text-secondary' :'border-border bg-background hover:border-secondary/50'
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-3">
                    Timeline
                  </label>
                  <div className="space-y-2">
                    {timelineOptions.map((timeline, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, timeline }))}
                        className={`w-full p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                          formData.timeline === timeline
                            ? 'border-secondary bg-primary text-secondary' :'border-border bg-background hover:border-secondary/50'
                        }`}
                      >
                        {timeline}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-3">
                  Required Features (Select all that apply)
                </label>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {currentService.features.map((feature, index) => (
                    <label
                      key={index}
                      className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-surface cursor-pointer"
                    >
                      <Input
                        type="checkbox"
                        checked={formData.features.includes(feature)}
                        onChange={() => handleFeatureToggle(feature)}
                        className="w-5 h-5"
                      />
                      <span className="text-sm font-medium text-text-primary">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Project Description */}
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  Project Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Tell us more about your project, goals, and any specific requirements..."
                  rows={5}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary resize-none"
                />
              </div>

              {/* Priority Level */}
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-3">
                  Project Priority
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['low', 'medium', 'high'].map((priority) => (
                    <button
                      key={priority}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, priority }))}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 capitalize ${
                        formData.priority === priority
                          ? 'border-secondary bg-primary text-secondary' :'border-border bg-background hover:border-secondary/50'
                      }`}
                    >
                      {priority} Priority
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={isSubmitting}
                  iconName="Send"
                  iconPosition="right"
                  className="shadow-lg"
                >
                  {isSubmitting ? 'Sending...' : 'Send Project Inquiry'}
                </Button>
                
                {submitStatus === 'error' && (
                  <p className="mt-4 text-center text-error text-sm">
                    There was an error sending your inquiry. Please try again.
                  </p>
                )}
              </div>

              {/* Contact Info */}
              <div className="pt-6 border-t border-border text-center">
                <p className="text-sm text-text-secondary mb-4">
                  Prefer to talk directly? We're here to help!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="mailto:clykur@outlook.com"
                    className="flex items-center justify-center gap-2 text-secondary hover:text-accent transition-colors"
                  >
                    <Icon name="Mail" size={16} />
                    clykur@outlook.com
                  </a>
                  <a
                    href="tel:+91 81792 99096"
                    className="flex items-center justify-center gap-2 text-secondary hover:text-accent transition-colors"
                  >
                    <Icon name="Phone" size={16} />
                    +91 81792 99096
                  </a>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServiceContactForm;