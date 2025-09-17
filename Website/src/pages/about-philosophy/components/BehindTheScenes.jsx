import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const BehindTheScenes = () => {
  const workspaceImages = [
    {
      src: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=400&fit=crop",
      alt: "Modern development workspace with multiple monitors",
      caption: "Our development setup - optimized for productivity and creativity"
    },
    {
      src: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
      alt: "Team collaboration session",
      caption: "Collaborative planning sessions with clients and stakeholders"
    },
    {
      src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop",
      alt: "Code review and architecture planning",
      caption: "Architecture planning and code review sessions"
    },
    {
      src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
      alt: "Client meeting and project discussion",
      caption: "Regular client check-ins and project milestone reviews"
    },
    {
      src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop",
      alt: "Testing and quality assurance",
      caption: "Comprehensive testing and quality assurance processes"
    },
    {
      src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop",
      alt: "Continuous learning and research",
      caption: "Staying current with emerging technologies and best practices"
    }
  ];

  const processInsights = [
    {
      icon: "Coffee",
      title: "Early Morning Focus",
      description: "Our most productive hours are 6-10 AM when we tackle complex architecture challenges with a clear mind."
    },
    {
      icon: "Users",
      title: "Client-First Approach",
      description: "Every development decision starts with a simple question: 'How does this benefit the client's business?'"
    },
    {
      icon: "BookOpen",
      title: "Continuous Learning",
      description: "We dedicate time daily to learning new technologies, reading industry insights, and experimenting with tools."
    },
    {
      icon: "TestTube",
      title: "Quality Obsession",
      description: "Every feature goes through rigorous testing - unit tests, integration tests, and real-world user scenarios."
    }
  ];

  const dailyRoutine = [
    { time: "6:00 AM", activity: "Architecture & Complex Problem Solving", icon: "Brain" },
    { time: "9:00 AM", activity: "Client Communications & Planning", icon: "MessageCircle" },
    { time: "10:00 AM", activity: "Core Development Work", icon: "Code" },
    { time: "2:00 PM", activity: "Testing & Code Review", icon: "CheckCircle" },
    { time: "4:00 PM", activity: "Research & Learning", icon: "BookOpen" },
    { time: "6:00 PM", activity: "Documentation & Project Updates", icon: "FileText" }
  ];

  const tools = [
    { name: "VS Code", purpose: "Primary development environment", icon: "Code" },
    { name: "Figma", purpose: "UI/UX design and prototyping", icon: "Palette" },
    { name: "Notion", purpose: "Project management and documentation", icon: "FileText" },
    { name: "GitHub", purpose: "Version control and collaboration", icon: "Github" },
    { name: "Slack", purpose: "Client communication", icon: "MessageSquare" },
    { name: "Postman", purpose: "API testing and development", icon: "Zap" }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Behind the Scenes
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            A glimpse into our development process, workspace, and the daily routines that drive exceptional results.
          </p>
        </div>

        {/* Photo Gallery */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {workspaceImages.map((image, index) => (
            <div key={index} className="card overflow-hidden card-hover">
              <div className="h-64 overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-4">
                <p className="text-text-secondary text-sm">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Process Insights */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4">
              Development Philosophy in Action
            </h3>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              The principles and practices that guide our daily work and ensure consistent quality.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {processInsights.map((insight, index) => (
              <div key={index} className="card p-8 card-hover">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={insight.icon} size={24} color="white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-text-primary mb-3">
                      {insight.title}
                    </h4>
                    <p className="text-text-secondary leading-relaxed">
                      {insight.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Routine */}
        <div className="bg-surface rounded-2xl p-8 lg:p-12 mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4">
              A Day in the Life
            </h3>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Our structured approach to maximizing productivity and maintaining work-life balance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dailyRoutine.map((item, index) => (
              <div key={index} className="bg-background border border-border rounded-xl p-6 card-hover">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
                    <Icon name={item.icon} size={18} color="white" />
                  </div>
                  <span className="font-semibold text-secondary">{item.time}</span>
                </div>
                <p className="text-text-primary font-medium">{item.activity}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tools & Setup */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4">
              Tools & Technology Stack
            </h3>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              The carefully selected tools that power our development workflow and client collaboration.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <div key={index} className="card p-6 text-center card-hover">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon name={tool.icon} size={24} color="white" />
                </div>
                <h4 className="text-lg font-semibold text-text-primary mb-2">
                  {tool.name}
                </h4>
                <p className="text-text-secondary text-sm">
                  {tool.purpose}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Personal Touch */}
        <div className="bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-2xl p-8 lg:p-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center mx-auto mb-6">
              <Icon name="Heart" size={24} color="white" />
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              The Human Side of Development
            </h3>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto mb-6">
              Behind every line of code is a passion for solving real problems and creating meaningful impact. We believe that great software comes from understanding not just the technical requirements, but the human needs they serve.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-text-secondary">
              <span className="flex items-center space-x-1">
                <Icon name="Coffee" size={16} />
                <span>Coffee enthusiast</span>
              </span>
              <span className="flex items-center space-x-1">
                <Icon name="Music" size={16} />
                <span>Coding to jazz music</span>
              </span>
              <span className="flex items-center space-x-1">
                <Icon name="BookOpen" size={16} />
                <span>Continuous learner</span>
              </span>
              <span className="flex items-center space-x-1">
                <Icon name="Users" size={16} />
                <span>Community contributor</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BehindTheScenes;