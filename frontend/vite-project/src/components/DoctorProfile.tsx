import { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Save, Edit, Stethoscope, Award, Briefcase } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';

interface DoctorData {
  firstName: string;
  lastName: string;
  title: string;
  specialization: string;
  licenseNumber: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  dateOfBirth: string;
  qualifications: string;
  experience: string;
  bio: string;
}

export function DoctorProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [doctorData, setDoctorData] = useState<DoctorData>({
    firstName: 'Thomas',
    lastName: 'Schmidt',
    title: 'Dr. med.',
    specialization: 'General Medicine & Geriatrics',
    licenseNumber: 'DE-12345-MD',
    email: 'dr.schmidt@healthcare.de',
    phone: '+49 30 12345678',
    address: 'Alexanderplatz 5',
    city: 'Berlin',
    postalCode: '10178',
    dateOfBirth: '1978-04-15',
    qualifications: 'Medical Degree from Humboldt University Berlin, Specialization in Geriatrics',
    experience: '15 years',
    bio: 'Dedicated to providing comprehensive care for elderly patients with a focus on preventive medicine and quality of life.'
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-blue-700">Doctor Profile</h2>
          <p className="text-gray-600">Manage your professional information</p>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700">
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        )}
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
            <Stethoscope className="w-10 h-10 text-white" />
          </div>
          <div>
            <h3 className="text-blue-700">
              {doctorData.title} {doctorData.firstName} {doctorData.lastName}
            </h3>
            <p className="text-gray-600">{doctorData.specialization}</p>
            <p className="text-sm text-gray-500">License: {doctorData.licenseNumber}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-green-700 mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </h3>
            
            <div>
              <Label htmlFor="title" className="text-gray-700">Title</Label>
              <Input
                id="title"
                value={doctorData.title}
                onChange={(e) => setDoctorData({ ...doctorData, title: e.target.value })}
                disabled={!isEditing}
                className={!isEditing ? 'bg-gray-50' : ''}
              />
            </div>

            <div>
              <Label htmlFor="firstName" className="text-gray-700">First Name</Label>
              <Input
                id="firstName"
                value={doctorData.firstName}
                onChange={(e) => setDoctorData({ ...doctorData, firstName: e.target.value })}
                disabled={!isEditing}
                className={!isEditing ? 'bg-gray-50' : ''}
              />
            </div>

            <div>
              <Label htmlFor="lastName" className="text-gray-700">Last Name</Label>
              <Input
                id="lastName"
                value={doctorData.lastName}
                onChange={(e) => setDoctorData({ ...doctorData, lastName: e.target.value })}
                disabled={!isEditing}
                className={!isEditing ? 'bg-gray-50' : ''}
              />
            </div>

            <div>
              <Label htmlFor="dateOfBirth" className="flex items-center gap-2 text-gray-700">
                <Calendar className="w-4 h-4" />
                Date of Birth
              </Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={doctorData.dateOfBirth}
                onChange={(e) => setDoctorData({ ...doctorData, dateOfBirth: e.target.value })}
                disabled={!isEditing}
                className={!isEditing ? 'bg-gray-50' : ''}
              />
            </div>
          </div>

          {/* Contact & Professional */}
          <div className="space-y-4">
            <h3 className="text-blue-700 mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Professional & Contact
            </h3>
            
            <div>
              <Label htmlFor="specialization" className="text-gray-700">Specialization</Label>
              <Input
                id="specialization"
                value={doctorData.specialization}
                onChange={(e) => setDoctorData({ ...doctorData, specialization: e.target.value })}
                disabled={!isEditing}
                className={!isEditing ? 'bg-gray-50' : ''}
              />
            </div>

            <div>
              <Label htmlFor="licenseNumber" className="text-gray-700">License Number</Label>
              <Input
                id="licenseNumber"
                value={doctorData.licenseNumber}
                onChange={(e) => setDoctorData({ ...doctorData, licenseNumber: e.target.value })}
                disabled={!isEditing}
                className={!isEditing ? 'bg-gray-50' : ''}
              />
            </div>

            <div>
              <Label htmlFor="email" className="flex items-center gap-2 text-gray-700">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={doctorData.email}
                onChange={(e) => setDoctorData({ ...doctorData, email: e.target.value })}
                disabled={!isEditing}
                className={!isEditing ? 'bg-gray-50' : ''}
              />
            </div>

            <div>
              <Label htmlFor="phone" className="flex items-center gap-2 text-gray-700">
                <Phone className="w-4 h-4" />
                Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                value={doctorData.phone}
                onChange={(e) => setDoctorData({ ...doctorData, phone: e.target.value })}
                disabled={!isEditing}
                className={!isEditing ? 'bg-gray-50' : ''}
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-green-700 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Address
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="address" className="text-gray-700">Street Address</Label>
              <Input
                id="address"
                value={doctorData.address}
                onChange={(e) => setDoctorData({ ...doctorData, address: e.target.value })}
                disabled={!isEditing}
                className={!isEditing ? 'bg-gray-50' : ''}
              />
            </div>
            <div>
              <Label htmlFor="postalCode" className="text-gray-700">Postal Code</Label>
              <Input
                id="postalCode"
                value={doctorData.postalCode}
                onChange={(e) => setDoctorData({ ...doctorData, postalCode: e.target.value })}
                disabled={!isEditing}
                className={!isEditing ? 'bg-gray-50' : ''}
              />
            </div>
            <div className="md:col-span-3">
              <Label htmlFor="city" className="text-gray-700">City</Label>
              <Input
                id="city"
                value={doctorData.city}
                onChange={(e) => setDoctorData({ ...doctorData, city: e.target.value })}
                disabled={!isEditing}
                className={!isEditing ? 'bg-gray-50' : ''}
              />
            </div>
          </div>
        </div>

        {/* Qualifications & Experience */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-blue-700 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5" />
            Qualifications & Experience
          </h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="experience" className="text-gray-700">Years of Experience</Label>
              <Input
                id="experience"
                value={doctorData.experience}
                onChange={(e) => setDoctorData({ ...doctorData, experience: e.target.value })}
                disabled={!isEditing}
                className={!isEditing ? 'bg-gray-50' : ''}
              />
            </div>
            <div>
              <Label htmlFor="qualifications" className="text-gray-700">Qualifications</Label>
              <Textarea
                id="qualifications"
                value={doctorData.qualifications}
                onChange={(e) => setDoctorData({ ...doctorData, qualifications: e.target.value })}
                disabled={!isEditing}
                className={!isEditing ? 'bg-gray-50' : ''}
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="bio" className="text-gray-700">Professional Bio</Label>
              <Textarea
                id="bio"
                value={doctorData.bio}
                onChange={(e) => setDoctorData({ ...doctorData, bio: e.target.value })}
                disabled={!isEditing}
                className={!isEditing ? 'bg-gray-50' : ''}
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
            <Button onClick={handleCancel} variant="outline">
              Cancel
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
export default DoctorProfile;
