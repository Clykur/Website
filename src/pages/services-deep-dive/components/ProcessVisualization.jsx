import React from 'react';
import Icon from '../../../components/AppIcon';

const ProcessVisualization = ({ selectedService }) => {
  const processes = {
    mvp: {
      title: '5-Phase MVP Development Process',
      phases: [
        {
          phase: 'Discovery',
          duration: '1-2 weeks',
          icon: 'Search',
          description: 'Market research, user interviews, and requirement analysis',
          deliverables: ['Market Analysis Report', 'User Personas', 'Technical Requirements', 'Project Roadmap']
        },
        {
          phase: 'Architecture',
          duration: '1-2 weeks',
          icon: 'Layout',
          description: 'System design, technology stack selection, and infrastructure planning',
          deliverables: ['System Architecture', 'Database Design', 'API Specifications', 'Security Framework']
        },
        {
          phase: 'Development',
          duration: '4-8 weeks',
          icon: 'Code',
          description: 'Agile development with weekly sprints and continuous integration',
          deliverables: ['Core Features', 'User Interface', 'API Development', 'Database Implementation']
        },
        {
          phase: 'Testing',
          duration: '1-2 weeks',
          icon: 'CheckCircle',
          description: 'Comprehensive testing including unit, integration, and user acceptance',
          deliverables: ['Test Reports', 'Bug Fixes', 'Performance Optimization', 'Security Audit']
        },
        {
          phase: 'Launch',
          duration: '1-2 weeks',
          icon: 'Rocket',
          description: 'Deployment, monitoring setup, and post-launch support',
          deliverables: ['Production Deployment', 'Monitoring Setup', 'Documentation', '30-day Support']
        }
      ]
    },
    scaling: {
      title: 'Application Scaling Framework',
      phases: [
        {
          phase: 'Assessment',
          duration: '1 week',
          icon: 'BarChart3',
          description: 'Performance analysis and bottleneck identification',
          deliverables: ['Performance Audit', 'Scalability Report', 'Cost Analysis', 'Optimization Plan']
        },
        {
          phase: 'Architecture',
          duration: '1-2 weeks',
          icon: 'Network',
          description: 'Microservices design and cloud infrastructure planning',
          deliverables: ['Scalable Architecture', 'Cloud Strategy', 'Database Optimization', 'Caching Strategy']
        },
        {
          phase: 'Implementation',
          duration: '3-6 weeks',
          icon: 'Settings',
          description: 'Infrastructure migration and performance optimization',
          deliverables: ['Cloud Migration', 'Load Balancing', 'Auto-scaling Setup', 'Database Sharding']
        },
        {
          phase: 'Optimization',
          duration: '1-2 weeks',
          icon: 'Zap',
          description: 'Performance tuning and cost optimization',
          deliverables: ['Performance Tuning', 'Cost Optimization', 'Monitoring Setup', 'Alert Configuration']
        },
        {
          phase: 'Monitoring',
          duration: 'Ongoing',
          icon: 'Activity',
          description: 'Continuous monitoring and proactive maintenance',
          deliverables: ['24/7 Monitoring', 'Performance Reports', 'Proactive Maintenance', 'Scaling Recommendations']
        }
      ]
    },
    transformation: {
      title: 'Digital Transformation Journey',
      phases: [
        {
          phase: 'Strategy',
          duration: '2-3 weeks',
          icon: 'Target',
          description: 'Digital strategy development and transformation roadmap',
          deliverables: ['Digital Strategy', 'Transformation Roadmap', 'ROI Projections', 'Risk Assessment']
        },
        {
          phase: 'Planning',
          duration: '2-4 weeks',
          icon: 'Map',
          description: 'Detailed planning and technology selection',
          deliverables: ['Implementation Plan', 'Technology Stack', 'Integration Strategy', 'Change Management']
        },
        {
          phase: 'Migration',
          duration: '6-12 weeks',
          icon: 'ArrowRight',
          description: 'Legacy system migration and new system implementation',
          deliverables: ['Data Migration', 'System Integration', 'API Development', 'Security Implementation']
        },
        {
          phase: 'Integration',
          duration: '2-4 weeks',
          icon: 'Link',
          description: 'System integration and workflow automation',
          deliverables: ['System Integration', 'Workflow Automation', 'Data Synchronization', 'User Training']
        },
        {
          phase: 'Optimization',
          duration: 'Ongoing',
          icon: 'TrendingUp',
          description: 'Continuous improvement and optimization',
          deliverables: ['Performance Monitoring', 'Process Optimization', 'User Feedback', 'Continuous Updates']
        }
      ]
    }
  };

  const currentProcess = processes[selectedService] || processes.mvp;

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            {currentProcess.title}
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Our proven methodology ensures successful project delivery with complete transparency at every step.
          </p>
        </div>

        <div className="relative">
          {/* Process Timeline */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-secondary to-accent rounded-full"></div>

          <div className="space-y-12 lg:space-y-16">
            {currentProcess.phases.map((phase, index) => (
              <div key={index} className={`flex flex-col lg:flex-row items-center gap-8 ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}>
                {/* Phase Content */}
                <div className="flex-1 lg:max-w-md">
                  <div className={`bg-surface rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 ${
                    index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'
                  }`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-xl flex items-center justify-center">
                        <Icon name={phase.icon} size={24} color="white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-text-primary">{phase.phase}</h3>
                        <p className="text-sm text-accent font-medium">{phase.duration}</p>
                      </div>
                    </div>
                    
                    <p className="text-text-secondary mb-6 leading-relaxed">
                      {phase.description}
                    </p>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-text-primary text-sm">Key Deliverables:</h4>
                      <div className="flex flex-wrap gap-2">
                        {phase.deliverables.map((deliverable, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1 bg-primary text-secondary text-xs font-medium rounded-full"
                          >
                            {deliverable}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phase Number */}
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold text-white">{index + 1}</span>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 lg:max-w-md hidden lg:block"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Benefits */}
        <div className="mt-20 bg-gradient-to-r from-primary to-surface rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-text-primary mb-4">Why Our Process Works</h3>
            <p className="text-text-secondary">Proven methodology with measurable results</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" size={24} color="white" />
              </div>
              <h4 className="font-semibold text-text-primary mb-2">Risk Mitigation</h4>
              <p className="text-sm text-text-secondary">Structured approach reduces project risks by 80%</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Clock" size={24} color="white" />
              </div>
              <h4 className="font-semibold text-text-primary mb-2">On-Time Delivery</h4>
              <p className="text-sm text-text-secondary">95% of projects delivered on schedule</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Users" size={24} color="white" />
              </div>
              <h4 className="font-semibold text-text-primary mb-2">Client Satisfaction</h4>
              <p className="text-sm text-text-secondary">98% client satisfaction rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessVisualization;