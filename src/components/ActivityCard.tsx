import type {TripActivity} from "@/types/tripTypes.ts"
import {useAppDispatch} from "@/app/hooks.ts"
import {removeActivity, updateActivity} from "@/features/activities/activitiesSlice.ts"
import {createActivityUtil} from "@/utils/tripUtils.ts";
import {adjustDateUtil} from "@/utils/dateUtils.ts";

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
        <article style={{border: '1px solid yellow', display: 'inline-block'}}>
            <h5 style={{margin: '0'}}>{props.activity.name}</h5>
            {props.activity.time && <p>{props.activity.time}</p>}
            <button type='button' onClick={() => dispatch(removeActivity(props.activity.id))}>X</button>
            <button type='button' disabled={!props.allowPrevDate} onClick={handlePreviousDate}>^</button>
            <button type='button' disabled={!props.allowNextDate} onClick={handleNextDate}>v</button>
        </article>
    )
}

export default ActivityCard