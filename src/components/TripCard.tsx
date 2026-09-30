import type {Trip} from "@/types/tripTypes.ts"
import type {EntryNumbersRecord} from "@/utils/tripUtils.ts"

type Props = {
    trip: Trip;
    stats?: EntryNumbersRecord
}

function TripCard(props: Props) {
    const trip = props.trip
    return (
        <>
            <aside>{trip.id}</aside>
            <h3>{trip.name}: {trip.startDate} - {trip.endDate} (Budget ${trip.budget})</h3>
            {props.stats && <dl>
                Stored for this trip:
                <dt>Locations:</dt><dd>{props.stats.nLocations}</dd>
                <dt>Activities:</dt><dd>{props.stats.nActivities}</dd>
                <dt>Expenses:</dt><dd>{props.stats.nExpenses}</dd>
                <dt>Tasks:</dt><dd>{props.stats.nTasks}</dd>
            </dl>}
        </>
    )
}

export default TripCard