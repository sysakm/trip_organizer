import TripTimeline from "@/components/TripTimeline.tsx"
import TripEditorForm from "@/components/TripEditorForm.tsx"
import {removeTrip, updateTrip} from "@/features/trips/tripsSlice.ts"
import {createTripUtil} from "@/utils/tripUtils.ts"
import ActivityAdditionForm from "@/components/ActivityAdditionForm.tsx"
import {Link, useParams} from "react-router-dom"
import {tripsSelector} from "@/app/selectors.ts"
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts"
import {useState} from "react"
import LocationAdditionForm from "@/components/LocationAdditionForm.tsx";

function TripPage() {
    const params = useParams()
    const dispatch = useAppDispatch()
    const trip = useAppSelector(tripsSelector).find(trip => params.id && trip.id.toString() === params.id)
    const [isEditing, setIsEditing] = useState(false)

    return (
        <>
            <h1></h1>
            <div>
                {
                    trip ? (
                        <>
                            <Link to='/browse'>Back To Browsing</Link>
                            <aside>{trip.id}</aside>
                            <h3>{trip.name}: {trip.startDate}-{trip.endDate}</h3>
                            <TripTimeline trip={trip}/>
                            {isEditing ? <>
                                <TripEditorForm
                                    key={trip.id}
                                    trip={trip}
                                    submitAction={
                                        (id: number, name: string, startDate: string, endDate: string) => {
                                            dispatch(updateTrip(createTripUtil(id, name, startDate, endDate)))
                                            setIsEditing(false)
                                        }
                                    }
                                />
                                <button type='button' onClick={() => setIsEditing(false)}>Leave without editing</button>
                            </> : <button type='button' onClick={() => setIsEditing(true)}>
                                Edit this trip
                            </button>}
                            <button type='button'
                                    onClick={() => {
                                        dispatch(removeTrip(trip.id))
                                        setIsEditing(false)
                                    }}>
                                Delete this trip
                            </button>
                            <LocationAdditionForm trip={trip}/>
                            <ActivityAdditionForm trip={trip}/>
                        </>
                    ) : (
                        <>
                            <p>Something went wrong - no such trip in store</p>
                            <Link to='/browse'>Back To Browsing</Link>
                        </>
                    )
                }
            </div>
        </>
    )
}

export default TripPage