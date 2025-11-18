import { useState } from 'react';
import { Calendar, Clock, Plus, CheckCircle, XCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';

interface Appointment {
  id: string;
  date: string;
  time: string;
  service: string;
  nurse: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  notes?: string;
}

export function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      date: '2025-11-15',
      time: '09:00',
      service: 'General Check-up',
      nurse: 'Nurse Anna Schmidt',
      status: 'confirmed',
      notes: 'Blood pressure monitoring'
    },
    {
      id: '2',
      date: '2025-11-18',
      time: '14:30',
      service: 'Wound Care',
      nurse: 'Nurse Michael Weber',
      status: 'pending'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    date: '',
    time: '',
    service: '',
    notes: ''
  });

  const handleCreateAppointment = () => {
    const appointment: Appointment = {
      id: Date.now().toString(),
      date: newAppointment.date,
      time: newAppointment.time,
      service: newAppointment.service,
      nurse: 'To be assigned',
      status: 'pending',
      notes: newAppointment.notes
    };
    setAppointments([...appointments, appointment]);
    setIsDialogOpen(false);
    setNewAppointment({ date: '', time: '', service: '', notes: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-green-700">Your Appointments</h2>
          <p className="text-gray-600">Manage your nursing care appointments</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              New Appointment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Book New Appointment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newAppointment.date}
                  onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="service">Service Type</Label>
                <Select
                  value={newAppointment.service}
                  onValueChange={(value) => setNewAppointment({ ...newAppointment, service: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General Check-up">General Check-up</SelectItem>
                    <SelectItem value="Wound Care">Wound Care</SelectItem>
                    <SelectItem value="Medication Management">Medication Management</SelectItem>
                    <SelectItem value="Blood Tests">Blood Tests</SelectItem>
                    <SelectItem value="Physical Therapy">Physical Therapy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Any special requirements..."
                  value={newAppointment.notes}
                  onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                />
              </div>
              <Button onClick={handleCreateAppointment} className="w-full bg-green-600 hover:bg-green-700">
                Book Appointment
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="p-4 border-l-4 border-l-green-500">
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <span className="text-gray-900">{new Date(appointment.date).toLocaleDateString('de-DE')}</span>
                  <Clock className="w-5 h-5 text-blue-600 ml-4" />
                  <span className="text-gray-900">{appointment.time}</span>
                </div>
                <h3 className="text-green-700">{appointment.service}</h3>
                <p className="text-gray-600">{appointment.nurse}</p>
                {appointment.notes && (
                  <p className="text-gray-500 text-sm">Note: {appointment.notes}</p>
                )}
              </div>
              <div>
                {appointment.status === 'confirmed' && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm">Confirmed</span>
                  </div>
                )}
                {appointment.status === 'pending' && (
                  <div className="flex items-center gap-2 text-blue-600">
                    <Clock className="w-5 h-5" />
                    <span className="text-sm">Pending</span>
                  </div>
                )}
                {appointment.status === 'cancelled' && (
                  <div className="flex items-center gap-2 text-red-600">
                    <XCircle className="w-5 h-5" />
                    <span className="text-sm">Cancelled</span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
export default Appointments;
