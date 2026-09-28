import type {Trip, TripLocation} from "@/types/tripTypes.ts"
import {createSlice, type PayloadAction} from "@reduxjs/toolkit"
import {clearTrips, removeTrip, updateTrip} from "@/features/trips/tripsSlice.ts"
import {changeOuterDateRangeUtil, overwriteDateRangeUtil} from "@/utils/dateUtils.ts"

type LocationsState = {
    locations: Array<TripLocation>
}

const initialState: LocationsState = {
    locations: []
}

const locationsSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {
        addLocation(state, action: PayloadAction<TripLocation>) {
            const newLoc = action.payload
            const newLocationList: Array<TripLocation> = []

            for (let i = 0; i < state.locations.length; i++) {
                const location = state.locations[i]
                if (location.tripId !== newLoc.tripId) {
                    newLocationList.push(location)
                } else {
                    const newLocationObj = overwriteDateRangeUtil(
                        location.startDate, location.endDate, newLoc.startDate, newLoc.endDate
                    )
                    if (newLocationObj.type === 'ok') {
                        newLocationList.push(location)
                    } else if (newLocationObj.type === 'adjust') {
                        newLocationList.push({
                            ...location, startDate: newLocationObj.updated[0], endDate: newLocationObj.updated[1]
                        })
                    } else if (newLocationObj.type === 'split') {
                        newLocationList.push({
                            ...location, startDate: newLocationObj.before[0], endDate: newLocationObj.before[1]
                        })
                        newLocationList.push(
                            {
                                ...location,
                                startDate: newLocationObj.after[0],
                                endDate: newLocationObj.after[1],
                                id: Math.max(
                                    newLoc.id,
                                    ...state.locations.map(loc => loc.id),
                                    ...newLocationList.map(loc => loc.id)
                                ) + 1
                            }
                        )
                    }
                }
            }
            newLocationList.push(newLoc)
            state.locations = newLocationList
        },
        removeLocation(state, action: PayloadAction<number>) {
            state.locations = state.locations.filter(location => location.id !== action.payload)
        }
    },
    extraReducers: builder => {
        builder.addCase(
            removeTrip,
            (state, action: PayloadAction<number>) => {
                state.locations = state.locations.filter(location => location.tripId !== action.payload)
            }
        ).addCase(
            clearTrips,
            () => {return initialState}
        ).addCase(
            updateTrip,
            (state, action: PayloadAction<Trip>) => {
                const newTrip = action.payload
                const newLocationList: Array<TripLocation> = []

                for (let i = 0; i < state.locations.length; i++) {
                    const location = state.locations[i]
                    if (location.tripId !== newTrip.id) {
                        newLocationList.push(location)
                    } else {
                        const newLocationObj = changeOuterDateRangeUtil(
                            location.startDate, location.endDate, newTrip.startDate, newTrip.endDate
                        )
                        if (newLocationObj.type === 'ok') {
                            newLocationList.push(location)
                        } else if (newLocationObj.type === 'adjust') {
                            newLocationList.push({
                                ...location, startDate: newLocationObj.updated[0], endDate: newLocationObj.updated[1]
                            })
                        }
                    }
                }
                state.locations = newLocationList
            }
        )
    }
})

export const {addLocation, removeLocation} = locationsSlice.actions
export default locationsSlice.reducer