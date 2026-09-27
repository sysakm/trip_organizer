export type TripActivity = {
    date: string;
    localTime?: string;
    name: string;
}

export type Trip = {
    id: number;
    startDate: string;
    endDate: string;
    name: string;
    activities: Array<TripActivity>;
}