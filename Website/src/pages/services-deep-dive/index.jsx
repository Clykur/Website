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

      {/* Footer */}
      <footer className="bg-text-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">C</span>
                </div>
                <div>
                  <span className="text-xl font-bold text-white">Clykur</span>
                  <span className="block text-xs text-white font-medium">
                    Portfolio
                  </span>
                </div>
              </div>
              <p className="text-white text-sm mb-4 max-w-md">
                We don't just build applications; we build the digital
                foundations that help businesses thrive.
              </p>
              <div className="text-sm text-white">
                © {new Date().getFullYear()} Clykur. All rights reserved.
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold text-white mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-white">
                <li>
                  <button
                    onClick={() => handleServiceChange("mvp")}
                    className="hover:text-secondary transition-colors"
                  >
                    MVP Development
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleServiceChange("scaling")}
                    className="hover:text-secondary transition-colors"
                  >
                    Application Scaling
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleServiceChange("transformation")}
                    className="hover:text-secondary transition-colors"
                  >
                    Digital Transformation
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-white mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-white">
                <li>
                  <a
                    href="mailto:clykur@outlook.com"
                    className="hover:text-secondary transition-colors"
                  >
                    clykur@outlook.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+918179299096"
                    className="hover:text-secondary transition-colors"
                  >
                    +91 81792 99096
                  </a>
                </li>
                <li className="text-gray-300">Available Mon-Fri</li>
                <li className="text-gray-300">9AM-6PM EST</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ServicesDeepDive;
