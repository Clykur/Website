import React from 'react';

import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeaturedProjects = ({ projects, onViewDemo, onViewCase }) => {
  const featuredProjects = projects.filter(project => project.featured).slice(0, 3);

  if (featuredProjects.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Featured Projects</h2>
          <p className="text-text-secondary">Showcasing our most impactful work and client success stories</p>
        </div>
        <div className="hidden md:flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Star" size={16} className="text-accent" />
          <span>Hand-picked highlights</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {featuredProjects.map((project, index) => (
          <div
            key={project.id}
            className={`card card-hover bg-background border border-border rounded-xl overflow-hidden ${
              index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
            }`}
          >
            {/* Project Image */}
            <div className={`relative overflow-hidden ${index === 0 ? 'h-64 lg:h-80' : 'h-48'}`}>
              <Image
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Featured Badge */}
              <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                <Icon name="Star" size={14} />
                <span>Featured</span>
              </div>

              {/* Quick Actions */}
              <div className="absolute top-4 right-4 flex space-x-2">
                {project.hasLiveDemo && (
                  <button
                    onClick={() => onViewDemo(project)}
                    className="w-10 h-10 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors duration-200"
                  >
                    <Icon name="Play" size={16} className="text-secondary" />
                  </button>
                )}
                <button
                  onClick={() => onViewCase(project)}
                  className="w-10 h-10 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors duration-200"
                >
                  <Icon name="FileText" size={16} className="text-secondary" />
                </button>
              </div>

              {/* Project Info Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className={`font-bold text-white mb-2 ${index === 0 ? 'text-xl lg:text-2xl' : 'text-lg'}`}>
                  {project.title}
                </h3>
                <div className="flex items-center space-x-4 text-white/90 text-sm">
                  <span>{project.clientType}</span>
                  <span>•</span>
                  <span>{project.industry}</span>
                </div>
              </div>
            </div>

            {/* Project Content */}
            <div className={`p-6 ${index === 0 ? 'lg:p-8' : ''}`}>
              {/* Description */}
              <p className={`text-text-secondary mb-4 ${index === 0 ? 'text-base lg:text-lg' : 'text-sm'}`}>
                {project.description}
              </p>

              {/* Key Highlight */}
              {project.keyHighlight && (
                <div className="bg-success/10 border border-success/20 rounded-lg p-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="TrendingUp" size={16} className="text-success" />
                    <span className="text-success font-medium text-sm">{project.keyHighlight}</span>
                  </div>
                </div>
              )}

              {/* Technology Stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.slice(0, index === 0 ? 6 : 4).map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 bg-primary text-secondary text-xs font-medium rounded-md"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > (index === 0 ? 6 : 4) && (
                  <span className="px-2 py-1 bg-surface text-text-secondary text-xs font-medium rounded-md">
                    +{project.technologies.length - (index === 0 ? 6 : 4)} more
                  </span>
                )}
              </div>

              {/* Metrics */}
              <div className={`grid gap-4 mb-6 ${index === 0 ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-2'}`}>
                {project.metrics.slice(0, index === 0 ? 4 : 2).map((metric, metricIndex) => (
                  <div key={metricIndex} className="text-center p-3 bg-surface rounded-lg">
                    <div className="text-lg font-semibold text-secondary">{metric.value}</div>
                    <div className="text-xs text-text-secondary">{metric.label}</div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                {project.hasLiveDemo && (
                  <Button
                    variant="primary"
                    size={index === 0 ? 'md' : 'sm'}
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
                  size={index === 0 ? 'md' : 'sm'}
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
        ))}
      </div>

      {/* View All Projects CTA */}
      <div className="text-center mt-8">
        <p className="text-text-secondary mb-4">Explore our complete portfolio of successful projects</p>
        <Button
          variant="outline"
          iconName="ArrowDown"
          iconPosition="right"
          onClick={() => document.getElementById('all-projects')?.scrollIntoView({ behavior: 'smooth' })}
        >
          View All Projects
        </Button>
      </div>
    </div>
  );
};

export default FeaturedProjects;