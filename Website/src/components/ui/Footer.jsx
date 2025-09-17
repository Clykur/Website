import React from 'react';
import Icon from '../AppIcon';

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-secondary-foreground/20 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-semibold">Clykur</span>
            </div>
            <p className="opacity-90 text-sm max-w-md">
              Transforming ambitious visions into scalable digital realities. Your trusted partner for exceptional web and mobile applications.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <a href="https://www.linkedin.com/company/clykur" aria-label="LinkedIn" className="hover:opacity-100 opacity-90">
                <Icon name="Linkedin" size={18} />
              </a>
              <a href="mailto:clykur@outlook.com" aria-label="Email" className="hover:opacity-100 opacity-90">
                <Icon name="Mail" size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li><a href="/" className="hover:opacity-100">Home</a></li>
              <li><a href="/portfolio-gallery" className="hover:opacity-100">Portfolio</a></li>
              <li><a href="/services-deep-dive" className="hover:opacity-100">Services</a></li>
              <li><a href="/about-philosophy" className="hover:opacity-100">About</a></li>
              <li><a href="/contact-engagement-hub" className="hover:opacity-100">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li><a href="mailto:clykur@outlook.com" className="hover:opacity-100">clykur@outlook.com</a></li>
              <li>Available Time : 9:00 AM - 6:00 PM IST</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-6 text-sm opacity-90 text-center">
          © {new Date().getFullYear()} Clykur — Empowering digital innovation. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;


