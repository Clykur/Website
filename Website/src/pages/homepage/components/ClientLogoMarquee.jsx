import React from 'react';
import Image from '../../../components/AppImage';

const ClientLogoMarquee = () => {
  const clients = [
    {
      name: "TechFlow Innovations",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=120&h=60&fit=crop",
      category: "Startup"
    },
    {
      name: "DataSync Solutions",
      logo: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?w=120&h=60&fit=crop",
      category: "Enterprise"
    },
    {
      name: "CloudVision Corp",
      logo: "https://images.pixabay.com/photo/2016/12/27/21/03/lone-tree-1934897_1280.jpg?w=120&h=60&fit=crop",
      category: "Scale-up"
    },
    {
      name: "NextGen Analytics",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=60&fit=crop",
      category: "Startup"
    },
    {
      name: "InnovateLab",
      logo: "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?w=120&h=60&fit=crop",
      category: "Enterprise"
    },
    {
      name: "FutureScope Systems",
      logo: "https://images.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_1280.jpg?w=120&h=60&fit=crop",
      category: "Scale-up"
    },
    {
      name: "AgileCore Technologies",
      logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&h=60&fit=crop",
      category: "Startup"
    },
    {
      name: "QuantumLeap Ventures",
      logo: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?w=120&h=60&fit=crop",
      category: "Enterprise"
    }
  ];

  // Duplicate for seamless loop
  const duplicatedClients = [...clients, ...clients];

  return (
    <section className="py-16 bg-surface border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">
            Trusted by ambitious startups and established businesses
          </h2>
          <div className="flex justify-center items-center space-x-8 text-sm text-text-secondary">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
              Startups
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
              Scale-ups
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
              Enterprise
            </div>
          </div>
        </div>

        {/* Marquee Container */}
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee space-x-12">
            {duplicatedClients.map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                className="flex-shrink-0 group"
              >
                <div className="relative bg-background rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-all duration-300 group-hover:scale-105">
                  <div className="flex items-center justify-center h-12 w-32">
                    <Image
                      src={client.logo}
                      alt={`${client.name} logo`}
                      className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <div className="text-xs font-medium text-text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {client.name}
                    </div>
                    <div className={`text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      client.category === 'Startup' ? 'text-success' :
                      client.category === 'Scale-up'? 'text-secondary' : 'text-accent'
                    }`}>
                      {client.category}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-surface to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-surface to-transparent pointer-events-none"></div>
        </div>

        {/* Stats Row */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-2xl font-bold text-text-primary">50+</div>
            <div className="text-sm text-text-secondary">Applications Delivered</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-text-primary">95%</div>
            <div className="text-sm text-text-secondary">Client Retention</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-text-primary">2.3x</div>
            <div className="text-sm text-text-secondary">Average ROI Increase</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-text-primary">24/7</div>
            <div className="text-sm text-text-secondary">Support Available</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default ClientLogoMarquee;