import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ConsultationBooking = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    topic: '',
    timezone: 'EST'
  });
  const [isBooking, setIsBooking] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(null);

  // Generate next 14 days for booking
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push({
          value: date.toISOString().split('T')[0],
          label: date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'short', 
            day: 'numeric' 
          })
        });
      }
    }
    
    return dates;
  };

  const availableSlots = [
    { value: '09:00', label: '9:00 AM EST' },
    { value: '10:00', label: '10:00 AM EST' },
    { value: '11:00', label: '11:00 AM EST' },
    { value: '14:00', label: '2:00 PM EST' },
    { value: '15:00', label: '3:00 PM EST' },
    { value: '16:00', label: '4:00 PM EST' }
  ];

  const consultationTopics = [
    'Project Architecture & Technology Stack',
    'Development Timeline & Milestones',
    'Budget Planning & Investment Strategy',
    'Team Collaboration & Communication',
    'Technical Feasibility Assessment',
    'Scalability & Performance Planning',
    'General Discussion'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setIsBooking(true);
    
    // Simulate booking process
    setTimeout(() => {
      setIsBooking(false);
      setBookingStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        setSelectedDate('');
        setSelectedTime('');
        setFormData({
          name: '',
          email: '',
          company: '',
          topic: '',
          timezone: 'EST'
        });
        setBookingStatus(null);
      }, 5000);
    }, 2000);
  };

  if (bookingStatus === 'success') {
    return (
      <section id="consultation-booking" className="py-16 lg:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-success rounded-full mb-6">
              <Icon name="Calendar" size={32} color="white" />
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Consultation Booked Successfully!
            </h3>
            <p className="text-text-secondary mb-6">
              Your 30-minute technical consultation with Chandu Kalluru (Lead Developer) has been scheduled. You'll receive a calendar invitation and meeting details shortly.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-2 text-success">
                <Icon name="Mail" size={20} />
                <span className="text-sm">Calendar invite sent</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-success">
                <Icon name="Video" size={20} />
                <span className="text-sm">Zoom link included</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-success">
                <Icon name="Clock" size={20} />
                <span className="text-sm">30-minute session</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="consultation-booking" className="py-16 lg:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Book Your Free Consultation
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Schedule a 30-minute technical consultation with Chandu Kalluru (Lead Developer) to discuss your project vision, get expert recommendations, and create a strategic roadmap.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Consultation Benefits */}
          <div className="space-y-8">
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-text-primary mb-4">
                What You'll Get
              </h3>
              <ul className="space-y-3">
                {[
                  'Technical feasibility assessment',
                  'Technology stack recommendations',
                  'Project timeline estimation',
                  'Architecture planning guidance',
                  'Budget planning insights',
                  'Next steps roadmap'
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Icon name="Check" size={20} className="text-success mt-0.5" />
                    <span className="text-text-secondary">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-6 bg-primary">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="User" size={24} color="white" />
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-2">
                    Direct Access to Chandu Kalluru (Lead Developer)
                  </h4>
                  <p className="text-text-secondary text-sm">
                    Lead Developer with 8+ years of experience building scalable applications for startups and enterprises.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-surface rounded-lg">
                <div className="text-2xl font-bold text-secondary mb-1">100%</div>
                <div className="text-sm text-text-secondary">Free Consultation</div>
              </div>
              <div className="text-center p-4 bg-surface rounded-lg">
                <div className="text-2xl font-bold text-secondary mb-1">30min</div>
                <div className="text-sm text-text-secondary">Focused Session</div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="card p-8">
            <form onSubmit={handleBooking} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Company/Organization
                </label>
                <Input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Your company name (optional)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Consultation Topic *
                </label>
                <select
                  name="topic"
                  value={formData.topic}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent bg-background"
                >
                  <option value="">Select consultation topic</option>
                  {consultationTopics.map((topic, index) => (
                    <option key={index} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Preferred Date *
                  </label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent bg-background"
                  >
                    <option value="">Select date</option>
                    {generateAvailableDates().map(date => (
                      <option key={date.value} value={date.value}>
                        {date.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Preferred Time *
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent bg-background"
                  >
                    <option value="">Select time</option>
                    {availableSlots.map(slot => (
                      <option key={slot.value} value={slot.value}>
                        {slot.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={isBooking}
                iconName="Calendar"
                iconPosition="right"
              >
                {isBooking ? 'Booking...' : 'Book Free Consultation'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationBooking;