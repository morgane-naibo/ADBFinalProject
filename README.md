# Healthcare Nursing Service Portal

A comprehensive healthcare web application for patients to book appointments with nursing care vehicles, track their location in real-time, communicate with drivers, and manage their profiles. Doctors have access to a complete management system including calendar, patient records, prescriptions, vehicle scheduling, and patient communication.

## 🎨 Features

### Patient Portal (Green Theme)
- **Appointment Booking**: Schedule nursing care appointments with date, time, and service selection
- **Real-time Car Tracking**: Live map view showing nursing car location and ETA
- **Chat System**: Direct messaging with assigned nurse/driver
- **Profile Management**: Edit personal information, contact details, and medical notes

### Doctor Portal (Blue Theme)
- **Office Calendar**: View and manage all office appointments with status tracking
- **Patients & Prescriptions**: 
  - Complete patient records with medical history
  - Editable patient information
  - Prescription management with detailed medication tracking
- **Vehicle Scheduling**:
  - Comprehensive nursing car operations management
  - Crew assignment (doctor & nurse)
  - Equipment inventory tracking
  - Patrol area management
  - Traffic conditions monitoring
  - Emergency request system
- **Patient Communication**: Secure messaging with patients
- **Doctor Profile**: Manage professional information and credentials

## 🎯 Technology Stack

- **React** with TypeScript
- **Tailwind CSS** for styling
- **Shadcn UI** components
- **Lucide React** for icons
- **Sonner** for toast notifications

## 🚀 Getting Started

### Demo Credentials

**Patient Login:**
- Username: `patient123`
- Password: `password`

**Doctor Login:**
- Username: `doctor123`
- Password: `password`

### Login Process
1. Open the application
2. Select your role (Patient or Doctor)
3. Enter the demo credentials
4. Click "Login"

## 📱 Application Structure

```
/
├── App.tsx                          # Main application entry point
├── components/
│   ├── LoginPage.tsx               # Login screen with role selection
│   ├── PatientDashboard.tsx        # Patient main dashboard
│   ├── DoctorDashboard.tsx         # Doctor main dashboard
│   │
│   ├── Patient Components:
│   ├── Appointments.tsx            # Appointment booking & management
│   ├── MapView.tsx                 # Real-time car tracking map
│   ├── Chat.tsx                    # Patient-driver chat
│   ├── UserProfile.tsx             # Patient profile management
│   │
│   ├── Doctor Components:
│   ├── DoctorCalendar.tsx          # Office appointment calendar
│   ├── PatientsAndPrescriptions.tsx # Patient records & prescriptions
│   ├── CarSchedule.tsx             # Vehicle operations management
│   ├── DoctorChat.tsx              # Doctor-patient communication
│   ├── DoctorProfile.tsx           # Doctor profile management
│   │
│   └── ui/                         # Shadcn UI components
└── styles/
    └── globals.css                 # Global styles and design tokens
```

## 🎨 Design System

### Color Palette
- **Primary (Green)**: `#10b981` - Used for patient portal actions
- **Secondary (Blue)**: `#3b82f6` - Used for doctor portal actions
- **Success**: `#22c55e`
- **Warning**: `#f59e0b`
- **Error**: `#ef4444`

### Key Components

#### Patient Portal
1. **Appointments Tab**
   - Book new appointments
   - View upcoming appointments
   - See appointment status (Confirmed/Pending/Cancelled)
   - Add special notes

2. **Track Car Tab**
   - Live location map
   - ETA countdown
   - Distance to patient
   - Status badges (On the way/Nearby/Arrived)

3. **Chat Tab**
   - Real-time messaging
   - Quick response buttons
   - Message timestamps
   - Online status indicator

4. **Profile Tab**
   - Personal information
   - Contact details
   - Address management
   - Medical notes
   - Insurance information

#### Doctor Portal
1. **Calendar Tab**
   - Daily schedule view
   - Appointment status tracking
   - Available time slots
   - Office hours summary
   - Statistics dashboard

2. **Patients & Prescriptions Tab**
   - Patient search functionality
   - Detailed patient records
   - Medical history tracking
   - Prescription management
   - Editable patient information
   - Tabbed interface (Overview/Prescriptions/History)

3. **Car Schedule Tab**
   - Nursing car overview
   - Days of operation management
   - Patrol area assignment
   - Crew management
   - Equipment tracking
   - Traffic condition monitoring
   - Emergency request handling

4. **Chat Tab**
   - Multi-patient conversations
   - Unread message indicators
   - Patient search
   - Real-time messaging

5. **Profile Tab**
   - Professional information
   - Credentials & qualifications
   - Contact details
   - Years of experience
   - Professional bio

## 🔧 Key Functionalities

### Mock Data & Simulations
- All data is stored in component state (no backend)
- Real-time car tracking simulation with moving markers
- Automatic ETA countdown
- Simulated message responses
- Demo patient and appointment data

### Interactive Features
- Appointment creation with form validation
- Real-time map updates
- Bi-directional chat with auto-responses
- Editable forms with save/cancel functionality
- Emergency request acceptance/rejection
- Traffic condition adjustments
- Patient record editing
- Prescription management

### Responsive Design
- Mobile-friendly interface
- Adaptive layouts
- Touch-friendly controls
- Responsive navigation

## 📊 Data Models

### Patient
```typescript
{
  id: string;
  name: string;
  dateOfBirth: string;
  insuranceNumber: string;
  phone: string;
  email: string;
  address: string;
  bloodType: string;
  allergies: string;
  chronicConditions: string;
  medicalHistory: MedicalHistory[];
  prescriptions: Prescription[];
}
```

### Appointment
```typescript
{
  id: string;
  date: string;
  time: string;
  service: string;
  nurse: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  notes?: string;
}
```

### Nursing Car
```typescript
{
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
```

### Emergency Request
```typescript
{
  id: string;
  patientName: string;
  address: string;
  urgency: 'high' | 'medium';
  description: string;
  requestedTime: string;
}
```

## 🎯 Future Enhancements

- Backend integration with real API
- Database persistence
- Real authentication system
- Actual geolocation tracking
- Video consultation feature
- Payment processing
- Notification system
- Report generation
- Multi-language support
- Dark mode
- Advanced analytics dashboard
- Document upload functionality
- Prescription printing
- SMS/Email notifications

## 🔒 Security Notes

This is a demo application with mock authentication. For production use, implement:
- Secure authentication (JWT, OAuth)
- Password encryption
- HTTPS
- HIPAA compliance measures
- Data encryption
- Access control lists
- Audit logging
- Session management

## 📝 License

This is a demo application for educational and portfolio purposes.

## 👨‍💻 Development

The application uses modern React patterns:
- Functional components with hooks
- TypeScript for type safety
- Component composition
- State management with useState
- Controlled components
- Responsive design with Tailwind CSS

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn UI](https://ui.shadcn.com)

---

Built with ❤️ for healthcare professionals and patients
