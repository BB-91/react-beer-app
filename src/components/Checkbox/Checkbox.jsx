import React, { useState } from 'react';
import CheckboxCheck from '../CheckboxGraphic/CheckboxGraphic';
import "./Checkbox.scss";

const Checkbox = (props) => {
    const [checked, setChecked] = useState(false);
    const { toggleHandlerRef } = props;

    const handleClick = () => {
        console.log("clicked the checkbox!");
        setChecked(!checked);
    }

    if (!toggleHandlerRef) {
        throw new Error(`Didn't receive toggleHandlerRef as prop`);
    }

    toggleHandlerRef.current = handleClick;

    return (
        <div className='checkbox' onClick={handleClick}>
            <CheckboxCheck checked={checked} />
        </div>
    )
}

export default Checkbox;