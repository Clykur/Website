import React from "react";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";

const HeroSection = () => {
  const team = [
    {
      name: "Chandu Kalluru",
      role: "Founder & CEO",
      image: "https://i.ibb.co/SXNkfbGG/New-Profile1.jpg",
    },
    {
      name: "Karthik Naramala",
      role: "Co-Founder & CTO",
      image:
        "https://i.ibb.co/gbj8P9Vc/Profile-Company.jpg",
    },
  ];
  return (
    <section className="relative bg-gradient-to-br from-secondary/5 to-accent/5 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
            <Icon name="Rocket" size={16} className="mr-2" />
            🚀 Product-Driven Technology Company
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-text-primary mb-6">
            Revolutionizing the{" "}
            <span className="text-gradient">Digital Economy</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
            From R&D backgrounds to revolutionary product innovation—we're
            building intelligent, self-evolving AI-powered products that
            transform the digital economy through technology innovation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="space-y-6">
            <div className="prose prose-lg max-w-none">
              <p className="text-text-secondary leading-relaxed text-lg">
                Clykur represents a fundamental shift from traditional software
                to revolutionary product innovation. We're not just building
                platforms—we're creating intelligent, self-evolving AI-powered
                products that understand business needs and predict market
                demands.
              </p>
              <p className="text-text-secondary leading-relaxed text-lg">
                Our journey from R&D researchers to product innovators reflects
                our deep understanding of how technology can transform the
                digital economy. We've seen firsthand how AI-powered products
                can revolutionize work, and we're committed to building the
                future.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-background rounded-xl border border-border">
                <div className="text-3xl font-bold text-text-primary mb-2">
                  2
                </div>
                <div className="text-sm text-text-secondary">Founding Team</div>
              </div>
              <div className="text-center p-6 bg-background rounded-xl border border-border">
                <div className="text-3xl font-bold text-text-primary mb-2">
                  6
                </div>
                <div className="text-sm text-text-secondary">
                  Months to Launch
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="text-center bg-background rounded-xl p-6 border border-border hover:border-accent/20 transition-all duration-300"
              >
                <div className="w-[180px] h-[260px] rounded-lg overflow-hidden border border-border mx-auto mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="font-semibold text-text-primary mb-1">
                  {member.name}
                </div>
                <div className="text-sm text-text-secondary">{member.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
