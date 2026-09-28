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
        updateTrip(state, action: PayloadAction<Trip>) {
            const idx = state.trips.findIndex(trip => trip.id === action.payload.id)
            if (idx !== -1) {
                state.trips[idx] = action.payload
            }
        },
        removeTrip(state, action: PayloadAction<number>) {
            state.trips = state.trips.filter(trip => trip.id !== action.payload)
        },
        clearTrips() {
            return initialState
        }
    }
})

export const {addTrip, updateTrip, removeTrip, clearTrips} = tripsSlice.actions
export default tripsSlice.reducer