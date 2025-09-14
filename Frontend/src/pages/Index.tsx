import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <Services />
        <Contact />
      </main>
      
      {/* Footer */}
      <footer className="bg-industrial-dark text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">
                <span className="text-primary">Pro</span>Drill
              </div>
              <p className="text-white/80">
                Professional borewell services with 25+ years of experience. 
                Reliable water solutions for your home and business.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-200">
                <li>Borewell Drilling</li>
                <li>Pump Installation</li>
                <li>Pressing Services</li>
                <li>Consultation</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-200">
                <p>Phone: 9440848737</p>
                <p>Email: itlasanthoshkumar@gmail.com</p>
                <p>Available 24/7</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 ProDrill Borewell Services. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
