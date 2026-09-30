import type {TripExpense} from "@/types/tripTypes.ts"
import {useAppDispatch} from "@/app/hooks.ts"
import {removeExpense, updateExpense} from "@/features/expenses/expensesSlice.ts"
import {useState} from "react"

type Props = {
    expense: TripExpense;
}

function ExpenseActionBar(props: Props) {
    const dispatch = useAppDispatch()
    const [amount, setAmount] = useState(props.expense.price)
    return (
        <div className='expense-actions'>
            {props.expense.paid === null && <input
                aria-label={`Paid amount for ${props.expense.name}`}
                className='expense-actions__amount'
                type='number'
                value={amount}
                min='0'
                step='0.01'
                onChange={(e) => setAmount(Number(e.target.value))}
            />}
            {props.expense.paid === null && <button className='button button--quiet'
                type='button'
                onClick={() => {
                    dispatch(updateExpense({...props.expense, paid: Number(amount.toFixed(2))}))
                }}
            >
                Complete Expense
            </button>}
            <button className='button button--quiet' type='button' onClick={() => dispatch(removeExpense(props.expense.id))}>
                Remove Expense
            </button>
        </div>
    )
}

export default ExpenseActionBar
