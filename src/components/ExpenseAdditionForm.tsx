import type {Trip} from "@/types/tripTypes.ts"
import {type SubmitEvent, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts";
import {nextExpenseIdSelector} from "@/app/selectors.ts";
import {addExpense} from "@/features/expenses/expensesSlice.ts";

type Props = {
    trip: Trip
}

function ExpenseAdditionForm(props: Props) {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(1)

    const dispatch = useAppDispatch()
    const nextId = useAppSelector(nextExpenseIdSelector)

    function handleReset() {
        setName('')
        setPrice(1)
    }

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        dispatch(addExpense({id: nextId, tripId: props.trip.id, name, price, paid: false}))
        setName('')
        setPrice(1)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="expense-name">
                Expense Name
                <input
                    type="text" value={name} id="expense-name"
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label htmlFor="expense-price">
                Price, $
                <input
                    type="number" value={price} min='0.01' step='0.01' id='expense-price'
                    onChange={(e) => setPrice(Number(e.target.value))}
                />
            </label>
            <button type='submit'>Add Activity</button>
            <button type='button' onClick={handleReset}>Clear Form</button>
        </form>
    )
}

export default ExpenseAdditionForm