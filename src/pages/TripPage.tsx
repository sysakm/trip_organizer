import TripTimeline from "@/components/TripTimeline.tsx"
import TripEditorForm from "@/components/TripEditorForm.tsx"
import {removeTrip, updateTrip} from "@/features/trips/tripsSlice.ts"
import {createTripUtil} from "@/utils/tripUtils.ts"
import ActivityAdditionForm from "@/components/ActivityAdditionForm.tsx"
import {Link, useNavigate, useParams} from "react-router-dom"
import {tripsSelector} from "@/app/selectors.ts"
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts"
import {useState} from "react"
import LocationAdditionForm from "@/components/LocationAdditionForm.tsx";
import ExpenseAdditionForm from "@/components/ExpenseAdditionForm.tsx";
import TripExpensesTable from "@/components/TripExpensesTable.tsx";

const subPageEntries = [
    'timeline', 'budget'
] as const

function TripPage() {
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useAppDispatch()
    const trip = useAppSelector(tripsSelector).find(trip => params.id && trip.id.toString() === params.id)
    const [isEditing, setIsEditing] = useState(false)
    const [subPage, setSubPage] = useState<(typeof subPageEntries)[number]>('timeline')

    return (
        <>
            <h1>Trip Page</h1>
            <div>
                {
                    trip ? (
                        <>
                            <Link to='/browse'>Back To Browsing</Link>
                            <aside>{trip.id}</aside>
                            <h3>{trip.name}: {trip.startDate} - {trip.endDate} (Budget ${trip.budget})</h3>
                            {isEditing ? <>
                                <TripEditorForm
                                    key={trip.id}
                                    trip={trip}
                                    submitAction={
                                        (id: number, name: string, startDate: string, endDate: string, budget: number) => {
                                            dispatch(updateTrip(createTripUtil(id, name, startDate, endDate, budget)))
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
                                        navigate('/browse')
                                    }}>
                                Delete this trip
                            </button>
                            <div>
                                {subPageEntries.map(entry => (
                                    <button key={'sub-page'+entry} type='button' disabled={subPage===entry} onClick={() => setSubPage(entry)}>
                                        {entry}
                                    </button>
                                ))}
                            </div>
                            {subPage === 'timeline' && <>
                                <TripTimeline trip={trip}/>
                                <LocationAdditionForm trip={trip}/>
                                <ActivityAdditionForm trip={trip}/>
                            </>}
                            {subPage === 'budget' && <>
                                <TripExpensesTable trip={trip}/>
                                <ExpenseAdditionForm trip={trip}/>
                            </>}
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