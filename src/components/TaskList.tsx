import {type Trip, TripTaskCategories} from "@/types/tripTypes.ts"
import {useState} from "react"
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts"
import {nextTaskIdSelector, tasksSelector} from "@/app/selectors.ts"
import {addTask, removeTask, updateTask} from "@/features/tasks/tasksSlice.ts"

type Props = {
    trip: Trip
}

function validateForm(category: (typeof TripTaskCategories)[number] | '', description: string): string | null {
    if (!description.trim()) return 'Description can not be empty'
    if (!category || !TripTaskCategories.includes(category)) return 'Category must be valid'
    return null
}

function TaskList(props: Props) {
    const dispatch = useAppDispatch()
    const tasks = useAppSelector(tasksSelector).filter(task => task.tripId === props.trip.id).toSorted(
        (a, b) => Number(a.done) - Number(b.done)
    )
    const nextId = useAppSelector(nextTaskIdSelector)
    const [category, setCategory] = useState<(typeof TripTaskCategories)[number] | ''>('')
    const [description, setDescription] = useState('')

    const [error, setError] = useState('')

    function handleReset() {
        setCategory('')
        setDescription('')
        setError('')
    }
    function handleAddTask() {
        const newError = validateForm(category, description)
        if (newError) {
            setError(newError)
        } else if (!category) {
            setError('Empty category')
        } else {
            dispatch(addTask({id: nextId, tripId: props.trip.id, category, description: description.trim(), done: false}))
            setCategory('')
            setDescription('')
            setError('')
        }
    }

    return (
        <section className='task-list'>
            <h2 className='section-title'>Tasks</h2>
            <div className='table-wrap'>
            <table className='data-table'>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr className={task.done ? 'task-list__row task-list__row--done' : 'task-list__row'} key={`task-${task.id}`}>
                            <td>{task.category}</td>
                            <td>{task.description}</td>
                            <td>
                                <button className='button button--quiet'
                                    type='button'
                                    onClick={() =>
                                        dispatch(updateTask({...task, done: !task.done}))
                                    }
                                >
                                    {task.done ? 'Uncomplete' : 'Complete'}
                                </button>
                                <button className='button button--quiet'
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
                            <label className='form-field' htmlFor='task-category'>
                                <span className='form-field__label'>Choose category</span>
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
                            <label className='form-field' htmlFor='task-description'>
                                <span className='form-field__label'>Description</span>
                                <textarea
                                    id='task-description' rows={4} value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </label>
                        </td>
                        <td>
                            <button className='button button--primary'
                                type='button'
                                onClick={handleAddTask}
                            >Add task</button>
                            <button className='button button--secondary' type='button' onClick={handleReset}>Clear form</button>
                            {error && (<p className='form__error' role='alert'>{error}</p>)}
                        </td>
                    </tr>
                </tfoot>
            </table>
            </div>
        </section>
    )
}

export default TaskList
