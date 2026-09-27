import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {removeTrip} from "@/features/trips/tripsSlice.ts";

type TripSelectionFormState = {
    selected: string;
}
const initialState: TripSelectionFormState = {
    selected: ''
}



const tripSelectionFormSlice = createSlice({
    name: 'tripSelectionForm',
    initialState,
    reducers: {
        setSelected(state, action: PayloadAction<string>) {
            state.selected = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(
            removeTrip,
            (state, action) => {
                if (action.payload.toString() === state.selected) {
                    state.selected = ''
                }
            }
        )
    }
})

export const {setSelected} = tripSelectionFormSlice.actions
export default tripSelectionFormSlice.reducer