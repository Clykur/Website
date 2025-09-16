import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectModal = ({ project, isOpen, onClose, type }) => {
  if (!isOpen || !project) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const renderDemoContent = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-text-primary mb-2">{project.title}</h3>
        <p className="text-text-secondary">Interactive Live Demo</p>
      </div>

      <div className="bg-surface rounded-lg p-6">
        <div className="aspect-video bg-background border-2 border-dashed border-border rounded-lg flex items-center justify-center mb-4">
          <div className="text-center">
            <Icon name="Play" size={48} className="text-secondary mx-auto mb-2" />
            <p className="text-text-secondary">Live Demo Interface</p>
            <p className="text-sm text-text-secondary mt-1">Click to interact with the application</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-sm text-text-secondary">Live & Responsive</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} className="text-secondary" />
              <span className="text-sm text-text-secondary">{project.demoUsers || '1,234'} active users</span>
            </div>
          </div>
          <Button
            variant="primary"
            iconName="ExternalLink"
            iconPosition="right"
            size="sm"
          >
            Open Full Demo
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-surface rounded-lg">
          <div className="text-2xl font-bold text-secondary mb-1">{project.metrics[0]?.value || '99%'}</div>
          <div className="text-sm text-text-secondary">{project.metrics[0]?.label || 'Uptime'}</div>
        </div>
        <div className="text-center p-4 bg-surface rounded-lg">
          <div className="text-2xl font-bold text-secondary mb-1">{project.metrics[1]?.value || '2.1s'}</div>
          <div className="text-sm text-text-secondary">{project.metrics[1]?.label || 'Load Time'}</div>
        </div>
        <div className="text-center p-4 bg-surface rounded-lg">
          <div className="text-2xl font-bold text-secondary mb-1">{project.responseTime || '150ms'}</div>
          <div className="text-sm text-text-secondary">Response Time</div>
        </div>
      </div>
    </div>
  );

  const renderCaseStudyContent = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-text-primary mb-2">{project.title}</h3>
        <p className="text-text-secondary">{project.industry} • {project.clientType}</p>
      </div>

      {/* Project Image */}
      <div className="relative h-64 rounded-lg overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Challenge */}
      <div>
        <h4 className="text-lg font-semibold text-text-primary mb-3 flex items-center">
          <Icon name="AlertCircle" size={20} className="text-accent mr-2" />
          Challenge
        </h4>
        <p className="text-text-secondary leading-relaxed">
          {project.challenge || `The client needed a scalable ${project.industry.toLowerCase()} solution that could handle rapid user growth while maintaining exceptional performance. The existing system was outdated and couldn't support the business requirements for expansion into new markets.`}
        </p>
      </div>

      {/* Solution */}
      <div>
        <h4 className="text-lg font-semibold text-text-primary mb-3 flex items-center">
          <Icon name="Lightbulb" size={20} className="text-success mr-2" />
          Solution
        </h4>
        <p className="text-text-secondary leading-relaxed mb-4">
          {project.solution || `We developed a modern, cloud-native application using ${project.technologies.slice(0, 3).join(', ')} that addressed all scalability concerns while improving user experience significantly.`}
        </p>
        
        {/* Technology Stack */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary text-secondary text-sm font-medium rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Technical Approach */}
      <div>
        <h4 className="text-lg font-semibold text-text-primary mb-3 flex items-center">
          <Icon name="Code" size={20} className="text-secondary mr-2" />
          Technical Approach
        </h4>
        <div className="bg-surface rounded-lg p-4">
          <ul className="space-y-2 text-text-secondary">
            <li className="flex items-start space-x-2">
              <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
              <span>Microservices architecture for scalability and maintainability</span>
            </li>
            <li className="flex items-start space-x-2">
              <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
              <span>Real-time data synchronization with WebSocket implementation</span>
            </li>
            <li className="flex items-start space-x-2">
              <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
              <span>Automated testing and CI/CD pipeline for reliable deployments</span>
            </li>
            <li className="flex items-start space-x-2">
              <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
              <span>Performance optimization with caching and CDN integration</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Results */}
      <div>
        <h4 className="text-lg font-semibold text-text-primary mb-3 flex items-center">
          <Icon name="TrendingUp" size={20} className="text-success mr-2" />
          Results
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.results?.map((result, index) => (
            <div key={index} className="bg-surface rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-success mb-1">{result.value}</div>
              <div className="text-sm text-text-secondary">{result.label}</div>
            </div>
          )) || (
            <>
              <div className="bg-surface rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-success mb-1">60%</div>
                <div className="text-sm text-text-secondary">Faster Load Time</div>
              </div>
              <div className="bg-surface rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-success mb-1">40%</div>
                <div className="text-sm text-text-secondary">Increased Conversion</div>
              </div>
              <div className="bg-surface rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-success mb-1">99.9%</div>
                <div className="text-sm text-text-secondary">Uptime Achieved</div>
              </div>
              <div className="bg-surface rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-success mb-1">5x</div>
                <div className="text-sm text-text-secondary">Scalability Improvement</div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Client Testimonial */}
      <div className="bg-primary rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <Icon name="Quote" size={24} className="text-secondary flex-shrink-0" />
          <div>
            <p className="text-secondary italic mb-3">
              "{project.testimonial || `Working with Clykur was exceptional. They delivered exactly what we needed and exceeded our expectations in terms of quality and timeline. The technical expertise and attention to detail were outstanding.`}"
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={20} className="text-white" />
              </div>
              <div>
                <div className="font-medium text-secondary">{project.clientName || 'Sarah Johnson'}</div>
                <div className="text-sm text-secondary/80">{project.clientRole || 'CTO'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-background rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon 
              name={type === 'demo' ? 'Play' : 'FileText'} 
              size={24} 
              className="text-secondary" 
            />
            <h2 className="text-xl font-semibold text-text-primary">
              {type === 'demo' ? 'Live Demo' : 'Case Study'}
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
            className="text-text-secondary hover:text-text-primary"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {type === 'demo' ? renderDemoContent() : renderCaseStudyContent()}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-background border-t border-border p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {project.githubUrl && (
              <Button
                variant="outline"
                size="sm"
                iconName="Github"
                iconPosition="left"
              >
                View Code
              </Button>
            )}
            {type === 'case' && project.hasLiveDemo && (
              <Button
                variant="outline"
                size="sm"
                iconName="Play"
                iconPosition="left"
              >
                Live Demo
              </Button>
            )}
          </div>
          <Button
            variant="primary"
            iconName="MessageCircle"
            iconPosition="left"
          >
            Discuss Similar Project
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;