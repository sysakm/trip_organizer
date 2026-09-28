import type {TripActivity} from "@/types/tripTypes.ts"
import {useAppDispatch} from "@/app/hooks.ts"
import {removeActivity} from "@/features/activities/activitiesSlice.ts"

type Props = {
    activity: TripActivity
}

function ActivityCard(props: Props) {
    const dispatch = useAppDispatch()
    return (
        <article style={{border: '1px solid yellow', display: 'inline-block'}}>
            <h5 style={{margin: '0'}}>{props.activity.name}</h5>
            {props.activity.time && <p>{props.activity.time}</p>}
            <button type='button' onClick={() => dispatch(removeActivity(props.activity.id))}>X</button>
        </article>
    )
}

export default ActivityCard