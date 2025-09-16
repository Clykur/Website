import React from 'react';
import Icon from '../../../components/AppIcon';

const FounderStory = () => {
  const storyPoints = [
    {
      icon: "GraduationCap",
      title: "Our Foundation",
      description: "Grounded in Computer Science and system design, we apply strong architectural principles to build scalable, reliable solutions."
    },
    {
      icon: "Building2",
      title: "Industry Experience",
      description: "Years at leading tech companies working on enterprise-scale applications taught us the value of maintainable, production-ready code."
    },
    {
      icon: "Lightbulb",
      title: "The Realization",
      description: "We saw the gap between typical development services and what ambitious businesses need—a technical partner, not just a vendor."
    },
    {
      icon: "Rocket",
      title: "Clykur’s Mission",
      description: "We built Clykur to bridge this gap—combining technical excellence with business understanding to help startups and enterprises thrive digitally."
    }
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            The Journey to Clykur
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            From corporate developers to technical co-founders—the story of how we built Clykur to transform how businesses approach digital development.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Story Content */}
          <div className="space-y-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-text-secondary leading-relaxed">
                Our journey began in the corporate world, where we spent years building enterprise applications for Fortune 500 companies. While the technical challenges were exciting, we noticed a recurring pattern: businesses struggling to find development partners who truly understood their vision.
              </p>
              
              <p className="text-text-secondary leading-relaxed">
                Too often, we saw brilliant business ideas get lost in translation between stakeholders and development teams. The missing piece wasn’t just technical skill—it was the ability to think like product owners while engineering like architects.
              </p>
              
              <p className="text-text-secondary leading-relaxed">
                That’s when we found our calling: to be the technical partners that ambitious businesses deserve—teams who don’t just build what’s asked, but help uncover what’s truly needed.
              </p>
            </div>

            <div className="bg-background border border-border rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="Quote" size={24} color="white" />
                </div>
                <div>
                  <blockquote className="text-text-primary font-medium italic">
                    "We don’t just build applications—we craft digital foundations that help businesses thrive. Every line of code is written with your success in mind."
                  </blockquote>
                  <cite className="text-text-secondary text-sm mt-2 block">— Chandu Kalluru, Founder</cite>
                  <cite className="text-text-secondary text-sm mt-2 block">— Karthik Naramala, Co-Founder</cite>
                </div>
              </div>
            </div>
          </div>

          {/* Story Timeline */}
          <div className="space-y-6">
            {storyPoints.map((point, index) => (
              <div key={index} className="flex items-start space-x-4 group">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                  <Icon name={point.icon} size={20} color="white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {point.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderStory;