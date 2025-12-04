import { useState, useEffect } from 'react';
import { Calendar, Users, TrendingUp, Download, Trash2, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { appointmentStore, getNextTwoSaturdays, type Appointment } from '../lib/appointmentStore';
import { toast } from 'sonner@2.0.3';

export function AdminDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedSession, setSelectedSession] = useState<Date | null>(null);
  const saturdays = getNextTwoSaturdays();

  // Refresh appointments
  const refreshAppointments = () => {
    setAppointments(appointmentStore.getAppointments());
  };

  useEffect(() => {
    refreshAppointments();
    // Set first Saturday as default
    if (saturdays.length > 0) {
      setSelectedSession(saturdays[0]);
    }
  }, []);

  const handleDeleteAppointment = (id: string) => {
    if (confirm('Are you sure you want to delete this appointment?')) {
      appointmentStore.deleteAppointment(id);
      refreshAppointments();
      toast.success('Appointment deleted');
    }
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all appointments? This cannot be undone.')) {
      appointmentStore.clearAll();
      refreshAppointments();
      toast.success('All appointments cleared');
    }
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Date', 'Time', 'Name', 'Company', 'Email', 'Phone', 'Business Focus', 'Status'];
    const rows = appointments.map(apt => [
      apt.id,
      apt.sessionDate.toLocaleDateString(),
      apt.timeSlot,
      apt.clientName,
      apt.companyName,
      apt.email,
      apt.phone,
      apt.businessFocus,
      apt.status
    ]);
    
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'appointments.csv';
    a.click();
    
    toast.success('Appointments exported');
  };

  // Calculate statistics
  const totalAppointments = appointments.length;
  const confirmedAppointments = appointments.filter(apt => apt.status === 'confirmed').length;
  const waitlistAppointments = appointments.filter(apt => apt.status === 'waitlist').length;

  // Get appointments for selected session
  const sessionAppointments = selectedSession
    ? appointments.filter(apt => apt.sessionDate.toDateString() === selectedSession.toDateString())
    : [];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Get analytics by industry
  const industryCount = appointments.reduce((acc, apt) => {
    const industry = apt.businessFocus;
    acc[industry] = (acc[industry] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topIndustries = Object.entries(industryCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl text-white mb-2">Admin Dashboard</h1>
        <p className="text-white/60">Manage appointments and view analytics</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="border-white/10 bg-slate-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-white text-sm">Total Bookings</CardTitle>
            <Calendar className="w-4 h-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-white">{totalAppointments}</div>
            <p className="text-white/60 text-xs mt-1">Across all sessions</p>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-slate-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-white text-sm">Confirmed</CardTitle>
            <Users className="w-4 h-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-white">{confirmedAppointments}</div>
            <p className="text-white/60 text-xs mt-1">Slots filled</p>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-slate-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-white text-sm">Waitlist</CardTitle>
            <Clock className="w-4 h-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-white">{waitlistAppointments}</div>
            <p className="text-white/60 text-xs mt-1">Pending slots</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="appointments" className="space-y-6">
        <TabsList className="bg-slate-900/50 border border-white/10">
          <TabsTrigger value="appointments" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Appointments
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="appointments" className="space-y-6">
          {/* Session Selector */}
          <Card className="border-white/10 bg-slate-900/50">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle className="text-white">Appointment List</CardTitle>
                <div className="flex flex-wrap gap-2">
                  {saturdays.map((saturday, index) => {
                    const count = appointmentStore.getConfirmedCountForDate(saturday);
                    const isSelected = selectedSession?.toDateString() === saturday.toDateString();
                    
                    return (
                      <button
                        key={index}
                        onClick={() => setSelectedSession(saturday)}
                        className={`px-4 py-2 rounded-lg border transition-all ${
                          isSelected
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'bg-slate-800/50 border-white/10 text-white/70 hover:border-blue-500/50'
                        }`}
                      >
                        Session {index + 1} ({count}/20)
                      </button>
                    );
                  })}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {selectedSession && (
                <div className="mb-4">
                  <p className="text-white/60">{formatDate(selectedSession)}</p>
                  <p className="text-white/40 text-sm mt-1">
                    {sessionAppointments.length} total bookings
                  </p>
                </div>
              )}

              {sessionAppointments.length === 0 ? (
                <div className="text-center py-12 text-white/60">
                  No appointments for this session yet
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/10">
                        <TableHead className="text-white/70">Time</TableHead>
                        <TableHead className="text-white/70">Name</TableHead>
                        <TableHead className="text-white/70">Company</TableHead>
                        <TableHead className="text-white/70">Contact</TableHead>
                        <TableHead className="text-white/70">Industry</TableHead>
                        <TableHead className="text-white/70">Status</TableHead>
                        <TableHead className="text-white/70">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sessionAppointments.map((apt) => (
                        <TableRow key={apt.id} className="border-white/10">
                          <TableCell className="text-white/90">{apt.timeSlot}</TableCell>
                          <TableCell className="text-white/90">{apt.clientName}</TableCell>
                          <TableCell className="text-white/90">{apt.companyName}</TableCell>
                          <TableCell className="text-white/70 text-sm">
                            <div>{apt.email}</div>
                            <div className="text-white/50">{apt.phone}</div>
                          </TableCell>
                          <TableCell className="text-white/90">{apt.businessFocus}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                apt.status === 'confirmed'
                                  ? 'bg-green-600/20 text-green-400 border-green-600/30'
                                  : 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30'
                              }
                            >
                              {apt.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteAppointment(apt.id)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-950/30"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={exportToCSV}
              disabled={appointments.length === 0}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Export to CSV
            </Button>
            <Button
              onClick={handleClearAll}
              disabled={appointments.length === 0}
              variant="outline"
              className="border-red-600/30 text-red-400 hover:bg-red-950/30"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card className="border-white/10 bg-slate-900/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                <CardTitle className="text-white">Top Industries</CardTitle>
              </div>
              <p className="text-white/60 text-sm">Companies booking consultancy by industry</p>
            </CardHeader>
            <CardContent>
              {topIndustries.length === 0 ? (
                <div className="text-center py-12 text-white/60">
                  No data available yet
                </div>
              ) : (
                <div className="space-y-4">
                  {topIndustries.map(([industry, count], index) => (
                    <div key={industry}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white/90">{industry}</span>
                        <span className="text-white/60">{count} bookings</span>
                      </div>
                      <div className="w-full bg-slate-800/50 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all"
                          style={{ width: `${(count / totalAppointments) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Session Comparison */}
          <div className="grid md:grid-cols-2 gap-6">
            {saturdays.map((saturday, index) => {
              const confirmedCount = appointmentStore.getConfirmedCountForDate(saturday);
              const waitlistCount = appointmentStore.getWaitlistForDate(saturday).length;
              
              return (
                <Card key={index} className="border-white/10 bg-slate-900/50">
                  <CardHeader>
                    <CardTitle className="text-white">Session {index + 1}</CardTitle>
                    <p className="text-white/60 text-sm">{formatDate(saturday)}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Confirmed Slots</span>
                      <span className="text-2xl text-white">{confirmedCount}/20</span>
                    </div>
                    <div className="w-full bg-slate-800/50 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-green-600 to-emerald-600 h-3 rounded-full transition-all"
                        style={{ width: `${(confirmedCount / 20) * 100}%` }}
                      />
                    </div>
                    {waitlistCount > 0 && (
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-white/70">Waitlist</span>
                        <span className="text-lg text-yellow-400">{waitlistCount}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
