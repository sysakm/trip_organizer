import type {RootState} from "@/app/store.ts"
import type {TripLocation} from "@/types/tripTypes.ts";

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

export const nextLocationIdSelector = (state: RootState): number => {
    if (state.locations.locations.length) {
        return 1 + Math.max(0, ...state.locations.locations.map(location => location.id))
    } else {
        return 1
    }
}

export const tripsSelector = (state: RootState) => state.trips.trips

export const activitiesSelector = (state: RootState) => state.activities.activities

export const locationsSelector = (state: RootState): Array<TripLocation> => state.locations.locations

export const areOverlappingSelector = (_state: RootState): boolean => {
    // TODO: for status bar
    return false
}