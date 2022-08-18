import React, { useRef } from 'react';
import Checkbox from '../Checkbox/Checkbox';
import "./LabeledCheckbox.scss";

const LabeledCheckbox = (props) => {
    const { name, isColumn } = props;
    const toggleHandlerRef = useRef(null);

    const getDisplayStyle = () => {
        return isColumn ? 'block' : 'inline';
    }

    const handleSpanClick = () => {
        const toggleHandler = toggleHandlerRef.current;

        if (!toggleHandler) {
            throw new Error(`toggleHandler not set`)
        }
        
        if (typeof toggleHandler !== "function") {
            throw new Error(`Not a function: `, toggleHandler);
        }

        toggleHandler();
    }

    const getClassNamesStr = () => {
        return `labeled-checkbox-wrapper` + (isColumn ? " column" : "")
    }


    console.log(`getDisplayStyle(): `, getDisplayStyle())

    return (
        <div className={getClassNamesStr()} >
            <span onClick={handleSpanClick}>{name}</span>
            <Checkbox toggleHandlerRef={toggleHandlerRef}/>
        </div>
    )
}

export default LabeledCheckbox;