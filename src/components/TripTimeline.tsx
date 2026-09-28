import type {Trip} from "@/types/tripTypes.ts"
import {useAppSelector} from "@/app/hooks.ts"
import {activitiesSelector, locationsSelector} from "@/app/selectors.ts"
import {createDateIntervalUtil, formatDateUtil} from "@/utils/dateUtils.ts"
import ActivityCard from "@/components/ActivityCard.tsx"
import {sortActivitiesByTimeUtil} from "@/utils/tripUtils.ts"

type Props = {
    trip: Trip
}

function TripTimeline(props: Props) {
    let activities = useAppSelector(activitiesSelector)
    activities = sortActivitiesByTimeUtil(
        activities.filter(activity => activity.tripId === props.trip.id)
    )
    const locations = useAppSelector(locationsSelector).filter(location => location.tripId == props.trip.id)

    const dateList = createDateIntervalUtil(props.trip.startDate, props.trip.endDate)
    const activitiesWithoutDate = activities.filter(act => !act.date || !dateList.includes(act.date))

    return (
        <div style={{
            display: 'grid',
            gridTemplateRows: `repeat(${dateList.length + +(activitiesWithoutDate.length > 0)}, 1fr)`,
            gridTemplateColumns: '1fr 1fr 1fr',
            gridAutoFlow: 'column'
        }}>
            {activitiesWithoutDate.length > 0 && <div>Unspecified Date</div>}
            {dateList.map((date) => (
                    <div key={date}>{formatDateUtil(date)}</div>
            ))}
            {activitiesWithoutDate.length > 0 &&
                <div>
                    {activitiesWithoutDate.map(act => (
                        <ActivityCard key={act.id} allowPrevDate={false} allowNextDate={false} activity={act}/>
                    ))}
                </div>
            }
            {dateList.map((date, index) => (
                <div key={`activity-card-list-${date}`}>
                    {activities.filter(act => act.date === date).map(act => (
                        <ActivityCard key={act.id} allowPrevDate={index>0} allowNextDate={index<dateList.length-1} activity={act}/>
                    ))}
                </div>
            ))}
            {
                locations.length === 0 &&
                <div style={{
                    gridColumn: '3',
                    gridRowStart: '1',
                    gridRowEnd: `${dateList.length + +(activitiesWithoutDate.length > 0) + 1}`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '1px solid gray'
                }}>
                    No location specified
                </div>
            }
            {
                locations.map(location => (
                    <div key={location.id} style={{
                        gridColumn: '3',
                        gridRowStart: `${dateList.indexOf(location.startDate) + +(activitiesWithoutDate.length > 0) + 1}`,
                        gridRowEnd: `${dateList.indexOf(location.endDate) + +(activitiesWithoutDate.length > 0) + 2}`,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: '1px solid green'
                    }}>
                        {location.name}
                    </div>
                ))
            }
        </div>
    )
}

export default TripTimeline