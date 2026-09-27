import tripsReducer from "@/features/trips/tripsSlice.ts"
import tripCreationFormReducer from "@/features/tripCreationForm/tripCreationFormSlice.ts"
import {configureStore} from "@reduxjs/toolkit/react"
import {logger} from "redux-logger"

export const store = configureStore({
    reducer: {
        trips: tripsReducer,
        tripCreationForm: tripCreationFormReducer
    },
    middleware: (getDefaultMiddleware) => {
        const middleware = getDefaultMiddleware()
        if (process.env.NODE_ENV === 'development') {
            middleware.push(logger)
        }
        return middleware
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch