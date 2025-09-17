import React from 'react';
import ProjectCard from './ProjectCard';
import Icon from '../../../components/AppIcon';

const ProjectGrid = ({ projects, onViewDemo, onViewCase, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="card bg-background border border-border rounded-xl overflow-hidden animate-pulse">
            <div className="h-40 sm:h-48 bg-surface"></div>
            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              <div className="h-4 bg-surface rounded w-3/4"></div>
              <div className="h-3 bg-surface rounded w-1/2"></div>
              <div className="h-12 sm:h-16 bg-surface rounded"></div>
              <div className="flex flex-wrap gap-2">
                <div className="h-5 sm:h-6 bg-surface rounded w-12 sm:w-16"></div>
                <div className="h-5 sm:h-6 bg-surface rounded w-12 sm:w-16"></div>
                <div className="h-5 sm:h-6 bg-surface rounded w-12 sm:w-16"></div>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="h-10 sm:h-12 bg-surface rounded"></div>
                <div className="h-10 sm:h-12 bg-surface rounded"></div>
              </div>
              <div className="flex flex-col xs:flex-row gap-2">
                <div className="h-8 bg-surface rounded flex-1"></div>
                <div className="h-8 bg-surface rounded flex-1"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Search" size={32} className="text-text-secondary" />
        </div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">No Projects Found</h3>
        <p className="text-text-secondary mb-6 max-w-md mx-auto">
          We couldn't find any projects matching your current filters. Try adjusting your search criteria or clearing some filters.
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Lightbulb" size={16} />
            <span>Try broader search terms</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Filter" size={16} />
            <span>Remove some filters</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onViewDemo={onViewDemo}
          onViewCase={onViewCase}
        />
      ))}
    </div>
  );
};

export default ProjectGrid;
