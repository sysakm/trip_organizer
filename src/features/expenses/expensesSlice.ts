import type {TripExpense} from "@/types/tripTypes.ts"
import {createSlice, type PayloadAction} from "@reduxjs/toolkit"
import {clearTrips, removeTrip} from "@/features/trips/tripsSlice.ts"

type ExpensesState = {
    expenses: Array<TripExpense>
}

const initialState: ExpensesState = {
    expenses: []
}

const expensesSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        addExpense(state, action: PayloadAction<TripExpense>) {
            state.expenses.push(action.payload)
        },
        updateExpense(state, action: PayloadAction<TripExpense>) {
            const idx = state.expenses.findIndex(expense => expense.id === action.payload.id)
            if (idx !== -1) {
                state.expenses[idx] = action.payload
            }
        },
        removeExpense(state, action: PayloadAction<number>) {
            state.expenses = state.expenses.filter(expense => expense.id !== action.payload)
        }
    },
    extraReducers: builder => {
        builder.addCase(
            removeTrip,
            (state, action) => {
                state.expenses = state.expenses.filter(expense => expense.tripId !== action.payload)
            }
        ).addCase(
            clearTrips,
            () => {return initialState}
        )
    }
})

export const {addExpense, updateExpense, removeExpense} = expensesSlice.actions
export default expensesSlice.reducer