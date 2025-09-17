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

      {/* Page uses global footer */}
    </div>
  );
};

export default ContactEngagementHub;