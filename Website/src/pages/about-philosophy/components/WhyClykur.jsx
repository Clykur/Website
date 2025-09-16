import React from 'react';
import Icon from '../../../components/AppIcon';

const WhyClykur = () => {
  const motivations = [
    {
      icon: "Target",
      title: "Bridging the Gap",
      description: "Most development services treat projects as transactions. We saw the need for true technical partnership—people who think about your business success, not just code delivery."
    },
    {
      icon: "Lightbulb",
      title: "Innovation Focus",
      description: "Ambitious businesses need partners who can navigate emerging technologies and industry trends, not just execute predefined requirements."
    },
    {
      icon: "Users",
      title: "Relationship-Driven",
      description: "The best digital products come from deep collaboration and understanding. I wanted to build lasting partnerships, not one-off projects."
    },
    {
      icon: "Zap",
      title: "Speed & Quality",
      description: "Startups need to move fast without compromising quality. I created Clykur to deliver both—rapid development with enterprise-grade standards."
    }
  ];

  const differentiators = [
    {
      traditional: "Fixed scope, change requests cost extra",
      clykur: "Adaptive planning, evolution is expected",
      icon: "RefreshCw"
    },
    {
      traditional: "Technical implementation only",
      clykur: "Business strategy + technical execution",
      icon: "Lightbulb"
    },
    {
      traditional: "Project ends at deployment",
      clykur: "Ongoing partnership and growth support",
      icon: "TrendingUp"
    },
    {
      traditional: "Generic solutions for everyone",
      clykur: "Tailored architecture for your specific needs",
      icon: "Settings"
    }
  ];

  const clientValue = [
    {
      icon: "Shield",
      title: "Risk Mitigation",
      description: "Experienced guidance helps avoid common pitfalls and technical debt that can cripple growth."
    },
    {
      icon: "Clock",
      title: "Faster Time-to-Market",
      description: "Proven processes and reusable components accelerate development without sacrificing quality."
    },
    {
      icon: "DollarSign",
      title: "Cost Efficiency",
      description: "Right-sized solutions that grow with your business, avoiding over-engineering and under-planning."
    },
    {
      icon: "Users",
      title: "Team Extension",
      description: "Acting as your technical co-founder, providing strategic guidance beyond just development."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Why We Started Clykur
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            The gap between what businesses need and what typical development services provide inspired us to create something different—a true technical partnership.
          </p>
        </div>

        {/* Motivations */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {motivations.map((motivation, index) => (
            <div key={index} className="card p-8 card-hover">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={motivation.icon} size={24} color="white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-text-primary mb-3">
                    {motivation.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {motivation.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Traditional vs Clykur */}
        <div className="bg-surface rounded-2xl p-8 lg:p-12 mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4">
              Traditional Development vs. Clykur Approach
            </h3>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              See how our partnership approach differs from typical development services.
            </p>
          </div>

          <div className="space-y-8">
            {differentiators.map((diff, index) => (
              <div key={index} className="grid lg:grid-cols-3 gap-6 items-center">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="X" size={16} className="text-red-500" />
                    <span className="text-sm font-medium text-red-700">Traditional Approach</span>
                  </div>
                  <p className="text-red-600 text-sm">{diff.traditional}</p>
                </div>

                <div className="flex justify-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
                    <Icon name={diff.icon} size={20} color="white" />
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Check" size={16} className="text-green-500" />
                    <span className="text-sm font-medium text-green-700">Clykur Way</span>
                  </div>
                  <p className="text-green-600 text-sm">{diff.clykur}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Value */}
        <div className="text-center mb-12">
          <h3 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4">
            What This Means for You
          </h3>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Tangible benefits that directly impact your business success and growth trajectory.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {clientValue.map((value, index) => (
            <div key={index} className="card p-6 text-center card-hover">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                <Icon name={value.icon} size={24} color="white" />
              </div>
              <h4 className="text-lg font-semibold text-text-primary mb-3">
                {value.title}
              </h4>
              <p className="text-text-secondary text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyClykur;