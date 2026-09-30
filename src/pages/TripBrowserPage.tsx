import {useAppSelector} from "@/app/hooks.ts"
import {useState} from "react"
import {Link} from "react-router-dom"
import TripCard from "@/components/TripCard.tsx"
import {calculateEntryNumbersForTrips, type EntryNumbersRecord} from "@/utils/tripUtils.ts"
import {
    activitiesSelector,
    expensesSelector,
    locationsSelector,
    tasksSelector,
    tripsSelector
} from "@/app/selectors.ts"

function TripBrowserPage() {
    const [selected, setSelected] = useState('')
    const trips = useAppSelector(tripsSelector)
    const activities = useAppSelector(activitiesSelector)
    const locations = useAppSelector(locationsSelector)
    const expenses = useAppSelector(expensesSelector)
    const tasks = useAppSelector(tasksSelector)

    const tripStats = calculateEntryNumbersForTrips(
        activities, locations, expenses, tasks
    )
    const emptyStatsTemplate: EntryNumbersRecord = {nActivities: 0, nExpenses: 0, nLocations: 0, nTasks: 0}
    const isTripSelected = selected !== ''
    const trip = trips.find(trip => trip.id.toString() === selected)

    return (
        <>
            <h1>Browse your trips:</h1>
            <label htmlFor='trip-select'>{trips.length ? 'Choose the trip' : 'No trips created currently'}</label>
            <select id='trip-select'
                    disabled={trips.length === 0}
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}>
                <option disabled={true} value={''}>
                    Choose the trip
                </option>
                {trips.map(trip => (
                    <option key={`trip-option-${trip.id}`} value={trip.id.toString()}>
                        {trip.name}: {trip.startDate} - {trip.endDate}
                    </option>
                ))}
            </select>
            <div>
                {
                    isTripSelected ?
                        (
                            trip ?
                            (
                                <>
                                    <Link to={`/browse/${trip.id}`}>Open Full Trip Page</Link>
                                    <TripCard trip={trip}/>
                                </>
                            ) : (
                                <p>Something went wrong - no such trip in store</p>
                            )
                        )
                    : (trips.length > 0 && <p>Select a trip from the dropdown menu!</p>)
                }
            </div>
            <div>{trips.map(trip => (
                <div key={`clickable-trip-card-${trip.id}`} onClick={() => setSelected(trip.id.toString())}>
                    <TripCard trip={trip} stats={tripStats.get(trip.id) ?? emptyStatsTemplate}/>
                </div>
            ))}</div>
        </>
    )
}

export default TripBrowserPage