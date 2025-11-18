import { useState } from 'react';
import { Calendar, MapPin, MessageSquare, User, LogOut } from 'lucide-react';
import { Appointments } from './Appointments';
import { MapView } from './MapView';
import { Chat } from './Chat';
import { UserProfile } from './UserProfile';
import { Button } from './ui/button';

type TabType = 'appointments' | 'map' | 'chat' | 'profile';

interface PatientDashboardProps {
  userName: string;
  onLogout: () => void;
}

export function PatientDashboard({ userName, onLogout }: PatientDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('appointments');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-4 border-green-500">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-green-700">Healthcare Nursing Service</h1>
            <p className="text-gray-600">Welcome, {userName}</p>
          </div>
          <Button onClick={onLogout} variant="outline" className="border-red-500 text-red-600 hover:bg-red-50">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Navigation Tabs */}
          <nav className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('appointments')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 transition-colors ${
                activeTab === 'appointments'
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span>Appointments</span>
            </button>
            <button
              onClick={() => setActiveTab('map')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 transition-colors ${
                activeTab === 'map'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <MapPin className="w-5 h-5" />
              <span>Track Car</span>
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 transition-colors ${
                activeTab === 'chat'
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span>Chat</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 transition-colors ${
                activeTab === 'profile'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <User className="w-5 h-5" />
              <span>Profile</span>
            </button>
          </nav>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'appointments' && <Appointments />}
            {activeTab === 'map' && <MapView />}
            {activeTab === 'chat' && <Chat />}
            {activeTab === 'profile' && <UserProfile />}
          </div>
        </div>
      </main>
    </div>
  );
}
export default PatientDashboard;
