import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PricingCalculator = ({ selectedService }) => {
  const [projectScope, setProjectScope] = useState({
    complexity: 'medium',
    timeline: 'standard',
    features: [],
    teamSize: 'small',
    support: 'basic'
  });
  
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const pricingData = {
    mvp: {
      title: 'MVP Development Pricing',
      basePrice: 25000,
      complexityMultipliers: {
        simple: 0.7,
        medium: 1.0,
        complex: 1.5,
        enterprise: 2.0
      },
      timelineMultipliers: {
        rush: 1.3,
        standard: 1.0,
        flexible: 0.9
      },
      features: [
        { id: 'auth', name: 'User Authentication', price: 2000 },
        { id: 'payments', name: 'Payment Integration', price: 3000 },
        { id: 'admin', name: 'Admin Dashboard', price: 4000 },
        { id: 'api', name: 'REST API', price: 2500 },
        { id: 'mobile', name: 'Mobile Responsive', price: 1500 },
        { id: 'analytics', name: 'Analytics Integration', price: 1000 }
      ],
      teamSizes: {
        small: { multiplier: 1.0, description: '2-3 developers' },
        medium: { multiplier: 1.3, description: '4-5 developers' },
        large: { multiplier: 1.6, description: '6+ developers' }
      },
      support: {
        basic: { price: 0, description: '30 days post-launch' },
        extended: { price: 5000, description: '90 days post-launch' },
        premium: { price: 10000, description: '6 months post-launch' }
      }
    },
    scaling: {
      title: 'Application Scaling Pricing',
      basePrice: 35000,
      complexityMultipliers: {
        simple: 0.8,
        medium: 1.0,
        complex: 1.4,
        enterprise: 1.8
      },
      timelineMultipliers: {
        rush: 1.2,
        standard: 1.0,
        flexible: 0.95
      },
      features: [
        { id: 'loadbalancing', name: 'Load Balancing', price: 3000 },
        { id: 'caching', name: 'Caching Strategy', price: 2500 },
        { id: 'database', name: 'Database Optimization', price: 4000 },
        { id: 'monitoring', name: 'Performance Monitoring', price: 2000 },
        { id: 'autoscaling', name: 'Auto-scaling Setup', price: 3500 },
        { id: 'cdn', name: 'CDN Implementation', price: 1500 }
      ],
      teamSizes: {
        small: { multiplier: 1.0, description: '2-3 specialists' },
        medium: { multiplier: 1.25, description: '4-5 specialists' },
        large: { multiplier: 1.5, description: '6+ specialists' }
      },
      support: {
        basic: { price: 0, description: '30 days monitoring' },
        extended: { price: 8000, description: '6 months monitoring' },
        premium: { price: 15000, description: '12 months monitoring' }
      }
    },
    transformation: {
      title: 'Digital Transformation Pricing',
      basePrice: 50000,
      complexityMultipliers: {
        simple: 0.9,
        medium: 1.0,
        complex: 1.3,
        enterprise: 1.7
      },
      timelineMultipliers: {
        rush: 1.15,
        standard: 1.0,
        flexible: 0.95
      },
      features: [
        { id: 'migration', name: 'Legacy System Migration', price: 8000 },
        { id: 'integration', name: 'System Integration', price: 6000 },
        { id: 'automation', name: 'Workflow Automation', price: 5000 },
        { id: 'compliance', name: 'Compliance Setup', price: 4000 },
        { id: 'training', name: 'Staff Training', price: 3000 },
        { id: 'security', name: 'Security Audit', price: 4500 }
      ],
      teamSizes: {
        small: { multiplier: 1.0, description: '3-4 experts' },
        medium: { multiplier: 1.2, description: '5-7 experts' },
        large: { multiplier: 1.4, description: '8+ experts' }
      },
      support: {
        basic: { price: 0, description: '60 days transition' },
        extended: { price: 12000, description: '6 months support' },
        premium: { price: 20000, description: '12 months support' }
      }
    }
  };

  const currentPricing = pricingData[selectedService] || pricingData.mvp;

  useEffect(() => {
    calculateCost();
  }, [projectScope, selectedService]);

  const calculateCost = () => {
    const basePrice = currentPricing.basePrice;
    const complexityMultiplier = currentPricing.complexityMultipliers[projectScope.complexity];
    const timelineMultiplier = currentPricing.timelineMultipliers[projectScope.timeline];
    const teamMultiplier = currentPricing.teamSizes[projectScope.teamSize].multiplier;
    
    const featuresPrice = projectScope.features.reduce((total, featureId) => {
      const feature = currentPricing.features.find(f => f.id === featureId);
      return total + (feature ? feature.price : 0);
    }, 0);
    
    const supportPrice = currentPricing.support[projectScope.support].price;
    
    const totalCost = (basePrice * complexityMultiplier * timelineMultiplier * teamMultiplier) + featuresPrice + supportPrice;
    setEstimatedCost(Math.round(totalCost));
  };

  const handleFeatureToggle = (featureId) => {
    setProjectScope(prev => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter(id => id !== featureId)
        : [...prev.features, featureId]
    }));
  };

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            {currentPricing.title}
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Get an instant estimate for your project with our transparent pricing calculator.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calculator Form */}
          <div className="space-y-8">
            {/* Project Complexity */}
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-4">
                Project Complexity
              </label>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(currentPricing.complexityMultipliers).map(([key, multiplier]) => (
                  <button
                    key={key}
                    onClick={() => setProjectScope(prev => ({ ...prev, complexity: key }))}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      projectScope.complexity === key
                        ? 'border-secondary bg-primary text-secondary' :'border-border bg-background hover:border-secondary/50'
                    }`}
                  >
                    <div className="font-medium capitalize">{key}</div>
                    <div className="text-sm text-text-secondary">
                      {multiplier}x multiplier
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-4">
                Timeline Preference
              </label>
              <div className="grid grid-cols-3 gap-3">
                {Object.entries(currentPricing.timelineMultipliers).map(([key, multiplier]) => (
                  <button
                    key={key}
                    onClick={() => setProjectScope(prev => ({ ...prev, timeline: key }))}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                      projectScope.timeline === key
                        ? 'border-secondary bg-primary text-secondary' :'border-border bg-background hover:border-secondary/50'
                    }`}
                  >
                    <div className="font-medium capitalize">{key}</div>
                    <div className="text-xs text-text-secondary">
                      {multiplier}x
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-4">
                Additional Features
              </label>
              <div className="space-y-3">
                {currentPricing.features.map((feature) => (
                  <label
                    key={feature.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-surface cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <Input
                        type="checkbox"
                        checked={projectScope.features.includes(feature.id)}
                        onChange={() => handleFeatureToggle(feature.id)}
                        className="w-5 h-5"
                      />
                      <span className="font-medium text-text-primary">{feature.name}</span>
                    </div>
                    <span className="text-secondary font-semibold">
                      +${feature.price.toLocaleString()}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Team Size */}
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-4">
                Team Size
              </label>
              <div className="space-y-3">
                {Object.entries(currentPricing.teamSizes).map(([key, team]) => (
                  <button
                    key={key}
                    onClick={() => setProjectScope(prev => ({ ...prev, teamSize: key }))}
                    className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                      projectScope.teamSize === key
                        ? 'border-secondary bg-primary text-secondary' :'border-border bg-background hover:border-secondary/50'
                    }`}
                  >
                    <div className="font-medium capitalize">{key} Team</div>
                    <div className="text-sm text-text-secondary">{team.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Support Level */}
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-4">
                Support Level
              </label>
              <div className="space-y-3">
                {Object.entries(currentPricing.support).map(([key, support]) => (
                  <button
                    key={key}
                    onClick={() => setProjectScope(prev => ({ ...prev, support: key }))}
                    className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                      projectScope.support === key
                        ? 'border-secondary bg-primary text-secondary' :'border-border bg-background hover:border-secondary/50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium capitalize">{key} Support</div>
                        <div className="text-sm text-text-secondary">{support.description}</div>
                      </div>
                      {support.price > 0 && (
                        <span className="font-semibold">+${support.price.toLocaleString()}</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-background rounded-2xl p-8 shadow-xl border border-border">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-text-primary mb-2">Project Estimate</h3>
                <div className="text-4xl font-bold text-secondary mb-2">
                  ${estimatedCost.toLocaleString()}
                </div>
                <p className="text-sm text-text-secondary">
                  Estimated investment range
                </p>
              </div>

              <button
                onClick={() => setShowBreakdown(!showBreakdown)}
                className="w-full mb-6 p-3 rounded-lg bg-surface hover:bg-border transition-colors duration-200 flex items-center justify-between"
              >
                <span className="font-medium text-text-primary">View Cost Breakdown</span>
                <Icon 
                  name={showBreakdown ? 'ChevronUp' : 'ChevronDown'} 
                  size={20} 
                />
              </button>

              {showBreakdown && (
                <div className="mb-6 p-4 bg-surface rounded-lg space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Base Price:</span>
                    <span>${currentPricing.basePrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Complexity ({projectScope.complexity}):</span>
                    <span>{currentPricing.complexityMultipliers[projectScope.complexity]}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Timeline ({projectScope.timeline}):</span>
                    <span>{currentPricing.timelineMultipliers[projectScope.timeline]}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Team Size ({projectScope.teamSize}):</span>
                    <span>{currentPricing.teamSizes[projectScope.teamSize].multiplier}x</span>
                  </div>
                  {projectScope.features.length > 0 && (
                    <div className="flex justify-between">
                      <span>Additional Features:</span>
                      <span>+${projectScope.features.reduce((total, featureId) => {
                        const feature = currentPricing.features.find(f => f.id === featureId);
                        return total + (feature ? feature.price : 0);
                      }, 0).toLocaleString()}</span>
                    </div>
                  )}
                  {currentPricing.support[projectScope.support].price > 0 && (
                    <div className="flex justify-between">
                      <span>Support ({projectScope.support}):</span>
                      <span>+${currentPricing.support[projectScope.support].price.toLocaleString()}</span>
                    </div>
                  )}
                  <hr className="border-border" />
                  <div className="flex justify-between font-semibold">
                    <span>Total Estimate:</span>
                    <span>${estimatedCost.toLocaleString()}</span>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <Button 
                  variant="primary" 
                  fullWidth
                  iconName="MessageCircle" 
                  iconPosition="left"
                  className="shadow-lg"
                >
                  Get Detailed Quote
                </Button>
                <Button 
                  variant="outline" 
                  fullWidth
                  iconName="Calendar" 
                  iconPosition="left"
                >
                  Schedule Consultation
                </Button>
              </div>

              <div className="mt-6 p-4 bg-success/10 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Shield" size={16} color="var(--color-success)" />
                  <span className="font-semibold text-success">Price Match Guarantee</span>
                </div>
                <p className="text-sm text-text-secondary">
                  We'll match any comparable quote from qualified competitors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCalculator;