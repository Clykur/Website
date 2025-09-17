import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [currentProject, setCurrentProject] = useState(0);

  const featuredProjects = [
    {
      id: 1,
      title: "EcoTrack Analytics",
      description: "Real-time sustainability tracking platform for enterprise clients",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      metrics: { users: "50K+", efficiency: "40%" },
      tech: ["React", "Node.js", "MongoDB"]
    },
    {
      id: 2,
      title: "FinanceFlow Pro",
      description: "AI-powered financial management system for startups",
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?w=800&h=600&fit=crop",
      metrics: { transactions: "1M+", accuracy: "99.8%" },
      tech: ["Next.js", "Python", "PostgreSQL"]
    },
    {
      id: 3,
      title: "HealthConnect Hub",
      description: "Telemedicine platform connecting patients with specialists",
      image: "https://images.pixabay.com/photo/2017/10/04/09/56/laboratory-2815641_1280.jpg?w=800&h=600&fit=crop",
      metrics: { consultations: "25K+", satisfaction: "4.9/5" },
      tech: ["React Native", "Express", "Firebase"]
    },
    {
      id: 4,
      title: "RetailSync Manager",
      description: "Inventory management system for multi-location retailers",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      metrics: { locations: "200+", efficiency: "35%" },
      tech: ["Vue.js", "Laravel", "MySQL"]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % featuredProjects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredProjects.length]);

  const project = featuredProjects[currentProject];

  return (
    <section className="relative min-h-screen bg-background overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-32 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 fade-in">
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-success/10 text-success rounded-full text-xs sm:text-sm font-medium">
                <Icon name="Zap" size={14} className="mr-1.5 sm:mr-2 sm:size-4" />
                50+ Applications Delivered
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-text-primary leading-tight">
                We build{' '}
                <span className="text-gradient">digital products</span>{' '}
                that work beautifully
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl">
                Transform your vision into scalable reality with a technical partner who understands that great software isn't just functional—it's transformational.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
              <Link to="/project-inquiry-hub" className="flex-1 xs:flex-none">
                <Button 
                  variant="primary" 
                  size="lg"
                  iconName="ArrowRight" 
                  iconPosition="right"
                  className="w-full xs:w-auto shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  Start Your Project
                </Button>
              </Link>
              <Link to="/portfolio-gallery" className="flex-1 xs:flex-none">
                <Button 
                  variant="outline" 
                  size="lg"
                  iconName="Eye" 
                  iconPosition="left"
                  className="w-full xs:w-auto"
                >
                  View Our Work
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-4 sm:flex sm:flex-wrap">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-text-primary">95%</div>
                <div className="text-xs sm:text-sm text-text-secondary">Client Retention</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-text-primary">2.3x</div>
                <div className="text-xs sm:text-sm text-text-secondary">Average ROI</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-text-primary">48h</div>
                <div className="text-xs sm:text-sm text-text-secondary">Response Time</div>
              </div>
            </div>
          </div>

          {/* Right Content - Project Showcase */}
          <div className="relative">
            <div className="relative bg-background rounded-2xl shadow-xl overflow-hidden card-hover">
              <div className="aspect-video relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Project Info Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-sm opacity-90 mb-3">{project.description}</p>
                  
                  {/* Live Metrics */}
                  <div className="flex gap-4 mb-3">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                        <div className="text-xs opacity-80 capitalize">{key}</div>
                        <div className="font-semibold">{value}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="bg-white/20 backdrop-blur-sm text-xs px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Project Navigation Dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {featuredProjects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentProject(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentProject 
                      ? 'bg-secondary scale-125' :'bg-border hover:bg-text-secondary'
                  }`}
                  aria-label={`View project ${index + 1}`}
                />
              ))}
            </div>

            {/* Minimal style: remove floating elements */}
          </div>
        </div>
      </div>
      {/* Removed scroll indicator for minimal style */}
    </section>
  );
};

export default HeroSection;