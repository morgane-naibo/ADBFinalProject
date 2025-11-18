import { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, User } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface NursingCar {
  id: string;
  nurse: string;
  eta: number;
  distance: string;
  lat: number;
  lng: number;
  status: 'on-way' | 'nearby' | 'arrived';
}

export function MapView() {
  const [car, setCar] = useState<NursingCar>({
    id: '1',
    nurse: 'Nurse Anna Schmidt',
    eta: 12,
    distance: '3.2 km',
    lat: 51.515,
    lng: 7.465,
    status: 'on-way'
  });

  // Simulate car movement and ETA update
  useEffect(() => {
    const interval = setInterval(() => {
      setCar(prev => {
        const newEta = Math.max(0, prev.eta - 1);
        let newStatus = prev.status;
        
        if (newEta === 0) {
          newStatus = 'arrived';
        } else if (newEta <= 3) {
          newStatus = 'nearby';
        }

        return {
          ...prev,
          eta: newEta,
          distance: `${(newEta * 0.25).toFixed(1)} km`,
          lat: prev.lat + (Math.random() - 0.5) * 0.001,
          lng: prev.lng + (Math.random() - 0.5) * 0.001,
          status: newStatus
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-blue-700">Track Your Nursing Car</h2>
        <p className="text-gray-600">Real-time location and estimated arrival</p>
      </div>

      <Card className="p-6 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-blue-700">{car.nurse}</h3>
                <p className="text-gray-600 text-sm">Your assigned nurse</p>
              </div>
            </div>
            {car.status === 'on-way' && (
              <Badge className="bg-blue-500">On the way</Badge>
            )}
            {car.status === 'nearby' && (
              <Badge className="bg-green-500">Nearby</Badge>
            )}
            {car.status === 'arrived' && (
              <Badge className="bg-green-600">Arrived</Badge>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-gray-600 text-sm">ETA</p>
                <p className="text-gray-900">{car.eta} minutes</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Navigation className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-gray-600 text-sm">Distance</p>
                <p className="text-gray-900">{car.distance}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Mock Map */}
      <div className="relative bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200" style={{ height: '400px' }}>
        {/* Grid background to simulate map */}
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        />
        
        {/* Roads */}
        <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-400 transform -translate-y-1/2" />
        <div className="absolute top-0 bottom-0 left-1/2 w-2 bg-gray-400 transform -translate-x-1/2" />

        {/* Your location (center) */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div className="mt-1 text-xs bg-white px-2 py-1 rounded shadow whitespace-nowrap">
            Your Location
          </div>
        </div>

        {/* Nursing car location */}
        <div 
          className="absolute transition-all duration-2000 ease-linear z-10"
          style={{
            top: `${30 + (car.lat - 51.515) * 10000}%`,
            left: `${30 + (car.lng - 7.465) * 10000}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
            <Navigation className="w-6 h-6 text-white" />
          </div>
          <div className="mt-1 text-xs bg-white px-2 py-1 rounded shadow whitespace-nowrap">
            Nursing Car
          </div>
        </div>

        {/* Map controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50">
            +
          </button>
          <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50">
            −
          </button>
        </div>

        {/* Map attribution */}
        <div className="absolute bottom-2 left-2 text-xs text-gray-500 bg-white px-2 py-1 rounded">
          Live Tracking Map
        </div>
      </div>
    </div>
  );
}
export default MapView;