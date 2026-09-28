import type {RootState} from "@/app/store.ts"

export const nextIdSelector = (state: RootState): number => {
    if (state.trips.trips.length) {
        return 1 + Math.max(...state.trips.trips.map(trip => trip.id))
    } else {
        return 1
    }
}

export const nextActivityIdSelector = (state: RootState): number => {
    if (state.activities.activities.length) {
        return 1 + Math.max(...state.activities.activities.map(activity => activity.id))
    } else {
        return 1
    }
}

export const tripsSelector = (state: RootState) => state.trips.trips

export const activitiesSelector = (state: RootState) => state.activities.activities


export const areOverlappingSelector = (_state: RootState): boolean => {
    // TODO: for status bar
    return false
}