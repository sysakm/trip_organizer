import {type SubmitEvent, useState} from "react"
import {createDateIntervalUtil} from "@/utils/dateUtils.ts"
import type {Trip} from "@/types/tripTypes.ts"
import {createLocationUtil} from "@/utils/tripUtils.ts"
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts"
import {nextLocationIdSelector} from "@/app/selectors.ts"
import {addLocation} from "@/features/locations/locationsSlice.ts";

type Props = {
    trip: Trip
}

function LocationAdditionForm(props: Props) {
    const [name, setName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const dispatch = useAppDispatch()

    const nextId = useAppSelector(nextLocationIdSelector)
    const dateList = createDateIntervalUtil(props.trip.startDate, props.trip.endDate)

    function handleReset() {
        setName('')
        setStartDate('')
        setEndDate('')
    }

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        dispatch(addLocation(
            createLocationUtil(nextId, props.trip.id, name, startDate, endDate)
        ))
        setName('')
        setStartDate('')
        setEndDate('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="location-name">
                Location Name
                <input
                    type="text" value={name} id="location-name"
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label htmlFor='start-date-select'>
                Start Date
                <select id='start-date-select'
                        disabled={dateList.length === 0}
                        value={startDate}
                        onChange={(e) => {
                            if (endDate && endDate.localeCompare(e.target.value) < 0) {
                                setEndDate(e.target.value)
                            }
                            setStartDate(e.target.value)
                        }}>
                    <option disabled={true} value={''}>
                        Choose the date
                    </option>
                    {dateList.map(date => (
                        <option key={`start-date-${date}`} value={date}>
                            {date}
                        </option>
                    ))}
                </select>
            </label>
            <label htmlFor='end-date-select'>
                End Date
                <select id='end-date-select'
                        disabled={dateList.length === 0 || startDate === ''}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}>
                    <option disabled={true} value={''}>
                        Choose the date
                    </option>
                    {dateList.filter(date => date.localeCompare(startDate) >= 0).map(date => (
                        <option key={`end-date-${date}`} value={date}>
                            {date}
                        </option>
                    ))}
                </select>
            </label>
            <button type='submit'>Add Location</button>
            <button type='button' onClick={handleReset}>Clear Form</button>
        </form>
    )
}

export default LocationAdditionForm