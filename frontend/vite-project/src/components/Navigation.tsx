import { NavLink } from 'react-router-dom';
import { Calendar, Map } from 'lucide-react';

export function Navigation() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          <NavLink
            to="/schedule"
            className={({ isActive }: { isActive: boolean }) =>
              `flex items-center gap-2 px-3 py-4 border-b-2 transition-colors ${
                isActive
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`
            }
          >
            <Calendar className="w-5 h-5" />
            Schedule
          </NavLink>
          <NavLink
            to="/route"
            className={({ isActive }: { isActive: boolean }) =>
              `flex items-center gap-2 px-3 py-4 border-b-2 transition-colors ${
                isActive
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`
            }
          >
            <Map className="w-5 h-5" />
            Route
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
