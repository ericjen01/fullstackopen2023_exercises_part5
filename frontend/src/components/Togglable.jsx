import { useState, forwardRef, useImperativeHandle } from 'react';

const Togglable = forwardRef((props, ref) => {
    const [toggled, setToggled] = useState(false);
    const showWhenToggled = { display: toggled ? '' : 'none' }
    const hidewhenToggled = { display: toggled ? 'none' : '' }
    const toggleVisibility = () => setToggled(!toggled);

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <>
            <div style={hidewhenToggled}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenToggled}>
                {props.children}
                <button onClick={toggleVisibility}>Cancel</button>
            </div>
        </>
    )

})

Togglable.displayName = 'Togglable';

export default Togglable
