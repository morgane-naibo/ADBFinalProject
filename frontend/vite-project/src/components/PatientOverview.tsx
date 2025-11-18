import { useState } from 'react';
import { User, Search, Calendar, FileText, Activity, Edit, Save, X } from 'lucide-react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { toast } from 'sonner';

interface MedicalHistory {
  id: string;
  date: string;
  diagnosis: string;
  treatment: string;
  notes: string;
}

interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  insuranceNumber: string;
  phone: string;
  email: string;
  address: string;
  bloodType: string;
  allergies: string;
  chronicConditions: string;
  medicalHistory: MedicalHistory[];
  lastVisit: string;
  nextAppointment: string;
}

export function PatientOverview() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPatient, setEditedPatient] = useState<Patient | null>(null);
  const [patients] = useState<Patient[]>([
    {
      id: 'A123456789',
      name: 'Maria Müller',
      dateOfBirth: '1965-05-15',
      insuranceNumber: 'A123456789',
      phone: '+49 151 12345678',
      email: 'maria.mueller@email.de',
      address: 'Hauptstraße 123, 10115 Berlin',
      bloodType: 'A+',
      allergies: 'Penicillin',
      chronicConditions: 'Hypertension, Type 2 Diabetes',
      lastVisit: '2025-11-10',
      nextAppointment: '2025-11-15',
      medicalHistory: [
        {
          id: '1',
          date: '2025-11-10',
          diagnosis: 'Routine Check-up',
          treatment: 'Blood pressure monitoring',
          notes: 'BP: 135/85. Continue current medication.'
        },
        {
          id: '2',
          date: '2025-10-20',
          diagnosis: 'Diabetes Follow-up',
          treatment: 'Glucose level check',
          notes: 'HbA1c: 7.2%. Adjusted insulin dosage.'
        }
      ]
    },
    {
      id: 'B987654321',
      name: 'Hans Schmidt',
      dateOfBirth: '1958-08-22',
      insuranceNumber: 'B987654321',
      phone: '+49 152 98765432',
      email: 'hans.schmidt@email.de',
      address: 'Berliner Str. 45, 10715 Berlin',
      bloodType: 'O-',
      allergies: 'None',
      chronicConditions: 'Arthritis',
      lastVisit: '2025-11-08',
      nextAppointment: '2025-11-18',
      medicalHistory: [
        {
          id: '1',
          date: '2025-11-08',
          diagnosis: 'Wound Care',
          treatment: 'Surgical wound dressing',
          notes: 'Wound healing well. Continue antibiotics.'
        }
      ]
    },
    {
      id: 'C456789123',
      name: 'Anna Weber',
      dateOfBirth: '1972-03-10',
      insuranceNumber: 'C456789123',
      phone: '+49 160 45678912',
      email: 'anna.weber@email.de',
      address: 'Gartenweg 12, 10625 Berlin',
      bloodType: 'B+',
      allergies: 'Latex, Aspirin',
      chronicConditions: 'Asthma',
      lastVisit: '2025-11-05',
      nextAppointment: '2025-11-20',
      medicalHistory: [
        {
          id: '1',
          date: '2025-11-05',
          diagnosis: 'Asthma Management',
          treatment: 'Inhaler prescription renewal',
          notes: 'Symptoms controlled. Continue current treatment.'
        }
      ]
    }
  ]);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.insuranceNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePatientClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setEditedPatient(patient);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditedPatient(selectedPatient);
    }
  };

  const handleSave = () => {
    if (editedPatient) {
      setSelectedPatient(editedPatient);
      setIsEditing(false);
      toast.success('Patient information updated successfully');
    }
  };

  const handleCancel = () => {
    setEditedPatient(selectedPatient);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-blue-700">Patient Overview</h2>
        <p className="text-gray-600">View and manage patient medical records</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search by name or insurance number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Patient List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPatients.map((patient) => (
          <Card
            key={patient.id}
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-l-blue-500"
            onClick={() => handlePatientClick(patient)}
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-green-700 truncate">{patient.name}</h3>
                <p className="text-sm text-gray-600">ID: {patient.insuranceNumber}</p>
                <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>Next: {new Date(patient.nextAppointment).toLocaleDateString('de-DE')}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Patient Detail Dialog */}
      <Dialog open={!!selectedPatient} onOpenChange={(open) => !open && setSelectedPatient(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Patient Medical Record</span>
              {!isEditing ? (
                <Button onClick={handleEditToggle} size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={handleSave} size="sm" className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button onClick={handleCancel} size="sm" variant="outline">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </DialogTitle>
          </DialogHeader>

          {editedPatient && (
            <div className="space-y-6 mt-4">
              {/* Patient Info */}
              <Card className="p-4 bg-gradient-to-r from-blue-50 to-green-50">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    {isEditing ? (
                      <Input
                        value={editedPatient.name}
                        onChange={(e) => setEditedPatient({ ...editedPatient, name: e.target.value })}
                        className="mb-2"
                      />
                    ) : (
                      <h3 className="text-green-700">{editedPatient.name}</h3>
                    )}
                    <p className="text-gray-600">ID: {editedPatient.insuranceNumber}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-gray-600">Date of Birth</Label>
                    {isEditing ? (
                      <Input
                        type="date"
                        value={editedPatient.dateOfBirth}
                        onChange={(e) => setEditedPatient({ ...editedPatient, dateOfBirth: e.target.value })}
                      />
                    ) : (
                      <p className="text-gray-900">{new Date(editedPatient.dateOfBirth).toLocaleDateString('de-DE')}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-gray-600">Blood Type</Label>
                    {isEditing ? (
                      <Input
                        value={editedPatient.bloodType}
                        onChange={(e) => setEditedPatient({ ...editedPatient, bloodType: e.target.value })}
                      />
                    ) : (
                      <Badge className="bg-red-500">{editedPatient.bloodType}</Badge>
                    )}
                  </div>
                  <div>
                    <Label className="text-gray-600">Last Visit</Label>
                    <p className="text-gray-900">{new Date(editedPatient.lastVisit).toLocaleDateString('de-DE')}</p>
                  </div>
                </div>
              </Card>

              {/* Contact Information */}
              <div>
                <h3 className="text-blue-700 mb-3">Contact Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Phone</Label>
                    {isEditing ? (
                      <Input
                        value={editedPatient.phone}
                        onChange={(e) => setEditedPatient({ ...editedPatient, phone: e.target.value })}
                      />
                    ) : (
                      <p className="text-gray-900">{editedPatient.phone}</p>
                    )}
                  </div>
                  <div>
                    <Label>Email</Label>
                    {isEditing ? (
                      <Input
                        value={editedPatient.email}
                        onChange={(e) => setEditedPatient({ ...editedPatient, email: e.target.value })}
                      />
                    ) : (
                      <p className="text-gray-900">{editedPatient.email}</p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <Label>Address</Label>
                    {isEditing ? (
                      <Input
                        value={editedPatient.address}
                        onChange={(e) => setEditedPatient({ ...editedPatient, address: e.target.value })}
                      />
                    ) : (
                      <p className="text-gray-900">{editedPatient.address}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div>
                <h3 className="text-green-700 mb-3">Medical Information</h3>
                <div className="space-y-4">
                  <div>
                    <Label>Allergies</Label>
                    {isEditing ? (
                      <Input
                        value={editedPatient.allergies}
                        onChange={(e) => setEditedPatient({ ...editedPatient, allergies: e.target.value })}
                      />
                    ) : (
                      <p className="text-red-600">{editedPatient.allergies}</p>
                    )}
                  </div>
                  <div>
                    <Label>Chronic Conditions</Label>
                    {isEditing ? (
                      <Textarea
                        value={editedPatient.chronicConditions}
                        onChange={(e) => setEditedPatient({ ...editedPatient, chronicConditions: e.target.value })}
                        rows={2}
                      />
                    ) : (
                      <p className="text-gray-900">{editedPatient.chronicConditions}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Medical History */}
              <div>
                <h3 className="text-blue-700 mb-3 flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Medical History
                </h3>
                <div className="space-y-3">
                  {editedPatient.medicalHistory.map((entry) => (
                    <Card key={entry.id} className="p-4 border-l-4 border-l-green-500">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <span className="text-blue-700">
                            {new Date(entry.date).toLocaleDateString('de-DE')}
                          </span>
                        </div>
                        <FileText className="w-4 h-4 text-gray-400" />
                      </div>
                      <h4 className="text-green-700 mb-1">{entry.diagnosis}</h4>
                      <p className="text-sm text-gray-600 mb-2">Treatment: {entry.treatment}</p>
                      <p className="text-sm text-gray-500 bg-gray-50 p-2 rounded">{entry.notes}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default PatientOverview;