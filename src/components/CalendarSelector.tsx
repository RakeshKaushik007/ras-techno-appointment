import { useState } from 'react';
import { Calendar, Clock, Users, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { getNextTwoSaturdays, generateTimeSlots, appointmentStore } from '../lib/appointmentStore';

interface CalendarSelectorProps {
  onSelectDateTime: (date: Date, timeSlot: string) => void;
}

export function CalendarSelector({ onSelectDateTime }: CalendarSelectorProps) {
  const saturdays = getNextTwoSaturdays();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const timeSlots = generateTimeSlots();

  const getAvailableSlotsCount = (date: Date) => {
    const confirmedCount = appointmentStore.getConfirmedCountForDate(date);
    return Math.max(0, 20 - confirmedCount);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      onSelectDateTime(selectedDate, selectedTime);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Session Selection */}
      <div className="grid md:grid-cols-2 gap-6">
        {saturdays.map((saturday, index) => {
          const availableSlots = getAvailableSlotsCount(saturday);
          const isSelected = selectedDate?.toDateString() === saturday.toDateString();
          const isFull = availableSlots === 0;

          return (
            <Card
              key={index}
              className={`cursor-pointer transition-all border-2 ${
                isSelected
                  ? 'border-blue-500 bg-blue-950/50 shadow-lg shadow-blue-500/20'
                  : isFull
                  ? 'border-white/10 bg-slate-900/50 opacity-60 cursor-not-allowed'
                  : 'border-white/10 bg-slate-900/50 hover:border-blue-500/50'
              }`}
              onClick={() => !isFull && setSelectedDate(saturday)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-blue-600/20 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <CardTitle className="text-white">Session {index + 1}</CardTitle>
                      <p className="text-white/60 text-sm mt-1">{formatDate(saturday)}</p>
                    </div>
                  </div>
                  {isFull ? (
                    <Badge variant="destructive" className="bg-red-600/20 text-red-400 border-red-600/30">
                      Full
                    </Badge>
                  ) : (
                    <Badge className="bg-green-600/20 text-green-400 border-green-600/30">
                      {availableSlots} slots left
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-white/70">
                  <Users className="w-4 h-4" />
                  <span>{isFull ? 'Waitlist only' : 'Free consultancy available'}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Time Slot Selection */}
      {selectedDate && (
        <Card className="border-white/10 bg-slate-900/50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-purple-400" />
              <CardTitle className="text-white">Select Time Slot</CardTitle>
            </div>
            <p className="text-white/60">
              Choose your preferred time for {formatDate(selectedDate)}
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => setSelectedTime(slot.time)}
                  className={`p-3 rounded-lg border-2 transition-all text-center ${
                    selectedTime === slot.time
                      ? 'border-purple-500 bg-purple-950/50 text-white'
                      : 'border-white/10 bg-slate-800/50 text-white/70 hover:border-purple-500/50 hover:text-white'
                  }`}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Info Alert */}
      {selectedDate && getAvailableSlotsCount(selectedDate) === 0 && (
        <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-yellow-200">This session is full</p>
            <p className="text-yellow-200/70 text-sm mt-1">
              You'll be added to the waitlist and notified if a slot becomes available.
            </p>
          </div>
        </div>
      )}

      {/* Continue Button */}
      {selectedDate && selectedTime && (
        <div className="flex justify-center pt-4">
          <Button
            onClick={handleContinue}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-6 shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 transition-all hover:scale-105"
          >
            Continue to Booking Form
          </Button>
        </div>
      )}
    </div>
  );
}
