// Mock data store for appointments (in production, this would connect to a database)

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  sessionDate: Date;
  timeSlot: string;
  clientName: string;
  companyName: string;
  email: string;
  phone: string;
  businessFocus: string;
  consultancyNeed?: string;
  status: 'confirmed' | 'waitlist';
  createdAt: Date;
}

// Generate the next two Saturdays from today
export function getNextTwoSaturdays(): Date[] {
  const saturdays: Date[] = [];
  const today = new Date();
  let currentDate = new Date(today);
  
  // Find next Saturday
  const daysUntilSaturday = (6 - currentDate.getDay() + 7) % 7;
  currentDate.setDate(currentDate.getDate() + (daysUntilSaturday === 0 ? 7 : daysUntilSaturday));
  saturdays.push(new Date(currentDate));
  
  // Get second Saturday
  currentDate.setDate(currentDate.getDate() + 7);
  saturdays.push(new Date(currentDate));
  
  return saturdays;
}

// Generate time slots for a session
export function generateTimeSlots(): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const times = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
  ];
  
  times.forEach((time, index) => {
    slots.push({
      id: `slot-${index}`,
      time,
      available: true
    });
  });
  
  return slots;
}

// In-memory storage (in production, use a real database)
class AppointmentStore {
  private appointments: Appointment[] = [];
  private nextId = 1;

  addAppointment(appointment: Omit<Appointment, 'id' | 'createdAt'>): Appointment {
    const newAppointment: Appointment = {
      ...appointment,
      id: `apt-${this.nextId++}`,
      createdAt: new Date()
    };
    this.appointments.push(newAppointment);
    return newAppointment;
  }

  getAppointments(): Appointment[] {
    return [...this.appointments];
  }

  getAppointmentsByDate(date: Date): Appointment[] {
    return this.appointments.filter(apt => 
      apt.sessionDate.toDateString() === date.toDateString()
    );
  }

  getConfirmedCountForDate(date: Date): number {
    return this.appointments.filter(apt => 
      apt.sessionDate.toDateString() === date.toDateString() &&
      apt.status === 'confirmed'
    ).length;
  }

  getWaitlistForDate(date: Date): Appointment[] {
    return this.appointments.filter(apt => 
      apt.sessionDate.toDateString() === date.toDateString() &&
      apt.status === 'waitlist'
    );
  }

  deleteAppointment(id: string): boolean {
    const index = this.appointments.findIndex(apt => apt.id === id);
    if (index !== -1) {
      this.appointments.splice(index, 1);
      return true;
    }
    return false;
  }

  clearAll(): void {
    this.appointments = [];
    this.nextId = 1;
  }
}

export const appointmentStore = new AppointmentStore();
