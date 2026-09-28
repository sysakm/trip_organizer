export type TripActivity = {
    id: number;
    tripId: number;
    date: string;
    time?: string;
    name: string;
}

export type TripLocation = {
    id: number;
    tripId: number;
    startDate: string;
    endDate: string;
    name: string;
}

export type Trip = {
    id: number;
    startDate: string;
    endDate: string;
    name: string;
}