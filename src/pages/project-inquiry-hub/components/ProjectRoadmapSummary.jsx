import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ProjectRoadmapSummary = ({ formData, onScheduleConsultation, onDownloadRoadmap }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isScheduling, setIsScheduling] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    // Simulate PDF generation
    setTimeout(() => {
      setIsDownloading(false);
      onDownloadRoadmap();
    }, 2000);
  };

  const handleSchedule = async () => {
    setIsScheduling(true);
    // Simulate calendar booking
    setTimeout(() => {
      setIsScheduling(false);
      onScheduleConsultation();
    }, 1500);
  };

  const getProjectTypeDetails = () => {
    const typeMap = {
      'new-application': {
        title: 'New Application Development',
        phases: ['Discovery & Planning', 'MVP Development', 'Testing & Refinement', 'Launch & Support'],
        duration: '12-20 weeks',
        keyDeliverables: ['Technical Architecture', 'MVP Application', 'User Documentation', 'Deployment Setup']
      },
      'scale-existing': {
        title: 'Product Scaling & Enhancement',
        phases: ['Current System Audit', 'Optimization Planning', 'Feature Development', 'Performance Testing'],
        duration: '8-16 weeks',
        keyDeliverables: ['Performance Report', 'Enhanced Features', 'Scalability Improvements', 'Monitoring Setup']
      },
      'digital-transformation': {
        title: 'Digital Transformation',
        phases: ['Legacy Assessment', 'Migration Strategy', 'System Development', 'Training & Handover'],
        duration: '16-28 weeks',
        keyDeliverables: ['Migration Plan', 'Modern System', 'Staff Training', 'Process Documentation']
      }
    };
    return typeMap[formData.projectType] || typeMap['new-application'];
  };

  const getBudgetDetails = () => {
    const budgetMap = {
      '15k-30k': { range: '$15,000 - $30,000', description: 'MVP & Essential Features' },
      '30k-75k': { range: '$30,000 - $75,000', description: 'Full-Featured Application' },
      '75k-150k': { range: '$75,000 - $150,000', description: 'Enterprise-Grade Solution' },
      '150k+': { range: '$150,000+', description: 'Large-Scale Transformation' }
    };
    return budgetMap[formData.budget] || budgetMap['30k-75k'];
  };

  const projectDetails = getProjectTypeDetails();
  const budgetDetails = getBudgetDetails();

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Founder, TechFlow",
      content: "The consultation process was incredibly thorough. Chandu understood our vision immediately and provided a roadmap that exceeded our expectations.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Michael Rodriguez",
      role: "CTO, DataSync",
      content: "The preliminary roadmap gave us exactly what we needed to secure funding. The level of detail and technical insight was impressive.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={32} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-3">Your Project Roadmap is Ready!</h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Based on your requirements, we've created a preliminary roadmap and timeline for your project. 
          Download it now and schedule a consultation to discuss the details.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Project Summary */}
        <div className="bg-background border border-border rounded-xl p-6 space-y-6">
          <h3 className="text-lg font-semibold text-text-primary flex items-center">
            <Icon name="FileText" size={20} className="mr-2 text-secondary" />
            Project Summary
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <span className="text-sm font-medium text-text-secondary">Project Name:</span>
                <p className="text-text-primary font-medium">{formData.projectName}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-text-secondary">Project Type:</span>
                <p className="text-text-primary font-medium">{projectDetails.title}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-text-secondary">Estimated Timeline:</span>
                <p className="text-text-primary font-medium">{projectDetails.duration}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-sm font-medium text-text-secondary">Investment Range:</span>
                <p className="text-text-primary font-medium">{budgetDetails.range}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-text-secondary">Scope:</span>
                <p className="text-text-primary font-medium">{budgetDetails.description}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-text-secondary">Contact:</span>
                <p className="text-text-primary font-medium">{formData.fullName}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Development Phases */}
        <div className="bg-background border border-border rounded-xl p-6 space-y-6">
          <h3 className="text-lg font-semibold text-text-primary flex items-center">
            <Icon name="GitBranch" size={20} className="mr-2 text-secondary" />
            Development Phases
          </h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {projectDetails.phases.map((phase, index) => (
              <div key={index} className="relative">
                <div className="bg-surface border border-border rounded-lg p-4 text-center">
                  <div className="w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                    {index + 1}
                  </div>
                  <h4 className="font-medium text-text-primary text-sm">{phase}</h4>
                </div>
                {index < projectDetails.phases.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                    <Icon name="ArrowRight" size={16} className="text-text-secondary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Key Deliverables */}
        <div className="bg-background border border-border rounded-xl p-6 space-y-6">
          <h3 className="text-lg font-semibold text-text-primary flex items-center">
            <Icon name="Package" size={20} className="mr-2 text-secondary" />
            Key Deliverables
          </h3>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {projectDetails.keyDeliverables.map((deliverable, index) => (
              <div key={index} className="flex items-center p-3 bg-surface rounded-lg">
                <Icon name="Check" size={16} className="text-success mr-3 flex-shrink-0" />
                <span className="text-text-primary font-medium text-sm">{deliverable}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-primary border border-secondary/20 rounded-xl p-6 space-y-6">
          <h3 className="text-lg font-semibold text-text-primary flex items-center">
            <Icon name="Rocket" size={20} className="mr-2 text-secondary" />
            Next Steps
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-background rounded-lg p-4">
                <h4 className="font-semibold text-text-primary mb-2 flex items-center">
                  <Icon name="Download" size={16} className="mr-2 text-secondary" />
                  Download Your Roadmap
                </h4>
                <p className="text-text-secondary text-sm mb-4">
                  Get a detailed PDF with project phases, timelines, and technical recommendations.
                </p>
                <Button
                  variant="secondary"
                  onClick={handleDownload}
                  loading={isDownloading}
                  iconName="Download"
                  iconPosition="left"
                  fullWidth
                >
                  {isDownloading ? 'Generating PDF...' : 'Download Roadmap'}
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-background rounded-lg p-4">
                <h4 className="font-semibold text-text-primary mb-2 flex items-center">
                  <Icon name="Calendar" size={16} className="mr-2 text-secondary" />
                  Schedule Consultation
                </h4>
                <p className="text-text-secondary text-sm mb-4">
                  Book a free 30-minute consultation to discuss your project in detail.
                </p>
                <Button
                  variant="primary"
                  onClick={handleSchedule}
                  loading={isScheduling}
                  iconName="Calendar"
                  iconPosition="left"
                  fullWidth
                >
                  {isScheduling ? 'Opening Calendar...' : 'Schedule Call'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-background border border-border rounded-xl p-6 space-y-6">
          <h3 className="text-lg font-semibold text-text-primary flex items-center">
            <Icon name="MessageCircle" size={20} className="mr-2 text-secondary" />
            What Our Clients Say
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-surface rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <h4 className="font-medium text-text-primary text-sm">{testimonial.name}</h4>
                    <p className="text-text-secondary text-xs">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-text-secondary text-sm italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex items-start">
            <Icon name="Shield" size={20} className="text-success mr-3 mt-1 flex-shrink-0" />
            <div className="text-sm text-text-secondary">
              <p className="font-medium text-text-primary mb-2">Secure & Confidential</p>
              <p>
                Your project details are encrypted and confidential. We'll send the roadmap to {formData.email} 
                and follow up only with relevant project updates. No spam, ever.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectRoadmapSummary;