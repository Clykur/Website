import React from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary via-background to-surface min-h-screen flex items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-1 bg-gradient-to-r from-secondary to-accent rounded-full"></div>
                <span className="text-text-secondary font-medium">About Clykur</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-text-primary leading-tight">
                Where Code Meets
                <span className="text-gradient block">Craft & Vision</span>
              </h1>
              
              <p className="text-xl text-text-secondary leading-relaxed max-w-2xl">
                Founded by Chandu Kalluru, Clykur represents the intersection of technical mastery and creative vision—transforming ambitious ideas into scalable digital realities.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="primary" 
                iconName="Calendar" 
                iconPosition="left"
                className="shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                Schedule Consultation
              </Button>
              <Button 
                variant="outline" 
                iconName="Download" 
                iconPosition="left"
              >
                Download Resume
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">5+</div>
                <div className="text-sm text-text-secondary">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">50+</div>
                <div className="text-sm text-text-secondary">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">98%</div>
                <div className="text-sm text-text-secondary">Client Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative z-10">
              <div className="w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&crop=face"
                  alt="Chandu Kalluru - Founder of Clykur"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-background border border-border rounded-xl p-6 shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-success to-accent rounded-lg flex items-center justify-center">
                    <Icon name="Code" size={24} color="white" />
                  </div>
                  <div>
                    <div className="font-semibold text-text-primary">Chandu Kalluru</div>
                    <div className="text-sm text-text-secondary">Founder & Lead Developer</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Elements */}
            <div className="absolute top-10 -right-10 w-32 h-32 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 right-10 w-24 h-24 bg-gradient-to-br from-accent/20 to-success/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;