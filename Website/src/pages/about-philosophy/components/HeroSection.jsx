import React from "react";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";

const HeroSection = () => {
  const team = [
    {
      name: "Chandu Kalluru",
      role: "Lead Developer",
      image: "https://i.ibb.co/SDt5YNfW/Chat-GPT-Image-Sep-15-2025-01-50-11-PM.png",
    },
    {
      name: "Karthik Naramala",
      role: "Software Developer",
      image: "https://i.ibb.co/svTSnLYn/Chat-GPT-Image-Sep-15-2025-01-37-44-PM.png",
    },
  ];
  return (
    <section className="relative bg-background py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-semibold text-text-primary">Founding Team</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              <div className="aspect-square rounded-lg overflow-hidden border border-border max-w-[220px] mx-auto">
                <Image src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <div className="mt-4">
                <div className="font-semibold text-text-primary">{member.name}</div>
                <div className="text-sm text-text-secondary">{member.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
