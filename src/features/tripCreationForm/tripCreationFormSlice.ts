import {createSlice, type PayloadAction} from "@reduxjs/toolkit"
import {addTrip} from "@/features/trips/tripsSlice.ts";

type TripCreationFormState = {
    name: string;
    startDate: string;
    endDate: string;
}
const initialState: TripCreationFormState = {
    name: '', startDate: '', endDate: ''
}

const tripCreationFormSlice = createSlice({
    name: 'tripCreationForm',
    initialState,
    reducers: {
        setName(state, action: PayloadAction<string>) {
            state.name = action.payload
        },
        setStartDate(state, action: PayloadAction<string>) {
            state.startDate = action.payload
        },
        setEndDate(state, action: PayloadAction<string>) {
            state.endDate = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(
            addTrip,
            () => {return initialState}
        )
    }
})

export const {setName, setStartDate, setEndDate} = tripCreationFormSlice.actions
export default tripCreationFormSlice.reducer