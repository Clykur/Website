import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ClientPortal = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Mock client credentials for demo
  const mockCredentials = {
    email: 'client@example.com',
    password: 'demo123'
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
    setLoginError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    // Simulate login process
    setTimeout(() => {
      if (loginData.email === mockCredentials.email && loginData.password === mockCredentials.password) {
        // Successful login - in real app, would redirect to portal
        alert('Login successful! Redirecting to client portal...');
        setLoginData({ email: '', password: '' });
      } else {
        setLoginError('Invalid credentials. Use client@example.com / demo123 for demo.');
      }
      setIsLoggingIn(false);
    }, 1500);
  };

  const portalFeatures = [
    {
      icon: 'BarChart3',
      title: 'Project Progress',
      description: 'Real-time updates on development milestones and completion status'
    },
    {
      icon: 'FileText',
      title: 'Deliverables',
      description: 'Access completed features, documentation, and project assets'
    },
    {
      icon: 'MessageSquare',
      title: 'Direct Communication',
      description: 'Secure messaging with your development team and project updates'
    },
    {
      icon: 'Calendar',
      title: 'Meeting Scheduler',
      description: 'Book review sessions, demos, and planning meetings'
    },
    {
      icon: 'Download',
      title: 'File Downloads',
      description: 'Download source code, designs, and project documentation'
    },
    {
      icon: 'CreditCard',
      title: 'Billing & Invoices',
      description: 'View payment history, upcoming invoices, and billing details'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Client Portal Access
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Existing clients can access their dedicated project portal to track progress, communicate with the team, and access deliverables.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Portal Features */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-text-primary mb-6">
                What's Inside Your Portal
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {portalFeatures.map((feature, index) => (
                  <div key={index} className="card p-4 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name={feature.icon} size={20} color="white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-primary mb-1">
                          {feature.title}
                        </h4>
                        <p className="text-text-secondary text-sm">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-6 bg-primary">
              <h4 className="text-lg font-semibold text-text-primary mb-4 flex items-center space-x-2">
                <Icon name="Shield" size={20} className="text-success" />
                <span>Secure & Private</span>
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2 text-sm">
                  <Icon name="Check" size={14} className="text-success" />
                  <span className="text-text-secondary">SSL encrypted communication</span>
                </li>
                <li className="flex items-center space-x-2 text-sm">
                  <Icon name="Check" size={14} className="text-success" />
                  <span className="text-text-secondary">Two-factor authentication</span>
                </li>
                <li className="flex items-center space-x-2 text-sm">
                  <Icon name="Check" size={14} className="text-success" />
                  <span className="text-text-secondary">Regular security audits</span>
                </li>
                <li className="flex items-center space-x-2 text-sm">
                  <Icon name="Check" size={14} className="text-success" />
                  <span className="text-text-secondary">GDPR compliant data handling</span>
                </li>
              </ul>
            </div>

            <div className="card p-6">
              <h4 className="text-lg font-semibold text-text-primary mb-4">
                Need Portal Access?
              </h4>
              <p className="text-text-secondary mb-4">
                If you're a new client or haven't received your portal credentials, I'll set up your access as soon as your project begins.
              </p>
              <Button
                variant="outline"
                fullWidth
                iconName="Mail"
                iconPosition="left"
                onClick={() => window.location.href = 'mailto:hello@clykur.com?subject=Portal Access Request'}
              >
                Request Portal Access
              </Button>
            </div>
          </div>

          {/* Login Form */}
          <div className="card p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name="Lock" size={32} color="white" />
              </div>
              <h3 className="text-2xl font-semibold text-text-primary mb-2">
                Client Portal Login
              </h3>
              <p className="text-text-secondary">
                Access your project dashboard and communication center
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                />
              </div>

              {loginError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="AlertCircle" size={16} className="text-red-500" />
                    <span className="text-red-700 text-sm">{loginError}</span>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={isLoggingIn}
                iconName="LogIn"
                iconPosition="right"
              >
                {isLoggingIn ? 'Signing In...' : 'Access Portal'}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-border">
              <div className="text-center space-y-4">
                <button
                  onClick={() => alert('Password reset email sent! (Demo only)')}
                  className="text-secondary hover:text-blue-800 text-sm font-medium transition-colors duration-200"
                >
                  Forgot your password?
                </button>
                
                <div className="bg-surface p-4 rounded-lg">
                  <p className="text-xs text-text-secondary mb-2">Demo Credentials:</p>
                  <p className="text-xs font-mono text-text-primary">
                    Email: client@example.com<br />
                    Password: demo123
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientPortal;