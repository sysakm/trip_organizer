import type {TripActivity} from "@/types/tripTypes.ts"
import {useAppDispatch} from "@/app/hooks.ts"
import {removeActivity, updateActivity} from "@/features/activities/activitiesSlice.ts"
import {createActivityUtil} from "@/utils/tripUtils.ts"
import {adjustDateUtil} from "@/utils/dateUtils.ts"

type Props = {
    activity: TripActivity;
    allowPrevDate: boolean;
    allowNextDate: boolean;
}

function ActivityCard(props: Props) {
    const dispatch = useAppDispatch()

    function handlePreviousDate() {
        if (props.allowPrevDate) {
            dispatch(updateActivity(
                createActivityUtil(
                    props.activity.id,
                    props.activity.tripId,
                    props.activity.name,
                    adjustDateUtil(props.activity.date, -1),
                    props.activity.time
                )
            ))
        }
    }
    function handleNextDate() {
        if (props.allowNextDate) {
            dispatch(updateActivity(
                createActivityUtil(
                    props.activity.id,
                    props.activity.tripId,
                    props.activity.name,
                    adjustDateUtil(props.activity.date, 1),
                    props.activity.time
                )
            ))
        }
    }

    return (
        <article className='activity-card'>
            <h5 className='activity-card__title'>{props.activity.name}</h5>
            {props.activity.time && <p>{props.activity.time}</p>}
            <div className='activity-card__actions'>
                <button className='button button--quiet' type='button' aria-label={`Remove ${props.activity.name}`} onClick={() => dispatch(removeActivity(props.activity.id))}>Remove</button>
                <button className='button button--quiet' type='button' aria-label={`Move ${props.activity.name} to the previous date`} disabled={!props.allowPrevDate} onClick={handlePreviousDate}>Earlier</button>
                <button className='button button--quiet' type='button' aria-label={`Move ${props.activity.name} to the next date`} disabled={!props.allowNextDate} onClick={handleNextDate}>Later</button>
            </div>
        </article>
    )
}

export default ActivityCard
