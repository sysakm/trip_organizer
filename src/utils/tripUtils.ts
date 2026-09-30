import type {Trip, TripActivity, TripExpense, TripLocation, TripTask} from "@/types/tripTypes.ts"

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

export type EntryNumbersRecord = {
    nLocations: number;
    nActivities: number;
    nExpenses: number;
    nTasks: number;
}

export function calculateEntryNumbersForTrips(
    activities: Array<TripActivity>, locations: Array<TripLocation>, expenses: Array<TripExpense>, tasks: Array<TripTask>
): Map<number, EntryNumbersRecord> {
    const map = new Map<number, EntryNumbersRecord>()
    const outerList: Array<[string, Array<{tripId: number}>]> = [
        ['nActivities', activities],
        ['nLocations', locations],
        ['nExpenses', expenses],
        ['nTasks', tasks]
    ]
    for (const [name, array] of outerList) {
        for (const entry of array) {
            const record = map.get(entry.tripId)
            if (record) {
                map.set(entry.tripId, {...record, [name]: record[name as keyof typeof record] + 1});
            } else {
                map.set(entry.tripId, {nActivities: 0, nExpenses: 0, nLocations: 0, nTasks: 0, [name]: 1})
            }
        }
    }

    return map
}