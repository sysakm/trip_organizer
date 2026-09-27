import type {RootState} from "@/app/store.ts";

export const nextIdSelector = (state: RootState): number => {
    if (state.trips.trips.length) {
        return 1 + Math.max(...state.trips.trips.map(trip => trip.id))
    } else {
        return 1
    }
}

export const tripsSelector = (state: RootState) => state.trips.trips

export const tripCreationFormStateSelector = (state: RootState) => state.tripCreationForm
export const tripSelectionFormStateSelector = (state: RootState) => state.tripSelectionForm

export const areOverlappingSelector = (_state: RootState): boolean => {
    // TODO: for status bar
    return false
}