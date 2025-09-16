import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const TechnologyStack = ({ selectedService }) => {
  const [activeCategory, setActiveCategory] = useState('frontend');

  const technologyStacks = {
    mvp: {
      title: 'MVP Development Stack',
      description: 'Proven technologies for rapid, scalable MVP development',
      categories: {
        frontend: {
          name: 'Frontend',
          icon: 'Monitor',
          technologies: [
            { name: 'React', description: 'Modern UI library for interactive interfaces', icon: '⚛️', popularity: 95 },
            { name: 'Next.js', description: 'Full-stack React framework with SSR', icon: '▲', popularity: 90 },
            { name: 'TypeScript', description: 'Type-safe JavaScript for better code quality', icon: '📘', popularity: 85 },
            { name: 'Tailwind CSS', description: 'Utility-first CSS framework', icon: '🎨', popularity: 88 },
            { name: 'Framer Motion', description: 'Animation library for React', icon: '🎬', popularity: 75 }
          ]
        },
        backend: {
          name: 'Backend',
          icon: 'Server',
          technologies: [
            { name: 'Node.js', description: 'JavaScript runtime for server-side development', icon: '🟢', popularity: 92 },
            { name: 'Express.js', description: 'Fast, minimalist web framework', icon: '🚀', popularity: 88 },
            { name: 'Python/Django', description: 'Rapid development with Python', icon: '🐍', popularity: 85 },
            { name: 'PostgreSQL', description: 'Powerful, open-source relational database', icon: '🐘', popularity: 90 },
            { name: 'Redis', description: 'In-memory data structure store', icon: '🔴', popularity: 80 }
          ]
        },
        cloud: {
          name: 'Cloud & DevOps',
          icon: 'Cloud',
          technologies: [
            { name: 'AWS', description: 'Comprehensive cloud computing platform', icon: '☁️', popularity: 95 },
            { name: 'Vercel', description: 'Frontend deployment platform', icon: '▲', popularity: 85 },
            { name: 'Docker', description: 'Containerization platform', icon: '🐳', popularity: 88 },
            { name: 'GitHub Actions', description: 'CI/CD automation', icon: '⚙️', popularity: 82 },
            { name: 'Stripe', description: 'Payment processing platform', icon: '💳', popularity: 90 }
          ]
        }
      }
    },
    scaling: {
      title: 'Application Scaling Stack',
      description: 'Enterprise-grade technologies for high-performance applications',
      categories: {
        frontend: {
          name: 'Frontend',
          icon: 'Monitor',
          technologies: [
            { name: 'React', description: 'Optimized with code splitting and lazy loading', icon: '⚛️', popularity: 95 },
            { name: 'Next.js', description: 'SSR and static generation for performance', icon: '▲', popularity: 92 },
            { name: 'CDN', description: 'Global content delivery network', icon: '🌐', popularity: 98 },
            { name: 'Service Workers', description: 'Offline functionality and caching', icon: '⚡', popularity: 75 },
            { name: 'Web Vitals', description: 'Performance monitoring and optimization', icon: '📊', popularity: 85 }
          ]
        },
        backend: {
          name: 'Backend',
          icon: 'Server',
          technologies: [
            { name: 'Microservices', description: 'Scalable service-oriented architecture', icon: '🔧', popularity: 90 },
            { name: 'Load Balancers', description: 'Traffic distribution and failover', icon: '⚖️', popularity: 95 },
            { name: 'Auto Scaling', description: 'Dynamic resource allocation', icon: '📈', popularity: 88 },
            { name: 'Database Sharding', description: 'Horizontal database scaling', icon: '🗄️', popularity: 80 },
            { name: 'Caching Layers', description: 'Multi-level caching strategy', icon: '💾', popularity: 92 }
          ]
        },
        cloud: {
          name: 'Cloud & Infrastructure',
          icon: 'Cloud',
          technologies: [
            { name: 'AWS ECS/EKS', description: 'Container orchestration at scale', icon: '☁️', popularity: 90 },
            { name: 'CloudFront', description: 'Global CDN with edge locations', icon: '🌍', popularity: 95 },
            { name: 'ElastiCache', description: 'Managed in-memory caching', icon: '⚡', popularity: 85 },
            { name: 'RDS Multi-AZ', description: 'High-availability database setup', icon: '🗃️', popularity: 88 },
            { name: 'CloudWatch', description: 'Comprehensive monitoring and alerting', icon: '👁️', popularity: 92 }
          ]
        }
      }
    },
    transformation: {
      title: 'Digital Transformation Stack',
      description: 'Enterprise-ready technologies for large-scale digital transformation',
      categories: {
        frontend: {
          name: 'Frontend',
          icon: 'Monitor',
          technologies: [
            { name: 'React/Angular', description: 'Enterprise UI frameworks with TypeScript', icon: '⚛️', popularity: 95 },
            { name: 'Micro Frontends', description: 'Scalable frontend architecture', icon: '🧩', popularity: 80 },
            { name: 'Design Systems', description: 'Consistent UI component libraries', icon: '🎨', popularity: 85 },
            { name: 'PWA', description: 'Progressive web app capabilities', icon: '📱', popularity: 78 },
            { name: 'Accessibility', description: 'WCAG 2.1 AA compliance', icon: '♿', popularity: 90 }
          ]
        },
        backend: {
          name: 'Backend',
          icon: 'Server',
          technologies: [
            { name: 'Enterprise APIs', description: 'RESTful and GraphQL APIs', icon: '🔗', popularity: 95 },
            { name: 'Message Queues', description: 'Asynchronous processing with RabbitMQ/Kafka', icon: '📬', popularity: 88 },
            { name: 'Event Sourcing', description: 'Audit trails and system reliability', icon: '📝', popularity: 75 },
            { name: 'Data Pipelines', description: 'ETL processes for data integration', icon: '🔄', popularity: 85 },
            { name: 'Security', description: 'OAuth 2.0, JWT, and encryption', icon: '🔒', popularity: 98 }
          ]
        },
        cloud: {
          name: 'Enterprise Cloud',
          icon: 'Cloud',
          technologies: [
            { name: 'Multi-Cloud', description: 'AWS, Azure, and GCP integration', icon: '☁️', popularity: 85 },
            { name: 'Kubernetes', description: 'Container orchestration platform', icon: '⚙️', popularity: 90 },
            { name: 'Service Mesh', description: 'Istio for microservices communication', icon: '🕸️', popularity: 75 },
            { name: 'Compliance', description: 'SOC 2, HIPAA, GDPR compliance', icon: '✅', popularity: 95 },
            { name: 'Disaster Recovery', description: 'Multi-region backup and failover', icon: '🛡️', popularity: 92 }
          ]
        }
      }
    }
  };

  const currentStack = technologyStacks[selectedService] || technologyStacks.mvp;
  const categories = Object.keys(currentStack.categories);

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            {currentStack.title}
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            {currentStack.description}
          </p>
        </div>

        {/* Category Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => {
            const categoryData = currentStack.categories[category];
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex items-center gap-3 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-secondary text-secondary-foreground shadow-lg scale-105'
                    : 'bg-background text-text-secondary hover:bg-border hover:text-text-primary'
                }`}
              >
                <Icon name={categoryData.icon} size={18} />
                {categoryData.name}
              </button>
            );
          })}
        </div>

        {/* Technology Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentStack.categories[activeCategory].technologies.map((tech, index) => (
            <div
              key={index}
              className="bg-background rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-border"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-3xl">{tech.icon}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-text-primary mb-1">{tech.name}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {tech.description}
                  </p>
                </div>
              </div>

              {/* Popularity Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-text-secondary">Adoption Rate</span>
                  <span className="text-xs font-medium text-secondary">{tech.popularity}%</span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-secondary to-accent h-2 rounded-full transition-all duration-500"
                    style={{ width: `${tech.popularity}%` }}
                  ></div>
                </div>
              </div>

              {/* Technology Badge */}
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-primary text-secondary text-xs font-medium rounded-full">
                  {activeCategory}
                </span>
                <Icon name="ExternalLink" size={16} className="text-text-secondary hover:text-secondary cursor-pointer" />
              </div>
            </div>
          ))}
        </div>

        {/* Technology Benefits */}
        <div className="mt-20 bg-gradient-to-r from-primary to-background rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Why These Technologies?
            </h3>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Our technology choices are based on proven performance, scalability, and long-term maintainability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Zap" size={24} color="white" />
              </div>
              <h4 className="font-semibold text-text-primary mb-2">Performance</h4>
              <p className="text-sm text-text-secondary">
                Optimized for speed and efficiency
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="TrendingUp" size={24} color="white" />
              </div>
              <h4 className="font-semibold text-text-primary mb-2">Scalability</h4>
              <p className="text-sm text-text-secondary">
                Grows with your business needs
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" size={24} color="white" />
              </div>
              <h4 className="font-semibold text-text-primary mb-2">Security</h4>
              <p className="text-sm text-text-secondary">
                Enterprise-grade security standards
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-warning rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Users" size={24} color="white" />
              </div>
              <h4 className="font-semibold text-text-primary mb-2">Community</h4>
              <p className="text-sm text-text-secondary">
                Strong community support and resources
              </p>
            </div>
          </div>
        </div>

        {/* Architecture Diagram */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Architecture Overview
            </h3>
            <p className="text-text-secondary">
              How our technology stack works together
            </p>
          </div>

          <div className="bg-background rounded-2xl p-8 shadow-xl border border-border">
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              {/* Frontend Layer */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="Monitor" size={32} color="white" />
                </div>
                <h4 className="font-bold text-text-primary mb-2">Frontend Layer</h4>
                <p className="text-sm text-text-secondary mb-4">
                  User interface and experience
                </p>
                <div className="space-y-2">
                  {currentStack.categories.frontend.technologies.slice(0, 3).map((tech, index) => (
                    <div key={index} className="text-xs bg-surface px-3 py-1 rounded-full">
                      {tech.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Connection Arrow */}
              <div className="hidden lg:flex justify-center">
                <Icon name="ArrowRight" size={24} className="text-text-secondary" />
              </div>

              {/* Backend Layer */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="Server" size={32} color="white" />
                </div>
                <h4 className="font-bold text-text-primary mb-2">Backend Layer</h4>
                <p className="text-sm text-text-secondary mb-4">
                  Business logic and data processing
                </p>
                <div className="space-y-2">
                  {currentStack.categories.backend.technologies.slice(0, 3).map((tech, index) => (
                    <div key={index} className="text-xs bg-surface px-3 py-1 rounded-full">
                      {tech.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Cloud Infrastructure */}
            <div className="mt-8 pt-8 border-t border-border">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="Cloud" size={32} color="white" />
                </div>
                <h4 className="font-bold text-text-primary mb-2">Cloud Infrastructure</h4>
                <p className="text-sm text-text-secondary mb-4">
                  Scalable, secure, and reliable hosting
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {currentStack.categories.cloud.technologies.slice(0, 4).map((tech, index) => (
                    <div key={index} className="text-xs bg-surface px-3 py-1 rounded-full">
                      {tech.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyStack;