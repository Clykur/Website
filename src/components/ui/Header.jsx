import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ showMobileStickyCta = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', path: '/homepage', icon: 'Home' },
    { name: 'About', path: '/about-philosophy', icon: 'User' },
    { name: 'Services', path: '/services-deep-dive', icon: 'Settings' },
    { name: 'Portfolio', path: '/portfolio-gallery', icon: 'Briefcase' },
    { name: 'Contact', path: '/contact-engagement-hub', icon: 'Mail' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 safe-top ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-md border-b border-border' 
          : 'bg-background/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link 
            to="/homepage" 
            className="flex items-center space-x-2 group"
            onClick={closeMenu}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-text-primary">Clykur</span>
              <span className="block text-xs text-text-secondary font-medium">Portfolio</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                  isActivePath(item.path)
                    ? 'bg-primary text-secondary shadow-sm'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                }`}
              >
                <Icon name={item.icon} size={16} />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/project-inquiry-hub">
              <Button 
                variant="primary" 
                iconName="ArrowRight" 
                iconPosition="right"
                className="shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                Start Project
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <Icon name={isMenuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden transition-all duration-300 ease-smooth ${
          isMenuOpen 
            ? 'max-h-screen opacity-100' :'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="bg-background/95 backdrop-blur-md border-t border-border">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                    isActivePath(item.path)
                      ? 'bg-primary text-secondary shadow-sm'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
            
            {/* Mobile CTA */}
            <div className="mt-6 pt-4 border-t border-border">
              <Link to="/project-inquiry-hub" onClick={closeMenu}>
                <Button 
                  variant="primary" 
                  fullWidth
                  iconName="ArrowRight" 
                  iconPosition="right"
                  className="justify-center"
                >
                  Start Your Project
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      {showMobileStickyCta && (
        <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40 safe-bottom">
          <Link to="/project-inquiry-hub">
            <Button 
              variant="primary" 
              fullWidth
              iconName="MessageCircle" 
              iconPosition="left"
              className="justify-center shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              Get Started
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;