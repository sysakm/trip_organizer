import type {Trip} from "@/types/tripTypes.ts"
import {createSlice, type PayloadAction} from "@reduxjs/toolkit"

type TripsState = {
    trips: Array<Trip>;
}
const initialState: TripsState = {
    trips: []
}

const tripsSlice = createSlice({
    name: 'trips',
    initialState,
    reducers: {
        addTrip(state, action: PayloadAction<Trip>) {
            state.trips.push(action.payload)
        },
        removeTrip(state, action: PayloadAction<number>) {
            state.trips = state.trips.filter(trip => trip.id !== action.payload)
        },
        clearTrips() {
            return initialState
        }
    }
})

export const {addTrip, removeTrip, clearTrips} = tripsSlice.actions
export default tripsSlice.reducer