import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  MessageCircle,
  Star
} from "lucide-react";

const Contact = () => {
  const handleCallNow = () => {
    window.location.href = `tel:9440848737`;
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/919440848737`, '_blank');
  };

  const handleEmail = () => {
    window.location.href = `mailto:itlasanthoshkumar@gmail.com`;
  };

  const handleViewMap = () => {
    window.open(`https://www.google.com/maps/place/Prakasam+District,+Andhra+Pradesh/@15.5,79.5,10z`, '_blank');
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      content: "9440848737",
      description: "Available 24/7 for emergencies",
      action: "Call Now"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      content: "9440848737",
      description: "Quick response guaranteed",
      action: "Chat Now"
    },
    {
      icon: Mail,
      title: "Email",
      content: "itlasanthoshkumar@gmail.com",
      description: "Get detailed quotes",
      action: "Send Email"
    },
    {
      icon: MapPin,
      title: "Location",
      content: "Service Area Coverage",
      description: "PODILI, Prakasam Dist, Andhra Pradesh",
      action: "View Map"
    }
  ];

  const stats = [
    { number: "500+", label: "Projects Completed" },
    { number: "25+", label: "Years Experience" },
    { number: "100%", label: "Customer Satisfaction" },
    { number: "24/7", label: "Emergency Support" }
  ];

  return (
    <section id="contact" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <Phone className="w-4 h-4" />
            <span>Get In Touch</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Ready to Start Your{" "}
            <span className="text-primary">Project?</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get a free consultation and quote for your borewell project. 
            Our experts are here to help you find the perfect water solution.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((item, index) => (
            <Card key={index} className="p-6 text-center bg-gradient-card hover:shadow-card transition-all duration-300 border-0 group hover:-translate-y-1">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-bold text-foreground">{item.title}</h3>
                  <p className="font-semibold text-primary text-lg">{item.content}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-primary hover:text-primary"
                  onClick={item.title === "Call Us" ? handleCallNow : item.title === "WhatsApp" ? handleWhatsApp : item.title === "Email" ? handleEmail : item.title === "Location" ? handleViewMap : undefined}
                >
                  {item.action}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Main CTA Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* CTA Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-foreground">
                Why Choose ProDrill?
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-0.5">
                    <Star className="w-3 h-3 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Expert Technicians</h4>
                    <p className="text-muted-foreground">Certified professionals with 25+ years of combined experience</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-0.5">
                    <Star className="w-3 h-3 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Modern Equipment</h4>
                    <p className="text-muted-foreground">Latest drilling technology for efficient and precise work</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-0.5">
                    <Star className="w-3 h-3 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Guaranteed Results</h4>
                    <p className="text-muted-foreground">100% success rate with warranty on all our services</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Clock className="w-6 h-6 text-red-500" />
                <h4 className="font-bold text-red-900">Emergency Service</h4>
              </div>
              <p className="text-red-700 mb-4">
                Pump failure or water shortage? We provide 24/7 emergency services.
              </p>
              <Button variant="destructive" size="sm" onClick={handleCallNow}>
                <Phone className="w-4 h-4 mr-2" />
                Emergency Hotline
              </Button>
            </div>
          </div>

          {/* Stats & Action */}
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-gradient-card rounded-lg border">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;