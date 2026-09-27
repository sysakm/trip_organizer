import {type SubmitEvent} from "react"
import {nextIdSelector, tripCreationFormStateSelector} from "@/app/selectors.ts"
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts"
import {createTripUtil} from "@/utils/tripUtils.ts"
import {addTrip} from "@/features/trips/tripsSlice.ts"
import DateInputField from "@/components/DateInputField.tsx"
import {setEndDate, setName, setStartDate} from "@/features/tripCreationForm/tripCreationFormSlice.ts"

function TripCreationPage() {
    const dispatch = useAppDispatch()

    const newId = useAppSelector(nextIdSelector)
    const {name, startDate, endDate} = useAppSelector(tripCreationFormStateSelector)

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        dispatch(
            addTrip(createTripUtil(newId, name, startDate, endDate))
        )
    }

    return (
        <>
            <h1>Create New Trip:</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                    Trip Name
                    <input
                        type="text" value={name} id="name"
                        onChange={(e) => dispatch(setName(e.target.value))}
                    />
                </label>
                <DateInputField label='Start date' id='startDate' value={startDate}
                                onChange={(val) => dispatch(setStartDate(val))}/>
                <DateInputField label='End date' id='endDate' value={endDate}
                                onChange={(val) => dispatch(setEndDate(val))}/>
                <button type='submit'>Add trip</button>
            </form>
        </>
    )
}

export default TripCreationPage