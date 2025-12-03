import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Navigation } from './components/Navigation.tsx';
import { SchedulePage } from './components/SchedulePage.tsx';
import { RoutePage } from './components/RoutePage.tsx';
import { appointmentsData } from './data/mockData';

export default function App() {
  const [appointments, setAppointments] = useState(appointmentsData);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/schedule" replace />} />
          <Route 
            path="/schedule" 
            element={
              <SchedulePage 
                appointments={appointments}
                setAppointments={setAppointments}
              />
            } 
          />
          <Route 
            path="/route" 
            element={
              <RoutePage 
                appointments={appointments}
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}
