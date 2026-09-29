import type {Trip} from "@/types/tripTypes.ts"
import {expensesSelector} from "@/app/selectors.ts"
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts"
import {removeExpense, updateExpense} from "@/features/expenses/expensesSlice.ts";

type Props = {
    trip: Trip
}

function TripExpensesTable(props: Props) {
    const dispatch = useAppDispatch()
    const expenses = useAppSelector(expensesSelector).filter(expense => expense.tripId === props.trip.id)
    const expectedExpenses = expenses.reduce((total, exp ) => total + exp.price, 0)
    const realizedExpenses = expenses.reduce((total, exp) => exp.paid ? total + exp.price : total, 0)

    return (
        <>
            <p>
                <span>Expected Total Spendings: ${expectedExpenses}/${props.trip.budget}</span>
                <span>Total Spent: ${realizedExpenses}/${props.trip.budget}</span>
            </p>
            {expenses.length > 0 && <div>
                <table>
                    <thead>
                        <tr>
                            <th>Expense</th>
                            <th>Price, $</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {expenses.map(exp => (
                        <tr style={{backgroundColor: exp.paid ? 'green' : 'red'}} key={`expense-${exp.id}`}>
                            <td>{exp.name}</td>
                            <td>{exp.price}</td>
                            <td>
                                {!exp.paid && <button
                                    type='button'
                                    onClick={() => {
                                        dispatch(updateExpense({...exp, paid: true}))
                                    }}
                                >
                                    Complete Expense
                                </button>}
                                <button type='button' onClick={() => dispatch(removeExpense(exp.id))}>
                                    Remove Expense
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>}
        </>
    )
}

export default TripExpensesTable