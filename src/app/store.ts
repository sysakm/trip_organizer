import tripsReducer from "@/features/trips/tripsSlice.ts"
import activitiesReducer from "@/features/activities/activitiesSlice.ts"
import locationsReducer from "@/features/locations/locationsSlice.ts"
import {configureStore} from "@reduxjs/toolkit"
import {logger} from "redux-logger"

export const store = configureStore({
    reducer: {
        trips: tripsReducer,
        activities: activitiesReducer,
        locations: locationsReducer
    },
    middleware: (getDefaultMiddleware) => {
        const middleware = getDefaultMiddleware()
        if (import.meta.env.MODE === 'development') {
            middleware.push(logger)
        }
        return middleware
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch