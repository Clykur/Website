import React from 'react';

import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectCard = ({ project, onViewDemo, onViewCase }) => {
  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case 'Simple': return 'bg-green-100 text-green-800';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800';
      case 'Complex': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getClientTypeIcon = (type) => {
    switch (type) {
      case 'Startup': return 'Rocket';
      case 'Enterprise': return 'Building2';
      case 'SMB': return 'Store';
      default: return 'Users';
    }
  };

  return (
    <div className="card card-hover bg-background border border-border rounded-xl overflow-hidden group">
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Live Demo Badge */}
        {project.hasLiveDemo && (
          <div className="absolute top-3 right-3 bg-success text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
            <Icon name="Play" size={12} />
            <span>Live Demo</span>
          </div>
        )}

        {/* Client Type Indicator */}
        <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm rounded-full p-2">
          <Icon name={getClientTypeIcon(project.clientType)} size={16} className="text-secondary" />
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-1 line-clamp-1">
              {project.title}
            </h3>
            <p className="text-sm text-text-secondary">{project.clientType} • {project.industry}</p>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(project.complexity)}`}>
            {project.complexity}
          </div>
        </div>

        {/* Description */}
        <p className="text-text-secondary text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Technology Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary text-secondary text-xs font-medium rounded-md"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-1 bg-surface text-text-secondary text-xs font-medium rounded-md">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-surface rounded-lg">
          {project.metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="text-lg font-semibold text-secondary">{metric.value}</div>
              <div className="text-xs text-text-secondary">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          {project.hasLiveDemo && (
            <Button
              variant="primary"
              size="sm"
              iconName="ExternalLink"
              iconPosition="right"
              onClick={() => onViewDemo(project)}
              className="flex-1"
            >
              Live Demo
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            iconName="FileText"
            iconPosition="right"
            onClick={() => onViewCase(project)}
            className="flex-1"
          >
            Case Study
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;