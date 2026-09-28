import {type SubmitEvent, useState} from "react"
import {nextIdSelector} from "@/app/selectors.ts"
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts"
import {createTripUtil} from "@/utils/tripUtils.ts"
import {addTrip} from "@/features/trips/tripsSlice.ts"
import DateInputField from "@/components/DateInputField.tsx"

function TripCreationPage() {
    const [name, setName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const dispatch = useAppDispatch()
    const newId = useAppSelector(nextIdSelector)

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        dispatch(
            addTrip(createTripUtil(newId, name, startDate, endDate))
        )
        setName('')
        setStartDate('')
        setEndDate('')
    }

    return (
        <>
            <h1>Create New Trip:</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                    Trip Name
                    <input
                        type="text" value={name} id="name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <DateInputField label='Start date' id='startDate' value={startDate}
                                onChange={setStartDate}/>
                <DateInputField label='End date' id='endDate' value={endDate}
                                onChange={setEndDate}/>
                <button type='submit'>Add trip</button>
            </form>
        </>
    )
}

export default TripCreationPage