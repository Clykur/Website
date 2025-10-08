import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecentLaunchesSection = () => {
  const productRoadmap = [
    {
      id: 1,
      title: "AI Business Assistant",
      description: "Your intelligent co-pilot that automates workflows, predicts business needs, and scales operations with zero manual intervention. Built with advanced GPT-4 integration and custom neural networks.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
      category: "Core AI Engine",
      technologies: ["GPT-4", "Neural Networks", "Workflow Automation", "Predictive Analytics", "API Integration"],
      status: "Coming Soon",
      launchDate: "Q2 2026",
      features: {
        automation: "90%",
        accuracy: "99.7%",
        speed: "10x faster"
      },
      phase: "Development",
      featured: true
    },
    {
      id: 2,
      title: "Global Freelancer Network",
      description: "Revolutionary AI-powered marketplace that connects businesses with the world's best freelancers through intelligent matching, cultural intelligence, and real-time collaboration tools.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
      category: "Marketplace",
      technologies: ["Smart Matching", "Global Infrastructure", "Real-time Translation", "Cultural AI", "Blockchain"],
      status: "In Development",
      launchDate: "Q3 2026",
      features: {
        countries: "150+",
        accuracy: "95%",
        speed: "Instant"
      },
      phase: "Alpha Testing",
      featured: false
    },
    {
      id: 3,
      title: "Intelligent Project Management",
      description: "AI-driven project orchestration that adapts to your workflow, optimizes team performance in real-time, and predicts project outcomes with unprecedented accuracy.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      category: "Project Intelligence",
      technologies: ["Adaptive Algorithms", "Performance Analytics", "Predictive Modeling", "Team Optimization", "Outcome Prediction"],
      status: "Beta Testing",
      launchDate: "Q2 2026",
      features: {
        efficiency: "5x",
        accuracy: "98%",
        automation: "85%"
      },
      phase: "Beta",
      featured: false
    },
    {
      id: 4,
      title: "Unified Business Hub",
      description: "One platform that integrates all your business tools, clients, and projects with seamless AI automation. The ultimate command center for modern businesses and freelancers.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      category: "Platform Integration",
      technologies: ["API Gateway", "Smart Automation", "Unified Dashboard", "Real-time Sync", "Cloud Native"],
      status: "Early Access",
      launchDate: "Q1 2026",
      features: {
        integrations: "500+",
        automation: "95%",
        efficiency: "10x"
      },
      phase: "Early Access",
      featured: false
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Coming Soon':
        return 'bg-accent text-accent-foreground';
      case 'In Development':
        return 'bg-warning text-warning-foreground';
      case 'Beta Testing':
        return 'bg-secondary text-secondary-foreground';
      case 'Early Access':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-border text-text-secondary';
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
            <Icon name="Rocket" size={16} className="mr-2" />
            🚀 Product Roadmap
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            What We're <span className="text-gradient">Building</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Get an exclusive preview of the revolutionary AI-powered features we're developing to transform how businesses and freelancers work together globally.
          </p>
        </div>

        {/* Product Roadmap Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {productRoadmap.map((product) => (
            <div
              key={product.id}
              className={`card overflow-hidden card-hover ${
                product.featured ? 'lg:col-span-2' : ''
              }`}
            >
              <div className={`${product.featured ? 'lg:flex' : ''}`}>
                {/* Product Image */}
                <div className={`relative ${
                  product.featured ? 'lg:w-1/2' : 'aspect-video'
                } overflow-hidden`}>
                  <Image
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                      {product.status}
                    </span>
                  </div>

                  {/* Phase Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-medium">
                      {product.phase}
                    </span>
                  </div>

                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center">
                      <Icon name="Eye" size={32} className="mx-auto mb-2" />
                      <div className="text-sm font-medium">Preview Feature</div>
                    </div>
                  </div>
                </div>

                {/* Product Content */}
                <div className={`p-6 ${product.featured ? 'lg:w-1/2 lg:flex lg:flex-col lg:justify-between' : ''}`}>
                  <div>
                    {/* Product Meta */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-secondary font-medium">{product.category}</span>
                      <span className="text-sm text-text-secondary">{product.launchDate}</span>
                    </div>

                    {/* Product Title & Description */}
                    <h3 className="text-xl font-bold text-text-primary mb-3">
                      {product.title}
                    </h3>
                    <p className="text-text-secondary mb-4 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Technology Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-surface text-text-secondary text-xs rounded border border-border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Features Preview */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {Object.entries(product.features).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-lg font-bold text-text-primary">{value}</div>
                          <div className="text-xs text-text-secondary capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Product Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="text-sm text-text-secondary">
                      Launch: <span className="font-medium text-text-primary">{product.launchDate}</span>
                    </div>
                    <Link to="/contact-engagement-hub">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="ArrowRight"
                        iconPosition="right"
                      >
                        Get Early Access
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary to-surface rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Ready to Be Among the First?
            </h3>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
              Join our exclusive waitlist and be the first to experience the future of AI-powered business automation when we launch in Q2 2026.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact-engagement-hub">
                <Button
                  variant="primary"
                  size="lg"
                  iconName="Mail"
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  Join Waitlist
                </Button>
              </Link>
              <Link to="/about-philosophy">
                <Button
                  variant="outline"
                  size="lg"
                  iconName="Eye"
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentLaunchesSection;