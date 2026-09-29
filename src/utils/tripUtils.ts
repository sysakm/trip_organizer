import type {Trip, TripActivity, TripLocation} from "@/types/tripTypes.ts"

export function createTripUtil(id: number, name: string, startDate: string, endDate: string, budget: number): Trip {
    return {
        id, name, startDate, endDate, budget
    }
}

export function createActivityUtil(id: number, tripId: number, name: string, date: string, time?: string): TripActivity {
    return time ? {id, tripId, name, date, time} : {id, tripId, name, date}
}

export function createLocationUtil(id: number, tripId: number, name: string, startDate: string, endDate: string): TripLocation {
    return {id, tripId, name, startDate, endDate}
}

export function sortActivitiesByTimeUtil(activities: Array<TripActivity>) {
    return activities.toSorted((a, b) => {
        if (a.time && b.time)
            return a.time.localeCompare(b.time)
        if (a.time)
            return 1
        if (b.time)
            return -1
        return a.name.localeCompare(b.name)
    })
}