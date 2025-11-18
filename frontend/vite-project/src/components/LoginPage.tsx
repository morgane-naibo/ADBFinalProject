import { useState } from 'react';
import { User, Lock, Stethoscope, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';

interface LoginPageProps {
  onLogin: (role: 'patient' | 'doctor', name: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [selectedRole, setSelectedRole] = useState<'patient' | 'doctor'>('patient');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      // Mock login - in real app, this would validate credentials
      const name = selectedRole === 'patient' ? 'Maria Müller' : 'Dr. Schmidt';
      onLogin(selectedRole, name);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-green-700 mb-2">Healthcare Portal</h1>
          <p className="text-gray-600">Nursing Care Service</p>
        </div>

        {/* Role Selection */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => setSelectedRole('patient')}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedRole === 'patient'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 bg-white hover:border-green-300'
            }`}
          >
            <User className={`w-8 h-8 mx-auto mb-2 ${
              selectedRole === 'patient' ? 'text-green-600' : 'text-gray-400'
            }`} />
            <p className={selectedRole === 'patient' ? 'text-green-700' : 'text-gray-600'}>
              Patient
            </p>
          </button>
          <button
            onClick={() => setSelectedRole('doctor')}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedRole === 'doctor'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-blue-300'
            }`}
          >
            <Stethoscope className={`w-8 h-8 mx-auto mb-2 ${
              selectedRole === 'doctor' ? 'text-blue-600' : 'text-gray-400'
            }`} />
            <p className={selectedRole === 'doctor' ? 'text-blue-700' : 'text-gray-600'}>
              Doctor
            </p>
          </button>
        </div>

        {/* Login Form */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="username" className="text-gray-700">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder={selectedRole === 'patient' ? 'patient123' : 'doctor123'}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-gray-700">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>
          <Button
            onClick={handleLogin}
            className={`w-full ${
              selectedRole === 'patient'
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            <Lock className="w-4 h-4 mr-2" />
            Login as {selectedRole === 'patient' ? 'Patient' : 'Doctor'}
          </Button>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Demo Credentials:</p>
          <div className="text-xs text-gray-500 space-y-1">
            <p>Patient: patient123 / password</p>
            <p>Doctor: doctor123 / password</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
export default LoginPage;
