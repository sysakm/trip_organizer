import type {Trip} from "@/types/tripTypes.ts";

export function createTripUtil(id: number, name: string, startDate: string, endDate: string): Trip {
    return {
        id, name, startDate, endDate, activities: []
    }
}