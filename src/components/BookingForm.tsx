import { useState } from 'react';
import { ArrowLeft, Building2, Mail, Phone, Briefcase, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';
import { appointmentStore } from '../lib/appointmentStore';
import type { BookingData } from './BookingSection';

interface BookingFormProps {
  bookingData: BookingData;
  onBack: () => void;
  onComplete: (appointmentId: string) => void;
}

export function BookingForm({ bookingData, onBack, onComplete }: BookingFormProps) {
  const [formData, setFormData] = useState({
    clientName: '',
    companyName: '',
    email: '',
    phone: '',
    businessFocus: '',
    consultancyNeed: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.clientName.trim()) {
      newErrors.clientName = 'Name is required';
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.businessFocus.trim()) {
      newErrors.businessFocus = 'Business focus is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!bookingData.sessionDate) {
      toast.error('Session date is missing');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const confirmedCount = appointmentStore.getConfirmedCountForDate(bookingData.sessionDate!);
      const status = confirmedCount < 20 ? 'confirmed' : 'waitlist';

      const appointment = appointmentStore.addAppointment({
        sessionDate: bookingData.sessionDate!,
        timeSlot: bookingData.timeSlot,
        clientName: formData.clientName,
        companyName: formData.companyName,
        email: formData.email,
        phone: formData.phone,
        businessFocus: formData.businessFocus,
        consultancyNeed: formData.consultancyNeed,
        status
      });

      setIsSubmitting(false);

      if (status === 'confirmed') {
        toast.success('Appointment confirmed!');
      } else {
        toast.info('Added to waitlist');
      }

      onComplete(appointment.id);
    }, 1000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="border-white/10 bg-slate-900/50">
        <CardHeader>
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="flex-1">
              <CardTitle className="text-white">Complete Your Booking</CardTitle>
              <p className="text-white/60 text-sm mt-1">
                {bookingData.sessionDate && formatDate(bookingData.sessionDate)} at {bookingData.timeSlot}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Client Name */}
            <div className="space-y-2">
              <Label htmlFor="clientName" className="text-white flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Your Name *
              </Label>
              <Input
                id="clientName"
                value={formData.clientName}
                onChange={(e) => handleChange('clientName', e.target.value)}
                placeholder="John Doe"
                className={`bg-slate-800/50 border-white/10 text-white ${
                  errors.clientName ? 'border-red-500' : ''
                }`}
              />
              {errors.clientName && (
                <p className="text-red-400 text-sm">{errors.clientName}</p>
              )}
            </div>

            {/* Company Name */}
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-white flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Company Name *
              </Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                placeholder="Acme Inc."
                className={`bg-slate-800/50 border-white/10 text-white ${
                  errors.companyName ? 'border-red-500' : ''
                }`}
              />
              {errors.companyName && (
                <p className="text-red-400 text-sm">{errors.companyName}</p>
              )}
            </div>

            {/* Email & Phone */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="john@example.com"
                  className={`bg-slate-800/50 border-white/10 text-white ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className={`bg-slate-800/50 border-white/10 text-white ${
                    errors.phone ? 'border-red-500' : ''
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Business Focus */}
            <div className="space-y-2">
              <Label htmlFor="businessFocus" className="text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Business Focus/Industry *
              </Label>
              <Input
                id="businessFocus"
                value={formData.businessFocus}
                onChange={(e) => handleChange('businessFocus', e.target.value)}
                placeholder="e.g., E-commerce, SaaS, Healthcare"
                className={`bg-slate-800/50 border-white/10 text-white ${
                  errors.businessFocus ? 'border-red-500' : ''
                }`}
              />
              {errors.businessFocus && (
                <p className="text-red-400 text-sm">{errors.businessFocus}</p>
              )}
            </div>

            {/* Consultancy Need */}
            <div className="space-y-2">
              <Label htmlFor="consultancyNeed" className="text-white flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Brief Description of Consultancy Need (Optional)
              </Label>
              <Textarea
                id="consultancyNeed"
                value={formData.consultancyNeed}
                onChange={(e) => handleChange('consultancyNeed', e.target.value)}
                placeholder="Tell us briefly what you'd like to discuss during the consultancy session..."
                rows={4}
                className="bg-slate-800/50 border-white/10 text-white resize-none"
              />
              <p className="text-white/50 text-sm">
                This helps us prepare for your session
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? 'Booking...' : 'Confirm Booking'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
