import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterSidebar = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  searchTerm, 
  onSearchChange,
  projectCount,
  isOpen,
  onToggle 
}) => {
  const filterCategories = [
    {
      key: 'technologies',
      label: 'Technology Stack',
      icon: 'Code',
      options: [
        'React', 'Node.js', 'Python', 'React Native', 'Next.js', 
        'Express.js', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker',
        'TypeScript', 'GraphQL', 'Redis', 'Kubernetes', 'Firebase'
      ]
    },
    {
      key: 'industries',
      label: 'Industry',
      icon: 'Building',
      options: [
        'SaaS', 'E-commerce', 'FinTech', 'HealthTech', 'EdTech',
        'Real Estate', 'Food & Beverage', 'Travel', 'Social Media', 'Gaming'
      ]
    },
    {
      key: 'projectTypes',
      label: 'Project Type',
      icon: 'Layers',
      options: ['MVP', 'Scale-up', 'Enterprise', 'Redesign', 'Migration']
    },
    {
      key: 'clientTypes',
      label: 'Client Type',
      icon: 'Users',
      options: ['Startup', 'SMB', 'Enterprise']
    },
    {
      key: 'complexity',
      label: 'Complexity',
      icon: 'BarChart3',
      options: ['Simple', 'Moderate', 'Complex']
    }
  ];

  const handleFilterToggle = (category, option) => {
    const currentFilters = filters[category] || [];
    const newFilters = currentFilters.includes(option)
      ? currentFilters.filter(item => item !== option)
      : [...currentFilters, option];
    
    onFilterChange(category, newFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(filters).reduce((count, filterArray) => count + filterArray.length, 0);
  };

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <Button
          variant="outline"
          onClick={onToggle}
          iconName="Filter"
          iconPosition="left"
          className="w-full justify-center"
        >
          Filters {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
        </Button>
      </div>

      {/* Filter Sidebar */}
      <div className={`lg:block ${isOpen ? 'block' : 'hidden'} bg-background border border-border rounded-xl p-6 mb-6 lg:mb-0`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} className="text-secondary" />
            <h3 className="text-lg font-semibold text-text-primary">Filters</h3>
          </div>
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-text-secondary hover:text-text-primary"
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Search */}
        <div className="mb-6">
          <Input
            type="search"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Results Count */}
        <div className="mb-6 p-3 bg-primary rounded-lg">
          <div className="text-sm text-secondary font-medium">
            {projectCount} {projectCount === 1 ? 'project' : 'projects'} found
          </div>
        </div>

        {/* Filter Categories */}
        <div className="space-y-6">
          {filterCategories.map((category) => (
            <div key={category.key}>
              <div className="flex items-center space-x-2 mb-3">
                <Icon name={category.icon} size={16} className="text-secondary" />
                <h4 className="font-medium text-text-primary">{category.label}</h4>
              </div>
              
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {category.options.map((option) => (
                  <label
                    key={option}
                    className="flex items-center space-x-2 cursor-pointer hover:bg-surface p-2 rounded-md transition-colors duration-200"
                  >
                    <input
                      type="checkbox"
                      checked={(filters[category.key] || []).includes(option)}
                      onChange={() => handleFilterToggle(category.key, option)}
                      className="w-4 h-4 text-secondary border-border rounded focus:ring-2 focus:ring-secondary"
                    />
                    <span className="text-sm text-text-secondary">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Project Complexity Calculator */}
        <div className="mt-8 p-4 bg-surface rounded-lg">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Calculator" size={16} className="text-accent" />
            <h4 className="font-medium text-text-primary">Project Calculator</h4>
          </div>
          <p className="text-sm text-text-secondary mb-3">
            Estimate your project complexity and timeline
          </p>
          <Button
            variant="accent"
            size="sm"
            iconName="ArrowRight"
            iconPosition="right"
            className="w-full justify-center"
          >
            Calculate Now
          </Button>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;