import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialCarousel = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      quote: `Clykur transformed our startup vision into a scalable reality. Their technical expertise combined with business acumen helped us secure Series A funding within 8 months of launch.`,
      author: "Sarah Chen",
      position: "CEO & Founder",
      company: "TechFlow Innovations",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
      companyLogo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=120&h=40&fit=crop",
      metrics: {
        roi: "400%",
        timeline: "6 months",
        funding: "$3.2M Series A"
      },
      rating: 5
    },
    {
      id: 2,
      quote: `The partnership approach made all the difference. Clykur didn't just build our platform—they became our technical co-founders, guiding strategic decisions that saved us months of development time.`,
      author: "Michael Rodriguez",
      position: "CTO",
      company: "DataSync Solutions",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      companyLogo: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?w=120&h=40&fit=crop",
      metrics: {
        roi: "250%",
        timeline: "4 months",
        efficiency: "60% faster deployment"
      },
      rating: 5
    },
    {
      id: 3,
      quote: `Exceptional quality and attention to detail. Our healthcare platform handles 100K+ concurrent users flawlessly, and the architecture they built scales beautifully with our growth.`,
      author: "Dr. Emily Watson",
      position: "Founder & Medical Director",
      company: "HealthConnect Hub",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&crop=face",
      companyLogo: "https://images.pixabay.com/photo/2016/12/27/21/03/lone-tree-1934897_1280.jpg?w=120&h=40&fit=crop",
      metrics: {
        roi: "300%",
        timeline: "8 months",
        uptime: "99.9% availability"
      },
      rating: 5
    },
    {
      id: 4,
      quote: `From concept to market leader in record time. Clykur's startup-speed development approach helped us capture market share before competitors even launched their beta versions.`,
      author: "James Park",
      position: "Co-founder",
      company: "NextGen Analytics",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      companyLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=40&fit=crop",
      metrics: {
        roi: "500%",
        timeline: "5 months",
        market: "First to market"
      },
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentTestimonial];

  return (
    <section className="py-20 bg-gradient-to-br from-surface to-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            What Our <span className="text-gradient">Partners</span> Say
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Don't just take our word for it. Here's what founders and technical leaders say about partnering with Clykur.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="relative max-w-5xl mx-auto">
          <div className="card p-8 lg:p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
              <Icon name="Quote" size={128} className="text-secondary" />
            </div>

            <div className="relative grid lg:grid-cols-3 gap-8 items-center">
              {/* Testimonial Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Rating Stars */}
                <div className="flex space-x-1">
                  {[...Array(current.rating)].map((_, i) => (
                    <Icon key={i} name="Star" size={20} className="text-accent fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg lg:text-xl text-text-primary leading-relaxed font-medium">
                  "{current.quote}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={current.avatar}
                      alt={current.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-text-primary">{current.author}</div>
                    <div className="text-text-secondary text-sm">{current.position}</div>
                    <div className="text-secondary text-sm font-medium">{current.company}</div>
                  </div>
                </div>

                {/* Company Logo */}
                <div className="pt-4">
                  <div className="w-32 h-8 opacity-60">
                    <Image
                      src={current.companyLogo}
                      alt={`${current.company} logo`}
                      className="w-full h-full object-contain filter grayscale"
                    />
                  </div>
                </div>
              </div>

              {/* Metrics Panel */}
              <div className="space-y-4">
                <h4 className="font-semibold text-text-primary mb-4">Project Impact</h4>
                {Object.entries(current.metrics).map(([key, value]) => (
                  <div key={key} className="bg-surface rounded-lg p-4 border border-border">
                    <div className="text-2xl font-bold text-secondary mb-1">{value}</div>
                    <div className="text-sm text-text-secondary capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={prevTestimonial}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-background border border-border hover:bg-surface transition-colors duration-200"
              aria-label="Previous testimonial"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-secondary scale-125' :'bg-border hover:bg-text-secondary'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-background border border-border hover:bg-surface transition-colors duration-200"
              aria-label="Next testimonial"
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-text-primary">4.9/5</div>
            <div className="text-sm text-text-secondary">Average Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-text-primary">100%</div>
            <div className="text-sm text-text-secondary">Project Success</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-text-primary">95%</div>
            <div className="text-sm text-text-secondary">Client Retention</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-text-primary">48h</div>
            <div className="text-sm text-text-secondary">Response Time</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;