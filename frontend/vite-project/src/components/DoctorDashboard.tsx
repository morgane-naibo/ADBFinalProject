import { useState } from 'react';
import { Calendar, Users, Car, MessageSquare, User, LogOut } from 'lucide-react';
import { DoctorCalendar } from './DoctorCalendar';
import { PatientsAndPrescriptions } from './PatientsAndPrescriptions';
import { CarSchedule } from './CarSchedule';
import { DoctorChat } from './DoctorChat';
import { DoctorProfile } from './DoctorProfile';
import { Button } from './ui/button';

type TabType = 'calendar' | 'patients' | 'carSchedule' | 'chat' | 'profile';

interface DoctorDashboardProps {
  userName: string;
  onLogout: () => void;
}

export function DoctorDashboard({ userName, onLogout }: DoctorDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('calendar');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-4 border-blue-500">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-blue-700">Doctor Portal</h1>
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
              onClick={() => setActiveTab('calendar')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 transition-colors ${
                activeTab === 'calendar'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span>Calendar</span>
            </button>
            <button
              onClick={() => setActiveTab('patients')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 transition-colors ${
                activeTab === 'patients'
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Patients & Prescriptions</span>
            </button>
            <button
              onClick={() => setActiveTab('carSchedule')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 transition-colors ${
                activeTab === 'carSchedule'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Car className="w-5 h-5" />
              <span>Car Schedule</span>
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
            {activeTab === 'calendar' && <DoctorCalendar />}
            {activeTab === 'patients' && <PatientsAndPrescriptions />}
            {activeTab === 'carSchedule' && <CarSchedule />}
            {activeTab === 'chat' && <DoctorChat />}
            {activeTab === 'profile' && <DoctorProfile />}
          </div>
        </div>
      </main>
    </div>
  );
}
export default DoctorDashboard;