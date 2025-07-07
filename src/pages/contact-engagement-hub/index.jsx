import React from 'react';
import Header from '../../components/ui/Header';
import ContactHero from './components/ContactHero';
import ContactMethods from './components/ContactMethods';
import ProjectInquiryForm from './components/ProjectInquiryForm';
import ConsultationBooking from './components/ConsultationBooking';
import DirectContact from './components/DirectContact';
import FAQSection from './components/FAQSection';
import ClientPortal from './components/ClientPortal';
import TrustSignals from './components/TrustSignals';

const ContactEngagementHub = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 lg:pt-20">
        <ContactHero />
        <ContactMethods />
        <ProjectInquiryForm />
        <ConsultationBooking />
        <DirectContact />
        <FAQSection />
        <ClientPortal />
        <TrustSignals />
      </main>

      {/* Footer */}
      <footer className="bg-text-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">C</span>
                </div>
                <span className="text-xl font-bold">Clykur</span>
              </div>
              <p className="text-gray-300 mb-4 max-w-md">
                Transforming ambitious visions into scalable digital realities. Your trusted partner for exceptional web and mobile applications.
              </p>
              <div className="flex space-x-4">
                <a href="https://linkedin.com/in/chandukalluru" className="text-gray-300 hover:text-white transition-colors duration-200">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://github.com/chandukalluru" className="text-gray-300 hover:text-white transition-colors duration-200">
                  <span className="sr-only">GitHub</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/homepage" className="text-gray-300 hover:text-white transition-colors duration-200">Home</a></li>
                <li><a href="/portfolio-gallery" className="text-gray-300 hover:text-white transition-colors duration-200">Portfolio</a></li>
                <li><a href="/services-deep-dive" className="text-gray-300 hover:text-white transition-colors duration-200">Services</a></li>
                <li><a href="/about-philosophy" className="text-gray-300 hover:text-white transition-colors duration-200">About</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-gray-300">hello@clykur.com</li>
                <li className="text-gray-300">+1 (555) 123-4567</li>
                <li className="text-gray-300">Available Mon-Fri</li>
                <li className="text-gray-300">9AM-6PM EST</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-300">
              © {new Date().getFullYear()} Clykur. All rights reserved. Built with passion for exceptional digital experiences.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactEngagementHub;