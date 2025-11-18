// Core data models for the Healthcare Portal

export interface Appointment {
    id: string;
    date: string;
    time: string;
    service: string;
    nurse: string;
    status: 'confirmed' | 'pending' | 'cancelled';
    notes?: string;
  }
  
  export interface MedicalHistory {
    id: string;
    date: string;
    diagnosis: string;
    treatment: string;
    notes?: string;
  }
  
  export interface Prescription {
    id: string;
    medication: string;
    dosage: string;
    frequency: string;
    duration: string;
    notes?: string;
  }
  
  export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    insuranceNumber: string;
    phone: string;
    email: string;
    address: string;
    city?: string;
    postalCode?: string;
    bloodType?: string;
    allergies?: string;
    chronicConditions?: string;
    medicalHistory: MedicalHistory[];
    prescriptions: Prescription[];
  }
  
  export interface Doctor {
    id: string;
    name: string;
    specialization: string;
    licenseNumber: string;
    email: string;
    phone: string;
    address: string;
    yearsOfExperience: number;
    bio?: string;
    qualifications?: string[];
  }
  
  export interface NursingCar {
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
  
  export interface EmergencyRequest {
    id: string;
    patientName: string;
    address: string;
    urgency: 'high' | 'medium';
    description: string;
    requestedTime: string;
  }
  
  export interface ChatMessage {
    id: string;
    sender: string;
    text: string;
    timestamp: string;
    role: 'doctor' | 'patient';
  }
  
  export interface ChatConversation {
    patientId: string;
    patientName: string;
    messages: ChatMessage[];
    unreadCount?: number;
  }
  