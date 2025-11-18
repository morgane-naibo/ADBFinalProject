// UI-specific and prop types

export interface DashboardProps {
    userName: string;
    onLogout: () => void;
  }
  
  export interface AppointmentForm {
    date: string;
    time: string;
    service: string;
    notes: string;
  }
  
  export interface FormFieldProps {
    label: string;
    value: string;
    onChange: (val: string) => void;
    type?: string;
    placeholder?: string;
  }
  
  export interface ToastMessage {
    type: 'success' | 'error' | 'info';
    message: string;
  }
  
  export interface TabItem {
    id: string;
    label: string;
    icon?: JSX.Element;
    color?: string;
  }
  
  export interface SelectOption {
    label: string;
    value: string;
  }
  