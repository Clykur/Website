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

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Consultation Form */}
          <div className="card p-8">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-text-primary mb-4">
                Schedule Your Free Consultation
              </h3>
              <p className="text-text-secondary">
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
                className="text-lg py-4"
              >
                Request Consultation
              </Button>
            </form>
          </div>

          {/* Available Time Slots & Commitments */}
          <div className="space-y-8">
            {/* Available Slots */}
            <div className="card p-8">
              <h3 className="text-xl font-bold text-text-primary mb-6">
                Available Time Slots
              </h3>

              <div className="space-y-3">
                {availableSlots.map((slot, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                      slot.available
                        ? "border-border hover:border-secondary cursor-pointer"
                        : "border-border bg-surface opacity-50 cursor-not-allowed"
                    }`}
                    onClick={() =>
                      slot.available &&
                      setSelectedTimeSlot(`${slot.day} ${slot.time}`)
                    }
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          slot.available ? "bg-success" : "bg-gray-400"
                        }`}
                      ></div>
                      <div>
                        <div className="font-medium text-text-primary">
                          {slot.day}
                        </div>
                        <div className="text-sm text-text-secondary">
                          {slot.time}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm">
                      {slot.available ? (
                        <span className="text-success">Available</span>
                      ) : (
                        <span className="text-gray-400">Booked</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-primary rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Info" size={16} className="text-secondary" />
                  <span className="text-sm font-medium text-secondary">
                    Note
                  </span>
                </div>
                <p className="text-sm text-text-secondary">
                  All times are in EST. We'll send a calendar invite with video
                  call details after confirmation.
                </p>
              </div>
            </div>

            {/* Commitments */}
            <div className="card p-8">
              <h3 className="text-xl font-bold text-text-primary mb-6">
                Our Commitment to You
              </h3>

              <div className="space-y-4">
                {commitments.map((commitment, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={commitment.icon} size={16} color="white" />
                    </div>
                    <div>
                      <div className="font-medium text-text-primary mb-1">
                        {commitment.title}
                      </div>
                      <div className="text-sm text-text-secondary">
                        {commitment.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Alternatives */}
            <div className="card p-8 bg-gradient-to-br from-secondary/10 to-accent/10 border-secondary/20">
              <h3 className="text-xl font-bold text-text-primary mb-4">
                Prefer to Connect Directly?
              </h3>
              <p className="text-text-secondary mb-6">
                Feel free to reach out through any of these channels:
              </p>

              <div className="flex justify-between gap-2">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Icon name="Mail" className="text-secondary" />
                    <span className="text-text-primary"><a href="mailto:buildwithchandu@hotmail.com">buildwithchandu</a></span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Phone" className="text-secondary" />
                    <span className="text-text-primary"><a href="tel:+918179299096">+91 8179299096</a></span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Linkedin" className="text-secondary" />
                    <span className="text-text-primary">
                    <a href="https://www.linkedin.com/in/chandu-kalluru/" target="_blank" rel="noopener noreferrer">Chandu Kalluru</a>
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Icon name="Mail" className="text-secondary" />
                    <span className="text-text-primary">
                      <a href="mailto:connectwithkarthik@hotmail.com">connectwithkarthik</a>
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Phone" className="text-secondary" />
                    <span className="text-text-primary"><a href="tel:+919949740776">+91 9949740776</a></span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Linkedin" className="text-secondary" />
                    <span className="text-text-primary">
                    <a href="https://www.linkedin.com/in/venkata-karthik-naramala/" target="_blank" rel="noopener noreferrer">Karthik Naramala</a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationCTA;
