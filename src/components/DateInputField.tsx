type Props = {
    label: string;
    id: string;
    value: string;
    onChange: (value: string) => void;
}

function DateInputField(props: Props) {
    return (
        <label className='form-field' htmlFor={props.id}>
            <span className='form-field__label'>{props.label}</span>
            <input
                id={props.id}
                type='date'
                value={props.value}
                onChange={
                    (e) =>
                        props.onChange(e.target.value)
                }
            />
        </label>
    )
}

export default DateInputField
