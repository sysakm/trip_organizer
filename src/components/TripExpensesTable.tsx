import type {Trip} from "@/types/tripTypes.ts"
import {expensesSelector} from "@/app/selectors.ts"
import {useAppSelector} from "@/app/hooks.ts"
import ExpenseActionBar from "@/components/ExpenseActionBar.tsx"

type Props = {
    trip: Trip
}

function TripExpensesTable(props: Props) {
    const expenses = useAppSelector(expensesSelector).filter(expense => expense.tripId === props.trip.id)
    const expectedExpenses = expenses.reduce(
        (total, exp ) =>
        Number((total + exp.price).toFixed(2)), 0)
    const realizedExpenses = expenses.reduce(
        (total, exp) =>
        Number((total + (exp.paid ?? 0)).toFixed(2)), 0)

    return (
        <section className='expenses-panel'>
            <div className='budget-summary'>
                <span className={`budget-summary__item${expectedExpenses > props.trip.budget ? ' budget-summary__item--over' : ''}`}>
                    Expected Total Spendings: ${expectedExpenses}/${props.trip.budget}</span>
                <span className={`budget-summary__item${realizedExpenses > props.trip.budget ? ' budget-summary__item--over' : ''}`}>
                    Total Spent: ${realizedExpenses}/${props.trip.budget}</span>
            </div>
            {expenses.length > 0 && <div>
                <div className='table-wrap'>
                <table className='data-table'>
                    <thead>
                        <tr>
                            <th>Expense</th>
                            <th>Expected Price</th>
                            <th>Paid Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {expenses.map(exp => (
                        <tr key={`expense-${exp.id}`}>
                            <td>{exp.name}</td>
                            <td>${exp.price}</td>
                            <td>${exp.paid ?? 'TBD'}</td>
                            <td>
                                <ExpenseActionBar expense={exp}/>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>}
        </section>
    )
}

export default TripExpensesTable
