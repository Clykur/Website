import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Homepage from "pages/homepage";
import PortfolioGallery from "pages/portfolio-gallery";
import AboutPhilosophy from "pages/about-philosophy";
import ProjectInquiryHub from "pages/project-inquiry-hub";
import ContactEngagementHub from "pages/contact-engagement-hub";
import ServicesDeepDive from "pages/services-deep-dive";
import NotFound from "pages/NotFound";
import Footer from "components/ui/Footer";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/portfolio-gallery" element={<PortfolioGallery />} />
        <Route path="/about-philosophy" element={<AboutPhilosophy />} />
        <Route path="/project-inquiry-hub" element={<ProjectInquiryHub />} />
        <Route path="/contact-engagement-hub" element={<ContactEngagementHub />} />
        <Route path="/services-deep-dive" element={<ServicesDeepDive />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      <Footer />
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;