type Props = {
    label: string;
    id: string;
    value: string;
    onChange: (value: string) => void;
}

function DateInputField(props: Props) {
    return (
        <label htmlFor={props.id}>
            {props.label}
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