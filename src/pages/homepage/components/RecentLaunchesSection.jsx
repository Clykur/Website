import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecentLaunchesSection = () => {
  const recentProjects = [
    {
      id: 1,
      title: "EcoTrack Analytics",
      description: "Real-time sustainability tracking platform that helps enterprises monitor and reduce their carbon footprint with AI-powered insights and automated reporting.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      category: "Enterprise SaaS",
      technologies: ["React", "Node.js", "MongoDB", "AWS", "D3.js"],
      status: "Live",
      launchDate: "March 2024",
      metrics: {
        users: "50K+",
        reduction: "40% CO2",
        satisfaction: "4.8/5"
      },
      client: "GreenTech Solutions",
      featured: true
    },
    {
      id: 2,
      title: "FinanceFlow Pro",
      description: "AI-powered financial management system designed for startups and SMEs, featuring automated bookkeeping, cash flow predictions, and investor reporting.",
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?w=600&h=400&fit=crop",
      category: "FinTech",
      technologies: ["Next.js", "Python", "PostgreSQL", "Stripe", "TensorFlow"],
      status: "Live",
      launchDate: "February 2024",
      metrics: {
        transactions: "1M+",
        accuracy: "99.8%",
        growth: "300% MRR"
      },
      client: "StartupFlow Inc",
      featured: false
    },
    {
      id: 3,
      title: "HealthConnect Hub",
      description: "Comprehensive telemedicine platform connecting patients with specialists, featuring video consultations, prescription management, and health record integration.",
      image: "https://images.pixabay.com/photo/2017/10/04/09/56/laboratory-2815641_1280.jpg?w=600&h=400&fit=crop",
      category: "HealthTech",
      technologies: ["React Native", "Express", "Firebase", "WebRTC", "HIPAA"],
      status: "Live",
      launchDate: "January 2024",
      metrics: {
        consultations: "25K+",
        satisfaction: "4.9/5",
        uptime: "99.9%"
      },
      client: "MedConnect Corp",
      featured: false
    },
    {
      id: 4,
      title: "RetailSync Manager",
      description: "Advanced inventory management system for multi-location retailers with real-time synchronization, predictive analytics, and automated reordering.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      category: "RetailTech",
      technologies: ["Vue.js", "Laravel", "MySQL", "Redis", "Docker"],
      status: "Beta",
      launchDate: "April 2024",
      metrics: {
        locations: "200+",
        efficiency: "35% increase",
        accuracy: "98.5%"
      },
      client: "RetailChain Plus",
      featured: false
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Live':
        return 'bg-success text-success-foreground';
      case 'Beta':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-success/10 text-success rounded-full text-sm font-medium mb-4">
            <Icon name="Rocket" size={16} className="mr-2" />
            Fresh from Development
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Recent <span className="text-gradient">Launches</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Discover our latest digital products that are already transforming businesses and delighting users across various industries.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {recentProjects.map((project) => (
            <div
              key={project.id}
              className={`card overflow-hidden card-hover ${
                project.featured ? 'lg:col-span-2' : ''
              }`}
            >
              <div className={`${project.featured ? 'lg:flex' : ''}`}>
                {/* Project Image */}
                <div className={`relative ${
                  project.featured ? 'lg:w-1/2' : 'aspect-video'
                } overflow-hidden`}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium">
                        Featured
                      </span>
                    </div>
                  )}

                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center">
                      <Icon name="ExternalLink" size={32} className="mx-auto mb-2" />
                      <div className="text-sm font-medium">View Case Study</div>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className={`p-6 ${project.featured ? 'lg:w-1/2 lg:flex lg:flex-col lg:justify-between' : ''}`}>
                  <div>
                    {/* Project Meta */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-secondary font-medium">{project.category}</span>
                      <span className="text-sm text-text-secondary">{project.launchDate}</span>
                    </div>

                    {/* Project Title & Description */}
                    <h3 className="text-xl font-bold text-text-primary mb-3">
                      {project.title}
                    </h3>
                    <p className="text-text-secondary mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technology Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-surface text-text-secondary text-xs rounded border border-border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-lg font-bold text-text-primary">{value}</div>
                          <div className="text-xs text-text-secondary capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Project Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="text-sm text-text-secondary">
                      Client: <span className="font-medium text-text-primary">{project.client}</span>
                    </div>
                    <Link to="/portfolio-gallery">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="ArrowRight"
                        iconPosition="right"
                      >
                        View Case Study
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
              Ready to Launch Your Next Project?
            </h3>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
              Join the growing list of successful businesses that have transformed their ideas into market-leading digital products with Clykur.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/project-inquiry-hub">
                <Button
                  variant="primary"
                  size="lg"
                  iconName="Rocket"
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  Start Your Project
                </Button>
              </Link>
              <Link to="/portfolio-gallery">
                <Button
                  variant="outline"
                  size="lg"
                  iconName="Eye"
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  View All Projects
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