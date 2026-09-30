import type {Trip} from "@/types/tripTypes.ts"
import type {EntryNumbersRecord} from "@/utils/tripUtils.ts"

type Props = {
    trip: Trip;
    stats?: EntryNumbersRecord
}

function TripCard(props: Props) {
    const trip = props.trip
    return (
        <article className={`trip-card${props.stats ? ' trip-card--with-stats' : ''}`}>
            <aside className='trip-card__id'>Trip {trip.id}</aside>
            <h3 className='trip-card__title'>{trip.name}</h3>
            <p className='trip-card__dates'>{trip.startDate} – {trip.endDate}</p>
            <p className='trip-card__budget'>Budget ${trip.budget}</p>
            {props.stats && <dl>
                <dt className='trip-card__stats-title'>Stored for this trip:</dt>
                <dt>Locations:</dt><dd>{props.stats.nLocations}</dd>
                <dt>Activities:</dt><dd>{props.stats.nActivities}</dd>
                <dt>Expenses:</dt><dd>{props.stats.nExpenses}</dd>
                <dt>Tasks:</dt><dd>{props.stats.nTasks}</dd>
            </dl>}
        </article>
    )
}

export default TripCard
