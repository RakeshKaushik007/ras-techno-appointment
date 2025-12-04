import { useState } from 'react';
import { CalendarSelector } from './CalendarSelector';
import { BookingForm } from './BookingForm';
import { BookingSuccess } from './BookingSuccess';

export type BookingStep = 'calendar' | 'form' | 'success';

export interface BookingData {
  sessionDate: Date | null;
  timeSlot: string;
}

export function BookingSection() {
  const [step, setStep] = useState<BookingStep>('calendar');
  const [bookingData, setBookingData] = useState<BookingData>({
    sessionDate: null,
    timeSlot: ''
  });
  const [appointmentId, setAppointmentId] = useState<string>('');

  const handleDateAndTimeSelect = (date: Date, timeSlot: string) => {
    setBookingData({ sessionDate: date, timeSlot });
    setStep('form');
  };

  const handleBookingComplete = (id: string) => {
    setAppointmentId(id);
    setStep('success');
  };

  const handleReset = () => {
    setStep('calendar');
    setBookingData({ sessionDate: null, timeSlot: '' });
    setAppointmentId('');
  };

  return (
    <section id="booking" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl text-white mb-4">Book Your Free Consultancy</h2>
        <p className="text-white/70 text-lg">
          Select your preferred date and time slot
        </p>
      </div>

      {step === 'calendar' && (
        <CalendarSelector onSelectDateTime={handleDateAndTimeSelect} />
      )}

      {step === 'form' && (
        <BookingForm
          bookingData={bookingData}
          onBack={() => setStep('calendar')}
          onComplete={handleBookingComplete}
        />
      )}

      {step === 'success' && (
        <BookingSuccess
          appointmentId={appointmentId}
          onBookAnother={handleReset}
        />
      )}
    </section>
  );
}
