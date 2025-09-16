import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CaseStudies = ({ selectedService }) => {
  const [activeCase, setActiveCase] = useState(0);

  const caseStudies = {
    mvp: [
      {
        id: 1,
        title: 'FinTech Startup MVP',
        client: 'PayFlow Solutions',
        industry: 'Financial Technology',
        timeline: '12 weeks',
        budget: '$35,000',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
        challenge: `PayFlow needed to launch their peer-to-peer payment platform quickly to compete with established players. They required a secure, scalable MVP that could handle financial transactions while maintaining regulatory compliance.`,
        solution: `We developed a React-based web application with Node.js backend, integrated with Stripe for payments and implemented bank-level security. The MVP included user authentication, transaction history, and real-time notifications.`,
        results: [
          { metric: '10,000+', description: 'Users in first month' },
          { metric: '$2M+', description: 'Transaction volume' },
          { metric: '99.9%', description: 'Uptime achieved' },
          { metric: '4.8/5', description: 'App store rating' }
        ],
        technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe API', 'AWS'],
        testimonial: {
          quote: `Clykur delivered exactly what we needed - a robust MVP that allowed us to validate our market and secure Series A funding. Their technical expertise and business understanding were exceptional.`,
          author: 'Sarah Chen',
          position: 'CEO, PayFlow Solutions'
        }
      },
      {
        id: 2,
        title: 'E-learning Platform MVP',
        client: 'EduTech Innovations',
        industry: 'Education Technology',
        timeline: '10 weeks',
        budget: '$28,000',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
        challenge: `EduTech needed to rapidly prototype an online learning platform to compete in the post-pandemic education market. They required video streaming, interactive assessments, and progress tracking.`,
        solution: `Built a comprehensive learning management system with React frontend, Django backend, and integrated video streaming. Included student dashboards, instructor tools, and analytics.`,
        results: [
          { metric: '5,000+', description: 'Students enrolled' },
          { metric: '200+', description: 'Courses created' },
          { metric: '85%', description: 'Course completion rate' },
          { metric: '6 months', description: 'To profitability' }
        ],
        technologies: ['React', 'Django', 'PostgreSQL', 'AWS S3', 'WebRTC'],
        testimonial: {
          quote: `The MVP exceeded our expectations and helped us secure partnerships with three major universities. Clykur's agile approach kept us on track throughout the project.`,author: 'Michael Rodriguez',position: 'Founder, EduTech Innovations'
        }
      }
    ],
    scaling: [
      {
        id: 3,
        title: 'E-commerce Platform Scaling',client: 'RetailMax',industry: 'E-commerce',timeline: '8 weeks',budget: '$45,000',image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',challenge: `RetailMax's platform was struggling with 500% growth, experiencing slow page loads, database timeouts, and frequent crashes during peak traffic periods.`,
        solution: `Implemented microservices architecture, database sharding, Redis caching, and auto-scaling infrastructure on AWS. Optimized database queries and implemented CDN for static assets.`,
        results: [
          { metric: '10x', description: 'User capacity increase' },
          { metric: '75%', description: 'Page load time reduction' },
          { metric: '40%', description: 'Infrastructure cost savings' },
          { metric: '99.99%', description: 'Uptime improvement' }
        ],
        technologies: ['Microservices', 'Redis', 'AWS ECS', 'CloudFront', 'MongoDB'],
        testimonial: {
          quote: `Clykur transformed our struggling platform into a high-performance system that handles Black Friday traffic without breaking a sweat. The cost savings alone paid for the project.`,
          author: 'Jennifer Walsh',
          position: 'CTO, RetailMax'
        }
      },
      {
        id: 4,
        title: 'SaaS Application Optimization',
        client: 'DataSync Pro',
        industry: 'Software as a Service',
        timeline: '6 weeks',
        budget: '$38,000',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        challenge: `DataSync's application was processing large datasets slowly, causing customer churn due to poor performance and high operational costs.`,
        solution: `Optimized data processing algorithms, implemented background job queues, added intelligent caching layers, and migrated to more efficient cloud infrastructure.`,
        results: [
          { metric: '8x', description: 'Processing speed increase' },
          { metric: '60%', description: 'Server cost reduction' },
          { metric: '25%', description: 'Customer churn decrease' },
          { metric: '95%', description: 'Customer satisfaction' }
        ],
        technologies: ['Python', 'Celery', 'Redis', 'PostgreSQL', 'Docker'],
        testimonial: {
          quote: `The performance improvements were incredible. Our customers are happy, our costs are down, and we can finally scale without worrying about system limitations.`,
          author: 'David Kim',position: 'VP Engineering, DataSync Pro'
        }
      }
    ],
    transformation: [
      {
        id: 5,
        title: 'Legacy System Modernization',client: 'MedCorp Healthcare',industry: 'Healthcare',timeline: '16 weeks',budget: '$85,000',image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
        challenge: `MedCorp was running critical operations on a 15-year-old legacy system that was becoming increasingly difficult to maintain and couldn't meet modern compliance requirements.`,
        solution: `Migrated to a modern cloud-native architecture with microservices, implemented HIPAA-compliant security measures, and created APIs for third-party integrations while ensuring zero downtime during transition.`,
        results: [
          { metric: '90%', description: 'Maintenance cost reduction' },
          { metric: '5x', description: 'System performance improvement' },
          { metric: '100%', description: 'Compliance achievement' },
          { metric: '0', description: 'Downtime during migration' }
        ],
        technologies: ['React', 'Node.js', 'AWS', 'Docker', 'Kubernetes'],
        testimonial: {
          quote: `Clykur managed the most complex project in our company's history flawlessly. The new system has transformed how we operate and positioned us for future growth.`,
          author: 'Dr. Amanda Foster',position: 'Chief Information Officer, MedCorp Healthcare'
        }
      },
      {
        id: 6,
        title: 'Manufacturing Digital Transformation',client: 'TechManufacturing Inc.',industry: 'Manufacturing',timeline: '20 weeks',budget: '$120,000',image: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=800&h=600&fit=crop',
        challenge: `TechManufacturing needed to digitize their entire production workflow, from inventory management to quality control, while integrating with existing machinery and ERP systems.`,
        solution: `Developed a comprehensive IoT-enabled manufacturing execution system with real-time monitoring, predictive maintenance, and automated reporting. Integrated with existing ERP and implemented mobile apps for floor workers.`,
        results: [
          { metric: '35%', description: 'Production efficiency increase' },
          { metric: '50%', description: 'Defect rate reduction' },
          { metric: '25%', description: 'Maintenance cost savings' },
          { metric: '100%', description: 'Real-time visibility' }
        ],
        technologies: ['IoT Sensors', 'React', 'Python', 'PostgreSQL', 'MQTT'],
        testimonial: {
          quote: `This transformation has revolutionized our operations. We now have complete visibility into our production process and can make data-driven decisions in real-time.`,
          author: 'Robert Chen',position: 'Operations Director, TechManufacturing Inc.'
        }
      }
    ]
  };

  const currentCases = caseStudies[selectedService] || caseStudies.mvp;
  const activeStudy = currentCases[activeCase];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Success Stories
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Real results from real clients. See how we've helped businesses transform their digital presence.
          </p>
        </div>

        {/* Case Study Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {currentCases.map((study, index) => (
            <button
              key={study.id}
              onClick={() => setActiveCase(index)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCase === index
                  ? 'bg-secondary text-secondary-foreground shadow-lg'
                  : 'bg-surface text-text-secondary hover:bg-border hover:text-text-primary'
              }`}
            >
              {study.client}
            </button>
          ))}
        </div>

        {/* Active Case Study */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Case Study Image */}
          <div className="relative">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={activeStudy.image}
                alt={activeStudy.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Overlay Info */}
            <div className="absolute top-6 left-6 bg-background/90 backdrop-blur-sm rounded-lg p-4">
              <div className="text-sm text-text-secondary">{activeStudy.industry}</div>
              <div className="font-semibold text-text-primary">{activeStudy.client}</div>
            </div>
          </div>

          {/* Case Study Content */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">
                {activeStudy.title}
              </h3>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Clock" size={16} color="var(--color-secondary)" />
                  <span className="text-text-secondary">Timeline:</span>
                  <span className="font-medium text-text-primary">{activeStudy.timeline}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="DollarSign" size={16} color="var(--color-success)" />
                  <span className="text-text-secondary">Budget:</span>
                  <span className="font-medium text-text-primary">{activeStudy.budget}</span>
                </div>
              </div>
            </div>

            {/* Challenge */}
            <div>
              <h4 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                <Icon name="AlertCircle" size={18} color="var(--color-warning)" />
                Challenge
              </h4>
              <p className="text-text-secondary leading-relaxed">
                {activeStudy.challenge}
              </p>
            </div>

            {/* Solution */}
            <div>
              <h4 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                <Icon name="Lightbulb" size={18} color="var(--color-accent)" />
                Solution
              </h4>
              <p className="text-text-secondary leading-relaxed">
                {activeStudy.solution}
              </p>
            </div>

            {/* Technologies */}
            <div>
              <h4 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                <Icon name="Code" size={18} color="var(--color-secondary)" />
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeStudy.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary text-secondary text-sm font-medium rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeStudy.results.map((result, index) => (
            <div key={index} className="bg-surface rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="text-3xl font-bold text-secondary mb-2">
                {result.metric}
              </div>
              <div className="text-sm text-text-secondary">
                {result.description}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="mt-16 bg-gradient-to-r from-primary to-surface rounded-2xl p-8 lg:p-12">
          <div className="max-w-4xl mx-auto text-center">
            <Icon name="Quote" size={48} color="var(--color-secondary)" className="mx-auto mb-6 opacity-50" />
            
            <blockquote className="text-lg lg:text-xl text-text-primary mb-8 leading-relaxed">
              "{activeStudy.testimonial.quote}"
            </blockquote>
            
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center">
                <span className="text-white font-bold">
                  {activeStudy.testimonial.author.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-text-primary">
                  {activeStudy.testimonial.author}
                </div>
                <div className="text-sm text-text-secondary">
                  {activeStudy.testimonial.position}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-text-primary mb-4">
            Ready to Create Your Success Story?
          </h3>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Join our growing list of satisfied clients who have transformed their businesses with our expertise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="primary" 
              size="lg"
              iconName="MessageCircle" 
              iconPosition="left"
              className="shadow-lg"
            >
              Start Your Project
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              iconName="FileText" 
              iconPosition="left"
            >
              View All Case Studies
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;