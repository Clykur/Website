import React from 'react';
import Icon from '../../../components/AppIcon';

const CredentialsSection = () => {
  const certifications = [
    {
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      year: "2023",
      icon: "Award"
    },
    {
      title: "Google Cloud Professional Developer",
      issuer: "Google Cloud",
      year: "2023",
      icon: "Cloud"
    },
    {
      title: "React Advanced Certification",
      issuer: "Meta",
      year: "2022",
      icon: "Code"
    },
    {
      title: "Certified Scrum Master",
      issuer: "Scrum Alliance",
      year: "2022",
      icon: "Users"
    }
  ];

  const techStack = [
    { name: "React/Next.js", level: 95, color: "from-blue-500 to-blue-600" },
    { name: "Node.js/Express", level: 90, color: "from-green-500 to-green-600" },
    { name: "Python/Django", level: 85, color: "from-yellow-500 to-yellow-600" },
    { name: "AWS/Cloud", level: 88, color: "from-orange-500 to-orange-600" },
    { name: "PostgreSQL/MongoDB", level: 82, color: "from-purple-500 to-purple-600" },
    { name: "DevOps/CI/CD", level: 80, color: "from-red-500 to-red-600" }
  ];

  const achievements = [
    {
      icon: "Github",
      title: "Open Source Contributions",
      value: "500+",
      description: "Commits to various open source projects"
    },
    {
      icon: "Star",
      title: "GitHub Stars",
      value: "1.2K+",
      description: "Stars across personal repositories"
    },
    {
      icon: "Users",
      title: "Community Impact",
      value: "10K+",
      description: "Developers helped through Stack Overflow"
    },
    {
      icon: "Trophy",
      title: "Industry Recognition",
      value: "5+",
      description: "Awards and recognitions received"
    }
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Technical Credentials
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Backed by industry certifications, proven expertise, and a track record of delivering exceptional results.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-stretch">
          {/* Certifications */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-text-primary mb-6">
              Certifications
            </h3>
            
            {certifications.map((cert, index) => (
              <div key={index} className="card p-6 card-hover">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={cert.icon} size={20} color="white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-text-primary mb-1">
                      {cert.title}
                    </h4>
                    <p className="text-text-secondary text-sm mb-1">
                      {cert.issuer}
                    </p>
                    <span className="inline-block bg-primary text-secondary text-xs px-2 py-1 rounded-full">
                      {cert.year}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Technical Skills */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-text-primary mb-6">
              Technical Expertise
            </h3>
            
            <div className="space-y-4">
              {techStack.map((tech, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-text-primary">{tech.name}</span>
                    <span className="text-text-secondary text-sm">{tech.level}%</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${tech.color} transition-all duration-1000 ease-out`}
                      style={{ width: `${tech.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="card p-6 bg-gradient-to-br from-secondary/10 to-accent/10 border-secondary/20">
              <div className="flex items-center space-x-3 mb-3">
                <Icon name="Code2" className="text-secondary" />
                <span className="font-semibold text-text-primary">Code Quality</span>
              </div>
              <p className="text-text-secondary text-sm">
                All projects follow industry best practices with comprehensive testing, documentation, and code reviews.
              </p>
            </div>
          </div>

          {/* Achievements */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-text-primary mb-6">
              Achievements
            </h3>
            
            <div className="grid grid-cols-2 gap-4 items-stretch">
              {achievements.map((achievement, index) => (
                <div key={index} className="card p-6 text-center card-hover h-full flex flex-col">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon name={achievement.icon} size={20} color="white" />
                  </div>
                  <div className="text-2xl font-bold text-secondary mb-1">
                    {achievement.value}
                  </div>
                  <div className="font-medium text-text-primary text-sm mb-1">
                    {achievement.title}
                  </div>
                  <div className="text-text-secondary text-xs mb-2">
                    {achievement.description}
                  </div>
                  <div className="mt-auto" />
                </div>
              ))}
            </div>

            <div className="card p-6 bg-gradient-to-br from-success/10 to-accent/10 border-success/20">
              <div className="flex items-center space-x-3 mb-3">
                <Icon name="TrendingUp" className="text-success" />
                <span className="font-semibold text-text-primary">Continuous Learning</span>
              </div>
              <p className="text-text-secondary text-sm">
                Staying current with emerging technologies and industry trends through continuous education and hands-on experimentation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CredentialsSection;