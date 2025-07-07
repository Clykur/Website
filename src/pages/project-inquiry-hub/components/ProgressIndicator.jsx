import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps }) => {
  const steps = [
    { id: 1, title: 'Project Type', icon: 'Target' },
    { id: 2, title: 'Project Details', icon: 'FileText' },
    { id: 3, title: 'Contact Info', icon: 'User' },
    { id: 4, title: 'Roadmap', icon: 'CheckCircle' }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  currentStep > step.id
                    ? 'bg-success border-success text-white'
                    : currentStep === step.id
                    ? 'bg-secondary border-secondary text-white' :'bg-background border-border text-text-secondary'
                }`}
              >
                {currentStep > step.id ? (
                  <Icon name="Check" size={20} />
                ) : (
                  <Icon name={step.icon} size={20} />
                )}
              </div>
              <div className="mt-2 text-center">
                <p className={`text-sm font-medium ${
                  currentStep >= step.id ? 'text-text-primary' : 'text-text-secondary'
                }`}>
                  {step.title}
                </p>
                <p className="text-xs text-text-secondary">
                  Step {step.id}
                </p>
              </div>
            </div>
            
            {index < steps.length - 1 && (
              <div className="flex-1 mx-4">
                <div className={`h-0.5 transition-all duration-300 ${
                  currentStep > step.id ? 'bg-success' : 'bg-border'
                }`} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      
      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between text-sm text-text-secondary mb-2">
          <span>Progress</span>
          <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-border rounded-full h-2">
          <div
            className="bg-secondary h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;