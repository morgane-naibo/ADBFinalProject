import { useState, useEffect, useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { patientsDatabase } from '../data/mockData';
import { MapPin, Navigation as NavigationIcon } from 'lucide-react';

const mapContainerStyle = {
  width: '100%',
  height: '600px',
};

const defaultCenter = {
  lat: 40.7128,
  lng: -74.0060,
};

// Replace with your actual Google Maps API key
const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY_HERE';

interface Appointment {
  id: string;
  time: string;
  endTime: string;
  patientName: string;
  address: string;
  notes?: string;
  doctor: string;
}

interface RoutePageProps {
  appointments: Record<string, Appointment[]>;
}

export function RoutePage({ appointments }: RoutePageProps) {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });
  
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  // Generate route data from appointments
  const currentRoute = useMemo(() => {
    const dayAppointments = appointments[selectedDay] || [];
    return dayAppointments.map((apt) => {
      const patientData = patientsDatabase[apt.patientName];
      if (patientData) {
        return {
          id: apt.id,
          patientName: apt.patientName,
          address: patientData.address,
          lat: patientData.lat,
          lng: patientData.lng,
        };
      }
      // Fallback if patient not in database
      return {
        id: apt.id,
        patientName: apt.patientName,
        address: apt.address,
        lat: defaultCenter.lat + (Math.random() - 0.5) * 0.1,
        lng: defaultCenter.lng + (Math.random() - 0.5) * 0.1,
      };
    });
  }, [appointments, selectedDay]);

  useEffect(() => {
    if (currentRoute && currentRoute.length > 1 && isLoaded && window.google && window.google.maps) {
      const directionsService = new google.maps.DirectionsService();
      
      const waypoints = currentRoute.slice(1, -1).map((location) => ({
        location: { lat: location.lat, lng: location.lng },
        stopover: true,
      }));

      directionsService.route(
        {
          origin: { lat: currentRoute[0].lat, lng: currentRoute[0].lng },
          destination: { lat: currentRoute[currentRoute.length - 1].lat, lng: currentRoute[currentRoute.length - 1].lng },
          waypoints: waypoints,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            setDirections(result);
          }
        }
      );

      // Center map on first location
      setMapCenter({ lat: currentRoute[0].lat, lng: currentRoute[0].lng });
    } else if (currentRoute.length === 1 && isLoaded) {
      // Single location, just center the map
      setDirections(null);
      setMapCenter({ lat: currentRoute[0].lat, lng: currentRoute[0].lng });
    } else if (currentRoute.length === 0) {
      // No appointments for this day
      setDirections(null);
      setMapCenter(defaultCenter);
    }
  }, [selectedDay, currentRoute, isLoaded]);

  if (loadError) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Error loading Google Maps. Please check your API key.</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800">Loading maps...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="mb-6">Route Planner</h1>
      
      {/* Day selector */}
      <div className="mb-6 flex flex-wrap gap-2">
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

      {currentRoute.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <p className="text-gray-500">No appointments scheduled for {selectedDay}</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Address list */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden sticky top-8">
              <div className="p-4 bg-blue-50 border-b border-gray-200">
                <h2>Today's Route</h2>
                <p className="text-gray-600 mt-1">
                  {currentRoute.length} stops
                </p>
              </div>
              <div className="divide-y divide-gray-200 max-h-[500px] overflow-y-auto">
                {currentRoute.map((location, index) => (
                  <div key={location.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-gray-900 truncate">{location.patientName}</h3>
                        <div className="flex items-start gap-2 text-gray-600 mt-1">
                          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{location.address}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 bg-blue-50 border-b border-gray-200 flex items-center gap-2">
                <NavigationIcon className="w-5 h-5 text-blue-600" />
                <h2>Map View - {selectedDay}</h2>
              </div>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={mapCenter}
                zoom={12}
              >
                {directions ? (
                  <DirectionsRenderer directions={directions} />
                ) : (
                  currentRoute.map((location, index) => (
                    <Marker
                      key={location.id}
                      position={{ lat: location.lat, lng: location.lng }}
                      label={{
                        text: `${index + 1}`,
                        color: 'white',
                      }}
                    />
                  ))
                )}
              </GoogleMap>
            </div>
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> To use the map functionality, replace <code>YOUR_GOOGLE_MAPS_API_KEY_HERE</code> in the RoutePage.tsx file with your actual Google Maps API key. 
                You can get one from the <a href="https://developers.google.com/maps/documentation/javascript/get-api-key" target="_blank" rel="noopener noreferrer" className="underline">Google Maps Platform</a>.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
