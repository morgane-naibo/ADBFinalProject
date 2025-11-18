import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, User, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface OfficeAppointment {
  id: string;
  patientName: string;
  time: string;
  duration: number;
  type: string;
  status: 'scheduled' | 'in-progress' | 'completed';
}

export function DoctorCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [officeAppointments] = useState<OfficeAppointment[]>([
    {
      id: '1',
      patientName: 'Maria Müller',
      time: '08:00',
      duration: 30,
      type: 'Follow-up Consultation',
      status: 'completed'
    },
    {
      id: '2',
      patientName: 'Klaus Becker',
      time: '09:00',
      duration: 45,
      type: 'Initial Consultation',
      status: 'in-progress'
    },
    {
      id: '3',
      patientName: 'Elisabeth Fischer',
      time: '10:00',
      duration: 30,
      type: 'Prescription Renewal',
      status: 'scheduled'
    },
    {
      id: '4',
      patientName: 'Thomas Braun',
      time: '11:00',
      duration: 60,
      type: 'Comprehensive Check-up',
      status: 'scheduled'
    }
  ]);

  const availableSlots = [
    { time: '12:00', duration: 30 },
    { time: '14:00', duration: 45 },
    { time: '15:00', duration: 30 },
    { time: '16:00', duration: 30 }
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('de-DE', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const previousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const nextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-blue-700">Office Calendar</h2>
        <p className="text-gray-600">Manage your office appointments and availability</p>
      </div>

      {/* Date Selector */}
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="flex items-center justify-between">
          <Button onClick={previousDay} variant="outline" size="sm">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-3">
            <CalendarIcon className="w-5 h-5 text-blue-600" />
            <h3 className="text-blue-700">{formatDate(selectedDate)}</h3>
          </div>
          <Button onClick={nextDay} variant="outline" size="sm">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 border-l-4 border-l-blue-500">
          <p className="text-gray-600 text-sm">Total Appointments</p>
          <p className="text-blue-700">{officeAppointments.length}</p>
        </Card>
        <Card className="p-4 border-l-4 border-l-green-500">
          <p className="text-gray-600 text-sm">Completed</p>
          <p className="text-green-700">
            {officeAppointments.filter(a => a.status === 'completed').length}
          </p>
        </Card>
        <Card className="p-4 border-l-4 border-l-orange-500">
          <p className="text-gray-600 text-sm">Remaining</p>
          <p className="text-orange-700">
            {officeAppointments.filter(a => a.status !== 'completed').length}
          </p>
        </Card>
        <Card className="p-4 border-l-4 border-l-purple-500">
          <p className="text-gray-600 text-sm">Available Slots</p>
          <p className="text-purple-700">{availableSlots.length}</p>
        </Card>
      </div>

      {/* Office Appointments */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-green-700">Office Appointments</h3>
          <Button size="sm" className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Appointment
          </Button>
        </div>
        
        <div className="space-y-3">
          {officeAppointments.map((appointment) => (
            <Card key={appointment.id} className={`p-4 ${
              appointment.status === 'completed' ? 'opacity-60' : ''
            }`}>
              <div className="flex items-start gap-4">
                {/* Time */}
                <div className="flex flex-col items-center min-w-[80px]">
                  <Clock className="w-5 h-5 text-blue-600 mb-1" />
                  <span className="text-blue-700">{appointment.time}</span>
                  <span className="text-xs text-gray-500">{appointment.duration} min</span>
                </div>

                {/* Appointment Details */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-green-600" />
                        <h4 className="text-green-700">{appointment.patientName}</h4>
                      </div>
                      <p className="text-gray-900 mt-1">{appointment.type}</p>
                    </div>
                    {appointment.status === 'completed' && (
                      <Badge className="bg-green-500">Completed</Badge>
                    )}
                    {appointment.status === 'in-progress' && (
                      <Badge className="bg-blue-500">In Progress</Badge>
                    )}
                    {appointment.status === 'scheduled' && (
                      <Badge className="bg-gray-500">Scheduled</Badge>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Available Time Slots */}
      <div className="space-y-4">
        <h3 className="text-blue-700">Available Time Slots</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
          {availableSlots.map((slot, index) => (
            <Card key={index} className="p-4 border-2 border-dashed border-gray-300 hover:border-green-500 hover:bg-green-50 transition-colors cursor-pointer">
              <div className="text-center">
                <Clock className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-900">{slot.time}</p>
                <p className="text-xs text-gray-500">{slot.duration} min available</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Office Hours Summary */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-green-50">
        <h3 className="text-blue-700 mb-4">Office Hours Summary</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600">Office Hours</p>
            <p className="text-gray-900">08:00 - 17:00</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Lunch Break</p>
            <p className="text-gray-900">12:00 - 13:00</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Next Available</p>
            <p className="text-green-700">12:00 (30 min)</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
export default DoctorCalendar;