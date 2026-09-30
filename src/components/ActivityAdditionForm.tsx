import type {Trip} from "@/types/tripTypes.ts"
import {nextActivityIdSelector} from "@/app/selectors.ts"
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts"
import {type SubmitEvent, useState} from "react"
import {createDateIntervalUtil} from "@/utils/dateUtils.ts"
import {addActivity} from "@/features/activities/activitiesSlice.ts"
import {createActivityUtil} from "@/utils/tripUtils.ts"

type Props = {
    trip: Trip
}

function validateForm(name: string, date: string, specifyTime: boolean, time: string): string | null {
    if (!name.trim()) return 'Name can not be empty'
    if (!date && specifyTime) return 'Time not allowed for dateless activities'
    if (specifyTime && !time) return 'Specific time can not be empty'
    return null
}

function ActivityAdditionForm(props: Props) {
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [specifyTime, setSpecifyTime] = useState(false)
    const [time, setTime] = useState('')

    const [error, setError] = useState('')

    const dispatch = useAppDispatch()
    const newId = useAppSelector(nextActivityIdSelector)

    const dateList = createDateIntervalUtil(props.trip.startDate, props.trip.endDate)

    function handleReset() {
        setName('')
        setDate('')
        setSpecifyTime(false)
        setTime('')
        setError('')
    }

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        const newError = validateForm(name, date, specifyTime, time)
        if (newError) {
            setError(newError)
        } else {
            dispatch(addActivity(
                specifyTime ? createActivityUtil(newId, props.trip.id, name.trim(), date, time) :
                    createActivityUtil(newId, props.trip.id, name.trim(), date)
            ))
            setName('')
            setDate('')
            setSpecifyTime(false)
            setTime('')
        }
    }

    return (
        <form className='form form--entry' onSubmit={handleSubmit}>
            <h3 className='form__title'>Add an activity</h3>
            <label className='form-field' htmlFor="activity-name">
                <span className='form-field__label'>Activity name</span>
                <input
                    type="text" value={name} id="activity-name"
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label className='form-field' htmlFor='date-select'>
                <span className='form-field__label'>Date</span>
                <select id='date-select'
                        disabled={dateList.length === 0}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}>
                    <option value={''}>
                        No date
                    </option>
                    {dateList.map(date => (
                        <option key={`date-${date}`} value={date}>
                            {date}
                        </option>
                    ))}
                </select>
            </label>
            <label className='form-field form-field--checkbox' htmlFor="specify-time">
                <span className='form-field__label'>Add specific time</span>
                <input id='specify-time' type='checkbox' checked={specifyTime} onChange={() => setSpecifyTime(!specifyTime)}/>
            </label>
            {specifyTime && (
                <label className='form-field' htmlFor="time">
                    <span className='form-field__label'>Time</span>
                    <input id='time' type='time' value={time} onChange={(e) => setTime(e.target.value)}/>
                </label>
            )}
            <div className='form__actions'>
                <button className='button button--primary' type='submit'>Add activity</button>
                <button className='button button--secondary' type='button' onClick={handleReset}>Clear form</button>
            </div>
            {error && (<p className='form__error' role='alert'>{error}</p>)}
        </form>
    )
}

export default ActivityAdditionForm
