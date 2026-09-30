import {type SubmitEvent, useState} from "react"
import {useAppSelector} from "@/app/hooks.ts"
import {nextIdSelector} from "@/app/selectors.ts"
import DateInputField from "@/components/DateInputField"
import type {Trip} from "@/types/tripTypes.ts"

type Props = {
    submitAction: (id: number, name: string, startDate: string, endDate: string, budget: number) => void;
    trip?: Trip;
}

function validateForm(name: string, startDate: string, endDate: string, budget: number): string | null {
    if (!name.trim()) return 'Name can not be empty'
    if (!startDate || !endDate || startDate.localeCompare(endDate) > 0) return 'Date range has to be valid'
    if (!Number.isInteger(budget) || budget <= 0) return 'Budget must be a positive integer'
    return null
}

function TripEditorForm(props: Props) {
    const [name, setName] = useState(props.trip?.name ?? '')
    const [startDate, setStartDate] = useState(props.trip?.startDate ?? '')
    const [endDate, setEndDate] = useState(props.trip?.endDate ?? '')
    const [budget, setBudget] = useState(props.trip?.budget ?? 1000)

    const [error, setError] = useState('')

    const newId = useAppSelector(nextIdSelector)

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        const newError = validateForm(name, startDate, endDate, budget)
        if (newError) {
            setError(newError)
        } else {
            props.submitAction(props.trip?.id ?? newId, name.trim(), startDate, endDate, budget)
            setName('')
            setStartDate('')
            setEndDate('')
            setBudget(1000)
            setError('')
        }
    }

    return (
        <form className='form form--trip-editor' onSubmit={handleSubmit}>
            <label className='form-field' htmlFor="name">
                <span className='form-field__label'>Trip Name</span>
                <input
                    type="text" value={name} id="name"
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <DateInputField label='Start date' id='startDate' value={startDate}
                            onChange={setStartDate}/>
            <DateInputField label='End date' id='endDate' value={endDate}
                            onChange={setEndDate}/>
            <label className='form-field' htmlFor="budget">
                <span className='form-field__label'>Budget ($)</span>
                <input
                    type="number" value={budget} min='1' step='1' id='budget'
                    onChange={(e) => setBudget(Number(e.target.value))}
                />
            </label>
            <div className='form__actions'>
                <button className='button button--primary' type='submit'>{props.trip ? 'Update trip' : 'Add trip'}</button>
            </div>
            {error && (<p className='form__error' role='alert'>{error}</p>)}
        </form>
    )
}

export default TripEditorForm
