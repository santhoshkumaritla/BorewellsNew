import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Phone, MapPin, User, Ruler, Mail } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    villageName: "",
    districtName: "",
    mobileNumber: "",
    email: "",
    feet: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatPhoneNumber = (phoneNumber: string) => {
    // Remove all non-digits
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // If it starts with 91, return as is with +
    if (cleaned.startsWith('91') && cleaned.length === 12) {
      return `+${cleaned}`;
    }
    
    // If it's 10 digits, add +91
    if (cleaned.length === 10) {
      return `+91${cleaned}`;
    }
    
    // If it's already formatted with +91, return as is
    if (phoneNumber.startsWith('+91')) {
      return phoneNumber;
    }
    
    // Default: add +91 if it looks like an Indian number
    return `+91${cleaned}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format phone number if it's the mobileNumber field
    if (name === 'mobileNumber') {
      const formattedNumber = formatPhoneNumber(value);
      setFormData(prev => ({
        ...prev,
        [name]: formattedNumber
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send data to backend API
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        // Show success message
        alert('✅ Booking submitted successfully! We will contact you soon.');
        
        // Also open WhatsApp as backup
        const message = `🏗️ *Borewell Service Booking Request*

👤 *Name:* ${formData.name}
🏘️ *Village:* ${formData.villageName}
🏛️ *District:* ${formData.districtName}
📱 *Mobile:* ${formData.mobileNumber}
📏 *Depth Required:* ${formData.feet} feet

Please contact me for further details.`;

        const whatsappUrl = `https://wa.me/919440848737?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
      } else {
        throw new Error(result.message || 'Failed to submit booking');
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('❌ Failed to submit booking. Please try again or contact us directly.');
      
      // Fallback to WhatsApp only
      const message = `🏗️ *Borewell Service Booking Request*

👤 *Name:* ${formData.name}
🏘️ *Village:* ${formData.villageName}
🏛️ *District:* ${formData.districtName}
📱 *Mobile:* ${formData.mobileNumber}
📏 *Depth Required:* ${formData.feet} feet

Please contact me for further details.`;

      const whatsappUrl = `https://wa.me/919440848737?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }

    // Reset form
    setFormData({
      name: "",
      villageName: "",
      districtName: "",
      mobileNumber: "",
      email: "",
      feet: ""
    });

    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Book Service</h2>
              <p className="text-sm text-gray-600">Get your free quote today</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <User className="w-4 h-4" />
              <span>Full Name *</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
              placeholder="Enter your full name"
            />
          </div>

          {/* Village Name */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <MapPin className="w-4 h-4" />
              <span>Village Name *</span>
            </label>
            <input
              type="text"
              name="villageName"
              value={formData.villageName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
              placeholder="Enter your village name"
            />
          </div>

          {/* District Name */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <MapPin className="w-4 h-4" />
              <span>District Name *</span>
            </label>
            <input
              type="text"
              name="districtName"
              value={formData.districtName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
              placeholder="Enter your district name"
            />
          </div>

          {/* Mobile Number */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Phone className="w-4 h-4" />
              <span>Mobile Number *</span>
            </label>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
              placeholder="Enter your 10-digit mobile number (e.g., 9876543210)"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Mail className="w-4 h-4" />
              <span>Email Address *</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
              placeholder="Enter your email address"
            />
          </div>

          {/* Feet */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Ruler className="w-4 h-4" />
              <span>How many feet to bore? *</span>
            </label>
            <input
              type="number"
              name="feet"
              value={formData.feet}
              onChange={handleInputChange}
              required
              min="1"
              max="1000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
              placeholder="Enter depth in feet (e.g., 200)"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-lg font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Booking Request"}
            </Button>
            <p className="text-xs text-gray-500 text-center mt-2">
              We'll contact you via WhatsApp with a free quote
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
