import { useState } from 'react';
import { timeSlots } from '../data/mockData';
import { Clock, MapPin, User, CheckCircle, Circle } from 'lucide-react';
import { BookingModal } from './BookingModal.tsx';

interface Appointment {
  id: string;
  time: string;
  endTime: string;
  patientName: string;
  address: string;
  notes?: string;
  doctor: string;
}

interface SchedulePageProps {
  appointments: Record<string, Appointment[]>;
  setAppointments: React.Dispatch<React.SetStateAction<Record<string, Appointment[]>>>;
}

export function SchedulePage({ appointments, setAppointments }: SchedulePageProps) {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; time: string } | null>(null);
  
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const currentAppointments = appointments[selectedDay];

  // Check if a time slot is booked
  const isSlotBooked = (time: string) => {
    return currentAppointments.some((apt) => {
      const aptStart = apt.time;
      const aptEnd = apt.endTime;
      return time >= aptStart && time < aptEnd;
    });
  };

  // Get appointment for a specific time slot
  const getAppointmentAtSlot = (time: string) => {
    return currentAppointments.find((apt) => apt.time === time);
  };

  // Get appointment that covers a specific time slot (even if it doesn't start there)
  const getAppointmentCoveringSlot = (time: string) => {
    return currentAppointments.find((apt) => {
      const aptStart = apt.time;
      const aptEnd = apt.endTime;
      return time >= aptStart && time < aptEnd;
    });
  };

  // Handle clicking on a free slot
  const handleSlotClick = (time: string) => {
    if (!isSlotBooked(time)) {
      setSelectedSlot({ day: selectedDay, time });
      setBookingModalOpen(true);
    }
  };

  // Handle booking submission
  const handleBookingSubmit = (bookingData: any) => {
    const newAppointment = {
      id: `${selectedDay[0].toLowerCase()}${Date.now()}`,
      time: bookingData.startTime,
      endTime: bookingData.endTime,
      patientName: bookingData.patientName,
      address: bookingData.address,
      notes: bookingData.needs,
      doctor: bookingData.doctor,
    };

    setAppointments((prev) => ({
      ...prev,
      [bookingData.day]: [...prev[bookingData.day], newAppointment].sort((a, b) => 
        a.time.localeCompare(b.time)
      ),
    }));

    setBookingModalOpen(false);
    setSelectedSlot(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="mb-6">Weekly Schedule</h1>
      
      {/* Day selector */}
      <div className="mb-8 flex flex-wrap gap-2">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedDay === day
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Schedule content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 bg-blue-50 border-b border-gray-200">
          <h2>{selectedDay}</h2>
          <p className="text-gray-600 mt-1">
            {currentAppointments.length} appointments booked
          </p>
        </div>
        
        <div className="divide-y divide-gray-200">
          {timeSlots.map((time) => {
            const isBooked = isSlotBooked(time);
            const appointment = getAppointmentAtSlot(time);
            const coveringAppointment = getAppointmentCoveringSlot(time);
            
            return (
              <div
                key={time}
                onClick={() => handleSlotClick(time)}
                className={`p-6 transition-colors ${
                  isBooked
                    ? 'bg-white'
                    : 'bg-green-50 hover:bg-green-100 cursor-pointer'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-3 min-w-[140px]">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-900">{time}</span>
                    {isBooked ? (
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                  
                  {appointment ? (
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <h3 className="text-gray-900">{appointment.patientName}</h3>
                      </div>
                      <div className="flex items-start gap-2 text-gray-600 mb-2">
                        <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                        <span className="text-sm">{appointment.address}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="inline-block mr-4">
                          <strong>Doctor:</strong> {appointment.doctor}
                        </span>
                        <span className="inline-block">
                          <strong>Duration:</strong> {appointment.time} - {appointment.endTime}
                        </span>
                      </div>
                      {appointment.notes && (
                        <p className="text-gray-500 mt-2 text-sm">{appointment.notes}</p>
                      )}
                    </div>
                  ) : isBooked && coveringAppointment ? (
                    <div className="flex-1">
                      <span className="text-gray-500 italic">
                        Occupied by {coveringAppointment.patientName}'s appointment ({coveringAppointment.time} - {coveringAppointment.endTime})
                      </span>
                    </div>
                  ) : (
                    <div className="flex-1">
                      <span className="text-green-700">Available - Click to book</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Booking Modal */}
      {bookingModalOpen && selectedSlot && (
        <BookingModal
          day={selectedSlot.day}
          startTime={selectedSlot.time}
          existingAppointments={appointments[selectedSlot.day]}
          onClose={() => {
            setBookingModalOpen(false);
            setSelectedSlot(null);
          }}
          onSubmit={handleBookingSubmit}
        />
      )}
    </div>
  );
}
