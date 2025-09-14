import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Phone, MapPin, User, Ruler, Mail, Wrench } from "lucide-react";

interface PressingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PressingModal = ({ isOpen, onClose }: PressingModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    villageName: "",
    districtName: "",
    mobileNumber: "",
    email: "",
    oldBoreFeet: "",
    newBoreFeet: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatPhoneNumber = (phoneNumber: string) => {
    // Remove all non-digits
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // If it starts with 91 and is 12 digits, remove the 91 prefix
    if (cleaned.startsWith('91') && cleaned.length === 12) {
      return cleaned.substring(2); // Return just the 10 digits
    }
    
    // If it's 10 digits, return as is
    if (cleaned.length === 10) {
      return cleaned;
    }
    
    // If it's already formatted with +91, extract the 10 digits
    if (phoneNumber.startsWith('+91')) {
      return phoneNumber.substring(3); // Remove +91
    }
    
    // Default: return cleaned digits (should be 10 for Indian numbers)
    return cleaned;
  };

  const formatPhoneDisplay = (phoneNumber: string) => {
    // For display purposes, show +91 format
    const cleaned = phoneNumber.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `+91${cleaned}`;
    }
    return phoneNumber;
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
      const response = await fetch('https://borewellsnew.onrender.com/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          serviceType: 'pressing',
          feet: formData.newBoreFeet // Use new bore feet as the main depth
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Show success message
        alert('✅ Pressing service request submitted successfully! We will contact you soon.');
        
        // Also open WhatsApp as backup
        const message = `🔧 *Borewell Pressing Service Request*

👤 *Name:* ${formData.name}
🏘️ *Village:* ${formData.villageName}
🏛️ *District:* ${formData.districtName}
📱 *Mobile:* ${formatPhoneDisplay(formData.mobileNumber)}
📧 *Email:* ${formData.email}
📏 *Old Bore Depth:* ${formData.oldBoreFeet} feet
🔧 *New Depth Required:* ${formData.newBoreFeet} feet

Please contact me for further details.`;

        const whatsappUrl = `https://wa.me/919440848737?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
      } else {
        throw new Error(result.message || 'Failed to submit pressing request');
      }
    } catch (error) {
      console.error('Error submitting pressing request:', error);
      alert('❌ Failed to submit pressing request. Please try again or contact us directly.');
      
      // Fallback to WhatsApp only
      const message = `🔧 *Borewell Pressing Service Request*

👤 *Name:* ${formData.name}
🏘️ *Village:* ${formData.villageName}
🏛️ *District:* ${formData.districtName}
📱 *Mobile:* ${formatPhoneDisplay(formData.mobileNumber)}
📧 *Email:* ${formData.email}
📏 *Old Bore Depth:* ${formData.oldBoreFeet} feet
🔧 *New Depth Required:* ${formData.newBoreFeet} feet

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
      oldBoreFeet: "",
      newBoreFeet: ""
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
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <Wrench className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Pressing Service</h2>
              <p className="text-sm text-gray-600">Extend your existing borewell depth</p>
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-colors"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-colors"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-colors"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-colors"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-colors"
              placeholder="Enter your email address"
            />
          </div>

          {/* Old Bore Feet */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Ruler className="w-4 h-4" />
              <span>Current Bore Depth (feet) *</span>
            </label>
            <input
              type="number"
              name="oldBoreFeet"
              value={formData.oldBoreFeet}
              onChange={handleInputChange}
              required
              min="1"
              max="1000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-colors"
              placeholder="Enter current bore depth (e.g., 150)"
            />
          </div>

          {/* New Bore Feet */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Wrench className="w-4 h-4" />
              <span>Desired New Depth (feet) *</span>
            </label>
            <input
              type="number"
              name="newBoreFeet"
              value={formData.newBoreFeet}
              onChange={handleInputChange}
              required
              min="1"
              max="1000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-colors"
              placeholder="Enter desired new depth (e.g., 300)"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 text-lg font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Pressing Request"}
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

export default PressingModal;
