// Patient database with addresses and coordinates
export const patientsDatabase: Record<string, {
  name: string;
  address: string;
  lat: number;
  lng: number;
}> = {
  'John Smith': {
    name: 'John Smith',
    address: '123 Main St, New York, NY 10001',
    lat: 40.7506,
    lng: -73.9971,
  },
  'Maria Garcia': {
    name: 'Maria Garcia',
    address: '456 Park Ave, New York, NY 10022',
    lat: 40.7614,
    lng: -73.9776,
  },
  'Robert Williams': {
    name: 'Robert Williams',
    address: '789 Broadway, New York, NY 10003',
    lat: 40.7300,
    lng: -73.9950,
  },
  'Emily Davis': {
    name: 'Emily Davis',
    address: '321 5th Ave, New York, NY 10016',
    lat: 40.7450,
    lng: -73.9850,
  },
  'James Brown': {
    name: 'James Brown',
    address: '555 Madison Ave, New York, NY 10022',
    lat: 40.7590,
    lng: -73.9732,
  },
  'Patricia Miller': {
    name: 'Patricia Miller',
    address: '777 Lexington Ave, New York, NY 10065',
    lat: 40.7648,
    lng: -73.9645,
  },
  'David Martinez': {
    name: 'David Martinez',
    address: '999 Amsterdam Ave, New York, NY 10025',
    lat: 40.7968,
    lng: -73.9696,
  },
  'Jennifer Wilson': {
    name: 'Jennifer Wilson',
    address: '111 West St, New York, NY 10006',
    lat: 40.7095,
    lng: -74.0167,
  },
  'Michael Anderson': {
    name: 'Michael Anderson',
    address: '222 East St, New York, NY 10009',
    lat: 40.7200,
    lng: -73.9800,
  },
  'Linda Taylor': {
    name: 'Linda Taylor',
    address: '333 South St, New York, NY 10002',
    lat: 40.7100,
    lng: -73.9900,
  },
  'Thomas Moore': {
    name: 'Thomas Moore',
    address: '444 North Ave, New York, NY 10031',
    lat: 40.8250,
    lng: -73.9450,
  },
  'Elizabeth Jackson': {
    name: 'Elizabeth Jackson',
    address: '666 Central Park West, New York, NY 10023',
    lat: 40.7812,
    lng: -73.9754,
  },
  'Christopher White': {
    name: 'Christopher White',
    address: '888 Columbus Ave, New York, NY 10024',
    lat: 40.7750,
    lng: -73.9760,
  },
  'Sarah Harris': {
    name: 'Sarah Harris',
    address: '101 Wall St, New York, NY 10005',
    lat: 40.7074,
    lng: -74.0080,
  },
  'Daniel Clark': {
    name: 'Daniel Clark',
    address: '202 Canal St, New York, NY 10013',
    lat: 40.7185,
    lng: -74.0015,
  },
  'Jessica Lewis': {
    name: 'Jessica Lewis',
    address: '303 Houston St, New York, NY 10014',
    lat: 40.7280,
    lng: -74.0020,
  },
  'Matthew Robinson': {
    name: 'Matthew Robinson',
    address: '404 Spring St, New York, NY 10012',
    lat: 40.7250,
    lng: -74.0030,
  },
  'Ashley Walker': {
    name: 'Ashley Walker',
    address: '505 Bleecker St, New York, NY 10014',
    lat: 40.7350,
    lng: -74.0040,
  },
  'William Thompson': {
    name: 'William Thompson',
    address: '606 Greenwich St, New York, NY 10014',
    lat: 40.7330,
    lng: -74.0070,
  },
  'Mary Young': {
    name: 'Mary Young',
    address: '707 Hudson St, New York, NY 10014',
    lat: 40.7340,
    lng: -74.0060,
  },
  'Richard Allen': {
    name: 'Richard Allen',
    address: '808 Washington St, New York, NY 10014',
    lat: 40.7320,
    lng: -74.0080,
  },
  'Barbara King': {
    name: 'Barbara King',
    address: '909 Waverly Pl, New York, NY 10003',
    lat: 40.7310,
    lng: -73.9970,
  },
  'Joseph Wright': {
    name: 'Joseph Wright',
    address: '1010 University Pl, New York, NY 10003',
    lat: 40.7330,
    lng: -73.9940,
  },
  'Susan Scott': {
    name: 'Susan Scott',
    address: '1111 Lafayette St, New York, NY 10003',
    lat: 40.7290,
    lng: -73.9920,
  },
  'Charles Green': {
    name: 'Charles Green',
    address: '1212 Mercer St, New York, NY 10012',
    lat: 40.7270,
    lng: -73.9980,
  },
};

