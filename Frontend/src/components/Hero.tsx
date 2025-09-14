import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, CheckCircle } from "lucide-react";
import BookingModal from "./BookingModal";

const Hero = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleCallNow = () => {
    window.location.href = `tel:9440848737`;
  };

  const handleBookService = () => {
    setIsBookingModalOpen(true);
  };

  return (
    <section id="home" className="relative py-20 lg:py-32 bg-gradient-to-br from-background to-warm-gray overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--primary)/0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <CheckCircle className="w-4 h-4" />
                <span>25+ Years Experience</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Professional{" "}
                <span className="text-primary">Borewell</span>{" "}
                Drilling Services
              </h1>
              
              <p className="text-xl text-gray-700 leading-relaxed">
                Reliable water solutions with modern equipment and expert technicians. 
                Get clean, sustainable water access for your home or business.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Licensed & Insured</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>24/7 Emergency Service</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Free Estimates</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg" className="group" onClick={handleBookService}>
                Book Service Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="industrial" size="lg" onClick={handleCallNow}>
                <Phone className="w-5 h-5 mr-2" />
                Call: 9440848737
              </Button>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative bg-gradient-card rounded-2xl shadow-industrial p-8 lg:p-12">
              {/* Borewell drilling image */}
              <div className="aspect-square rounded-xl overflow-hidden">
                <img 
                  src="/images/bore.jpg" 
                  alt="Professional borewell drilling equipment and service" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating stats */}
              <div className="absolute -top-6 -right-6 bg-card shadow-card rounded-lg p-4 border">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-industrial-dark text-white rounded-lg p-4">
                <div className="text-2xl font-bold text-yellow-600">100%</div>
                <div className="text-sm text-white">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </section>
  );
};

export default Hero;