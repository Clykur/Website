import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import ServiceHero from "./components/ServiceHero";
import ProcessVisualization from "./components/ProcessVisualization";
import PricingCalculator from "./components/PricingCalculator";
import CaseStudies from "./components/CaseStudies";
import TechnologyStack from "./components/TechnologyStack";
import ServiceContactForm from "./components/ServiceContactForm";

const ServicesDeepDive = () => {
  const [selectedService, setSelectedService] = useState("mvp");

  // Scroll to top on service change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedService]);

  const handleServiceChange = (serviceId) => {
    setSelectedService(serviceId);
  };

  const getPageTitle = () => {
    const titles = {
      mvp: "MVP Development Services - Clykur Portfolio",
      scaling: "Application Scaling Services - Clykur Portfolio",
      transformation: "Digital Transformation Services - Clykur Portfolio",
    };
    return titles[selectedService] || "Services - Clykur Portfolio";
  };

  const getPageDescription = () => {
    const descriptions = {
      mvp: "Transform your vision into a market-ready MVP with our proven 5-phase development process. From idea to launch in 8-16 weeks.",
      scaling:
        "Scale your application to handle 10x more users while reducing costs by 40%. Expert performance optimization and infrastructure scaling.",
      transformation:
        "Modernize your enterprise systems with cloud-native solutions, compliance, and seamless integrations.",
    };
    return (
      descriptions[selectedService] ||
      "Professional development services for startups and enterprises."
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{getPageTitle()}</title>
        <meta name="description" content={getPageDescription()} />
        <meta
          name="keywords"
          content="MVP development, application scaling, digital transformation, React development, Node.js, cloud services"
        />
        <meta property="og:title" content={getPageTitle()} />
        <meta property="og:description" content={getPageDescription()} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={getPageTitle()} />
        <meta name="twitter:description" content={getPageDescription()} />
      </Helmet>

      <Header />

      <main className="pt-16 lg:pt-20">
        {/* Service Hero Section */}
        <ServiceHero
          selectedService={selectedService}
          onServiceChange={handleServiceChange}
        />

        {/* Process Visualization */}
        <ProcessVisualization selectedService={selectedService} />

        {/* Technology Stack */}
        <TechnologyStack selectedService={selectedService} />

        {/* Case Studies */}
        <CaseStudies selectedService={selectedService} />

        {/* Pricing Calculator */}
        <PricingCalculator selectedService={selectedService} />

        {/* Service Contact Form */}
        <ServiceContactForm selectedService={selectedService} />
      </main>

      {/* Page uses global footer */}
    </div>
  );
};

export default ServicesDeepDive;
