import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import FilterSidebar from './components/FilterSidebar';
import ProjectGrid from './components/ProjectGrid';
import FeaturedProjects from './components/FeaturedProjects';
import ProjectModal from './components/ProjectModal';

const PortfolioGallery = () => {
  const [filters, setFilters] = useState({
    technologies: [],
    industries: [],
    projectTypes: [],
    clientTypes: [],
    complexity: []
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock Projects Data
  const allProjects = [
    {
      id: 1,
      title: "EcoCommerce Platform",
      description: "A sustainable e-commerce platform connecting eco-conscious consumers with green products. Features include carbon footprint tracking, sustainable packaging options, and green certification verification.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
      industry: "E-commerce",
      clientType: "Startup",
      complexity: "Complex",
      hasLiveDemo: true,
      featured: true,
      metrics: [
        { value: "40%", label: "Conversion Rate" },
        { value: "2.1s", label: "Load Time" },
        { value: "15K+", label: "Active Users" },
        { value: "99.9%", label: "Uptime" }
      ],
      keyHighlight: "Increased conversion rate by 40% with sustainable shopping features",
      challenge: "The client needed to create a platform that not only facilitated e-commerce but also educated users about sustainable choices and tracked environmental impact.",
      solution: "We developed a comprehensive platform with integrated carbon footprint tracking, sustainable product verification, and gamified eco-friendly shopping experiences.",
      results: [
        { value: "40%", label: "Conversion Increase" },
        { value: "60%", label: "User Retention" },
        { value: "25%", label: "Cart Abandonment Reduction" },
        { value: "300%", label: "Organic Traffic Growth" }
      ],
      testimonial: "Clykur transformed our vision into a platform that's not just functional but truly makes a difference. The attention to sustainability features exceeded our expectations.",
      clientName: "Emma Green",
      clientRole: "Founder & CEO"
    },
    {
      id: 2,
      title: "FinTech Dashboard Pro",
      description: "Advanced financial analytics dashboard for investment firms. Real-time market data, portfolio management, risk assessment tools, and automated reporting capabilities.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      technologies: ["React", "TypeScript", "Python", "PostgreSQL", "Redis"],
      industry: "FinTech",
      clientType: "Enterprise",
      complexity: "Complex",
      hasLiveDemo: false,
      featured: true,
      metrics: [
        { value: "50ms", label: "Response Time" },
        { value: "10M+", label: "Data Points" },
        { value: "99.99%", label: "Accuracy" },
        { value: "24/7", label: "Monitoring" }
      ],
      keyHighlight: "Processing 10M+ data points with 50ms response time",
      challenge: "The investment firm needed a real-time dashboard capable of processing massive amounts of financial data while maintaining accuracy and speed.",
      solution: "We built a high-performance dashboard with advanced caching, real-time data streaming, and sophisticated analytics algorithms.",
      results: [
        { value: "75%", label: "Faster Decision Making" },
        { value: "90%", label: "Reduced Manual Work" },
        { value: "99.99%", label: "Data Accuracy" },
        { value: "50%", label: "Cost Reduction" }
      ]
    },
    {
      id: 3,
      title: "HealthTech Patient Portal",
      description: "Comprehensive patient management system with telemedicine capabilities, appointment scheduling, medical records, and prescription management.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
      technologies: ["React Native", "Node.js", "Express.js", "MongoDB", "Socket.io"],
      industry: "HealthTech",
      clientType: "SMB",
      complexity: "Moderate",
      hasLiveDemo: true,
      featured: true,
      metrics: [
        { value: "5K+", label: "Patients" },
        { value: "95%", label: "Satisfaction" },
        { value: "30%", label: "Time Saved" },
        { value: "24/7", label: "Support" }
      ],
      keyHighlight: "95% patient satisfaction with telemedicine features"
    },
    {
      id: 4,
      title: "EdTech Learning Platform",
      description: "Interactive online learning platform with video streaming, progress tracking, assessments, and collaborative tools for educational institutions.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
      technologies: ["Next.js", "GraphQL", "PostgreSQL", "AWS", "Docker"],
      industry: "EdTech",
      clientType: "Enterprise",
      complexity: "Complex",
      hasLiveDemo: true,
      featured: false,
      metrics: [
        { value: "50K+", label: "Students" },
        { value: "85%", label: "Completion Rate" },
        { value: "4.8/5", label: "Rating" },
        { value: "99.5%", label: "Uptime" }
      ]
    },
    {
      id: 5,
      title: "Real Estate CRM",
      description: "Customer relationship management system for real estate agencies with lead tracking, property management, and automated marketing campaigns.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
      technologies: ["React", "Node.js", "MySQL", "Redis", "AWS"],
      industry: "Real Estate",
      clientType: "SMB",
      complexity: "Moderate",
      hasLiveDemo: false,
      featured: false,
      metrics: [
        { value: "200+", label: "Agents" },
        { value: "45%", label: "Lead Conversion" },
        { value: "60%", label: "Time Saved" },
        { value: "98%", label: "User Adoption" }
      ]
    },
    {
      id: 6,
      title: "Food Delivery App",
      description: "Multi-vendor food delivery platform with real-time tracking, payment integration, and restaurant management dashboard.",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop",
      technologies: ["React Native", "Node.js", "MongoDB", "Stripe", "Google Maps"],
      industry: "Food & Beverage",
      clientType: "Startup",
      complexity: "Complex",
      hasLiveDemo: true,
      featured: false,
      metrics: [
        { value: "1K+", label: "Restaurants" },
        { value: "25min", label: "Avg Delivery" },
        { value: "4.7/5", label: "Rating" },
        { value: "100K+", label: "Orders" }
      ]
    },
    {
      id: 7,
      title: "Travel Booking Platform",
      description: "Comprehensive travel booking system with flight, hotel, and car rental reservations, itinerary planning, and travel recommendations.",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop",
      technologies: ["React", "Python", "Django", "PostgreSQL", "Elasticsearch"],
      industry: "Travel",
      clientType: "Enterprise",
      complexity: "Complex",
      hasLiveDemo: true,
      featured: false,
      metrics: [
        { value: "500K+", label: "Bookings" },
        { value: "3.2s", label: "Search Time" },
        { value: "92%", label: "Satisfaction" },
        { value: "15%", label: "Revenue Growth" }
      ]
    },
    {
      id: 8,
      title: "Social Media Analytics",
      description: "Advanced social media analytics platform with sentiment analysis, competitor tracking, and automated reporting for marketing agencies.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      technologies: ["React", "Python", "TensorFlow", "MongoDB", "Kubernetes"],
      industry: "Social Media",
      clientType: "SMB",
      complexity: "Complex",
      hasLiveDemo: false,
      featured: false,
      metrics: [
        { value: "1M+", label: "Posts Analyzed" },
        { value: "95%", label: "Accuracy" },
        { value: "50+", label: "Platforms" },
        { value: "80%", label: "Time Saved" }
      ]
    },
    {
      id: 9,
      title: "Gaming Tournament Platform",
      description: "Esports tournament management platform with live streaming integration, bracket management, and player statistics tracking.",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB", "WebRTC"],
      industry: "Gaming",
      clientType: "Startup",
      complexity: "Moderate",
      hasLiveDemo: true,
      featured: false,
      metrics: [
        { value: "10K+", label: "Players" },
        { value: "500+", label: "Tournaments" },
        { value: "1M+", label: "Viewers" },
        { value: "99%", label: "Stream Uptime" }
      ]
    },
    {
      id: 10,
      title: "IoT Dashboard",
      description: "Industrial IoT monitoring dashboard with real-time sensor data visualization, predictive maintenance alerts, and automated reporting.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
      technologies: ["React", "Node.js", "InfluxDB", "Grafana", "MQTT"],
      industry: "Manufacturing",
      clientType: "Enterprise",
      complexity: "Complex",
      hasLiveDemo: false,
      featured: false,
      metrics: [
        { value: "1000+", label: "Sensors" },
        { value: "99.9%", label: "Uptime" },
        { value: "30%", label: "Efficiency Gain" },
        { value: "24/7", label: "Monitoring" }
      ]
    }
  ];

  // Filter and search logic
  const filteredProjects = useMemo(() => {
    let filtered = allProjects;

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchLower)) ||
        project.industry.toLowerCase().includes(searchLower) ||
        project.clientType.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filters
    Object.entries(filters).forEach(([category, selectedOptions]) => {
      if (selectedOptions.length > 0) {
        filtered = filtered.filter(project => {
          switch (category) {
            case 'technologies':
              return selectedOptions.some(tech => project.technologies.includes(tech));
            case 'industries':
              return selectedOptions.includes(project.industry);
            case 'projectTypes':
              // Mock project types based on complexity and client type
              const projectType = project.clientType === 'Startup' ? 'MVP' : 
                                project.clientType === 'Enterprise' ? 'Enterprise' : 'Scale-up';
              return selectedOptions.includes(projectType);
            case 'clientTypes':
              return selectedOptions.includes(project.clientType);
            case 'complexity':
              return selectedOptions.includes(project.complexity);
            default:
              return true;
          }
        });
      }
    });

    // Apply sorting
    switch (sortBy) {
      case 'recent':
        return filtered.sort((a, b) => b.id - a.id);
      case 'popular':
        return filtered.sort((a, b) => {
          const aPopularity = parseInt(a.metrics.find(m => m.label.includes('Users') || m.label.includes('Orders'))?.value || '0');
          const bPopularity = parseInt(b.metrics.find(m => m.label.includes('Users') || m.label.includes('Orders'))?.value || '0');
          return bPopularity - aPopularity;
        });
      case 'complexity':
        const complexityOrder = { 'Simple': 1, 'Moderate': 2, 'Complex': 3 };
        return filtered.sort((a, b) => complexityOrder[b.complexity] - complexityOrder[a.complexity]);
      default:
        return filtered;
    }
  }, [filters, searchTerm, sortBy]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (category, values) => {
    setFilters(prev => ({
      ...prev,
      [category]: values
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      technologies: [],
      industries: [],
      projectTypes: [],
      clientTypes: [],
      complexity: []
    });
    setSearchTerm('');
  };

  const handleViewDemo = (project) => {
    setSelectedProject(project);
    setModalType('demo');
  };

  const handleViewCase = (project) => {
    setSelectedProject(project);
    setModalType('case');
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setModalType(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary via-background to-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Icon name="Briefcase" size={16} />
              <span>Portfolio Gallery</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6">
              Transforming Ideas Into
              <span className="text-gradient block">Digital Reality</span>
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
              Explore our comprehensive portfolio of successful projects across industries. 
              From MVP development to enterprise solutions, discover how we help businesses thrive in the digital landscape.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary mb-1">50+</div>
                <div className="text-sm text-text-secondary">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary mb-1">15+</div>
                <div className="text-sm text-text-secondary">Industries Served</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary mb-1">98%</div>
                <div className="text-sm text-text-secondary">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary mb-1">24/7</div>
                <div className="text-sm text-text-secondary">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Projects */}
          <FeaturedProjects
            projects={allProjects}
            onViewDemo={handleViewDemo}
            onViewCase={handleViewCase}
          />

          {/* All Projects Section */}
          <div id="all-projects" className="scroll-mt-24">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">All Projects</h2>
                <p className="text-text-secondary">Browse our complete portfolio with advanced filtering</p>
              </div>
              
              {/* Sort Options */}
              <div className="hidden md:flex items-center space-x-4">
                <span className="text-sm text-text-secondary">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-secondary focus:border-transparent"
                >
                  <option value="recent">Most Recent</option>
                  <option value="popular">Most Popular</option>
                  <option value="complexity">Complexity</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filter Sidebar */}
              <div className="lg:col-span-1">
                <FilterSidebar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  projectCount={filteredProjects.length}
                  isOpen={isFilterOpen}
                  onToggle={() => setIsFilterOpen(!isFilterOpen)}
                />
              </div>

              {/* Projects Grid */}
              <div className="lg:col-span-3">
                <ProjectGrid
                  projects={filteredProjects}
                  onViewDemo={handleViewDemo}
                  onViewCase={handleViewCase}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-secondary to-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Let's discuss how we can transform your ideas into exceptional digital products
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/project-inquiry-hub">
              <Button
                variant="primary"
                size="lg"
                iconName="ArrowRight"
                iconPosition="right"
                className="bg-white text-secondary hover:bg-gray-50"
              >
                Start Your Project
              </Button>
            </Link>
            <Link to="/contact-engagement-hub">
              <Button
                variant="outline"
                size="lg"
                iconName="MessageCircle"
                iconPosition="left"
                className="border-white text-white hover:bg-white hover:text-secondary"
              >
                Schedule Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={handleCloseModal}
        type={modalType}
      />
    </div>
  );
};

export default PortfolioGallery;