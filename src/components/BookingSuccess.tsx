import { CheckCircle2, Calendar, Mail, Phone, Download, Clock } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { appointmentStore } from '../lib/appointmentStore';

interface BookingSuccessProps {
  appointmentId: string;
  onBookAnother: () => void;
}

export function BookingSuccess({ appointmentId, onBookAnother }: BookingSuccessProps) {
  // Get the appointment details to check if it's waitlist
  const appointments = appointmentStore.getAppointments();
  const appointment = appointments.find(apt => apt.id === appointmentId);
  const isWaitlist = appointment?.status === 'waitlist';

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-white/10 bg-slate-900/50 text-center">
        <CardContent className="pt-12 pb-12 px-6">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className={`w-20 h-20 rounded-full ${isWaitlist ? 'bg-yellow-600/20' : 'bg-green-600/20'} flex items-center justify-center`}>
              {isWaitlist ? (
                <Clock className="w-12 h-12 text-yellow-400" />
              ) : (
                <CheckCircle2 className="w-12 h-12 text-green-400" />
              )}
            </div>
          </div>

          {/* Success Message */}
          <h2 className="text-3xl text-white mb-4">
            {isWaitlist ? 'Added to Waitlist! ⏳' : 'Booking Confirmed! 🎉'}
          </h2>
          
          <p className="text-white/70 text-lg mb-2">
            {isWaitlist 
              ? 'You\'ve been added to the waitlist for this session.'
              : 'Your appointment has been successfully scheduled.'
            }
          </p>
          
          <p className="text-white/50 mb-8">
            Booking ID: <span className="text-blue-400 font-mono">{appointmentId}</span>
          </p>

          {/* Waitlist Notice */}
          {isWaitlist && (
            <div className="bg-yellow-950/30 border border-yellow-600/30 rounded-lg p-4 mb-8">
              <p className="text-yellow-200">
                This session is currently full. You'll be automatically notified if a slot becomes available.
              </p>
            </div>
          )}

          {/* Information Cards */}
          <div className="space-y-4 mb-8 text-left">
            <div className="bg-blue-950/30 border border-blue-600/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white">Confirmation Email Sent</p>
                  <p className="text-white/60 text-sm mt-1">
                    {isWaitlist 
                      ? 'Check your inbox for waitlist confirmation'
                      : 'Check your inbox for appointment details and calendar invite'
                    }
                  </p>
                </div>
              </div>
            </div>

            {!isWaitlist && (
              <div className="bg-purple-950/30 border border-purple-600/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white">Reminder Notification</p>
                    <p className="text-white/60 text-sm mt-1">
                      You'll receive a reminder 24 hours before your appointment
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-pink-950/30 border border-pink-600/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white">Need to Reschedule?</p>
                  <p className="text-white/60 text-sm mt-1">
                    Contact us at support@rastechno.com or call +1 (555) 123-4567
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onBookAnother}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-6 shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 transition-all hover:scale-105"
            >
              Book Another Appointment
            </Button>
            
            <Button
              variant="outline"
              className="border-white/10 bg-white/5 text-white hover:bg-white/10 px-8 py-6"
              onClick={() => window.print()}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Details
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-white/50 text-sm">
              {isWaitlist
                ? 'We\'ll contact you immediately if a slot opens up. Thank you for your patience!'
                : 'Prepare for your session by listing key challenges and questions. Our team will reach out if we need any additional information.'
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}