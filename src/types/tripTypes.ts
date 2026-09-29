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

export type TripExpense = {
    id: number;
    tripId: number;
    name: string;
    price: number;
    paid: number | null;
}

export const TripTaskCategories = [
    'documents',
    'packing',
    'todo'
] as const

export type TripTask = {
    id: number;
    tripId: number;
    category: (typeof TripTaskCategories)[number];
    description: string;
    done: boolean;
}

export type Trip = {
    id: number;
    startDate: string;
    endDate: string;
    name: string;
    budget: number;
}