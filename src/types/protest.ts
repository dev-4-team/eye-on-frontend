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
