import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Drill,
  Wrench,
  Phone
} from "lucide-react";
import BookingModal from "./BookingModal";
import PressingModal from "./PressingModal";

const Services = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isPressingModalOpen, setIsPressingModalOpen] = useState(false);

  const handleCallNow = () => {
    window.location.href = `tel:9440848737`;
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/919440848737`, '_blank');
  };

  const handleServiceClick = (serviceType: string) => {
    if (serviceType === 'pressing') {
      setIsPressingModalOpen(true);
    } else {
      setIsBookingModalOpen(true);
    }
  };

  const services = [
    {
      icon: Drill,
      title: "Bore Drilling",
      description: "Professional borewell drilling with modern equipment for residential and commercial properties.",
      features: ["Up to 1000ft depth", "All soil types", "Quality assured"],
      serviceType: "drilling"
    },
    {
      icon: Wrench,
      title: "Pressing",
      description: "Borewell pressing services to increase depth of existing borewells.",
      features: ["Old bore analysis", "Depth extension", "Professional pressing"],
      serviceType: "pressing"
    },
    {
      icon: Phone,
      title: "Consultation",
      description: "Free consultation and site survey to determine the best water solution for your needs.",
      features: ["Free site visit", "Expert advice", "Custom solutions"],
      serviceType: "consultation"
    }
  ];

  return (
    <section id="services" className="py-20 lg:py-32 bg-warm-gray">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <Drill className="w-4 h-4" />
            <span>Our Services</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Complete <span className="text-primary">Water Solutions</span>
          </h2>
          
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            From drilling to maintenance, we provide comprehensive borewell services 
            with modern equipment and experienced technicians.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group p-8 bg-gradient-card hover:shadow-card transition-all duration-300 border-0 hover:-translate-y-1">
              <div className="space-y-6">
                {/* Video */}
                <div className="w-full h-48 bg-gray-100 rounded-xl overflow-hidden">
                  <video 
                    className="w-full h-full object-cover"
                    controls
                    muted
                    loop
                    playsInline
                  >
                    <source src="/Videos/video1.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                {/* Icon */}
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Button 
                  variant="ghost" 
                  className="w-full justify-start p-0 h-auto text-primary hover:text-primary font-medium"
                  onClick={() => handleServiceClick(service.serviceType)}
                >
                  Book Service →
                </Button>
              </div>
            </Card>
          ))}
        </div>

      </div>

      {/* Modals */}
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
      <PressingModal 
        isOpen={isPressingModalOpen} 
        onClose={() => setIsPressingModalOpen(false)} 
      />
    </section>
  );
};

export default Services;