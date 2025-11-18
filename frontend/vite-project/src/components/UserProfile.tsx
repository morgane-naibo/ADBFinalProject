import { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Save } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  dateOfBirth: string;
  insuranceNumber: string;
  medicalNotes: string;
}

export function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    firstName: 'Maria',
    lastName: 'Müller',
    email: 'maria.mueller@email.de',
    phone: '+49 151 12345678',
    address: 'Hauptstraße 123',
    city: 'Berlin',
    postalCode: '10115',
    dateOfBirth: '1965-05-15',
    insuranceNumber: 'A123456789',
    medicalNotes: 'Blood pressure monitoring required weekly'
  });

  const handleSave = () => {
    // Here you would save to a backend
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
          <h2 className="text-blue-700">Your Profile</h2>
          <p className="text-gray-600">Manage your personal information</p>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700">
            Edit Profile
          </Button>
        )}
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <div>
            <h3 className="text-green-700">{userData.firstName} {userData.lastName}</h3>
            <p className="text-gray-600">Patient ID: {userData.insuranceNumber}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-blue-700 mb-4">Personal Information</h3>
            
            <div>
              <Label htmlFor="firstName" className="flex items-center gap-2 text-gray-700">
                <User className="w-4 h-4" />
                First Name
              </Label>
              <Input
                id="firstName"
                value={userData.firstName}
                onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                disabled={!isEditing}
                className={!isEditing ? 'bg-gray-50' : ''}
              />
            </div>

            <div>
              <Label htmlFor="lastName" className="flex items-center gap-2 text-gray-700">
                <User className="w-4 h-4" />
                Last Name
              </Label>
              <Input
                id="lastName"
                value={userData.lastName}
                onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
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
                value={userData.dateOfBirth}
                onChange={(e) => setUserData({ ...userData, dateOfBirth: e.target.value })}
                disabled={!isEditing}
                className={!isEditing ? 'bg-gray-50' : ''}
              />
            </div>

            <div>
              <Label htmlFor="insuranceNumber" className="text-gray-700">
                Insurance Number
              </Label>
              <Input
                id="insuranceNumber"
                value={userData.insuranceNumber}
                onChange={(e) => setUserData({ ...userData, insuranceNumber: e.target.value })}
                disabled={!isEditing}
                className={!isEditing ? 'bg-gray-50' : ''}
              />
            </div>
          </div>

          {/* Contact & Address */}
          <div className="space-y-4">
            <h3 className="text-green-700 mb-4">Contact & Address</h3>
            
            <div>
              <Label htmlFor="email" className="flex items-center gap-2 text-gray-700">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
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
                value={userData.phone}
                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                disabled={!isEditing}
                className={!isEditing ? 'bg-gray-50' : ''}
              />
            </div>

            <div>
              <Label htmlFor="address" className="flex items-center gap-2 text-gray-700">
                <MapPin className="w-4 h-4" />
                Address
              </Label>
              <Input
                id="address"
                value={userData.address}
                onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                disabled={!isEditing}
                className={!isEditing ? 'bg-gray-50' : ''}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="postalCode" className="text-gray-700">Postal Code</Label>
                <Input
                  id="postalCode"
                  value={userData.postalCode}
                  onChange={(e) => setUserData({ ...userData, postalCode: e.target.value })}
                  disabled={!isEditing}
                  className={!isEditing ? 'bg-gray-50' : ''}
                />
              </div>
              <div>
                <Label htmlFor="city" className="text-gray-700">City</Label>
                <Input
                  id="city"
                  value={userData.city}
                  onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                  disabled={!isEditing}
                  className={!isEditing ? 'bg-gray-50' : ''}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Medical Notes */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-blue-700 mb-4">Medical Notes</h3>
          <div>
            <Label htmlFor="medicalNotes" className="text-gray-700">Special Requirements</Label>
            <Textarea
              id="medicalNotes"
              value={userData.medicalNotes}
              onChange={(e) => setUserData({ ...userData, medicalNotes: e.target.value })}
              disabled={!isEditing}
              className={!isEditing ? 'bg-gray-50' : ''}
              rows={4}
            />
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
export default UserProfile;