import { useState } from 'react';
import { Plus, FileText, User, Calendar, Edit, Save, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';

interface Prescription {
  id: string;
  patientName: string;
  patientId: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes: string;
  createdDate: string;
  prescribedBy: string;
}

export function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    {
      id: '1',
      patientName: 'Maria Müller',
      patientId: 'A123456789',
      medication: 'Metoprolol',
      dosage: '50mg',
      frequency: 'Twice daily',
      duration: '30 days',
      notes: 'Take with food. Monitor blood pressure.',
      createdDate: '2025-11-10',
      prescribedBy: 'Dr. Schmidt'
    },
    {
      id: '2',
      patientName: 'Hans Schmidt',
      patientId: 'B987654321',
      medication: 'Amoxicillin',
      dosage: '500mg',
      frequency: 'Three times daily',
      duration: '7 days',
      notes: 'Complete full course of antibiotics.',
      createdDate: '2025-11-11',
      prescribedBy: 'Dr. Schmidt'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    patientName: '',
    patientId: '',
    medication: '',
    dosage: '',
    frequency: '',
    duration: '',
    notes: ''
  });

  const handleEdit = (prescription: Prescription) => {
    setEditingId(prescription.id);
    setFormData({
      patientName: prescription.patientName,
      patientId: prescription.patientId,
      medication: prescription.medication,
      dosage: prescription.dosage,
      frequency: prescription.frequency,
      duration: prescription.duration,
      notes: prescription.notes
    });
    setIsDialogOpen(true);
  };

  const handleCreateOrUpdate = () => {
    if (editingId) {
      // Update existing prescription
      setPrescriptions(prescriptions.map(p => 
        p.id === editingId 
          ? { ...p, ...formData }
          : p
      ));
      toast.success('Prescription updated successfully');
    } else {
      // Create new prescription
      const newPrescription: Prescription = {
        id: Date.now().toString(),
        ...formData,
        createdDate: new Date().toISOString().split('T')[0],
        prescribedBy: 'Dr. Schmidt'
      };
      setPrescriptions([newPrescription, ...prescriptions]);
      toast.success('Prescription created successfully');
    }
    
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingId(null);
    setFormData({
      patientName: '',
      patientId: '',
      medication: '',
      dosage: '',
      frequency: '',
      duration: '',
      notes: ''
    });
  };

  const patients = [
    { name: 'Maria Müller', id: 'A123456789' },
    { name: 'Hans Schmidt', id: 'B987654321' },
    { name: 'Anna Weber', id: 'C456789123' },
    { name: 'Klaus Becker', id: 'D789123456' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-green-700">Prescription Management</h2>
          <p className="text-gray-600">Create and edit patient prescriptions</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          if (!open) handleCloseDialog();
          else setIsDialogOpen(true);
        }}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              New Prescription
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingId ? 'Edit Prescription' : 'Create New Prescription'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="patient">Patient</Label>
                  <Select
                    value={formData.patientId}
                    onValueChange={(value) => {
                      const patient = patients.find(p => p.id === value);
                      setFormData({ 
                        ...formData, 
                        patientId: value,
                        patientName: patient?.name || ''
                      });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map(patient => (
                        <SelectItem key={patient.id} value={patient.id}>
                          {patient.name} ({patient.id})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="medication">Medication</Label>
                  <Input
                    id="medication"
                    placeholder="e.g., Metoprolol"
                    value={formData.medication}
                    onChange={(e) => setFormData({ ...formData, medication: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dosage">Dosage</Label>
                  <Input
                    id="dosage"
                    placeholder="e.g., 50mg"
                    value={formData.dosage}
                    onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select
                    value={formData.frequency}
                    onValueChange={(value) => setFormData({ ...formData, frequency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Once daily">Once daily</SelectItem>
                      <SelectItem value="Twice daily">Twice daily</SelectItem>
                      <SelectItem value="Three times daily">Three times daily</SelectItem>
                      <SelectItem value="Four times daily">Four times daily</SelectItem>
                      <SelectItem value="As needed">As needed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  placeholder="e.g., 30 days"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="notes">Notes & Instructions</Label>
                <Textarea
                  id="notes"
                  placeholder="Additional instructions for the patient..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={handleCreateOrUpdate} 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {editingId ? 'Update Prescription' : 'Create Prescription'}
                </Button>
                <Button onClick={handleCloseDialog} variant="outline">
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Prescriptions List */}
      <div className="grid gap-4">
        {prescriptions.map((prescription) => (
          <Card key={prescription.id} className="p-5 border-l-4 border-l-green-500">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    <h3 className="text-blue-700">{prescription.patientName}</h3>
                  </div>
                  <span className="text-sm text-gray-500">ID: {prescription.patientId}</span>
                </div>

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
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="text-sm text-gray-600">Notes</p>
                    <p className="text-sm text-gray-900">{prescription.notes}</p>
                  </div>
                )}

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(prescription.createdDate).toLocaleDateString('de-DE')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    <span>By {prescription.prescribedBy}</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => handleEdit(prescription)}
                variant="outline"
                size="sm"
                className="border-blue-500 text-blue-600 hover:bg-blue-50"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
export default Prescriptions;