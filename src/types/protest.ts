export interface Protest {
  id: string;
  title: string;
  description: string | null;
  organizer: string;
  startDateTime: string;
  endDateTime: string;
  declaredParticipants: number;
  locations: ProtestLocation[];
  radius: number;
}

export interface ProtestLocation {
  name: string;
  latitude: number;
  longitude: number;
}

export interface ProtestCheerCount {
  protestId: string;
  cheerCount: number;
}

export type VerificationNumber = {
  protestId: string;
  verifiedNum: number;
};
