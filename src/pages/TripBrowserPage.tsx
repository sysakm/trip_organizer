import {tripsSelector} from "@/app/selectors.ts"
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts"
import {removeTrip} from "@/features/trips/tripsSlice.ts"
import {useState} from "react"

function TripBrowserPage() {
    const [selected, setSelected] = useState('')
    const dispatch = useAppDispatch()
    const trips = useAppSelector(tripsSelector)

    const isTripSelected = selected !== ''
    const trip = trips.find(trip => trip.id.toString() === selected)

    return (
        <>
            <h1>Browse your trips:</h1>
            <label htmlFor='trip-select'>Choose the trip</label>
            <select id='trip-select' value={selected}
                    onChange={(e) => setSelected(e.target.value)}>
                <option disabled={true} value={''}>
                    Choose the trip
                </option>
                {trips.map(trip => (
                    <option key={`dog-option-${trip.id}`} value={trip.id.toString()}>
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
                                    <aside>{trip.id}</aside>
                                    <h3>{trip.name}: {trip.startDate}-{trip.endDate}</h3>
                                    <button type='button'
                                            onClick={() => {
                                                dispatch(removeTrip(trip.id))
                                                setSelected('')
                                            }}>
                                        Delete this trip
                                    </button>
                                </>
                            ) : (
                                <p>Something went wrong - no such trip in store</p>
                            )
                        )
                    : <p>Select a trip from the dropdown menu!</p>
            }
            </div>
        </>
    )
}

export default TripBrowserPage