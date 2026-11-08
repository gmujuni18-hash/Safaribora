/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Bus, Calendar, MapPin, ShieldCheck, User, Phone, 
  CheckCircle2, ArrowRight, ArrowLeft, RefreshCw, Search, Ticket, 
  AlertCircle, Download, Clock, ChevronRight, Globe, Filter, Sparkles,
  Copy, Check, Share2, Printer, Wifi, Coffee, Tv, Shield
} from 'lucide-react';

// Hero images generated for authentic Tanzanian travel experience
const HERO_BUS_IMAGE = "/src/assets/images/hero_tanzania_bus_1794130353791.jpg";
const TERMINAL_IMAGE = "/src/assets/images/bus_terminal_magufuli_1794130353444.jpg";

// --- TRANSLATIONS DICTIONARY ---
const TRANSLATIONS = {
  SW: {
    appName: "SafariBora",
    tagline: "Mfumo wa Tiketi za Mabasi Tanzania",
    portalSubtitle: "Mfumo Rasmi wa LATRA wa Kukata Tiketi Mtandaoni",
    latraBadge: "Imethibitishwa na LATRA",
    allOperatorsNav: "Mabasi Yote",
    searchBusesNav: "Tafuta Safari",
    latraApproved: "LATRA Imethibitishwa",

    step1: "Tafuta Safari",
    step2: "Chagua Basi",
    step3: "Chagua Kiti",
    step4: "Taarifa za Abiria",
    step5: "Malipo ya Nauli",
    step6: "Tiketi Yako",

    // Step 1
    heroTitle: "Kata Tiketi Yako ya Basi Salama & Haraka",
    heroSubtitle: "Unganishwa na mabasi yote makuu ya mikoani Tanzania. Chagua viti kwa wakati halisi na uthibitishe malipo ya Lipa Namba papo hapo.",
    from: "Kutoka (Toke)",
    to: "Kwenda (Kufika)",
    travelDate: "Tarehe ya Safari",
    searchBtn: "Tafuta Safari za Mabasi",
    swapDestinations: "Badilisha Vituo",
    trustPoint1: "Daftari Rasmi la Abiria la LATRA",
    trustPoint2: "Uthibitisho wa Papo Hapo wa E-Ticket",
    trustPoint3: "Malipo Salama ya Lipa Namba: 352225438",
    popularRoutes: "Njia Mashuhuri Nchini",
    morningAfternoon: "Mabasi ya Asubuhi & Mchana",
    corridorLabel: "Njia Kuu",
    startingFrom: "Kuanzia",
    terminalCardKicker: "Kituo Kikuu cha Mabasi",
    terminalCardTitle: "Magufuli Bus Terminal (Mbezi Luis) - Dar es Salaam",
    terminalCardDesc: "Mabasi yote ya mikoani ya SafariBora huondokea kwenye maegesho rasmi na kupitia mfumo wa uthibitisho wa tiketi wa LATRA.",

    // Step 2
    selectedRouteLabel: "Njia uliyochagua",
    changeRouteBtn: "Badili Njia au Tarehe",
    allClasses: "Madaraja Yote",
    classLuxury: "Luxury Coach",
    classSemiLuxury: "Semi-Luxury",
    classExecutive: "VIP Royal Class",
    departureTime: "Kuondoka",
    arrivalTime: "Kufika",
    duration: "Muda",
    pricePerSeat: "Nauli kwa Kiti",
    seatsLeft: "viti vilivyobaki",
    selectSeatBtn: "Chagua Viti",

    // Step 3
    coachLayout: "Mpangilio wa Basi (2x2)",
    toWord: "kwenda",
    atTime: "Saa",
    perOneSeat: "kwa kiti kimoja",
    available: "Kiti Wazi",
    selected: "Ulichochagua",
    booked: "Kimechukuliwa",
    driver: "Dereva",
    door: "Mlango",
    busRear: "Mwisho wa Basi",
    seatsSelected: "Viti vilivyochaguliwa",
    pleaseSelectSeats: "Tafadhali chagua kiti kimoja au zaidi...",
    totalFare: "Jumla ya Nauli",
    backBtn: "Rudi Nyuma",
    proceedToManifest: "Endelea Kwenye Taarifa za Abiria",

    // Step 4
    latraManifest: "Daftari la Abiria (LATRA Compliance)",
    latraSubtitle: "Taarifa hizi zinahitajika kisheria na LATRA kwa ajili ya usalama, daftari rasmi na bima ya safari.",
    fullName: "Jina Kamili la Abiria",
    fullNamePlaceholder: "mf. Juma Hamisi Rashid",
    phone: "Namba ya Simu ya Abiria",
    phonePlaceholder: "07XXXXXXXX au 06XXXXXXXX",
    gender: "Jinsia",
    male: "Mwanaume",
    female: "Mwanamke",
    nida: "Namba ya NIDA / Kitambulisho / Pasipoti",
    nidaPlaceholder: "Namba ya NIDA au Pasipoti (Sio Lazima)",
    emergencyName: "Jina la Mtu wa Dharura / Mlezi",
    emergencyNamePlaceholder: "Mtu wa kuwasiliana naye ikitokea dharura",
    emergencyPhone: "Simu ya Mtu wa Dharura",
    emergencyPhonePlaceholder: "07XXXXXXXX",
    boardingPoint: "Kituo cha Kupandia",
    proceedToPayment: "Endelea Kwenye Malipo",
    alertNamePhone: "Tafadhali jaza Jina Kamili na Namba ya Simu!",

    // Step 5
    selectPayment: "Maelekezo ya Kulipia Nauli Kupitia Lipa Namba",
    manualPayInstruction: "Tafadhali tuma nauli kamili kupitia Lipa Namba (M-Pesa, Tigo Pesa, Airtel Money au HaloPesa):",
    totalPayableLabel: "Jumla ya Nauli Unayopaswa Kutuma",
    seatsBadge: "Viti",
    merchantCardTitle: "Lipa Namba ya Biashara (Merchant)",
    allNetworksTz: "Mitandao Yote Tanzania",
    lipaNambaLabel: "Lipa Namba (M-Pesa / Tigo Pesa / Airtel / HaloPesa):",
    targetPhone: "352225438",
    targetName: "SafariBora / EMILSON",
    copyNumber: "Nakili Lipa Namba",
    copied: "Imenakiliwa!",
    businessNameLabel: "Jina la Biashara (Hakiki):",
    nameVerifyPrompt: "Hakikisha jina linalotokea kwenye simu yako wakati wa kulipa ni SafariBora au EMILSON kabla ya kuweka PIN.",
    ussdGuide: "Bofya hapa chini kufungua menyu ya mtandao wako moja kwa moja:",
    mpesaName: "Vodacom M-Pesa",
    tigoName: "Tigo Pesa",
    airtelName: "Airtel Money",
    senderPhoneLabel: "Namba ya Simu Uliyotuma Nayo Fedha",
    txnRefLabel: "Kumbukumbu ya Muamala / Transaction ID",
    requiredBadge: "*Lazima",
    txnRefPlaceholder: "mf. 8HG92KL81Z au 9A82B1736",
    txnHelpText: "Weka namba ya kumbukumbu (Transaction ID) uliyotumiwa kwa SMS baada ya kulipia kwenda Lipa Namba 352225438 (SafariBora / EMILSON).",
    alertTxn: "Tafadhali weka namba halali ya muamala (Transaction ID)!",
    verifyingTitle: "Inathibitisha Muamala...",
    verifyingSubtitle: "Inahakiki muamala na mtandao wa simu...",
    verifyStep1: "Kuunganisha na mtandao wa malipo...",
    verifyStep2: "Kuthibitisha muamala wa Lipa Namba 352225438 (SafariBora / EMILSON)...",
    verifyStep3: "Kusajili abiria kwenye daftari la LATRA na kutoa PNR...",
    verifyPaymentBtn: "Thibitisha na Upokee Tiketi",

    // Step 6
    ticketConfirmed: "Hongera! Tiketi Yako Imethibitishwa",
    smsReceiptNotice: "Ujumbe wa SMS na risiti umetumwa kwa namba",
    pnrLabel: "Namba ya Kumbukumbu (PNR)",
    latraVerifiedBadge: "LATRA Imethibitishwa & Halali",
    busAndCompany: "Basi & Kampuni",
    departureTimeLabel: "Muda wa Kuondoka",
    passengerNameLabel: "Jina la Abiria",
    seatsLabel: "Viti Vyako",
    totalFareLabel: "Jumla ya Nauli",
    passengerPhoneLabel: "Namba ya Simu",
    ticketInstruction: "Tafadhali onyesha tiketi hii au namba ya PNR wakati wa kupanda basi.",
    paymentVerifiedNote: "Malipo yamethibitishwa kupitia Lipa Namba 352225438 (SafariBora / EMILSON) chini ya utaratibu wa LATRA.",
    printTicket: "Pakua Tiketi (PDF)",
    bookAnother: "Kata Tiketi Nyingine",

    // Modal
    trackTicket: "Kagua Tiketi Yako",
    trackModalDesc: "Weka namba yako ya PNR (mf. SB-849201) kupata tiketi yako au chagua kutoka tiketi zilizopita:",
    searchPnrBtn: "Tafuta Tiketi kwa PNR",
    recentBookings: "Tiketi Zilizopita",
    seatsWord: "Viti",

    // Footer
    footerTagline: "Mfumo Rasmi wa Tiketi za Mabasi Tanzania • LATRA E-Ticketing Compliant Platform",
    footerPaymentInfo: "Malipo yote yanakubaliwa kwa usalama kupitia Lipa Namba 352225438 (SafariBora / EMILSON) kwa mitandao yote ya M-Pesa, Tigo Pesa, na Airtel Money.",
    allRightsReserved: "Haki zote zimehifadhiwa."
  },

  EN: {
    appName: "SafariBora",
    tagline: "Tanzania Intercity Bus Ticketing",
    portalSubtitle: "Official LATRA Compliant E-Ticketing Portal",
    latraBadge: "LATRA Certified Portal",
    allOperatorsNav: "All Operators",
    searchBusesNav: "Search Buses",
    latraApproved: "LATRA Approved",

    step1: "Search Trip",
    step2: "Select Bus",
    step3: "Select Seats",
    step4: "Passenger Details",
    step5: "Payment",
    step6: "E-Ticket",

    // Step 1
    heroTitle: "Book Your Tanzania Bus Ticket Safely & Quickly",
    heroSubtitle: "Connect directly with all premier intercity bus operators in Tanzania. Select live coach seats and confirm your Lipa Namba mobile payment instantly.",
    from: "Departure (From)",
    to: "Destination (To)",
    travelDate: "Travel Date",
    searchBtn: "Search Available Buses",
    swapDestinations: "Swap Destinations",
    trustPoint1: "Official LATRA Passenger Manifest",
    trustPoint2: "Instant E-Ticket & Boarding Pass",
    trustPoint3: "Secure Lipa Namba Payment: 352225438",
    popularRoutes: "Popular Bus Corridors",
    morningAfternoon: "Morning & Afternoon Services",
    corridorLabel: "Corridor",
    startingFrom: "From",
    terminalCardKicker: "Main Transport Hub",
    terminalCardTitle: "Magufuli Bus Terminal (Mbezi Luis) - Dar es Salaam",
    terminalCardDesc: "All SafariBora intercity buses depart from authorized platforms with official LATRA digital passenger manifest verification.",

    // Step 2
    selectedRouteLabel: "Selected Route",
    changeRouteBtn: "Change Route or Date",
    allClasses: "All Classes",
    classLuxury: "Luxury Coach",
    classSemiLuxury: "Semi-Luxury",
    classExecutive: "VIP Royal Class",
    departureTime: "Departure",
    arrivalTime: "Arrival",
    duration: "Duration",
    pricePerSeat: "Fare per Seat",
    seatsLeft: "seats remaining",
    selectSeatBtn: "Select Seats",

    // Step 3
    coachLayout: "Coach Seat Layout (2x2)",
    toWord: "to",
    atTime: "at",
    perOneSeat: "per single seat",
    available: "Available",
    selected: "Selected",
    booked: "Booked",
    driver: "Driver",
    door: "Door",
    busRear: "Rear of Bus",
    seatsSelected: "Selected Seats",
    pleaseSelectSeats: "Please select one or more seats...",
    totalFare: "Total Fare",
    backBtn: "Go Back",
    proceedToManifest: "Proceed to Passenger Details",

    // Step 4
    latraManifest: "Passenger Manifest (LATRA Compliance)",
    latraSubtitle: "Mandatory passenger details as required by Tanzanian law (LATRA) for passenger manifest, safety, and travel insurance.",
    fullName: "Full Passenger Name",
    fullNamePlaceholder: "e.g. Juma Hamisi Rashid",
    phone: "Passenger Phone Number",
    phonePlaceholder: "07XXXXXXXX or 06XXXXXXXX",
    gender: "Gender",
    male: "Male",
    female: "Female",
    nida: "NIDA / National ID / Passport No.",
    nidaPlaceholder: "NIDA Number or Passport (Optional)",
    emergencyName: "Emergency Contact Name",
    emergencyNamePlaceholder: "Contact person in case of emergency",
    emergencyPhone: "Emergency Contact Phone",
    emergencyPhonePlaceholder: "07XXXXXXXX",
    boardingPoint: "Boarding Terminal / Point",
    proceedToPayment: "Proceed to Payment Instructions",
    alertNamePhone: "Please provide full Passenger Name and Phone Number!",

    // Step 5
    selectPayment: "Payment Instructions via Lipa Namba",
    manualPayInstruction: "Please transfer the exact fare using Lipa Namba through M-Pesa, Tigo Pesa, Airtel Money, or HaloPesa:",
    totalPayableLabel: "Total Fare Payable",
    seatsBadge: "Seats",
    merchantCardTitle: "Business Lipa Namba (Merchant)",
    allNetworksTz: "All Tanzania Networks",
    lipaNambaLabel: "Lipa Namba (M-Pesa / Tigo Pesa / Airtel / HaloPesa):",
    targetPhone: "352225438",
    targetName: "SafariBora / EMILSON",
    copyNumber: "Copy Lipa Namba",
    copied: "Copied!",
    businessNameLabel: "Registered Business Name (Verify):",
    nameVerifyPrompt: "Ensure the business name displayed on your mobile screen shows SafariBora or EMILSON before confirming your PIN.",
    ussdGuide: "Click below to quickly launch your mobile money USSD menu:",
    mpesaName: "Vodacom M-Pesa",
    tigoName: "Tigo Pesa",
    airtelName: "Airtel Money",
    senderPhoneLabel: "Sender Mobile Phone Number",
    txnRefLabel: "Transaction Reference ID",
    requiredBadge: "*Required",
    txnRefPlaceholder: "e.g. 8HG92KL81Z or 9A82B1736",
    txnHelpText: "Enter the Transaction Reference ID received via SMS after sending payment to Lipa Namba 352225438 (SafariBora / EMILSON).",
    alertTxn: "Please enter a valid Transaction Reference ID!",
    verifyingTitle: "Verifying Mobile Money Transaction...",
    verifyingSubtitle: "Confirming transaction with mobile network...",
    verifyStep1: "Connecting to mobile money payment gateway...",
    verifyStep2: "Verifying transaction for Lipa Namba 352225438 (SafariBora / EMILSON)...",
    verifyStep3: "Registering passenger in LATRA manifest and generating official PNR...",
    verifyPaymentBtn: "Submit Reference & Issue Ticket",

    // Step 6
    ticketConfirmed: "Congratulations! Ticket Confirmed",
    smsReceiptNotice: "SMS confirmation & digital receipt sent to",
    pnrLabel: "Booking Reference (PNR)",
    latraVerifiedBadge: "LATRA Verified & Compliant",
    busAndCompany: "Bus Coach & Operator",
    departureTimeLabel: "Departure Time",
    passengerNameLabel: "Passenger Name",
    seatsLabel: "Your Seats",
    totalFareLabel: "Total Fare Paid",
    passengerPhoneLabel: "Phone Number",
    ticketInstruction: "Please present this boarding pass or PNR reference when boarding the coach.",
    paymentVerifiedNote: "Payment verified via Lipa Namba 352225438 (SafariBora / EMILSON) in full compliance with LATRA regulations.",
    printTicket: "Download / Print Ticket",
    bookAnother: "Book Another Journey",

    // Modal
    trackTicket: "Track Existing Ticket",
    trackModalDesc: "Enter your PNR code (e.g. SB-849201) to retrieve your boarding pass or choose from recent bookings:",
    searchPnrBtn: "Search Ticket by PNR",
    recentBookings: "Recent Bookings",
    seatsWord: "Seats",

    // Footer
    footerTagline: "Official Tanzania Intercity Bus E-Ticketing System • LATRA Compliant Platform",
    footerPaymentInfo: "All bus fares securely processed through Lipa Namba 352225438 (SafariBora / EMILSON) across M-Pesa, Tigo Pesa, and Airtel Money.",
    allRightsReserved: "All rights reserved."
  }
};

