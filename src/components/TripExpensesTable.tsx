import type {Trip} from "@/types/tripTypes.ts"
import {expensesSelector} from "@/app/selectors.ts"
import {useAppSelector} from "@/app/hooks.ts"
import ExpenseActionForm from "@/components/ExpenseActionForm.tsx"

type Props = {
    trip: Trip
}

function TripExpensesTable(props: Props) {
    const expenses = useAppSelector(expensesSelector).filter(expense => expense.tripId === props.trip.id)
    const expectedExpenses = expenses.reduce((total, exp ) => total + exp.price, 0)
    const realizedExpenses = expenses.reduce((total, exp) => total + exp.paid, 0)

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
                            <td>${exp.paid}</td>
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