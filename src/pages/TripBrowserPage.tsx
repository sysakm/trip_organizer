import {tripsSelector} from "@/app/selectors.ts"
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts"
import {addTrip, removeTrip} from "@/features/trips/tripsSlice.ts"
import {useState} from "react"
import TripEditorForm from "@/components/TripEditorForm.tsx";
import {createTripUtil} from "@/utils/tripUtils.ts";

function TripBrowserPage() {
    const [selected, setSelected] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const dispatch = useAppDispatch()
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
                                    {isEditing ? <TripEditorForm trip={trip}
                                        submitAction={
                                            (id: number, name: string, startDate: string, endDate: string) => {
                                                dispatch(removeTrip(id))
                                                dispatch(addTrip(createTripUtil(id, name, startDate, endDate)))
                                                setIsEditing(false)
                                            }
                                        }
                                    /> : <button type='button' onClick={() => setIsEditing(true)}>
                                        Edit this trip
                                    </button>}
                                    <button type='button'
                                            onClick={() => {
                                                dispatch(removeTrip(trip.id))
                                                setSelected('')
                                                setIsEditing(false)
                                            }}>
                                        Delete this trip
                                    </button>
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