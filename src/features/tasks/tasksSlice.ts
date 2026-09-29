import type {TripTask} from "@/types/tripTypes.ts"
import {createSlice, type PayloadAction} from "@reduxjs/toolkit"
import {clearTrips, removeTrip} from "@/features/trips/tripsSlice.ts"

type TasksState = {
    tasks: Array<TripTask>
}

const initialState: TasksState = {
    tasks: []
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask(state, action: PayloadAction<TripTask>) {
            state.tasks.push(action.payload)
        },
        updateTask(state, action: PayloadAction<TripTask>) {
            const idx = state.tasks.findIndex(task => task.id === action.payload.id)
            if (idx !== -1) {
                state.tasks[idx] = action.payload
            }
        },
        removeTask(state, action: PayloadAction<number>) {
            state.tasks = state.tasks.filter(task => task.id !== action.payload)
        }
    },
    extraReducers: builder => {
        builder.addCase(
            removeTrip,
            (state, action) => {
                state.tasks = state.tasks.filter(task => task.tripId !== action.payload)
            }
        ).addCase(
            clearTrips,
            () => {return initialState}
        )
    }
})

export const {addTask, updateTask, removeTask} = tasksSlice.actions
export default tasksSlice.reducer