import { useState, useRef, useEffect } from 'react';
import { X, User, FileText, Calendar, Clock, Stethoscope, AlertTriangle } from 'lucide-react';
import { patientsList, doctorsList, patientsDatabase } from '../data/mockData';

interface Appointment {
  id: string;
  time: string;
  endTime: string;
  patientName: string;
  address: string;
  notes?: string;
  doctor: string;
}

interface BookingModalProps {
  day: string;
  startTime: string;
  existingAppointments: Appointment[];
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function BookingModal({ day, startTime, existingAppointments, onClose, onSubmit }: BookingModalProps) {
  const [patientName, setPatientName] = useState('');
  const [needs, setNeeds] = useState('');
  const [doctor, setDoctor] = useState('');
  const [endTime, setEndTime] = useState('');
  const [address, setAddress] = useState('');
  const [overlapWarning, setOverlapWarning] = useState<string>('');
  
  const [patientSuggestions, setPatientSuggestions] = useState<string[]>([]);
  const [doctorSuggestions, setDoctorSuggestions] = useState<string[]>([]);
  const [showPatientSuggestions, setShowPatientSuggestions] = useState(false);
  const [showDoctorSuggestions, setShowDoctorSuggestions] = useState(false);

  const patientInputRef = useRef<HTMLInputElement>(null);
  const doctorInputRef = useRef<HTMLInputElement>(null);

  // Check for overlapping appointments
  const checkOverlap = (proposedEndTime: string) => {
    if (!proposedEndTime) {
      setOverlapWarning('');
      return false;
    }

    for (const apt of existingAppointments) {
      // Check if times overlap
      // Overlap occurs if:
      // 1. New appointment starts before existing ends AND new appointment ends after existing starts
      const newStart = startTime;
      const newEnd = proposedEndTime;
      const existingStart = apt.time;
      const existingEnd = apt.endTime;

      if (
        (newStart < existingEnd && newEnd > existingStart) ||
        (newStart === existingStart) ||
        (newEnd === existingEnd)
      ) {
        setOverlapWarning(
          `This appointment overlaps with ${apt.patientName}'s appointment (${existingStart} - ${existingEnd})`
        );
        return true;
      }
    }

    setOverlapWarning('');
    return false;
  };

  // Filter patient suggestions
  useEffect(() => {
    if (patientName) {
      const filtered = patientsList.filter((name) =>
        name.toLowerCase().includes(patientName.toLowerCase())
      );
      setPatientSuggestions(filtered);
    } else {
      setPatientSuggestions(patientsList);
    }
  }, [patientName]);

  // Auto-fill address when patient is selected
  useEffect(() => {
    if (patientName && patientsDatabase[patientName]) {
      setAddress(patientsDatabase[patientName].address);
    }
  }, [patientName]);

  // Filter doctor suggestions
  useEffect(() => {
    if (doctor) {
      const filtered = doctorsList.filter((name) =>
        name.toLowerCase().includes(doctor.toLowerCase())
      );
      setDoctorSuggestions(filtered);
    } else {
      setDoctorSuggestions(doctorsList);
    }
  }, [doctor]);

  // Check for overlaps when end time changes
  useEffect(() => {
    if (endTime) {
      checkOverlap(endTime);
    }
  }, [endTime, existingAppointments]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !endTime || !doctor) {
      alert('Please fill in all required fields');
      return;
    }

    // Check for overlaps one more time before submitting
    if (checkOverlap(endTime)) {
      return;
    }

    onSubmit({
      day,
      startTime,
      endTime,
      patientName,
      needs,
      doctor,
      address,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2>Book Appointment</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Day and Start Time (read-only) */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Day
                </label>
                <input
                  type="text"
                  value={day}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Start Time
                </label>
                <input
                  type="text"
                  value={startTime}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
            </div>

            {/* End Time */}
            <div>
              <label className="block text-sm mb-2 text-gray-700">
                <Clock className="w-4 h-4 inline mr-2" />
                Estimated End Time *
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  overlapWarning
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                required
              />
              {overlapWarning && (
                <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">{overlapWarning}</p>
                </div>
              )}
            </div>

            {/* Patient Name with Autocomplete */}
            <div className="relative">
              <label className="block text-sm mb-2 text-gray-700">
                <User className="w-4 h-4 inline mr-2" />
                Patient Name *
              </label>
              <input
                ref={patientInputRef}
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                onFocus={() => setShowPatientSuggestions(true)}
                onBlur={() => setTimeout(() => setShowPatientSuggestions(false), 200)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Start typing patient name..."
                required
              />
              {showPatientSuggestions && patientSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {patientSuggestions.map((name) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => {
                        setPatientName(name);
                        setShowPatientSuggestions(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors"
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm mb-2 text-gray-700">
                Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Patient address (optional)"
              />
            </div>

            {/* Doctor with Autocomplete */}
            <div className="relative">
              <label className="block text-sm mb-2 text-gray-700">
                <Stethoscope className="w-4 h-4 inline mr-2" />
                Assigned Doctor *
              </label>
              <input
                ref={doctorInputRef}
                type="text"
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                onFocus={() => setShowDoctorSuggestions(true)}
                onBlur={() => setTimeout(() => setShowDoctorSuggestions(false), 200)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Start typing doctor name..."
                required
              />
              {showDoctorSuggestions && doctorSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {doctorSuggestions.map((name) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => {
                        setDoctor(name);
                        setShowDoctorSuggestions(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors"
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Patient Needs */}
            <div>
              <label className="block text-sm mb-2 text-gray-700">
                <FileText className="w-4 h-4 inline mr-2" />
                Patient Needs / Notes
              </label>
              <textarea
                value={needs}
                onChange={(e) => setNeeds(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Enter patient needs, symptoms, or special requirements..."
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!!overlapWarning}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                overlapWarning
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
