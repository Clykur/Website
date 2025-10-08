import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      category: 'Products & Launch',
      questions: [
        {
          question: 'What products is Clykur building?',
          answer: `We're developing 5 revolutionary AI-powered products:\n\n• AI Business Assistant: Intelligent automation platform\n• Global Freelancer Network: AI-powered marketplace\n• Intelligent Project Management: Smart project orchestration\n• Unified Business Hub: All-in-one business platform\n• AI-Powered Analytics: Advanced business intelligence\n\nAll products are designed to work together as a comprehensive ecosystem.`
        },
        {
          question: 'When will Clykur products launch?',
          answer: `Our launch timeline is Q2 2026:\n\n• Q1 2026: Beta testing begins\n• Q2 2026: Public launch of core products\n• Q3 2026: Advanced features and integrations\n• Q4 2026: Global expansion and enterprise features\n\nJoin our waitlist to be among the first to experience our products.`
        },
        {
          question: 'How do I get early access to Clykur products?',
          answer: `Early access is available through our waitlist:\n\n• Join our waitlist for priority access\n• Beta testing opportunities for active participants\n• Exclusive preview sessions and demos\n• Direct feedback channels to our development team\n• Special launch pricing for early adopters`
        }
      ]
    },
    {
      category: 'Technology & Innovation',
      questions: [
        {
          question: 'What makes Clykur products revolutionary?',
          answer: `Our products are built with cutting-edge AI technology:\n\n• GPT-4 integration for natural language processing\n• Neural networks for predictive analytics\n• Real-time automation and optimization\n• Global scalability and cultural intelligence\n• Self-learning algorithms that improve over time\n\nWe're not just building software - we're creating intelligent digital ecosystems.`
        },
        {
          question: 'What technologies power Clykur products?',
          answer: `Our technology stack includes:\n\n• AI/ML: GPT-4, Neural Networks, Predictive Analytics\n• Cloud: AWS, Azure, Global CDN, Microservices\n• Real-time: WebRTC, WebSockets, Live Collaboration\n• Data: Big Data Analytics, Business Intelligence\n• Security: End-to-end Encryption, GDPR Compliance\n• Mobile: React Native, Progressive Web Apps`
        },
        {
          question: 'How will Clykur products integrate with existing systems?',
          answer: `Our products are designed for seamless integration:\n\n• RESTful APIs and GraphQL endpoints\n• Third-party integrations with popular business tools\n• Custom API development for enterprise needs\n• Data migration and synchronization tools\n• White-label solutions for enterprise clients`
        }
      ]
    },
    {
      category: 'Business & Partnership',
      questions: [
        {
          question: 'How can my business benefit from Clykur products?',
          answer: `Clykur products will transform your business operations:\n\n• 90% automation rate for routine tasks\n• 10x productivity boost through AI assistance\n• Global talent access through intelligent matching\n• Unified platform for all business operations\n• Predictive analytics for better decision making\n• 24/7 intelligent monitoring and optimization`
        },
        {
          question: 'What partnership opportunities are available?',
          answer: `We offer several partnership models:\n\n• Technology partnerships for integration\n• Strategic partnerships for market expansion\n• Enterprise partnerships for custom solutions\n• Developer partnerships for API access\n• Investment opportunities for growth capital\n\nContact us to discuss partnership possibilities.`
        },
        {
          question: 'How can I stay updated on Clykur development?',
          answer: `Stay connected with our journey:\n\n• Join our waitlist for exclusive updates\n• Follow us on LinkedIn for development insights\n• Subscribe to our newsletter for product announcements\n• Attend our virtual product preview sessions\n• Participate in our beta testing programs`
        }
      ]
    }
  ];

  const toggleFAQ = (categoryIndex, questionIndex) => {
    const faqKey = `${categoryIndex}-${questionIndex}`;
    setOpenFAQ(openFAQ === faqKey ? null : faqKey);
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Get answers to common questions about Clykur's revolutionary AI-powered products and our journey to transform the digital economy.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h3 className="text-2xl font-bold text-text-primary mb-6 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">
                  {categoryIndex + 1}
                </span>
                {category.category}
              </h3>
              
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const faqKey = `${categoryIndex}-${questionIndex}`;
                  const isOpen = openFAQ === faqKey;
                  
                  return (
                    <div key={questionIndex} className="card">
                      <button
                        onClick={() => toggleFAQ(categoryIndex, questionIndex)}
                        className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50 rounded-lg"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-semibold text-text-primary pr-4">
                            {faq.question}
                          </h4>
                          <div className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                            <Icon name="ChevronDown" size={20} className="text-text-secondary" />
                          </div>
                        </div>
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-6">
                          <div className="border-t border-border pt-4">
                            <p className="text-text-secondary whitespace-pre-line leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-primary p-8 rounded-xl max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-text-primary mb-4">
              Still Have Questions?
            </h3>
            <p className="text-text-secondary mb-6">
              We're here to help! Reach out directly and we'll provide personalized answers about our revolutionary AI-powered products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:clykur@outlook.com"
                className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors duration-200"
              >
                <Icon name="Mail" size={20} className="mr-2" />
                Email Your Question
              </a>
              <a
                href="#vision-session"
                className="inline-flex items-center justify-center px-6 py-3 border border-border text-text-primary rounded-lg hover:bg-surface transition-colors duration-200"
              >
                <Icon name="Calendar" size={20} className="mr-2" />
                Learn About Our Vision
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;