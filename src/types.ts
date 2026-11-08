export type Language = 'SW' | 'EN';

export type CoachClass = 'classLuxury' | 'classSemiLuxury' | 'classExecutive';

export interface BusOperator {
  id: string;
  name: string;
  logo: string;
  busType: string;
  registrationNumber: string;
  classType: CoachClass;
  rating: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  features: string[];
  totalSeats: number;
  bookedSeats: number[];
  departureTerminal: string;
  arrivalTerminal: string;
}

export interface PassengerDetails {
  fullName: string;
  phone: string;
  gender: 'Mwanaume' | 'Mwanamke' | 'Male' | 'Female';
  nida: string;
  emergencyName?: string;
  emergencyPhone?: string;
  boardingPoint?: string;
}

export interface BookedTicket {
  pnr: string;
  bus: BusOperator;
  fromCity: string;
  toCity: string;
  travelDate: string;
  seats: number[];
  passenger: PassengerDetails;
  totalFare: number;
  transactionRef: string;
  paymentPhone: string;
  paymentDate: string;
  latraVerified: boolean;
}
