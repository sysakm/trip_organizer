import tripsReducer from "@/features/trips/tripsSlice.ts"
import activitiesReducer from "@/features/activities/activitiesSlice.ts"
import locationsReducer from "@/features/locations/locationsSlice.ts"
import expensesReducer from "@/features/expenses/expensesSlice.ts"
import tasksReducer from "@/features/tasks/tasksSlice.ts"
import {configureStore} from "@reduxjs/toolkit"
import {logger} from "redux-logger"
import {loadState, saveState, throttle} from "@/utils/localStorageUtils.ts"

export const store = configureStore({
    reducer: {
        trips: tripsReducer,
        activities: activitiesReducer,
        locations: locationsReducer,
        expenses: expensesReducer,
        tasks: tasksReducer
    },
    preloadedState: loadState(),
    middleware: (getDefaultMiddleware) => {
        const middleware = getDefaultMiddleware()
        if (import.meta.env.MODE === 'development') {
            middleware.push(logger)
        }
        return middleware
    },
})

store.subscribe(
    throttle(() => saveState(store.getState()))
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch