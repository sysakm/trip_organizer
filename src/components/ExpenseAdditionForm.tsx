import type {Trip} from "@/types/tripTypes.ts"
import {type SubmitEvent, useState} from "react"
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts"
import {nextExpenseIdSelector} from "@/app/selectors.ts"
import {addExpense} from "@/features/expenses/expensesSlice.ts"

type Props = {
    trip: Trip
}

function validateForm(name: string, price: number): string | null {
    if (!name.trim()) return 'Name can not be empty'
    if (isNaN(price) || price <= 0) return 'Price must be a valid positive dollar amount'
    return null
}

function ExpenseAdditionForm(props: Props) {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(1)

    const [error, setError] = useState('')

    const dispatch = useAppDispatch()
    const nextId = useAppSelector(nextExpenseIdSelector)

    function handleReset() {
        setName('')
        setPrice(1)
        setError('')
    }

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        const newError = validateForm(name, price)
        if (newError) {
            setError(newError)
        } else {
            dispatch(addExpense(
                {id: nextId, tripId: props.trip.id, name: name.trim(), price: Number(price.toFixed(2)), paid: null}
            ))
            setName('')
            setPrice(1)
            setError('')
        }
    }

    return (
        <form className='form form--entry' onSubmit={handleSubmit}>
            <h3 className='form__title'>Add an expense</h3>
            <label className='form-field' htmlFor="expense-name">
                <span className='form-field__label'>Expense name</span>
                <input
                    type="text" value={name} id="expense-name"
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label className='form-field' htmlFor="expense-price">
                <span className='form-field__label'>Price ($)</span>
                <input
                    type="number" value={price} min='0.01' step='0.01' id='expense-price'
                    onChange={(e) =>
                        setPrice(Number(e.target.value))
                    }
                />
            </label>
            <div className='form__actions'>
                <button className='button button--primary' type='submit'>Add expense</button>
                <button className='button button--secondary' type='button' onClick={handleReset}>Clear form</button>
            </div>
            {error && (<p className='form__error' role='alert'>{error}</p>)}
        </form>
    )
}

export default ExpenseAdditionForm
