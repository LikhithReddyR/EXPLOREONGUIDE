export enum AppView {
  HOME = 'HOME',
  TRIP_PLANNER = 'TRIP_PLANNER',
  BOOKINGS = 'BOOKINGS',
  CURRENCY = 'CURRENCY',
  MAP = 'MAP',
  TRANSLATOR = 'TRANSLATOR'
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
  maps?: {
    uri: string;
    title: string;
    placeAnswerSources?: {
      reviewSnippets?: {
        content: string;
      }[];
    }[];
  };
}

export interface TripActivity {
  time: string;
  activity: string;
  locationName: string;
}

export interface TripDay {
  day: number;
  theme: string;
  activities: TripActivity[];
}

export interface TripPlan {
  tripName: string;
  days: TripDay[];
}

export interface AIResponse {
  text: string;
  tripPlan?: TripPlan;
  groundingChunks?: GroundingChunk[];
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
}

export interface Vehicle {
  id: string;
  name: string;
  type: string;
  pricePerDay: number;
  seats: number;
  image: string;
}

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  from: string;
  to: string;
  price: number;
  duration: string;
  image: string;
}