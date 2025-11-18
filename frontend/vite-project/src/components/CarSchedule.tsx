import { useState } from 'react';
import { Car, Calendar, MapPin, Users, Package, AlertTriangle, Clock, CheckCircle, Navigation } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { toast } from 'sonner';

interface EmergencyRequest {
  id: string;
  patientName: string;
  address: string;
  urgency: 'high' | 'medium';
  description: string;
  requestedTime: string;
}

interface NursingCar {
  id: string;
  name: string;
  daysOfOperation: string[];
  patrolAreas: string[];
  doctor: string;
  nurse: string;
  equipment: string[];
  currentStatus: 'active' | 'inactive' | 'emergency';
  trafficCondition: 'good' | 'moderate' | 'heavy';
  estimatedDelay: number;
  currentLocation: string;
}

export function CarSchedule() {
  const [selectedCar, setSelectedCar] = useState<NursingCar | null>(null);
  const [emergencyRequests, setEmergencyRequests] = useState<EmergencyRequest[]>([
    {
      id: '1',
      patientName: 'Friedrich Schulz',
      address: 'Wilhelmstraße 89, Berlin',
      urgency: 'high',
      description: 'Severe chest pain, requires immediate attention',
      requestedTime: '10:30'
    },
    {
      id: '2',
      patientName: 'Helga Meier',
      address: 'Friedrichstraße 12, Berlin',
      urgency: 'medium',
      description: 'Fallen at home, possible fracture',
      requestedTime: '11:15'
    }
  ]);

  const [nursingCars, setNursingCars] = useState<NursingCar[]>([
    {
      id: '1',
      name: 'Nursing Car 1',
      daysOfOperation: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      patrolAreas: ['Berlin Mitte', 'Prenzlauer Berg', 'Friedrichshain'],
      doctor: 'Dr. Schmidt',
      nurse: 'Nurse Anna Schmidt',
      equipment: [
        'Defibrillator',
        'Blood Pressure Monitor',
        'Oxygen Tank',
        'First Aid Kit',
        'ECG Machine',
        'Emergency Medications'
      ],
      currentStatus: 'active',
      trafficCondition: 'moderate',
      estimatedDelay: 5,
      currentLocation: 'Hauptstraße 45, Berlin Mitte'
    },
    {
      id: '2',
      name: 'Nursing Car 2',
      daysOfOperation: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
      patrolAreas: ['Charlottenburg', 'Wilmersdorf', 'Schöneberg'],
      doctor: 'Dr. Müller',
      nurse: 'Nurse Michael Weber',
      equipment: [
        'Defibrillator',
        'Blood Pressure Monitor',
        'Wound Care Kit',
        'Glucose Monitor',
        'Oxygen Tank',
        'Emergency Medications'
      ],
      currentStatus: 'active',
      trafficCondition: 'good',
      estimatedDelay: 0,
      currentLocation: 'Kurfürstendamm 125, Charlottenburg'
    },
    {
      id: '3',
      name: 'Nursing Car 3',
      daysOfOperation: ['Saturday', 'Sunday'],
      patrolAreas: ['Kreuzberg', 'Neukölln', 'Tempelhof'],
      doctor: 'Dr. Weber',
      nurse: 'Nurse Sophie Klein',
      equipment: [
        'Defibrillator',
        'First Aid Kit',
        'Blood Pressure Monitor',
        'Oxygen Tank'
      ],
      currentStatus: 'inactive',
      trafficCondition: 'good',
      estimatedDelay: 0,
      currentLocation: 'Depot'
    }
  ]);

  const handleAcceptEmergency = (requestId: string) => {
    const request = emergencyRequests.find(r => r.id === requestId);
    if (request) {
      // Update car status to emergency
      const updatedCars = nursingCars.map(car => {
        if (car.id === '1') {
          return {
            ...car,
            currentStatus: 'emergency' as const,
            trafficCondition: 'good' as const,
            estimatedDelay: 0
          };
        }
        return car;
      });
      setNursingCars(updatedCars);
      
      // Remove from emergency requests
      setEmergencyRequests(emergencyRequests.filter(r => r.id !== requestId));
      
      toast.success(`Emergency request accepted. Dispatching ${nursingCars[0].name} to ${request.patientName}`);
    }
  };

  const handleRejectEmergency = (requestId: string) => {
    setEmergencyRequests(emergencyRequests.filter(r => r.id !== requestId));
    toast.info('Emergency request rejected');
  };

  const adjustTraffic = (carId: string, condition: 'good' | 'moderate' | 'heavy') => {
    setNursingCars(nursingCars.map(car => {
      if (car.id === carId) {
        const delays = { good: 0, moderate: 5, heavy: 15 };
        return {
          ...car,
          trafficCondition: condition,
          estimatedDelay: delays[condition]
        };
      }
      return car;
    }));
    toast.success('Traffic conditions updated');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-blue-700">Nursing Car Schedule & Operations</h2>
        <p className="text-gray-600">Manage vehicle operations, crew, and emergency requests</p>
      </div>

      {/* Emergency Requests */}
      {emergencyRequests.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h3 className="text-red-700">Emergency Requests</h3>
            <Badge className="bg-red-600">{emergencyRequests.length}</Badge>
          </div>
          {emergencyRequests.map((request) => (
            <Card key={request.id} className="p-4 border-l-4 border-l-red-500 bg-red-50">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <Badge className={request.urgency === 'high' ? 'bg-red-600' : 'bg-orange-500'}>
                      {request.urgency.toUpperCase()} PRIORITY
                    </Badge>
                    <span className="text-gray-600">Requested: {request.requestedTime}</span>
                  </div>
                  <h4 className="text-red-700">{request.patientName}</h4>
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{request.address}</span>
                  </div>
                  <p className="text-gray-700">{request.description}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button 
                    onClick={() => handleAcceptEmergency(request.id)}
                    size="sm" 
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Accept
                  </Button>
                  <Button 
                    onClick={() => handleRejectEmergency(request.id)}
                    size="sm" 
                    variant="outline"
                    className="border-red-500 text-red-600 hover:bg-red-50"
                  >
                    Reject
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Nursing Cars Overview */}
      <div className="grid gap-4">
        {nursingCars.map((car) => (
          <Card 
            key={car.id} 
            className={`p-5 border-l-4 cursor-pointer hover:shadow-lg transition-shadow ${
              car.currentStatus === 'emergency' ? 'border-l-red-500 bg-red-50' :
              car.currentStatus === 'active' ? 'border-l-green-500' : 
              'border-l-gray-400'
            }`}
            onClick={() => setSelectedCar(car)}
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    car.currentStatus === 'emergency' ? 'bg-red-600' :
                    car.currentStatus === 'active' ? 'bg-green-600' : 
                    'bg-gray-400'
                  }`}>
                    <Car className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-blue-700">{car.name}</h3>
                    <p className="text-sm text-gray-600">{car.currentLocation}</p>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  {car.currentStatus === 'active' && (
                    <Badge className="bg-green-500">Active</Badge>
                  )}
                  {car.currentStatus === 'inactive' && (
                    <Badge className="bg-gray-500">Inactive</Badge>
                  )}
                  {car.currentStatus === 'emergency' && (
                    <Badge className="bg-red-600">Emergency Response</Badge>
                  )}
                  <div className="flex items-center gap-1 text-sm">
                    {car.trafficCondition === 'good' && (
                      <Badge className="bg-green-500 text-xs">Good Traffic</Badge>
                    )}
                    {car.trafficCondition === 'moderate' && (
                      <Badge className="bg-orange-500 text-xs">Moderate Traffic</Badge>
                    )}
                    {car.trafficCondition === 'heavy' && (
                      <Badge className="bg-red-500 text-xs">Heavy Traffic</Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Crew */}
              <div className="grid md:grid-cols-2 gap-4 pt-2 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-600">Doctor</p>
                    <p className="text-sm text-gray-900">{car.doctor}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-xs text-gray-600">Nurse</p>
                    <p className="text-sm text-gray-900">{car.nurse}</p>
                  </div>
                </div>
              </div>

              {/* Patrol Areas */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <p className="text-xs text-gray-600">Patrol Areas</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {car.patrolAreas.map((area, index) => (
                    <Badge key={index} variant="outline" className="bg-blue-50">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Traffic Control */}
              {car.currentStatus === 'active' && (
                <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
                  <p className="text-sm text-gray-600">Adjust Traffic:</p>
                  <Button 
                    onClick={(e) => { e.stopPropagation(); adjustTraffic(car.id, 'good'); }}
                    size="sm" 
                    variant="outline"
                    className="border-green-500 text-green-600 hover:bg-green-50 text-xs"
                  >
                    Good
                  </Button>
                  <Button 
                    onClick={(e) => { e.stopPropagation(); adjustTraffic(car.id, 'moderate'); }}
                    size="sm" 
                    variant="outline"
                    className="border-orange-500 text-orange-600 hover:bg-orange-50 text-xs"
                  >
                    Moderate
                  </Button>
                  <Button 
                    onClick={(e) => { e.stopPropagation(); adjustTraffic(car.id, 'heavy'); }}
                    size="sm" 
                    variant="outline"
                    className="border-red-500 text-red-600 hover:bg-red-50 text-xs"
                  >
                    Heavy
                  </Button>
                  {car.estimatedDelay > 0 && (
                    <div className="flex items-center gap-1 text-orange-600 ml-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">+{car.estimatedDelay} min delay</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Car Details Dialog */}
      <Dialog open={!!selectedCar} onOpenChange={(open) => !open && setSelectedCar(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedCar?.name} - Detailed Information</DialogTitle>
          </DialogHeader>
          
          {selectedCar && (
            <div className="space-y-6 mt-4">
              {/* Status */}
              <Card className="p-4 bg-gradient-to-r from-blue-50 to-green-50">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Current Status</p>
                    <Badge className={
                      selectedCar.currentStatus === 'emergency' ? 'bg-red-600' :
                      selectedCar.currentStatus === 'active' ? 'bg-green-500' : 
                      'bg-gray-500'
                    }>
                      {selectedCar.currentStatus}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Traffic</p>
                    <Badge className={
                      selectedCar.trafficCondition === 'good' ? 'bg-green-500' :
                      selectedCar.trafficCondition === 'moderate' ? 'bg-orange-500' : 
                      'bg-red-500'
                    }>
                      {selectedCar.trafficCondition}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Current Location</p>
                    <p className="text-sm text-gray-900">{selectedCar.currentLocation}</p>
                  </div>
                </div>
              </Card>

              {/* Days of Operation */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <h3 className="text-blue-700">Days of Operation</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                    <Badge 
                      key={day}
                      className={selectedCar.daysOfOperation.includes(day) ? 'bg-green-500' : 'bg-gray-300'}
                    >
                      {day}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Crew Information */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-5 h-5 text-green-600" />
                  <h3 className="text-green-700">Crew Members</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <p className="text-sm text-gray-600">Doctor</p>
                    <p className="text-gray-900">{selectedCar.doctor}</p>
                  </Card>
                  <Card className="p-4">
                    <p className="text-sm text-gray-600">Nurse</p>
                    <p className="text-gray-900">{selectedCar.nurse}</p>
                  </Card>
                </div>
              </div>

              {/* Equipment */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Package className="w-5 h-5 text-blue-600" />
                  <h3 className="text-blue-700">Medical Equipment</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-2">
                  {selectedCar.equipment.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-900">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Patrol Areas */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Navigation className="w-5 h-5 text-green-600" />
                  <h3 className="text-green-700">Patrol Areas</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-2">
                  {selectedCar.patrolAreas.map((area, index) => (
                    <Card key={index} className="p-3 text-center">
                      <p className="text-sm text-gray-900">{area}</p>
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
export default CarSchedule;