// Feature bilingual dictionary
const FEATURE_TRANSLATIONS: Record<string, { SW: string; EN: string }> = {
  'AC': { SW: 'Kiyoyozi (AC)', EN: 'Air Conditioning' },
  'Free WiFi': { SW: 'WiFi ya Bure', EN: 'Free WiFi' },
  'Charging Ports': { SW: 'Chaja ya Simu', EN: 'Charging Ports' },
  'Water & Snack': { SW: 'Maji & Vitafunio', EN: 'Water & Snack' },
  'Emergency Exit': { SW: 'Mlango wa Dharura', EN: 'Emergency Exit' },
  '2x1 Luxury Reclining Seats': { SW: 'Viti vya Kulala (2x1 VIP)', EN: '2x1 Luxury Reclining Seats' },
  'Personal Screen TV': { SW: 'Runinga Binafsi (TV)', EN: 'Personal TV Screen' },
  'Free Lunch Box': { SW: 'Chakula cha Mchana Bure', EN: 'Complimentary Lunch Box' },
  'USB-C Charging': { SW: 'Chaja ya USB-C', EN: 'USB-C Charging' },
  'Audio Music System': { SW: 'Mfumo wa Muziki', EN: 'Audio Music System' },
  'Spacious Legroom': { SW: 'Nafasi Kubwa ya Miguu', EN: 'Spacious Legroom' },
  'Standard AC': { SW: 'Kiyoyozi Sanifu', EN: 'Standard AC' },
  'Luggage Compartment Support': { SW: 'Hifadhi ya Mizigo', EN: 'Luggage Compartment' },
  'Soft Seats': { SW: 'Viti Lainishi', EN: 'Comfort Soft Seats' },
  'VIP Recliner': { SW: 'Viti vya Kulala VIP', EN: 'VIP Recliner' },
  'Air Suspension': { SW: 'Mfumo wa Air Suspension', EN: 'Air Suspension' },
  'WiFi 5G': { SW: 'WiFi ya 5G ya Kasi', EN: 'High-speed 5G WiFi' },
  'Free Water & Biscuits': { SW: 'Maji & Biskuti Bure', EN: 'Free Water & Biscuits' },
  'Modern AC': { SW: 'Kiyoyozi cha Kisasa', EN: 'Modern AC' },
  'Charging Socket per Seat': { SW: 'Soketi ya Chaja Kila Kiti', EN: 'Charging Socket per Seat' },
  'Comfort Headrest': { SW: 'Kiegemeo cha Kichwa', EN: 'Comfort Headrest' }
};

