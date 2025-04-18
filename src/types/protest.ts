export interface Protest {
  id: number;
  title: string;
  description: string;
  organizer: string;
  startDateTime: string; // ISO 형식의 날짜 문자열
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
