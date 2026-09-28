import {type SubmitEvent, useState} from "react"
import {useAppSelector} from "@/app/hooks.ts"
import {nextIdSelector} from "@/app/selectors.ts"
import DateInputField from "@/components/DateInputField"
import type {Trip} from "@/types/tripTypes.ts";

type Props = {
    submitAction: (id: number, name: string, startDate: string, endDate: string) => void;
    trip?: Trip;
}

function TripEditorForm(props: Props) {
    const [name, setName] = useState(props.trip?.name ?? '')
    const [startDate, setStartDate] = useState(props.trip?.startDate ?? '')
    const [endDate, setEndDate] = useState(props.trip?.endDate ?? '')

    const newId = useAppSelector(nextIdSelector)

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        props.submitAction(props.trip?.id ?? newId, name, startDate, endDate)
        setName('')
        setStartDate('')
        setEndDate('')
    }

    return (
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
            <button type='submit'>{props.trip ? 'Update trip' : 'Add trip'}</button>
        </form>
    )
}

export default TripEditorForm