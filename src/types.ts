type ProtestLocations = {
    locationName: string;
    latitude: number;
    longitude: number;
};

export interface ProtestData {
    id: string;
    title: string;
    description: string;
    startDateTime: string;
    endDateTime: string;
    location: string;
    organizer: string;
    declaredParticipants: number;
    locations: ProtestLocations[];
}
