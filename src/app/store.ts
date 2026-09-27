import tripsReducer from "@/features/trips/tripsSlice.ts"
import tripCreationFormReducer from "@/features/tripCreationForm/tripCreationFormSlice.ts"
import tripSelectionFormReducer from "@/features/tripSelectionForm/tripSelectionFormSlice.ts"
import {configureStore} from "@reduxjs/toolkit"
import {logger} from "redux-logger"

export const store = configureStore({
    reducer: {
        trips: tripsReducer,
        tripCreationForm: tripCreationFormReducer,
        tripSelectionForm: tripSelectionFormReducer
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