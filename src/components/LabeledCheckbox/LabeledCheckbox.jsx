import React, { useRef } from 'react';
import { snakeCaseToTitleCase } from '../../Util/Util';
import Checkbox from '../Checkbox/Checkbox';
import "./LabeledCheckbox.scss";


const LabeledCheckbox = (props) => {
    const { name, isColumn } = props;
    const toggleHandlerRef = useRef(null);

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

    return (
        <div className={getClassNamesStr()} >
            <span onClick={handleSpanClick}>{snakeCaseToTitleCase(name)}</span>
            <Checkbox name={name} toggleHandlerRef={toggleHandlerRef}/>
        </div>
    )

}

export default LabeledCheckbox;