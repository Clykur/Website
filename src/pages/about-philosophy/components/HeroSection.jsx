import React, { useState } from "react";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";

const HeroSection = () => {
  const [selected, setSelected] = useState("founder");
  const people = {
    founder: {
      name: "Chandu Kalluru",
      title: "Founder & Lead Developer",
      image:
        "https://i.ibb.co/SDt5YNfW/Chat-GPT-Image-Sep-15-2025-01-50-11-PM.png",
      description:
        "Founder & Lead Developer at Clykur, blending technical mastery with creative vision to transform ambitious ideas into scalable digital realities.",
    },
    cofounder: {
      name: "Karthik Naramala",
      title: "Co-Founder & Developer",
      image:
        "https://i.ibb.co/svTSnLYn/Chat-GPT-Image-Sep-15-2025-01-37-44-PM.png",
      description:
        "Co-Founder & Developer at Clykur, where I build innovative web and mobile solutions that help businesses grow in the digital space.",
    },
  };
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
                <span className="text-text-secondary font-medium">
                  About Clykur
                </span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-text-primary leading-tight">
                Where Code Meets
                <span className="text-gradient block">Craft & Vision</span>
              </h1>

              <p className="text-xl text-text-secondary leading-relaxed max-w-2xl">
                Founded by Chandu Kalluru & Karthik Naramala, Clykur is a
                dynamic tech startup specializing in crafting exceptional web
                and mobile applications. With a passion for innovation and a
                commitment to excellence, Clykur represents the intersection of
                technical mastery and creative vision—transforming ambitious
                ideas into scalable digital realities.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                iconName="Calendar"
                iconPosition="left"
                className="shadow-lg hover:shadow-xl transition-shadow duration-300"
                onClick={() => navigate('/pages/contact/ConsultationBooking')}
              >
                Schedule Consultation
              </Button>
              <Button variant="outline" iconName="Download" iconPosition="left">
                Download Resume
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">5+</div>
                <div className="text-sm text-text-secondary">
                  Years Experience
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">50+</div>
                <div className="text-sm text-text-secondary">
                  Projects Delivered
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">98%</div>
                <div className="text-sm text-text-secondary">
                  Client Satisfaction
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative z-10">
              <div className="w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={
                    selected === "founder"
                      ? people.founder.image
                      : people.cofounder.image
                  }
                  alt={`${
                    selected === "founder"
                      ? people.founder.name
                      : people.cofounder.name
                  } - ${
                    selected === "founder"
                      ? people.founder.title
                      : people.cofounder.title
                  }`}
                  className="w-full h-full object-cover transition-all duration-300"
                />
              </div>

              {/* Floating Cards - desktop/tablet */}
              <div
                className={`hidden md:block absolute -bottom-6 -left-6 bg-background border rounded-xl p-6 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow ${
                  selected === "founder" ? "border-secondary ring-2 ring-secondary/40" : "border-border"
                }`}
                onMouseEnter={() => setSelected("founder")}
                onFocus={() => setSelected("founder")}
                onClick={() => setSelected("founder")}
                role="button"
                tabIndex={0}
                aria-label="Show founder details"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-success to-accent rounded-lg flex items-center justify-center">
                    <Icon name="Code" size={24} color="white" />
                  </div>
                  <div>
                    <div className="font-semibold text-text-primary">
                      Chandu Kalluru
                    </div>
                    <div className="text-sm text-text-secondary">
                      Founder & Lead Developer
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`hidden md:block absolute -bottom-6 -right-6 bg-background border rounded-xl p-6 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow ${
                  selected === "cofounder" ? "border-secondary ring-2 ring-secondary/40" : "border-border"
                }`}
                onMouseEnter={() => setSelected("cofounder")}
                onFocus={() => setSelected("cofounder")}
                onClick={() => setSelected("cofounder")}
                role="button"
                tabIndex={0}
                aria-label="Show co-founder details"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-success to-accent rounded-lg flex items-center justify-center">
                    <Icon name="Code" size={24} color="white" />
                  </div>
                  <div>
                    <div className="font-semibold text-text-primary">
                      Karthik Naramala
                    </div>
                    <div className="text-sm text-text-secondary">
                      Co-Founder & Developer
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Mobile Cards - avoid overlap */}
              <div className="md:hidden mt-4 grid grid-cols-1 xs:grid-cols-2 gap-3">
                <button
                  className={`bg-background border rounded-xl p-4 shadow-md text-left ${
                    selected === "founder" ? "border-secondary ring-2 ring-secondary/40" : "border-border"
                  }`}
                  onClick={() => setSelected("founder")}
                  aria-label="Show founder details"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-success to-accent rounded-lg flex items-center justify-center">
                      <Icon name="Code" size={20} color="white" />
                    </div>
                    <div>
                      <div className="font-semibold text-text-primary">Chandu Kalluru</div>
                      <div className="text-xs text-text-secondary">Founder & Lead Developer</div>
                    </div>
                  </div>
                </button>
                <button
                  className={`bg-background border rounded-xl p-4 shadow-md text-left ${
                    selected === "cofounder" ? "border-secondary ring-2 ring-secondary/40" : "border-border"
                  }`}
                  onClick={() => setSelected("cofounder")}
                  aria-label="Show co-founder details"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-success to-accent rounded-lg flex items-center justify-center">
                      <Icon name="Code" size={20} color="white" />
                    </div>
                    <div>
                      <div className="font-semibold text-text-primary">Karthik Naramala</div>
                      <div className="text-xs text-text-secondary">Co-Founder & Developer</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Details Panel */}
            <div className="mt-6 bg-background/80 border border-border rounded-xl p-5">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="User" size={18} color="white" />
                </div>
                <div>
                  <div className="font-semibold text-text-primary">
                    {selected === "founder"
                      ? people.founder.name
                      : people.cofounder.name}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {selected === "founder"
                      ? people.founder.title
                      : people.cofounder.title}
                  </div>
                  <p className="text-sm text-text-secondary mt-2 max-w-md">
                    {selected === "founder"
                      ? people.founder.description
                      : people.cofounder.description}
                  </p>
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
