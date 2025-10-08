import React from 'react';
import Icon from '../../../components/AppIcon';

const ContactHero = () => {
  return (
    <section className="bg-gradient-to-br from-primary via-background to-surface py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-2xl mb-6">
            <Icon name="MessageCircle" size={32} color="white" />
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-text-primary mb-6">
            Join the AI Revolution
            <span className="text-gradient block">Be Among the First</span>
          </h1>
          
          <p className="text-xl text-text-secondary mb-8 leading-relaxed">
            Ready to experience the future of AI-powered business automation? Join our waitlist and be among the first to access our revolutionary products when we launch in Q2 2026.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <div className="flex items-center space-x-2 text-success">
              <Icon name="Rocket" size={20} />
              <span className="font-medium">Q2 2026 Launch</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-text-secondary rounded-full"></div>
            <div className="flex items-center space-x-2 text-success">
              <Icon name="Brain" size={20} />
              <span className="font-medium">100% AI-Powered</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-text-secondary rounded-full"></div>
            <div className="flex items-center space-x-2 text-success">
              <Icon name="Users" size={20} />
              <span className="font-medium">Early Access</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;