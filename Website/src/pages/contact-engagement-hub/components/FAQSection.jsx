import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      category: 'Process & Timeline',
      questions: [
        {
          question: 'What is your typical project timeline?',
          answer: `Project timelines vary based on complexity and scope:\n\n• Simple web applications: 4-8 weeks\n• Complex SaaS platforms: 3-6 months\n• Mobile applications: 6-12 weeks\n• API development: 2-6 weeks\n\nI provide detailed timeline estimates during our initial consultation, including milestones and delivery phases.`
        },
        {
          question: 'How do you handle project communication?',
          answer: `I maintain transparent communication throughout the project:\n\n• Weekly progress reports with screenshots/demos\n• Dedicated Slack channel or preferred communication tool\n• Bi-weekly video calls for major milestones\n• Real-time project dashboard access\n• 24-hour response time for urgent matters`
        },
        {
          question: 'What happens if project requirements change?',
          answer: `I understand that requirements evolve. My approach includes:\n\n• Initial scope buffer for minor changes\n• Change request process for major modifications\n• Transparent pricing for additional features\n• Timeline adjustments with clear communication\n• Agile methodology to accommodate iterations`
        }
      ]
    },
    {
      category: 'Pricing & Investment',
      questions: [
        {
          question: 'How do you structure your pricing?',
          answer: `I offer flexible pricing models to suit different needs:\n\n• Fixed-price projects: Best for well-defined scope\n• Hourly consulting: $150-200/hour for ongoing work\n• Retainer agreements: Monthly commitment with priority support\n• Equity partnerships: For promising startups with limited budget\n\nAll pricing includes post-launch support and documentation.`
        },
        {
          question: 'What is included in the project cost?',
          answer: `Every project includes comprehensive deliverables:\n\n• Complete source code with documentation\n• Deployment and hosting setup\n• 30 days of post-launch support\n• Training for your team\n• Performance optimization\n• Security implementation\n• Basic SEO setup (for web projects)`
        },
        {
          question: 'Do you offer payment plans?',
          answer: `Yes, I offer flexible payment structures:\n\n• 50% upfront, 50% on completion (projects under $15k)\n• 30% upfront, 40% at milestone, 30% completion (larger projects)\n• Monthly payments for retainer agreements\n• Custom payment plans for long-term partnerships\n\nAll payments are secured through professional invoicing systems.`
        }
      ]
    },
    {
      category: 'Technical & Support',
      questions: [
        {
          question: 'What technologies do you specialize in?',
          answer: `I focus on modern, scalable technologies:\n\n• Frontend: React, Next.js, TypeScript, Tailwind CSS\n• Backend: Node.js, Python, PostgreSQL, MongoDB\n• Cloud: AWS, Vercel, Digital Ocean\n• Mobile: React Native, Progressive Web Apps\n• DevOps: Docker, CI/CD, automated testing\n\nI choose the best technology stack for each project's specific needs.`
        },
        {
          question: 'Do you provide ongoing maintenance?',
          answer: `Yes, I offer comprehensive maintenance packages:\n\n• Bug fixes and security updates\n• Performance monitoring and optimization\n• Feature enhancements and additions\n• Server maintenance and scaling\n• Regular backups and disaster recovery\n• Priority support with guaranteed response times`
        },
        {
          question: 'Can you work with my existing team?',
          answer: `Absolutely! I collaborate effectively with existing teams:\n\n• Code reviews and technical guidance\n• Mentoring junior developers\n• Architecture planning and documentation\n• Integration with existing systems\n• Knowledge transfer and training\n• Flexible communication and workflow adaptation`
        }
      ]
    }
  ];

  const toggleFAQ = (categoryIndex, questionIndex) => {
    const faqId = `${categoryIndex}-${questionIndex}`;
    setOpenFAQ(openFAQ === faqId ? null : faqId);
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-text-secondary">
            Get answers to common questions about working with Clykur. Don't see your question? Feel free to reach out directly.
          </p>
        </div>

        <div className="space-y-12">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h3 className="text-2xl font-semibold text-text-primary mb-6 flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{categoryIndex + 1}</span>
                </div>
                <span>{category.category}</span>
              </h3>
              
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const faqId = `${categoryIndex}-${questionIndex}`;
                  const isOpen = openFAQ === faqId;
                  
                  return (
                    <div key={questionIndex} className="card overflow-hidden">
                      <button
                        onClick={() => toggleFAQ(categoryIndex, questionIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-surface transition-colors duration-200"
                      >
                        <span className="text-lg font-medium text-text-primary pr-4">
                          {faq.question}
                        </span>
                        <Icon
                          name={isOpen ? 'ChevronUp' : 'ChevronDown'}
                          size={20}
                          className={`text-text-secondary transition-transform duration-200 ${
                            isOpen ? 'transform rotate-180' : ''
                          }`}
                        />
                      </button>
                      
                      <div
                        className={`transition-all duration-300 ease-in-out ${
                          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        } overflow-hidden`}
                      >
                        <div className="px-6 pb-4">
                          <div className="border-t border-border pt-4">
                            <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-16 text-center">
          <div className="card p-8 bg-primary">
            <h3 className="text-2xl font-semibold text-text-primary mb-4">
              Still Have Questions?
            </h3>
            <p className="text-text-secondary mb-6">
              I'm here to help! Reach out directly and I'll provide personalized answers to your specific questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = 'mailto:hello@clykur.com?subject=Question about Services'}
                className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-white rounded-lg hover:bg-blue-800 transition-colors duration-200"
              >
                <Icon name="Mail" size={20} className="mr-2" />
                Email Your Question
              </button>
              <button
                onClick={() => document.querySelector('#consultation-booking').scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center px-6 py-3 border border-secondary text-secondary rounded-lg hover:bg-secondary hover:text-white transition-colors duration-200"
              >
                <Icon name="Calendar" size={20} className="mr-2" />
                Schedule a Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;