import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const ConsultationCTA = () => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    message: "",
  });

  const availableSlots = [
    { day: "Monday", time: "10:00 AM - 11:00 AM", available: true },
    { day: "Monday", time: "2:00 PM - 3:00 PM", available: false },
    { day: "Tuesday", time: "9:00 AM - 10:00 AM", available: true },
    { day: "Tuesday", time: "3:00 PM - 4:00 PM", available: true },
    { day: "Wednesday", time: "11:00 AM - 12:00 PM", available: true },
    { day: "Wednesday", time: "4:00 PM - 5:00 PM", available: false },
    { day: "Thursday", time: "10:00 AM - 11:00 AM", available: true },
    { day: "Thursday", time: "1:00 PM - 2:00 PM", available: true },
    { day: "Friday", time: "9:00 AM - 10:00 AM", available: true },
    { day: "Friday", time: "2:00 PM - 3:00 PM", available: true },
  ];

  const projectTypes = [
    "Web Application Development",
    "Mobile App Development",
    "E-commerce Platform",
    "SaaS Product",
    "API Development",
    "Technical Consultation",
    "Code Review & Optimization",
    "Other",
  ];

  const commitments = [
    {
      icon: "Clock",
      title: "Response Time",
      description: "We personally respond to all inquiries within 24 hours",
    },
    {
      icon: "Users",
      title: "Direct Access",
      description: "You'll work directly with me, not a team of intermediaries",
    },
    {
      icon: "Shield",
      title: "Confidentiality",
      description: "All project discussions are covered by strict NDAs",
    },
    {
      icon: "TrendingUp",
      title: "Success Focus",
      description:
        "Our success is measured by your business growth and satisfaction",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", { ...formData, timeSlot: selectedTimeSlot });
    alert(
      "Thank you for your interest! I'll be in touch within 24 hours to confirm your consultation."
    );
  };

  return (
    <section className="py-20 bg-gradient-to-br from-secondary/5 via-background to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Let's discuss how we can help transform your vision into a scalable
            digital reality. Book a free consultation to explore your project
            needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-1 gap-12">
          {/* Consultation Form */}
          <div className="card p-8 lg:p-12 bg-white shadow-lg">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-text-primary mb-4 justify-center text-center">
                Schedule Your Free Consultation
              </h3>
              <p className="text-text-secondary justify-center text-center">
                Tell us about your project and let's find the perfect time to
                discuss your needs in detail.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Company/Organization
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="Your company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Project Type *
                </label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                >
                  <option value="">Select project type</option>
                  {projectTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Project Description
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="Tell us about your project goals, timeline, and any specific requirements..."
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                iconName="Calendar"
                iconPosition="left"
                className="text-lg py-4 border-4 border-solid border-primary/50 hover:border-primary shadow-sm"
              >
                Request Consultation
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationCTA;
