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
import {getCurrentDateUtil} from "@/utils/dateUtils.ts"
import type {Trip} from "@/types/tripTypes.ts"

const filterTypes = ['all', 'current', 'completed', 'future'] as const
type FilterType = (typeof filterTypes)[number]

const sortingTypes = ['none', 'id', 'name', 'startDate', 'endDate', 'budget'] as const
const sortingDirections = ['asc', 'desc'] as const
type SortingType = (typeof sortingTypes)[number]
type SortingDirection = (typeof sortingDirections)[number]

const sortingTypeToComparator = new Map<SortingType, (a: Trip, b: Trip) => number>()
sortingTypeToComparator.set('none', (_a, _b) => 0)
sortingTypeToComparator.set('id', (a, b) => a.id - b.id)
sortingTypeToComparator.set('name', (a, b) => a.name.localeCompare(b.name))
sortingTypeToComparator.set('startDate', (a, b) => a.startDate.localeCompare(b.startDate))
sortingTypeToComparator.set('endDate', (a, b) => a.endDate.localeCompare(b.endDate))
sortingTypeToComparator.set('budget', (a, b) => a.budget - b.budget)
const sortingDirectionToComparator = new Map<SortingDirection, number>()
sortingDirectionToComparator.set('asc', 1)
sortingDirectionToComparator.set('desc', -1)

function TripBrowserPage() {
    const [selected, setSelected] = useState('')

    const [searchQuery, setSearchQuery] = useState('')
    const [filterType, setFilterType] = useState<FilterType>('all')
    const [sortingType, setSortingType] = useState<SortingType>('none')
    const [sortingDirection, setSortingDirection] = useState<SortingDirection>('asc')

    const trips = useAppSelector(tripsSelector)
    const activities = useAppSelector(activitiesSelector)
    const locations = useAppSelector(locationsSelector)
    const expenses = useAppSelector(expensesSelector)
    const tasks = useAppSelector(tasksSelector)

    const tripStats = calculateEntryNumbersForTrips(
        activities, locations, expenses, tasks
    )
    const emptyStatsTemplate: EntryNumbersRecord = {nActivities: 0, nExpenses: 0, nLocations: 0, nTasks: 0}
    const trip = trips.find(trip => trip.id.toString() === selected)

    const today = getCurrentDateUtil()
    const filteredTrips = trips.filter(trip => {
        const query = searchQuery.trim().toLowerCase()
        if (trip.name.toLowerCase().includes(query)) return true
        if (activities.some(activity => activity.tripId == trip.id && activity.name.toLowerCase().includes(query)))
            return true
        if (locations.some(location => location.tripId == trip.id && location.name.toLowerCase().includes(query)))
            return true
        if (expenses.some(expense => expense.tripId == trip.id && expense.name.toLowerCase().includes(query)))
            return true
        if (tasks.some(task => task.tripId == trip.id && task.description.toLowerCase().includes(query)))
            return true
        return false
    }).filter(trip => {
        switch (filterType) {
            case 'all':
                return true
            case 'current':
                return (trip.startDate.localeCompare(today) <= 0) && (trip.endDate.localeCompare(today) >= 0)
            case 'completed':
                return (trip.endDate.localeCompare(today) < 0)
            case 'future':
                return (trip.startDate.localeCompare(today) > 0)
            default:
                return false
        }
    }).toSorted(
        (a, b) =>
            (sortingTypeToComparator.get(sortingType)?.(a, b) ?? 0)
            * (sortingDirectionToComparator.get(sortingDirection) ?? 1)
    )
    const isTripSelected = filteredTrips.some(trip => trip.id.toString() === selected)

    return (
        <section className='page page--browser'>
            <div className='page__intro'>
                <p className='eyebrow'>Your collection</p>
                <h1>Browse your trips</h1>
                <p className='page__lede'>Search, filter, and sort your saved plans.</p>
            </div>
            <div className='trip-browser__controls' role='search'>
                <label className='form-field form-field--search' htmlFor='trip-search'>
                    <span className='form-field__label'>Search trips</span>
                    <input
                        id='trip-search'
                        type='search'
                        placeholder='Trip, activity, place, expense, or task'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </label>
                <label className='form-field' htmlFor='trip-filter'>
                    <span className='form-field__label'>Show</span>
                    <select id='trip-filter'
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value as FilterType)}>
                    {filterTypes.map(filter => (
                        <option key={`filter-type-${filter}`} value={filter}>
                            {filter}
                        </option>
                    ))}
                    </select>
                </label>
                <label className='form-field' htmlFor='trip-sort'>
                    <span className='form-field__label'>Sort by</span>
                    <select id='trip-sort'
                            value={sortingType}
                            onChange={(e) => setSortingType(e.target.value as SortingType)}>
                    {sortingTypes.map(sorting => (
                        <option key={`sorting-type-${sorting}`} value={sorting}>
                            {sorting}
                        </option>
                    ))}
                    </select>
                </label>
                {sortingType !== 'none' && (<label className='form-field' htmlFor='trip-sort-direction'>
                    <span className='form-field__label'>Direction</span>
                    <select id='trip-sort-direction'
                            value={sortingDirection}
                            onChange={(e) => setSortingDirection(e.target.value as SortingDirection)}>
                    {sortingDirections.map(direction => (
                        <option key={`sorting-direction-${direction}`} value={direction}>
                            {direction}
                        </option>
                    ))}
                    </select>
                </label>)}
            </div>
            <label className='form-field trip-browser__select' htmlFor='trip-select'>
                <span className='form-field__label'>{filteredTrips.length ? 'Choose a trip' : 'No trips match the filters'}</span>
            <select id='trip-select'
                    disabled={filteredTrips.length === 0}
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}>
                <option disabled={true} value={''}>
                    Choose the trip
                </option>
                {filteredTrips.map(trip => (
                    <option key={`trip-option-${trip.id}`} value={trip.id.toString()}>
                        {trip.name}: {trip.startDate} - {trip.endDate}
                    </option>
                ))}
            </select>
            </label>
            <div className='trip-browser__selected'>
                {
                    isTripSelected ?
                        (
                            trip ?
                            (
                                <>
                                    <Link className='button button--secondary' to={`/browse/${trip.id}`}>Open full trip page</Link>
                                    <TripCard trip={trip}/>
                                </>
                            ) : (
                                <p>Something went wrong - no such trip in store</p>
                            )
                        )
                    : (filteredTrips.length > 0 && <p>Select a trip from the dropdown menu!</p>)
                }
            </div>
            <div className='trip-browser__grid'>{filteredTrips.map(trip => (
                <button className='trip-browser__card-button' type='button' key={`clickable-trip-card-${trip.id}`} aria-label={`Select ${trip.name}`} onClick={() => setSelected(trip.id.toString())}>
                    <TripCard trip={trip} stats={tripStats.get(trip.id) ?? emptyStatsTemplate}/>
                </button>
            ))}</div>
        </section>
    )
}

export default TripBrowserPage
