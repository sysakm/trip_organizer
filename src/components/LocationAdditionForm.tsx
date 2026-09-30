import {type SubmitEvent, useState} from "react"
import {createDateIntervalUtil} from "@/utils/dateUtils.ts"
import type {Trip} from "@/types/tripTypes.ts"
import {createLocationUtil} from "@/utils/tripUtils.ts"
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts"
import {nextLocationIdSelector} from "@/app/selectors.ts"
import {addLocation} from "@/features/locations/locationsSlice.ts"

type Props = {
    trip: Trip
}

function validateForm(name: string, startDate: string, endDate: string): string | null {
    if (!name.trim()) return 'Name can not be empty'
    if (!startDate || !endDate || startDate.localeCompare(endDate) > 0) return 'Date range has to be valid'
    return null
}

function LocationAdditionForm(props: Props) {
    const [name, setName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const [error, setError] = useState('')

    const dispatch = useAppDispatch()

    const nextId = useAppSelector(nextLocationIdSelector)
    const dateList = createDateIntervalUtil(props.trip.startDate, props.trip.endDate)

    function handleReset() {
        setName('')
        setStartDate('')
        setEndDate('')
        setError('')
    }

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        const newError = validateForm(name, startDate, endDate)
        if (newError) {
            setError(newError)
        } else {
            dispatch(addLocation(
                createLocationUtil(nextId, props.trip.id, name.trim(), startDate, endDate)
            ))
            setName('')
            setStartDate('')
            setEndDate('')
            setError('')
        }
    }

    return (
        <form className='form form--entry' onSubmit={handleSubmit}>
            <h3 className='form__title'>Add a location</h3>
            <label className='form-field' htmlFor="location-name">
                <span className='form-field__label'>Location name</span>
                <input
                    type="text" value={name} id="location-name"
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label className='form-field' htmlFor='start-date-select'>
                <span className='form-field__label'>Start date</span>
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
            <label className='form-field' htmlFor='end-date-select'>
                <span className='form-field__label'>End date</span>
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
            <div className='form__actions'>
                <button className='button button--primary' type='submit'>Add location</button>
                <button className='button button--secondary' type='button' onClick={handleReset}>Clear form</button>
            </div>
            {error && (<p className='form__error' role='alert'>{error}</p>)}
        </form>
    )
}

export default LocationAdditionForm
