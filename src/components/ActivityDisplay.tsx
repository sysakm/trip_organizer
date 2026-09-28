import type {Trip} from "@/types/tripTypes.ts"
import {useAppSelector} from "@/app/hooks.ts"
import {activitiesSelector} from "@/app/selectors.ts"
import {createDateIntervalUtil, formatDateUtil} from "@/utils/dateUtils.ts"
import ActivityCard from "@/components/ActivityCard.tsx"
import {sortActivitiesByTimeUtil} from "@/utils/tripUtils.ts"

type Props = {
    trip: Trip
}

function ActivityDisplay(props: Props) {
    let activities = useAppSelector(activitiesSelector)
    activities = sortActivitiesByTimeUtil(
        activities.filter(activity => activity.tripId === props.trip.id)
    )
    const dateList = createDateIntervalUtil(props.trip.startDate, props.trip.endDate)
    const activitesWithoutDate = activities.filter(act => !act.date || !dateList.includes(act.date))

    return (
        <div>
            {activitesWithoutDate.length > 0 && <div>
                <div>Unspecified Date</div>
                <div>
                    {activitesWithoutDate.map(act => (
                        <ActivityCard key={act.id} activity={act}/>
                    ))}
                </div>
            </div>}
            {dateList.map(date => (
                <div key={date}>
                    <div>{formatDateUtil(date)}</div>
                    <div>
                        {activities.filter(act => act.date === date).map(act => (
                            <ActivityCard key={act.id} activity={act}/>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ActivityDisplay