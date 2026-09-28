import type {TripActivity} from "@/types/tripTypes.ts"
import {createSlice, type PayloadAction} from "@reduxjs/toolkit"
import {clearTrips, removeTrip} from "@/features/trips/tripsSlice.ts"

type ActivitiesState = {
    activities: Array<TripActivity>;
}

const initialState: ActivitiesState = {
    activities: []
}

const activitiesSlice = createSlice({
    name: 'activities',
    initialState,
    reducers: {
        addActivity(state, action: PayloadAction<TripActivity>) {
            state.activities.push(action.payload)
        },
        removeActivity(state, action: PayloadAction<number>) {
            state.activities = state.activities.filter(activity => activity.id !== action.payload)
        }
    },
    extraReducers: builder => {
        builder.addCase(
            removeTrip,
            (state, action: PayloadAction<number>) => {
                state.activities = state.activities.filter(activity => activity.tripId !== action.payload)
            }
        ).addCase(
            clearTrips,
            () => {return initialState}
        )
    }
})

export const {addActivity, removeActivity} = activitiesSlice.actions
export default activitiesSlice.reducer