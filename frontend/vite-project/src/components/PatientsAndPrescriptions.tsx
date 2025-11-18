import { useState } from 'react';
import { User, Search, Calendar, FileText, Activity, Edit, Save, X, Plus } from 'lucide-react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner';

interface MedicalHistory {
  id: string;
  date: string;
  diagnosis: string;
  treatment: string;
  notes: string;
}

interface Prescription {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes: string;
  createdDate: string;
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
  prescriptions: Prescription[];
  lastVisit: string;
  nextAppointment: string;
}

export function PatientsAndPrescriptions() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPatient, setEditedPatient] = useState<Patient | null>(null);
  const [isAddingPrescription, setIsAddingPrescription] = useState(false);
  const [newPrescription, setNewPrescription] = useState({
    medication: '',
    dosage: '',
    frequency: '',
    duration: '',
    notes: ''
  });

  const [patients, setPatients] = useState<Patient[]>([
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
      prescriptions: [
        {
          id: '1',
          medication: 'Metoprolol',
          dosage: '50mg',
          frequency: 'Twice daily',
          duration: '30 days',
          notes: 'Take with food. Monitor blood pressure.',
          createdDate: '2025-11-10'
        }
      ],
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
      prescriptions: [
        {
          id: '2',
          medication: 'Amoxicillin',
          dosage: '500mg',
          frequency: 'Three times daily',
          duration: '7 days',
          notes: 'Complete full course of antibiotics.',
          createdDate: '2025-11-11'
        }
      ],
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
      prescriptions: [],
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

  const handleSave = () => {
    if (editedPatient) {
      setPatients(patients.map(p => p.id === editedPatient.id ? editedPatient : p));
      setSelectedPatient(editedPatient);
      setIsEditing(false);
      toast.success('Patient information updated successfully');
    }
  };

  const handleAddPrescription = () => {
    if (editedPatient && newPrescription.medication) {
      const prescription: Prescription = {
        id: Date.now().toString(),
        ...newPrescription,
        createdDate: new Date().toISOString().split('T')[0]
      };
      
      const updatedPatient = {
        ...editedPatient,
        prescriptions: [...editedPatient.prescriptions, prescription]
      };
      
      setEditedPatient(updatedPatient);
      setSelectedPatient(updatedPatient);
      setPatients(patients.map(p => p.id === updatedPatient.id ? updatedPatient : p));
      setIsAddingPrescription(false);
      setNewPrescription({ medication: '', dosage: '', frequency: '', duration: '', notes: '' });
      toast.success('Prescription added successfully');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-green-700">Patients & Prescriptions</h2>
        <p className="text-gray-600">Manage patient records and prescriptions</p>
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
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>Next: {new Date(patient.nextAppointment).toLocaleDateString('de-DE')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-blue-600">
                    <FileText className="w-3 h-3" />
                    <span>{patient.prescriptions.length} Prescriptions</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Patient Detail Dialog */}
      <Dialog open={!!selectedPatient} onOpenChange={(open) => {
        if (!open) {
          setSelectedPatient(null);
          setIsEditing(false);
        }
      }}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Patient Record</span>
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={handleSave} size="sm" className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button onClick={() => setIsEditing(false)} size="sm" variant="outline">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </DialogTitle>
          </DialogHeader>

          {editedPatient && (
            <Tabs defaultValue="overview" className="mt-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
                <TabsTrigger value="history">Medical History</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
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
              </TabsContent>

              <TabsContent value="prescriptions" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-green-700">Active Prescriptions</h3>
                  <Button onClick={() => setIsAddingPrescription(true)} size="sm" className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Prescription
                  </Button>
                </div>

                {editedPatient.prescriptions.length === 0 ? (
                  <Card className="p-8 text-center">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">No prescriptions yet</p>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {editedPatient.prescriptions.map((prescription) => (
                      <Card key={prescription.id} className="p-5 border-l-4 border-l-green-500">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Medication</p>
                            <p className="text-gray-900">{prescription.medication}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Dosage</p>
                            <p className="text-gray-900">{prescription.dosage}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Frequency</p>
                            <p className="text-gray-900">{prescription.frequency}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Duration</p>
                            <p className="text-gray-900">{prescription.duration}</p>
                          </div>
                        </div>
                        {prescription.notes && (
                          <div className="mt-3 bg-blue-50 p-3 rounded">
                            <p className="text-sm text-gray-600">Notes</p>
                            <p className="text-sm text-gray-900">{prescription.notes}</p>
                          </div>
                        )}
                        <p className="text-xs text-gray-500 mt-2">Created: {new Date(prescription.createdDate).toLocaleDateString('de-DE')}</p>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Add Prescription Dialog */}
                <Dialog open={isAddingPrescription} onOpenChange={setIsAddingPrescription}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Prescription</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div>
                        <Label>Medication</Label>
                        <Input
                          placeholder="e.g., Metoprolol"
                          value={newPrescription.medication}
                          onChange={(e) => setNewPrescription({ ...newPrescription, medication: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Dosage</Label>
                          <Input
                            placeholder="e.g., 50mg"
                            value={newPrescription.dosage}
                            onChange={(e) => setNewPrescription({ ...newPrescription, dosage: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Frequency</Label>
                          <Select
                            value={newPrescription.frequency}
                            onValueChange={(value) => setNewPrescription({ ...newPrescription, frequency: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Once daily">Once daily</SelectItem>
                              <SelectItem value="Twice daily">Twice daily</SelectItem>
                              <SelectItem value="Three times daily">Three times daily</SelectItem>
                              <SelectItem value="As needed">As needed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label>Duration</Label>
                        <Input
                          placeholder="e.g., 30 days"
                          value={newPrescription.duration}
                          onChange={(e) => setNewPrescription({ ...newPrescription, duration: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Notes</Label>
                        <Textarea
                          placeholder="Additional instructions..."
                          value={newPrescription.notes}
                          onChange={(e) => setNewPrescription({ ...newPrescription, notes: e.target.value })}
                          rows={3}
                        />
                      </div>
                      <Button onClick={handleAddPrescription} className="w-full bg-green-600 hover:bg-green-700">
                        Add Prescription
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <h3 className="text-blue-700 flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Medical History
                </h3>
                <div className="space-y-3">
                  {editedPatient.medicalHistory.map((entry) => (
                    <Card key={entry.id} className="p-4 border-l-4 border-l-blue-500">
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
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default PatientsAndPrescriptions;