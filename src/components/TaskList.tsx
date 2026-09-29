import {type Trip, TripTaskCategories} from "@/types/tripTypes.ts"
import {useState} from "react"
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts"
import {nextTaskIdSelector, tasksSelector} from "@/app/selectors.ts";
import {addTask, removeTask, updateTask} from "@/features/tasks/tasksSlice.ts";

type Props = {
    trip: Trip
}

function TaskList(props: Props) {
    const dispatch = useAppDispatch()
    const tasks = useAppSelector(tasksSelector).filter(task => task.tripId === props.trip.id).toSorted(
        (a, b) => Number(a.done) - Number(b.done)
    )
    const nextId = useAppSelector(nextTaskIdSelector)
    const [category, setCategory] = useState<(typeof TripTaskCategories)[number] | ''>('')
    const [description, setDescription] = useState('')

    function handleReset() {
        setCategory('')
        setDescription('')
    }
    function handleAddTask() {
        if (category !== '' && description.trim() !== '') {
            dispatch(addTask({id: nextId, tripId: props.trip.id, category, description, done: false}))
            setCategory('')
            setDescription('')
        }
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={`task-${task.id}`} style={{textDecoration: task.done ? 'line-through' : ''}}>
                            <td>{task.category}</td>
                            <td>{task.description}</td>
                            <td>
                                <button
                                    type='button'
                                    onClick={() =>
                                        dispatch(updateTask({...task, done: !task.done}))
                                    }
                                >
                                    {task.done ? 'Uncomplete' : 'Complete'}
                                </button>
                                <button
                                    type='button'
                                    onClick={() =>
                                        dispatch(removeTask(task.id))
                                    }
                                >
                                    Delete task
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td>
                            <label htmlFor='task-category'>
                                Choose category
                                <select id='task-category'
                                        value={category}
                                        onChange={(e) =>
                                            setCategory(e.target.value as (typeof TripTaskCategories)[number])
                                        }>
                                    <option disabled={true} value={''}>
                                        Choose the category
                                    </option>
                                    {TripTaskCategories.map(cat => (
                                        <option key={`task-category-${cat}`} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </td>
                        <td>
                            <label htmlFor='task-description'>
                                <textarea
                                    id='task-description' rows={4} value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </label>
                        </td>
                        <td>
                            <button
                                type='button'
                                disabled={category === '' || description.trim() === ''}
                                onClick={handleAddTask}
                            >Add Task</button>
                            <button type='button' onClick={handleReset}>Clear Form</button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default TaskList