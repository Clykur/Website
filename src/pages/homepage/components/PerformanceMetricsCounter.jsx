import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceMetricsCounter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    applications: 0,
    retention: 0,
    roi: 0,
    response: 0
  });
  
  const sectionRef = useRef(null);

  const metrics = [
    {
      key: 'applications',
      label: 'Applications Delivered',
      target: 50,
      suffix: '+',
      icon: 'Code',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      key: 'retention',
      label: 'Client Retention Rate',
      target: 95,
      suffix: '%',
      icon: 'Users',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      key: 'roi',
      label: 'Average ROI Increase',
      target: 2.3,
      suffix: 'x',
      icon: 'TrendingUp',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      decimal: true
    },
    {
      key: 'response',
      label: 'Response Time',
      target: 48,
      suffix: 'h',
      icon: 'Clock',
      color: 'text-success',
      bgColor: 'bg-success/10'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    metrics.forEach((metric) => {
      let currentStep = 0;
      const increment = metric.target / steps;

      const timer = setInterval(() => {
        currentStep++;
        const currentValue = increment * currentStep;
        
        setCounters(prev => ({
          ...prev,
          [metric.key]: currentValue >= metric.target ? metric.target : currentValue
        }));

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, stepDuration);
    });
  }, [isVisible]);

  const formatValue = (value, metric) => {
    if (metric.decimal) {
      return value.toFixed(1);
    }
    return Math.floor(value);
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-secondary/5 to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Proven <span className="text-gradient">Results</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Numbers don't lie. Here's the quantified impact we've delivered for our partners across various industries and project scales.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {metrics.map((metric) => (
            <div
              key={metric.key}
              className="text-center group"
            >
              {/* Icon Container */}
              <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl ${metric.bgColor} ${metric.color} mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <Icon name={metric.icon} size={24} className="sm:w-8 sm:h-8" />
              </div>

              {/* Counter Value */}
              <div className="mb-2">
                <span className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-text-primary">
                  {formatValue(counters[metric.key], metric)}
                </span>
                <span className={`text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold ${metric.color}`}>
                  {metric.suffix}
                </span>
              </div>

              {/* Label */}
              <div className="text-sm sm:text-base text-text-secondary font-medium px-2">
                {metric.label}
              </div>

              {/* Progress Bar */}
              <div className="mt-3 sm:mt-4 w-full bg-border rounded-full h-1.5 sm:h-2 overflow-hidden">
                <div
                  className={`h-full ${metric.color.replace('text-', 'bg-')} transition-all duration-2000 ease-out`}
                  style={{
                    width: isVisible ? `${(counters[metric.key] / metric.target) * 100}%` : '0%'
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Additional Context */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
          <div className="space-y-1 sm:space-y-2 p-4 sm:p-0">
            <div className="text-xl sm:text-2xl font-bold text-text-primary">100%</div>
            <div className="text-sm sm:text-base text-text-secondary font-medium">Project Success Rate</div>
            <div className="text-xs sm:text-sm text-text-secondary opacity-75 px-2">Every project delivered on time and within scope</div>
          </div>
          <div className="space-y-1 sm:space-y-2 p-4 sm:p-0">
            <div className="text-xl sm:text-2xl font-bold text-text-primary">24/7</div>
            <div className="text-sm sm:text-base text-text-secondary font-medium">Support Availability</div>
            <div className="text-xs sm:text-sm text-text-secondary opacity-75 px-2">Round-the-clock technical support and monitoring</div>
          </div>
          <div className="space-y-1 sm:space-y-2 p-4 sm:p-0">
            <div className="text-xl sm:text-2xl font-bold text-text-primary">4.9/5</div>
            <div className="text-sm sm:text-base text-text-secondary font-medium">Client Satisfaction</div>
            <div className="text-xs sm:text-sm text-text-secondary opacity-75 px-2">Based on post-project surveys and reviews</div>
          </div>
        </div>

        {/* Bottom Quote */}
        <div className="mt-16 text-center">
          <blockquote className="text-lg italic text-text-secondary max-w-3xl mx-auto">
            "These aren't just numbers—they represent real businesses transformed, real problems solved, and real value created for our partners."
          </blockquote>
          <div className="mt-4 text-sm text-text-secondary">
            — Chandu Kalluru & Karthik Naramala
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerformanceMetricsCounter;