type Language = 'SW' | 'EN';
type CoachClass = 'classLuxury' | 'classSemiLuxury' | 'classExecutive';

interface BusOperator {
  id: string;
  name: string;
  logo: string;
  busType: string;
  registrationNumber: string;
  classType: CoachClass;
  rating: string;
  departureTime: string;
  arrivalTime: string;
  duration: { SW: string; EN: string };
  price: number;
  features: string[];
  totalSeats: number;
  bookedSeats: number[];
  departureTerminal: { SW: string; EN: string };
  arrivalTerminal: { SW: string; EN: string };
}

interface PassengerDetails {
  fullName: string;
  phone: string;
  gender: string;
  nida: string;
  emergencyName?: string;
  emergencyPhone?: string;
  boardingPoint?: string;
}

interface BookedTicket {
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
}

const CITIES = [
  "Dar es Salaam (Magufuli Terminal)",
  "Arusha (Kilombero)",
  "Mwanza (Nyegezi)",
  "Mbeya (Nanenane)",
  "Dodoma (Nane Nane Terminal)",
  "Tanga (Kizingo)",
  "Moshi (Kilimanjaro)",
  "Morogoro (Msamvu)",
  "Iringa (Msamvu Mjini)",
  "Kigoma",
  "Bukoba",
  "Singida",
  "Tabora",
  "Mtwara"
];

const BUS_OPERATORS: BusOperator[] = [
  {
    id: 'op1',
    name: 'Kilimanjaro Express',
    logo: '🏔️',
    busType: 'Scania Marcopolo G7',
    registrationNumber: 'T 381 DZM',
    classType: 'classLuxury',
    rating: '4.8',
    departureTime: '06:00 AM',
    arrivalTime: '03:30 PM',
    duration: { SW: 'Saa 9 na dk 30', EN: '9h 30m' },
    price: 45000,
    features: ['AC', 'Free WiFi', 'Charging Ports', 'Water & Snack', 'Emergency Exit'],
    totalSeats: 44,
    bookedSeats: [3, 4, 7, 12, 13, 14, 21, 22, 30, 31],
    departureTerminal: { SW: 'Kituo Kikuu cha Magufuli (Mbezi Luis)', EN: 'Magufuli Bus Terminal (Mbezi Luis)' },
    arrivalTerminal: { SW: 'Kituo Kikuu cha Kilombero, Arusha', EN: 'Kilombero Central Stand, Arusha' }
  },
  {
    id: 'op2',
    name: 'Dar Express',
    logo: '🦁',
    busType: 'Yutong F12 Plus High Deck',
    registrationNumber: 'T 592 EFK',
    classType: 'classExecutive',
    rating: '4.9',
    departureTime: '06:30 AM',
    arrivalTime: '03:45 PM',
    duration: { SW: 'Saa 9 na dk 15', EN: '9h 15m' },
    price: 50000,
    features: ['2x1 Luxury Reclining Seats', 'AC', 'Personal Screen TV', 'Free Lunch Box', 'USB-C Charging'],
    totalSeats: 40,
    bookedSeats: [1, 2, 5, 8, 9, 18, 19, 20, 35],
    departureTerminal: { SW: 'Kituo Kikuu cha Magufuli (Mbezi Luis)', EN: 'Magufuli Bus Terminal (Mbezi Luis)' },
    arrivalTerminal: { SW: 'Kituo Kikuu cha Mabasi Arusha', EN: 'Arusha Central Bus Stand' }
  },
  {
    id: 'op3',
    name: 'Katarama Luxury',
    logo: '⚡',
    busType: 'Zhongtong Golden Dragon',
    registrationNumber: 'T 741 DQL',
    classType: 'classSemiLuxury',
    rating: '4.6',
    departureTime: '07:00 AM',
    arrivalTime: '04:15 PM',
    duration: { SW: 'Saa 9 na dk 15', EN: '9h 15m' },
    price: 38000,
    features: ['AC', 'USB Charging', 'Audio Music System', 'Spacious Legroom'],
    totalSeats: 44,
    bookedSeats: [10, 11, 15, 16, 25, 26, 27, 40],
    departureTerminal: { SW: 'Kituo Kikuu cha Magufuli (Bay 14)', EN: 'Magufuli Bus Terminal (Bay 14)' },
    arrivalTerminal: { SW: 'Kituo cha Kilombero Stand', EN: 'Kilombero Stand' }
  },
  {
    id: 'op4',
    name: 'Tilisho Safari',
    logo: '🐘',
    busType: 'Higer Bus Coach Royal',
    registrationNumber: 'T 119 EAB',
    classType: 'classSemiLuxury',
    rating: '4.5',
    departureTime: '08:00 AM',
    arrivalTime: '05:00 PM',
    duration: { SW: 'Saa 9 kamili', EN: '9h 00m' },
    price: 35000,
    features: ['Standard AC', 'Luggage Compartment Support', 'Soft Seats'],
    totalSeats: 44,
    bookedSeats: [2, 6, 9, 17, 33, 34],
    departureTerminal: { SW: 'Kituo Kikuu cha Magufuli', EN: 'Magufuli Bus Terminal' },
    arrivalTerminal: { SW: 'Kituo cha Mabasi Arusha', EN: 'Arusha Bus Terminal' }
  },
  {
    id: 'op5',
    name: 'Shabiby Line',
    logo: '⭐',
    busType: 'Scania High Touring Marco Polo',
    registrationNumber: 'T 842 DFJ',
    classType: 'classExecutive',
    rating: '4.9',
    departureTime: '06:15 AM',
    arrivalTime: '03:15 PM',
    duration: { SW: 'Saa 9 kamili', EN: '9h 00m' },
    price: 48000,
    features: ['VIP Recliner', 'Air Suspension', 'WiFi 5G', 'Free Water & Biscuits'],
    totalSeats: 44,
    bookedSeats: [1, 4, 8, 12, 19, 23, 29, 36],
    departureTerminal: { SW: 'Kituo cha Magufuli (Bay 04)', EN: 'Magufuli Terminal (Bay 04)' },
    arrivalTerminal: { SW: 'Kilombero Stand, Arusha', EN: 'Kilombero Arusha' }
  },
  {
    id: 'op6',
    name: 'BM Coach',
    logo: '🦅',
    busType: 'Marcopolo Generation 8 Scania',
    registrationNumber: 'T 230 EGZ',
    classType: 'classLuxury',
    rating: '4.7',
    departureTime: '07:30 AM',
    arrivalTime: '04:45 PM',
    duration: { SW: 'Saa 9 na dk 15', EN: '9h 15m' },
    price: 42000,
    features: ['Modern AC', 'Charging Socket per Seat', 'Comfort Headrest'],
    totalSeats: 44,
    bookedSeats: [5, 6, 14, 15, 20, 21, 38],
    departureTerminal: { SW: 'Kituo Kikuu cha Magufuli', EN: 'Magufuli Bus Terminal' },
    arrivalTerminal: { SW: 'Kituo cha Mabasi Arusha', EN: 'Arusha Bus Stand' }
  }
];

