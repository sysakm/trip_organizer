import {tripsSelector} from "@/app/selectors.ts"
import {useAppSelector} from "@/app/hooks.ts"
import {useState} from "react"
import { Link } from "react-router-dom"

function TripBrowserPage() {
    const [selected, setSelected] = useState('')
    const trips = useAppSelector(tripsSelector)

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
                                    <aside>{trip.id}</aside>
                                    <h3>{trip.name}: {trip.startDate}-{trip.endDate}</h3>
                                </>
                            ) : (
                                <p>Something went wrong - no such trip in store</p>
                            )
                        )
                    : (trips.length > 0 && <p>Select a trip from the dropdown menu!</p>)
                }
            </div>
        </>
    )
}

export default TripBrowserPage