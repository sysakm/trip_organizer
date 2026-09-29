import type {Trip} from "@/types/tripTypes.ts"
import {expensesSelector} from "@/app/selectors.ts"
import {useAppSelector} from "@/app/hooks.ts"
import ExpenseActionForm from "@/components/ExpenseActionForm.tsx"

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
        <>
            <p>
                <span style={{color: expectedExpenses > props.trip.budget ? 'AccentColor' : ''}}>
                    Expected Total Spendings: ${expectedExpenses}/${props.trip.budget}</span>
                <span style={{color: realizedExpenses > props.trip.budget ? 'AccentColor' : ''}}>
                    Total Spent: ${realizedExpenses}/${props.trip.budget}</span>
            </p>
            {expenses.length > 0 && <div>
                <table>
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
                                <ExpenseActionForm expense={exp}/>
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