export default function App() {
  const [lang, setLang] = useState<Language>('SW');
  const t = TRANSLATIONS[lang];

  // Stage state (1-6)
  const [currentStage, setCurrentStage] = useState(1);

  // Search Inputs
  const [fromCity, setFromCity] = useState("Dar es Salaam (Magufuli Terminal)");
  const [toCity, setToCity] = useState("Arusha (Kilombero)");
  const [travelDate, setTravelDate] = useState("2026-11-15");

  // Selection state
  const [selectedBus, setSelectedBus] = useState<BusOperator | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [classFilter, setClassFilter] = useState<string>('all');

  // Passenger details
  const [passengerDetails, setPassengerDetails] = useState<PassengerDetails>({
    fullName: '',
    phone: '',
    gender: 'Mwanaume',
    nida: '',
    emergencyName: '',
    emergencyPhone: '',
    boardingPoint: 'Magufuli Bus Terminal (Mbezi Luis)'
  });

  // Payment details
  const [paymentPhone, setPaymentPhone] = useState('');
  const [transactionRef, setTransactionRef] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [verificationStep, setVerificationStep] = useState(1);
  const [pnrCode, setPnrCode] = useState('');
  const [copiedNumber, setCopiedNumber] = useState(false);

  // Lookup modal & stored history
  const [lookupPnr, setLookupPnr] = useState('');
  const [showLookupModal, setShowLookupModal] = useState(false);
  const [savedTickets, setSavedTickets] = useState<BookedTicket[]>([]);

  // Synchronize gender default with language change if still on default
  useEffect(() => {
    if (passengerDetails.gender === 'Mwanaume' && lang === 'EN') {
      setPassengerDetails(prev => ({ ...prev, gender: 'Male' }));
    } else if (passengerDetails.gender === 'Male' && lang === 'SW') {
      setPassengerDetails(prev => ({ ...prev, gender: 'Mwanaume' }));
    } else if (passengerDetails.gender === 'Mwanamke' && lang === 'EN') {
      setPassengerDetails(prev => ({ ...prev, gender: 'Female' }));
    } else if (passengerDetails.gender === 'Female' && lang === 'SW') {
      setPassengerDetails(prev => ({ ...prev, gender: 'Mwanamke' }));
    }
  }, [lang]);

  // Load saved tickets from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('safaribora_tickets');
      if (stored) {
        setSavedTickets(JSON.parse(stored));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStage]);

  const handleShortcutSearch = (from: string, to: string) => {
    setFromCity(from);
    setToCity(to);
    setCurrentStage(2);
  };

  const handleSwapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleSeatClick = (seatNo: number, isBooked: boolean) => {
    if (isBooked) return;
    if (selectedSeats.includes(seatNo)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatNo));
    } else {
      setSelectedSeats([...selectedSeats, seatNo]);
    }
  };

  const handlePassengerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passengerDetails.fullName.trim() || !passengerDetails.phone.trim()) {
      alert(t.alertNamePhone);
      return;
    }
    setCurrentStage(5);
  };

  const copyLipaNamba = () => {
    navigator.clipboard.writeText(t.targetPhone);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2200);
  };

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionRef || transactionRef.trim().length < 5) {
      alert(t.alertTxn);
      return;
    }
    setIsProcessingPayment(true);
    setVerificationStep(1);

    // Simulated multi-step LATRA and mobile money verification
    setTimeout(() => setVerificationStep(2), 600);
    setTimeout(() => setVerificationStep(3), 1200);

    setTimeout(() => {
      const generatedPNR = 'SB-' + Math.floor(100000 + Math.random() * 900000);
      setIsProcessingPayment(false);
      setPnrCode(generatedPNR);

      // Save ticket in history
      if (selectedBus) {
        const localeString = lang === 'SW' ? 'sw-TZ' : 'en-GB';
        const newTicket: BookedTicket = {
          pnr: generatedPNR,
          bus: selectedBus,
          fromCity,
          toCity,
          travelDate,
          seats: selectedSeats,
          passenger: passengerDetails,
          totalFare: calculateTotal(),
          transactionRef: transactionRef.toUpperCase(),
          paymentPhone: paymentPhone || passengerDetails.phone,
          paymentDate: new Date().toLocaleDateString(localeString, { 
            year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
          })
        };

        const updated = [newTicket, ...savedTickets];
        setSavedTickets(updated);
        try {
          localStorage.setItem('safaribora_tickets', JSON.stringify(updated));
        } catch {
          // ignore
        }
      }

      setCurrentStage(6);
    }, 1800);
  };

  const handleSelectPastTicket = (ticket: BookedTicket) => {
    setSelectedBus(ticket.bus);
    setSelectedSeats(ticket.seats);
    setFromCity(ticket.fromCity);
    setToCity(ticket.toCity);
    setTravelDate(ticket.travelDate);
    setPassengerDetails(ticket.passenger);
    setTransactionRef(ticket.transactionRef);
    setPaymentPhone(ticket.paymentPhone);
    setPnrCode(ticket.pnr);
    setShowLookupModal(false);
    setCurrentStage(6);
  };

  const calculateTotal = () => {
    if (!selectedBus) return 0;
    return selectedBus.price * selectedSeats.length;
  };

  const filteredBuses = BUS_OPERATORS.filter(b => {
    if (classFilter === 'all') return true;
    return b.classType === classFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-amber-400 selection:text-emerald-950">
      
      {/* HEADER / NAVIGATION (Top Bar Contract: 3-zone, clean typography) */}
      <header className="bg-emerald-900 text-white shadow-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-6">
          
          {/* Zone 1: Wordmark */}
          <div 
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => setCurrentStage(1)}
          >
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-black shadow-sm">
              <Bus className="w-6 h-6 stroke-[2.4]" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-white flex items-center leading-none">
                Safari<span className="text-amber-400">Bora</span>
              </span>
              <span className="text-[11px] font-semibold text-emerald-300 block tracking-wide mt-0.5">
                {t.tagline}
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-emerald-100">
            <button 
              onClick={() => setCurrentStage(1)}
              className="hover:text-amber-300 transition-colors whitespace-nowrap cursor-pointer"
            >
              {t.searchBusesNav}
            </button>
            <button 
              onClick={() => {
                if (currentStage === 1) setCurrentStage(2);
                else setCurrentStage(1);
              }}
              className="hover:text-amber-300 transition-colors whitespace-nowrap cursor-pointer"
            >
              {t.allOperatorsNav}
            </button>
            <div className="flex items-center gap-1.5 text-emerald-300/80">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{t.latraApproved}</span>
            </div>
          </nav>

          {/* Zone 3: Actions (Track Ticket & Language Switch) */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setShowLookupModal(true)}
              className="text-xs font-bold bg-emerald-800/80 hover:bg-emerald-700 text-white px-3 py-2 rounded-xl border border-emerald-700 flex items-center gap-1.5 transition shadow-sm cursor-pointer"
            >
              <Ticket className="w-4 h-4 text-amber-400" />
              <span>{t.trackTicket}</span>
              {savedTickets.length > 0 && (
                <span className="bg-amber-400 text-emerald-950 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center ml-0.5">
                  {savedTickets.length}
                </span>
              )}
            </button>

            {/* Language Switcher Button */}
            <button
              onClick={() => setLang(lang === 'SW' ? 'EN' : 'SW')}
              className="flex items-center gap-1.5 bg-emerald-950/70 hover:bg-emerald-950 text-amber-300 px-3 py-2 rounded-xl text-xs font-bold border border-amber-400/40 transition cursor-pointer"
              title={lang === 'SW' ? "Switch to English" : "Badili kwenda Kiswahili"}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'SW' ? 'English' : 'Kiswahili'}</span>
            </button>
          </div>

        </div>
      </header>

      {/* STEP PROGRESS NAVIGATION */}
      <nav className="bg-white border-b border-slate-200 shadow-sm py-2.5 px-4 sticky top-[61px] z-30">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-xs font-medium overflow-x-auto gap-2 py-0.5">
          {[
            { step: 1, label: t.step1 },
            { step: 2, label: t.step2 },
            { step: 3, label: t.step3 },
            { step: 4, label: t.step4 },
            { step: 5, label: t.step5 },
            { step: 6, label: t.step6 }
          ].map((item, idx) => (
            <div key={item.step} className="flex items-center shrink-0">
              <button 
                onClick={() => {
                  if (item.step < currentStage) setCurrentStage(item.step);
                }}
                disabled={item.step > currentStage}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all text-left ${
                  currentStage === item.step 
                    ? 'bg-amber-500 text-white font-bold shadow-sm' 
                    : currentStage > item.step 
                    ? 'bg-emerald-100 text-emerald-900 font-semibold hover:bg-emerald-200 cursor-pointer' 
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  currentStage === item.step 
                    ? 'bg-emerald-950 text-white' 
                    : currentStage > item.step 
                    ? 'bg-emerald-800 text-white' 
                    : 'bg-slate-200 text-slate-500'
                }`}>
                  {currentStage > item.step ? '✓' : item.step}
                </span>
                <span className="whitespace-nowrap">{item.label}</span>
              </button>
              {idx < 5 && <ChevronRight className="w-4 h-4 text-slate-300 mx-1 shrink-0" />}
            </div>
          ))}
        </div>
      </nav>

      {/* MAIN VIEWPORT BODY */}
      <main className="flex-grow max-w-5xl w-full mx-auto p-4 sm:p-6 md:p-8">

        {/* ========================================================================= */}
        {/* STAGE 1: SEARCH & POPULAR CORRIDORS */}
        {/* ========================================================================= */}
        {currentStage === 1 && (
          <div className="space-y-8">
            
            {/* HERO CARD WITH BACKGROUND VISUAL & SEARCH FORM */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-emerald-800 bg-emerald-950 text-white">
              
              {/* Cinematic bus backdrop */}
              <div className="absolute inset-0 z-0 opacity-25">
                <img 
                  src={HERO_BUS_IMAGE} 
                  alt="Tanzania intercity express bus" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/90 to-emerald-900/80" />
              </div>

              <div className="relative z-10 p-6 sm:p-8 md:p-10 space-y-6">
                
                {/* Header text with LATRA badge */}
                <div className="max-w-2xl space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>{t.latraBadge}</span>
                    <span className="text-emerald-400">·</span>
                    <span>Lipa Namba: 352225438</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                    {t.heroTitle}
                  </h1>
                  <p className="text-emerald-200 text-sm sm:text-base leading-relaxed">
                    {t.heroSubtitle}
                  </p>
                </div>

                {/* SEARCH FORM CONTAINER */}
                <div className="bg-white rounded-2xl p-5 sm:p-6 text-slate-800 shadow-xl border border-slate-100 space-y-4">
                  
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
                    
                    {/* FROM CITY */}
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-xs font-bold uppercase text-slate-500 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-500" /> {t.from}
                      </label>
                      <select 
                        value={fromCity} 
                        onChange={(e) => setFromCity(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-600 transition"
                      >
                        {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>

                    {/* SWAP BUTTON */}
                    <div className="hidden md:flex items-center justify-center pb-2">
                      <button
                        type="button"
                        onClick={handleSwapCities}
                        className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition border border-slate-200 cursor-pointer"
                        title={t.swapDestinations}
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>

                    {/* TO CITY */}
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-xs font-bold uppercase text-slate-500 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {t.to}
                      </label>
                      <select 
                        value={toCity} 
                        onChange={(e) => setToCity(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-600 transition"
                      >
                        {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>

                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end pt-1">
                    
                    {/* TRAVEL DATE */}
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-xs font-bold uppercase text-slate-500 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-500" /> {t.travelDate}
                      </label>
                      <input 
                        type="date" 
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-600 transition"
                      />
                    </div>

                    {/* SUBMIT BUTTON */}
                    <div>
                      <button
                        onClick={() => setCurrentStage(2)}
                        className="w-full bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-emerald-950 font-black py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
                      >
                        <Search className="w-5 h-5 stroke-[2.5]" />
                        <span>{t.searchBtn}</span>
                      </button>
                    </div>

                  </div>

                </div>

                {/* TRUST VALUE PROP STRIP */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs text-emerald-200">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{t.trustPoint1}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{t.trustPoint2}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{t.trustPoint3}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* QUICK CORRIDORS */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" /> {t.popularRoutes}
                </h3>
                <span className="text-xs text-slate-500">{t.morningAfternoon}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { from: "Dar es Salaam (Magufuli Terminal)", to: "Arusha (Kilombero)", fare: "45,000 TZS" },
                  { from: "Dar es Salaam (Magufuli Terminal)", to: "Mwanza (Nyegezi)", fare: "55,000 TZS" },
                  { from: "Dar es Salaam (Magufuli Terminal)", to: "Mbeya (Nanenane)", fare: "48,000 TZS" },
                  { from: "Arusha (Kilombero)", to: "Dodoma (Nane Nane Terminal)", fare: "35,000 TZS" }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleShortcutSearch(item.from, item.to)}
                    className="bg-white border border-slate-200 hover:border-emerald-500 p-3.5 rounded-2xl text-left transition shadow-sm hover:shadow-md cursor-pointer group"
                  >
                    <span className="text-[10px] font-bold text-amber-600 uppercase block tracking-wider">
                      {t.corridorLabel}
                    </span>
                    <span className="text-xs font-black text-slate-800 block truncate group-hover:text-emerald-800 transition-colors">
                      {item.from.split(' ')[0]} → {item.to.split(' ')[0]}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 block mt-1">
                      {t.startingFrom} {item.fare}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* TERMINAL HIGHLIGHT */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col md:flex-row items-center gap-5">
              <img 
                src={TERMINAL_IMAGE} 
                alt="Magufuli Bus Terminal Dar es Salaam" 
                className="w-full md:w-48 h-28 object-cover rounded-xl"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1 text-center md:text-left">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                  {t.terminalCardKicker}
                </span>
                <h4 className="font-extrabold text-slate-900 text-base">
                  {t.terminalCardTitle}
                </h4>
                <p className="text-xs text-slate-600 max-w-xl">
                  {t.terminalCardDesc}
                </p>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* STAGE 2: BUS SELECTION */}
        {/* ========================================================================= */}
        {currentStage === 2 && (
          <div className="space-y-6">
            
            {/* SEARCH ROUTE SUMMARY & CHANGE BAR */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm gap-3">
              <div>
                <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">
                  {t.selectedRouteLabel}
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-base sm:text-lg font-black text-slate-900">{fromCity.split(' ')[0]}</span>
                  <ArrowRight className="w-4 h-4 text-amber-500" />
                  <span className="text-base sm:text-lg font-black text-slate-900">{toCity.split(' ')[0]}</span>
                  <span className="text-xs text-slate-500 font-medium ml-2">({travelDate})</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setCurrentStage(1)}
                  className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2 rounded-xl font-bold transition cursor-pointer"
                >
                  {t.changeRouteBtn}
                </button>
              </div>
            </div>

            {/* CLASS FILTER TABS (Interactive segmented controls) */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-xl max-w-md">
              <button
                onClick={() => setClassFilter('all')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  classFilter === 'all' ? 'bg-white text-emerald-950 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.allClasses}
              </button>
              <button
                onClick={() => setClassFilter('classLuxury')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  classFilter === 'classLuxury' ? 'bg-white text-emerald-950 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Luxury
              </button>
              <button
                onClick={() => setClassFilter('classExecutive')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  classFilter === 'classExecutive' ? 'bg-white text-emerald-950 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                VIP Royal
              </button>
              <button
                onClick={() => setClassFilter('classSemiLuxury')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  classFilter === 'classSemiLuxury' ? 'bg-white text-emerald-950 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Semi-Luxury
              </button>
            </div>

            {/* LIST OF BUSES */}
            <div className="space-y-4">
              {filteredBuses.map((bus) => {
                const availableSeatsCount = bus.totalSeats - bus.bookedSeats.length;
                return (
                  <div 
                    key={bus.id} 
                    className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-5"
                  >
                    
                    <div className="space-y-3">
                      
                      {/* Operator Logo & Name */}
                      <div className="flex items-start sm:items-center gap-3">
                        <span className="text-3xl p-2 rounded-2xl bg-slate-50 border border-slate-100">{bus.logo}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-black text-slate-900 text-lg sm:text-xl">{bus.name}</h3>
                            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                              ⭐ {bus.rating}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                            <span className="text-emerald-800 font-bold">{bus.busType}</span>
                            <span>·</span>
                            <span>{t[bus.classType]}</span>
                            <span>·</span>
                            <span className="font-mono text-slate-600 font-bold">{bus.registrationNumber}</span>
                          </div>
                        </div>
                      </div>

                      {/* Travel timings */}
                      <div className="flex items-center gap-4 text-xs font-medium text-slate-600 pt-1">
                        <div className="flex items-center gap-1.5 font-bold text-slate-800">
                          <Clock className="w-4 h-4 text-amber-500" />
                          <span>{t.departureTime}: {bus.departureTime}</span>
                        </div>
                        <span>·</span>
                        <span>{t.arrivalTime}: {bus.arrivalTime}</span>
                        <span>·</span>
                        <span>{t.duration}: {bus.duration[lang]}</span>
                      </div>

                      {/* Amenities Translated */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {bus.features.map(f => {
                          const translatedFeature = FEATURE_TRANSLATIONS[f]?.[lang] || f;
                          return (
                            <span key={f} className="text-[11px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-medium">
                              {translatedFeature}
                            </span>
                          );
                        })}
                      </div>

                    </div>

                    {/* Price and CTA */}
                    <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-4 md:pt-0 border-slate-100 gap-3">
                      <div className="text-left md:text-right">
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
                          {t.pricePerSeat}
                        </span>
                        <span className="text-2xl sm:text-3xl font-black text-emerald-900 tabular-nums">
                          {bus.price.toLocaleString()} <span className="text-sm font-bold text-slate-600">TZS</span>
                        </span>
                        <span className="text-[11px] text-amber-600 font-semibold block mt-0.5">
                          {availableSeatsCount} {t.seatsLeft}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedBus(bus);
                          setSelectedSeats([]);
                          setCurrentStage(3);
                        }}
                        className="bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-emerald-950 font-black text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition cursor-pointer flex items-center gap-1.5"
                      >
                        <span>{t.selectSeatBtn}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* STAGE 3: INTERACTIVE SEAT SELECTION */}
        {/* ========================================================================= */}
        {currentStage === 3 && selectedBus && (
          <div className="max-w-2xl mx-auto space-y-6">
            
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              
              {/* Bus Header */}
              <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{selectedBus.logo}</span>
                    <h3 className="font-extrabold text-slate-900 text-lg">{selectedBus.name}</h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {fromCity.split(' ')[0]} {t.toWord} {toCity.split(' ')[0]} · {t.atTime} {selectedBus.departureTime}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-emerald-800 tabular-nums">
                    {selectedBus.price.toLocaleString()} TZS
                  </span>
                  <span className="text-[10px] text-slate-400 block font-medium">
                    {t.perOneSeat}
                  </span>
                </div>
              </div>

              {/* SEAT LEGEND */}
              <div className="flex justify-center gap-6 text-xs font-semibold py-1">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-white border border-slate-300"></div>
                  <span>{t.available}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-amber-500 border border-amber-600"></div>
                  <span className="font-bold text-amber-700">{t.selected}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-slate-300 border border-slate-400"></div>
                  <span className="text-slate-400">{t.booked}</span>
                </div>
              </div>

              {/* BUS INTERIOR GRID (2x2) */}
              <div className="bg-slate-100 p-6 sm:p-8 rounded-3xl border-2 border-slate-200 max-w-sm mx-auto space-y-4 shadow-inner">
                
                {/* Cockpit */}
                <div className="flex justify-between items-center border-b border-slate-300 pb-3 text-xs font-extrabold text-slate-600">
                  <span className="flex items-center gap-1">🚘 {t.driver}</span>
                  <span className="flex items-center gap-1">🚪 {t.door}</span>
                </div>

                {/* Seats 2x2 grid */}
                <div className="grid grid-cols-4 gap-2.5">
                  {Array.from({ length: selectedBus.totalSeats }, (_, i) => i + 1).map((seatNo) => {
                    const isBooked = selectedBus.bookedSeats.includes(seatNo);
                    const isSelected = selectedSeats.includes(seatNo);
                    
                    return (
                      <React.Fragment key={seatNo}>
                        <button
                          type="button"
                          disabled={isBooked}
                          onClick={() => handleSeatClick(seatNo, isBooked)}
                          className={`h-11 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center cursor-pointer ${
                            isBooked 
                              ? 'bg-slate-300 text-slate-400 border border-slate-400 cursor-not-allowed'
                              : isSelected
                              ? 'bg-amber-500 text-emerald-950 border-2 border-amber-600 shadow-md scale-105 font-black'
                              : 'bg-white text-slate-800 border border-slate-300 hover:border-emerald-600 hover:bg-emerald-50'
                          }`}
                        >
                          <span>{seatNo}</span>
                        </button>
                        {/* Aisle spacing after column 2 */}
                        {seatNo % 4 === 2 && <div className="col-span-0" />}
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* Back row note */}
                <div className="text-center pt-2 text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                  {t.busRear}
                </div>
              </div>

              {/* Bottom Summary Bar */}
              <div className="bg-emerald-900 text-white p-4 rounded-2xl flex justify-between items-center shadow-md">
                <div>
                  <span className="text-xs text-emerald-200 block">
                    {t.seatsSelected} ({selectedSeats.length})
                  </span>
                  <span className="font-black text-amber-400 text-base">
                    {selectedSeats.length > 0 ? selectedSeats.sort((a,b)=>a-b).join(', ') : t.pleaseSelectSeats}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-emerald-200 block">{t.totalFare}</span>
                  <span className="text-xl sm:text-2xl font-black text-white tabular-nums">
                    {calculateTotal().toLocaleString()} <span className="text-xs font-bold">TZS</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentStage(2)}
                  className="w-1/3 py-3 rounded-xl font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs transition cursor-pointer"
                >
                  {t.backBtn}
                </button>
                <button
                  type="button"
                  disabled={selectedSeats.length === 0}
                  onClick={() => setCurrentStage(4)}
                  className="w-2/3 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-emerald-950 font-black py-3 rounded-xl shadow-md text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{t.proceedToManifest}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* STAGE 4: LATRA MANIFEST FORM */}
        {/* ========================================================================= */}
        {currentStage === 4 && (
          <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs text-amber-600 font-extrabold uppercase tracking-wider block">
                {t.step4}
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-1">{t.latraManifest}</h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {t.latraSubtitle}
              </p>
            </div>

            <form onSubmit={handlePassengerSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  {t.fullName} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={passengerDetails.fullName}
                  onChange={(e) => setPassengerDetails({ ...passengerDetails, fullName: e.target.value })}
                  placeholder={t.fullNamePlaceholder}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  {t.phone} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={passengerDetails.phone}
                  onChange={(e) => setPassengerDetails({ ...passengerDetails, phone: e.target.value })}
                  placeholder={t.phonePlaceholder}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-500 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">{t.gender}</label>
                  <select
                    value={passengerDetails.gender}
                    onChange={(e) => setPassengerDetails({ ...passengerDetails, gender: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  >
                    <option value={lang === 'SW' ? 'Mwanaume' : 'Male'}>{t.male}</option>
                    <option value={lang === 'SW' ? 'Mwanamke' : 'Female'}>{t.female}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">{t.nida}</label>
                  <input
                    type="text"
                    value={passengerDetails.nida}
                    onChange={(e) => setPassengerDetails({ ...passengerDetails, nida: e.target.value })}
                    placeholder={t.nidaPlaceholder}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="grid grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    {t.emergencyName}
                  </label>
                  <input
                    type="text"
                    value={passengerDetails.emergencyName}
                    onChange={(e) => setPassengerDetails({ ...passengerDetails, emergencyName: e.target.value })}
                    placeholder={t.emergencyNamePlaceholder}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    {t.emergencyPhone}
                  </label>
                  <input
                    type="tel"
                    value={passengerDetails.emergencyPhone}
                    onChange={(e) => setPassengerDetails({ ...passengerDetails, emergencyPhone: e.target.value })}
                    placeholder={t.emergencyPhonePlaceholder}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentStage(3)}
                  className="w-1/3 py-3 rounded-xl font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs transition cursor-pointer"
                >
                  {t.backBtn}
                </button>
                <button
                  type="submit"
                  className="w-2/3 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-emerald-950 font-black py-3 rounded-xl shadow-md text-xs sm:text-sm transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{t.proceedToPayment}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>

          </div>
        )}

        {/* ========================================================================= */}
        {/* STAGE 5: MANUAL PAYMENT TO LIPA NAMBA 352225438 (SafariBora / EMILSON) */}
        {/* ========================================================================= */}
        {currentStage === 5 && (
          <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            
            <div className="text-center border-b border-slate-100 pb-4">
              <span className="text-xs text-amber-600 font-extrabold uppercase tracking-wider block">
                {t.step5}
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-1">{t.selectPayment}</h2>
              <p className="text-xs text-slate-500 mt-1">{t.manualPayInstruction}</p>
            </div>

            {/* Total Fare Card */}
            <div className="bg-emerald-900 text-white rounded-2xl p-5 shadow-md flex justify-between items-center">
              <div>
                <p className="text-xs text-emerald-200 font-medium">{t.totalPayableLabel}</p>
                <p className="text-3xl font-black text-amber-400 tabular-nums">
                  {calculateTotal().toLocaleString()} <span className="text-sm text-white">TZS</span>
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold bg-emerald-800 text-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-700 block">
                  {t.seatsBadge} {selectedSeats.length} ({selectedSeats.join(', ')})
                </span>
                <span className="text-[10px] text-emerald-300 block mt-1">{selectedBus?.name}</span>
              </div>
            </div>

            {/* MERCHANT LIPA NAMBA CARD */}
            <div className="bg-amber-50/90 border-2 border-amber-300 rounded-2xl p-5 space-y-3.5 shadow-sm">
              
              <div className="flex items-center justify-between border-b border-amber-200/80 pb-2">
                <span className="text-xs text-amber-950 font-black uppercase tracking-wider">
                  {t.merchantCardTitle}
                </span>
                <span className="text-[10px] bg-amber-200 text-amber-950 px-2 py-0.5 rounded font-bold">
                  {t.allNetworksTz}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs text-slate-500 block font-medium">
                    {t.lipaNambaLabel}
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-3xl font-black text-slate-900 tracking-wider font-mono">
                      {t.targetPhone}
                    </span>
                    <button
                      type="button"
                      onClick={copyLipaNamba}
                      className="bg-white hover:bg-slate-100 text-emerald-900 text-xs font-bold px-2.5 py-1 rounded-lg border border-slate-300 flex items-center gap-1 transition cursor-pointer"
                      title={t.copyNumber}
                    >
                      {copiedNumber ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">{t.copied}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{t.copyNumber}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs text-slate-500 block font-medium">{t.businessNameLabel}</span>
                  <span className="text-sm font-black text-emerald-950 bg-emerald-100 px-3 py-1 rounded-md border border-emerald-300 inline-block mt-0.5">
                    {t.targetName}
                  </span>
                </div>
              </div>

              {/* RECIPIENT VERIFICATION WARNING */}
              <div className="bg-amber-100/90 border border-amber-300 p-3 rounded-xl flex items-start gap-2.5 text-xs text-amber-950 font-semibold leading-relaxed">
                <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p>{t.nameVerifyPrompt}</p>
              </div>

              {/* CLICKABLE USSD DIALER BUTTONS */}
              <div className="pt-2 border-t border-amber-200/80 space-y-2">
                <span className="text-[11px] font-bold text-slate-600 block text-center uppercase tracking-wider">
                  {t.ussdGuide}
                </span>

                <div className="grid grid-cols-3 gap-2">
                  <a
                    href="tel:*150*00%23"
                    className="bg-white hover:bg-red-50 border-2 border-red-200 hover:border-red-400 p-2.5 rounded-xl text-center transition shadow-sm flex flex-col items-center justify-center group"
                  >
                    <span className="block text-red-600 font-black text-xs group-hover:scale-105 transition-transform">
                      {t.mpesaName}
                    </span>
                    <span className="text-[11px] text-slate-600 font-mono font-bold mt-0.5">*150*00#</span>
                  </a>

                  <a
                    href="tel:*150*01%23"
                    className="bg-white hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-400 p-2.5 rounded-xl text-center transition shadow-sm flex flex-col items-center justify-center group"
                  >
                    <span className="block text-blue-600 font-black text-xs group-hover:scale-105 transition-transform">
                      {t.tigoName}
                    </span>
                    <span className="text-[11px] text-slate-600 font-mono font-bold mt-0.5">*150*01#</span>
                  </a>

                  <a
                    href="tel:*150*60%23"
                    className="bg-white hover:bg-rose-50 border-2 border-rose-200 hover:border-rose-400 p-2.5 rounded-xl text-center transition shadow-sm flex flex-col items-center justify-center group"
                  >
                    <span className="block text-rose-600 font-black text-xs group-hover:scale-105 transition-transform">
                      {t.airtelName}
                    </span>
                    <span className="text-[11px] text-slate-600 font-mono font-bold mt-0.5">*150*60#</span>
                  </a>
                </div>
              </div>

            </div>

            {/* VERIFICATION FORM */}
            <form onSubmit={handleSimulatePayment} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  {t.senderPhoneLabel}
                </label>
                <input
                  type="tel"
                  required
                  value={paymentPhone || passengerDetails.phone}
                  onChange={(e) => setPaymentPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:ring-2 focus:ring-emerald-500 outline-none transition"
                  placeholder="07XXXXXXXX"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1 flex justify-between">
                  <span>{t.txnRefLabel}</span>
                  <span className="text-amber-600 font-bold">{t.requiredBadge}</span>
                </label>
                <input
                  type="text"
                  required
                  value={transactionRef}
                  onChange={(e) => setTransactionRef(e.target.value.toUpperCase())}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm font-black tracking-widest uppercase focus:ring-2 focus:ring-emerald-500 outline-none transition"
                  placeholder={t.txnRefPlaceholder}
                />
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  {t.txnHelpText}
                </p>
              </div>

              {/* Progress feedback when submitting */}
              {isProcessingPayment && (
                <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl text-xs space-y-1.5 text-emerald-900">
                  <div className="flex items-center gap-2 font-bold">
                    <RefreshCw className="w-4 h-4 animate-spin text-emerald-700" />
                    <span>{t.verifyingSubtitle}</span>
                  </div>
                  <p className="text-[11px] text-emerald-700">
                    {verificationStep === 1 && t.verifyStep1}
                    {verificationStep === 2 && t.verifyStep2}
                    {verificationStep === 3 && t.verifyStep3}
                  </p>
                </div>
              )}

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentStage(4)}
                  className="w-1/3 py-3 rounded-xl font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs transition cursor-pointer"
                >
                  {t.backBtn}
                </button>
                <button
                  type="submit"
                  disabled={isProcessingPayment}
                  className="w-2/3 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-emerald-950 font-black py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm disabled:opacity-60 cursor-pointer"
                >
                  {isProcessingPayment ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>{t.verifyingTitle}</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                      <span>{t.verifyPaymentBtn}</span>
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>
        )}

        {/* ========================================================================= */}
        {/* STAGE 6: E-TICKET VIEW (Official LATRA Boarding Pass) */}
        {/* ========================================================================= */}
        {currentStage === 6 && (
          <div className="max-w-2xl mx-auto space-y-6">
            
            {/* SUCCESS BANNER */}
            <div className="bg-emerald-900 text-white p-6 rounded-3xl shadow-lg text-center space-y-2 no-print border border-emerald-800">
              <div className="w-12 h-12 bg-amber-400 text-emerald-950 rounded-full flex items-center justify-center mx-auto text-2xl font-black shadow">
                ✓
              </div>
              <h2 className="text-2xl font-black">{t.ticketConfirmed}</h2>
              <p className="text-emerald-200 text-xs">
                {t.smsReceiptNotice} {passengerDetails.phone || paymentPhone}
              </p>
            </div>

            {/* OFFICIAL PRINTABLE TICKET CARD */}
            <div className="bg-white rounded-3xl border-2 border-slate-300 shadow-xl overflow-hidden relative print-area">
              
              {/* Ticket Top Header */}
              <div className="bg-emerald-950 text-white p-5 sm:p-6 flex justify-between items-center border-b border-emerald-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🚌</span>
                    <span className="text-xl font-black tracking-tight text-white">
                      Safari<span className="text-amber-400">Bora</span>
                    </span>
                  </div>
                  <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block mt-1">
                    {t.pnrLabel}
                  </span>
                  <span className="text-2xl sm:text-3xl font-black tracking-widest font-mono text-white">
                    {pnrCode || 'SB-849201'}
                  </span>
                </div>

                <div className="text-right space-y-1">
                  <span className="bg-emerald-800 text-emerald-200 text-[10px] uppercase font-bold px-2.5 py-1 rounded-md inline-block">
                    {t.latraVerifiedBadge}
                  </span>
                  <span className="text-xs text-amber-300 font-mono font-bold block">
                    Txn: {transactionRef || '8HG92KL81Z'}
                  </span>
                  <span className="text-[10px] text-emerald-300 block">
                    Lipa Namba: 352225438
                  </span>
                </div>
              </div>

              {/* Ticket Content */}
              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Bus and Journey info */}
                <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs text-slate-400 uppercase font-bold block">{t.busAndCompany}</span>
                    <span className="font-black text-slate-900 text-base sm:text-lg">
                      {selectedBus?.name || 'Kilimanjaro Express'}
                    </span>
                    <span className="text-xs text-emerald-700 block font-semibold">
                      {selectedBus?.busType} ({selectedBus?.registrationNumber || 'T 381 DZM'})
                    </span>
                  </div>

                  <div>
                    <span className="text-xs text-slate-400 uppercase font-bold block">{t.travelDate}</span>
                    <span className="font-black text-slate-900 text-base sm:text-lg">{travelDate}</span>
                    <span className="text-xs text-slate-600 block font-semibold">
                      {t.departureTimeLabel}: {selectedBus?.departureTime || '06:00 AM'}
                    </span>
                  </div>
                </div>

                {/* Route Visualizer */}
                <div className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between border border-slate-200/80">
                  <div className="max-w-[45%]">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">{t.from}</span>
                    <span className="font-extrabold text-slate-800 text-sm block truncate">{fromCity}</span>
                    <span className="text-[10px] text-emerald-800 font-medium block">
                      {selectedBus?.departureTerminal[lang] || 'Magufuli Terminal'}
                    </span>
                  </div>

                  <ArrowRight className="w-5 h-5 text-amber-500 shrink-0 mx-2" />

                  <div className="text-right max-w-[45%]">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">{t.to}</span>
                    <span className="font-extrabold text-slate-800 text-sm block truncate">{toCity}</span>
                    <span className="text-[10px] text-emerald-800 font-medium block">
                      {selectedBus?.arrivalTerminal[lang] || 'Arusha Stand'}
                    </span>
                  </div>
                </div>

                {/* Passenger & Fare breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-slate-400 font-semibold block">{t.passengerNameLabel}</span>
                    <span className="font-black text-slate-900 text-sm">
                      {passengerDetails.fullName || 'Juma Hamisi Rashid'}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 font-semibold block">{t.seatsLabel}</span>
                    <span className="font-black text-amber-600 text-sm">
                      {selectedSeats.length > 0 ? selectedSeats.sort((a,b)=>a-b).join(', ') : '14, 15'}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 font-semibold block">{t.totalFareLabel}</span>
                    <span className="font-black text-emerald-950 text-sm tabular-nums">
                      {calculateTotal().toLocaleString()} TZS
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 font-semibold block">{t.passengerPhoneLabel}</span>
                    <span className="font-bold text-slate-700">
                      {passengerDetails.phone || paymentPhone || '07XXXXXXXX'}
                    </span>
                  </div>
                </div>

                {/* LATRA QR & Manifest Stamp */}
                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-1 max-w-sm">
                    <p className="text-[11px] font-bold text-slate-800">
                      {t.ticketInstruction} ({pnrCode || 'SB-849201'}).
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {t.paymentVerifiedNote}
                    </p>
                  </div>

                  {/* Clean SVG QR code representation */}
                  <div className="shrink-0 p-2 bg-slate-900 rounded-xl text-white flex flex-col items-center justify-center">
                    <svg className="w-16 h-16 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm-2 10h8v8H2v-8zm2 2v4h4v-4H4zm10-14h8v8h-8V2zm2 2v4h4V4h-4zm2 12h2v2h-2v-2zm-2 2h2v2h-2v-2zm4 0h2v2h-2v-2zm0-4h2v2h-2v-2zm-4-2h2v2h-2v-2zm6 6h2v2h-2v-2zm0-4h2v2h-2v-2z" />
                    </svg>
                    <span className="text-[7px] font-mono font-bold tracking-tighter text-amber-300 mt-1">
                      LATRA VERIFIED
                    </span>
                  </div>
                </div>

              </div>

              {/* Bottom Actions Bar (Hidden when printing) */}
              <div className="bg-slate-50 p-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3 no-print">
                <button 
                  onClick={() => window.print()}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-black py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-amber-400" />
                  <span>{t.printTicket}</span>
                </button>

                <button 
                  onClick={() => setCurrentStage(1)}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-emerald-950 font-black py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
                >
                  <Bus className="w-4 h-4" />
                  <span>{t.bookAnother}</span>
                </button>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* TICKET TRACKING & HISTORY MODAL */}
      {/* ========================================================================= */}
      {showLookupModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl space-y-5 border border-slate-200">
            
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-amber-500" />
                <h3 className="font-black text-slate-900 text-lg">{t.trackTicket}</h3>
              </div>
              <button 
                onClick={() => setShowLookupModal(false)} 
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <p className="text-xs text-slate-500">
              {t.trackModalDesc}
            </p>

            <div className="space-y-2">
              <input
                type="text"
                placeholder="mf. SB-849201"
                value={lookupPnr}
                onChange={(e) => setLookupPnr(e.target.value.toUpperCase())}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm font-black uppercase tracking-wider focus:ring-2 focus:ring-emerald-500 outline-none"
              />

              <button
                onClick={() => {
                  if (lookupPnr.trim()) {
                    setPnrCode(lookupPnr.trim());
                    // Find if exists in saved
                    const found = savedTickets.find(t => t.pnr === lookupPnr.trim());
                    if (found) {
                      setSelectedBus(found.bus);
                      setSelectedSeats(found.seats);
                      setFromCity(found.fromCity);
                      setToCity(found.toCity);
                      setTravelDate(found.travelDate);
                      setPassengerDetails(found.passenger);
                      setTransactionRef(found.transactionRef);
                    }
                    setShowLookupModal(false);
                    setCurrentStage(6);
                  }
                }}
                className="w-full bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white font-black py-3 rounded-xl text-sm transition shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>{t.searchPnrBtn}</span>
              </button>
            </div>

            {/* RECENT BOOKINGS LIST */}
            {savedTickets.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  {t.recentBookings} ({savedTickets.length})
                </span>
                <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                  {savedTickets.map((st) => (
                    <div
                      key={st.pnr}
                      onClick={() => handleSelectPastTicket(st)}
                      className="p-3 bg-slate-50 hover:bg-emerald-50 rounded-xl border border-slate-200 hover:border-emerald-400 cursor-pointer transition text-left"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-mono font-bold text-emerald-900 text-xs">{st.pnr}</span>
                        <span className="text-[10px] text-slate-500">{st.travelDate}</span>
                      </div>
                      <div className="text-xs font-semibold text-slate-800 truncate mt-0.5">
                        {st.bus.name} · {st.fromCity.split(' ')[0]} → {st.toCity.split(' ')[0]}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {t.seatsWord}: {st.seats.join(', ')} · {st.passenger.fullName}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800 mt-12 no-print">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-white font-bold text-base">
            <Bus className="w-5 h-5 text-amber-400" />
            <span>Safari<span className="text-amber-400">Bora</span> Tanzania</span>
          </div>
          <p className="text-slate-300 font-medium">
            {t.footerTagline}
          </p>
          <p className="text-slate-500 text-[11px] max-w-lg mx-auto">
            {t.footerPaymentInfo}
          </p>
          <div className="pt-2 text-slate-600 text-[10px]">
            &copy; {new Date().getFullYear()} SafariBora Tanzania. {t.allRightsReserved}
          </div>
        </div>
      </footer>

    </div>
  );
}
