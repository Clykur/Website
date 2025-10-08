import React from 'react';
import Header from '../../components/ui/Header';
import ContactHero from './components/ContactHero';
import ContactMethods from './components/ContactMethods';
import WaitlistForm from './components/ProjectInquiryForm';
import ProductVisionSession from './components/ConsultationBooking';
import DirectContact from './components/DirectContact';
import FAQSection from './components/FAQSection';
import ProductDevelopmentHub from './components/ClientPortal';
import TrustSignals from './components/TrustSignals';

const ContactEngagementHub = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 lg:pt-20">
        <ContactHero />
        <ContactMethods />
        <WaitlistForm />
        <ProductVisionSession />
        <DirectContact />
        <FAQSection />
        <ProductDevelopmentHub />
        <TrustSignals />
      </main>

      {/* Page uses global footer */}
    </div>
  );
};

export default ContactEngagementHub;