// Mock appointments data
export const appointmentsData: Record<string, Array<{
  id: string;
  time: string;
  patientName: string;
  address: string;
  notes?: string;
  doctor: string;
  endTime: string;
}>> = {
  Monday: [
    {
      id: 'm1',
      time: '09:00',
      endTime: '09:30',
      patientName: 'John Smith',
      address: patientsDatabase['John Smith'].address,
      notes: 'Regular checkup',
      doctor: 'Dr. Sarah Johnson'
    },
    {
      id: 'm2',
      time: '10:30',
      endTime: '11:00',
      patientName: 'Maria Garcia',
      address: patientsDatabase['Maria Garcia'].address,
      notes: 'Follow-up appointment',
      doctor: 'Dr. Michael Chen'
    },
    {
      id: 'm3',
      time: '13:00',
      endTime: '13:45',
      patientName: 'Robert Williams',
      address: patientsDatabase['Robert Williams'].address,
      doctor: 'Dr. Sarah Johnson'
    },
    {
      id: 'm4',
      time: '15:00',
      endTime: '15:30',
      patientName: 'Emily Davis',
      address: patientsDatabase['Emily Davis'].address,
      doctor: 'Dr. Emily Rodriguez'
    },
  ],
  Tuesday: [
    {
      id: 't1',
      time: '08:30',
      endTime: '09:00',
      patientName: 'James Brown',
      address: patientsDatabase['James Brown'].address,
      doctor: 'Dr. Michael Chen'
    },
    {
      id: 't2',
      time: '11:00',
      endTime: '11:45',
      patientName: 'Patricia Miller',
      address: patientsDatabase['Patricia Miller'].address,
      notes: 'Consultation',
      doctor: 'Dr. Sarah Johnson'
    },
    {
      id: 't3',
      time: '14:00',
      endTime: '14:30',
      patientName: 'David Martinez',
      address: patientsDatabase['David Martinez'].address,
      doctor: 'Dr. Emily Rodriguez'
    },
  ],
  Wednesday: [
    {
      id: 'w1',
      time: '09:30',
      endTime: '10:00',
      patientName: 'Jennifer Wilson',
      address: patientsDatabase['Jennifer Wilson'].address,
      doctor: 'Dr. Michael Chen'
    },
    {
      id: 'w2',
      time: '11:30',
      endTime: '12:00',
      patientName: 'Michael Anderson',
      address: patientsDatabase['Michael Anderson'].address,
      doctor: 'Dr. Sarah Johnson'
    },
    {
      id: 'w3',
      time: '13:30',
      endTime: '14:00',
      patientName: 'Linda Taylor',
      address: patientsDatabase['Linda Taylor'].address,
      doctor: 'Dr. Emily Rodriguez'
    },
    {
      id: 'w4',
      time: '16:00',
      endTime: '16:30',
      patientName: 'Thomas Moore',
      address: patientsDatabase['Thomas Moore'].address,
      doctor: 'Dr. Michael Chen'
    },
  ],
  Thursday: [
    {
      id: 'th1',
      time: '08:00',
      endTime: '08:45',
      patientName: 'Elizabeth Jackson',
      address: patientsDatabase['Elizabeth Jackson'].address,
      doctor: 'Dr. Sarah Johnson'
    },
    {
      id: 'th2',
      time: '10:00',
      endTime: '10:30',
      patientName: 'Christopher White',
      address: patientsDatabase['Christopher White'].address,
      doctor: 'Dr. Emily Rodriguez'
    },
  ],
  Friday: [
    {
      id: 'f1',
      time: '09:00',
      endTime: '09:30',
      patientName: 'Sarah Harris',
      address: patientsDatabase['Sarah Harris'].address,
      doctor: 'Dr. Michael Chen'
    },
    {
      id: 'f2',
      time: '12:00',
      endTime: '12:30',
      patientName: 'Daniel Clark',
      address: patientsDatabase['Daniel Clark'].address,
      doctor: 'Dr. Sarah Johnson'
    },
    {
      id: 'f3',
      time: '15:30',
      endTime: '16:00',
      patientName: 'Jessica Lewis',
      address: patientsDatabase['Jessica Lewis'].address,
      doctor: 'Dr. Emily Rodriguez'
    },
  ],
  Saturday: [
    {
      id: 's1',
      time: '10:00',
      endTime: '10:45',
      patientName: 'Matthew Robinson',
      address: patientsDatabase['Matthew Robinson'].address,
      doctor: 'Dr. Michael Chen'
    },
  ],
  Sunday: [
    {
      id: 'su1',
      time: '11:00',
      endTime: '11:30',
      patientName: 'Ashley Walker',
      address: patientsDatabase['Ashley Walker'].address,
      notes: 'Emergency visit',
      doctor: 'Dr. Sarah Johnson'
    },
  ],
};

// List of all patients for autocomplete
export const patientsList = Object.keys(patientsDatabase);

// List of doctors for autocomplete
export const doctorsList = [
  'Dr. Sarah Johnson',
  'Dr. Michael Chen',
  'Dr. Emily Rodriguez',
  'Dr. David Thompson',
  'Dr. Jennifer Lee',
];

// Time slots for the schedule (8:00 AM to 5:00 PM in 30-minute intervals)
export const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00'
];
