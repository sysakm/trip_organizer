import TripTimeline from "@/components/TripTimeline.tsx"
import TripEditorForm from "@/components/TripEditorForm.tsx"
import {removeTrip, updateTrip} from "@/features/trips/tripsSlice.ts"
import {createTripUtil} from "@/utils/tripUtils.ts"
import ActivityAdditionForm from "@/components/ActivityAdditionForm.tsx"
import {Link, useNavigate, useParams} from "react-router-dom"
import {tripsSelector} from "@/app/selectors.ts"
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts"
import {useState} from "react"
import LocationAdditionForm from "@/components/LocationAdditionForm.tsx"
import ExpenseAdditionForm from "@/components/ExpenseAdditionForm.tsx"
import TripExpensesTable from "@/components/TripExpensesTable.tsx"
import TaskList from "@/components/TaskList.tsx"
import TripCard from "@/components/TripCard.tsx"

const subPageEntries = [
    'timeline', 'budget', 'tasks'
] as const

function TripPage() {
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useAppDispatch()
    const trip = useAppSelector(tripsSelector).find(trip => params.id && trip.id.toString() === params.id)
    const [isEditing, setIsEditing] = useState(false)
    const [subPage, setSubPage] = useState<(typeof subPageEntries)[number]>('timeline')

    return (
        <section className='page page--trip'>
            <div className='page__intro'>
                <p className='eyebrow'>Trip workspace</p>
                <h1>Trip Page</h1>
            </div>
            <div className='trip-page__content'>
                {
                    trip ? (
                        <>
                            <Link className='button button--secondary back-link' to='/browse'>Back to browsing</Link>
                            <TripCard trip={trip}/>
                            <div className='trip-page__actions'>
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
                                <button className='button button--secondary' type='button' onClick={() => setIsEditing(false)}>Leave without editing</button>
                            </> : <button type='button' onClick={() => setIsEditing(true)}>
                                Edit this trip
                            </button>}
                            <button type='button'
                                    className='button button--danger'
                                    onClick={() => {
                                        dispatch(removeTrip(trip.id))
                                        navigate('/browse')
                                    }}>
                                Delete this trip
                            </button>
                            </div>
                            <nav className='trip-page__tabs' aria-label='Trip sections'>
                                {subPageEntries.map(entry => (
                                    <button className='trip-page__tab' key={'sub-page'+entry} type='button' aria-pressed={subPage===entry} disabled={subPage===entry} onClick={() => setSubPage(entry)}>
                                        {entry}
                                    </button>
                                ))}
                            </nav>
                            {subPage === 'timeline' && <>
                                <TripTimeline trip={trip}/>
                                <LocationAdditionForm trip={trip}/>
                                <ActivityAdditionForm trip={trip}/>
                            </>}
                            {subPage === 'budget' && <>
                                <TripExpensesTable trip={trip}/>
                                <ExpenseAdditionForm trip={trip}/>
                            </>}
                            {subPage === 'tasks' && <TaskList trip={trip}/>}
                        </>
                    ) : (
                        <>
                            <p>Something went wrong - no such trip in store</p>
                            <Link to='/browse'>Back To Browsing</Link>
                        </>
                    )
                }
            </div>
        </section>
    )
}

export default TripPage
