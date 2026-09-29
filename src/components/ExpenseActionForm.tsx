import type {TripExpense} from "@/types/tripTypes.ts"
import {useAppDispatch} from "@/app/hooks.ts";
import {removeExpense, updateExpense} from "@/features/expenses/expensesSlice.ts";
import {useState} from "react";

type Props = {
    expense: TripExpense;
}

function ExpenseActionForm(props: Props) {
    const dispatch = useAppDispatch()
    const [amount, setAmount] = useState(props.expense.price)
    return (
        <>
            {props.expense.paid === null && <input
                type='number'
                value={amount}
                min={0}
                step={0.01}
                onChange={(e) => setAmount(Number(e.target.value))}
            />}
            {props.expense.paid === null && <button
                type='button'
                onClick={() => {
                    dispatch(updateExpense({...props.expense, paid: amount}))
                }}
            >
                Complete Expense
            </button>}
            <button type='button' onClick={() => dispatch(removeExpense(props.expense.id))}>
                Remove Expense
            </button>
        </>
    )
}

export default ExpenseActionForm