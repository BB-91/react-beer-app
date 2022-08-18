import React, { useRef } from 'react';
import { getRandomKey } from '../../data/keys';
import LabeledCheckbox from '../LabeledCheckbox/LabeledCheckbox';
import "./LabeledCheckboxGroup.scss";

const LabeledCheckboxGroup = (props) => {
    const { names, isColumn } = props;

    if (!names) { throw new Error("Requires a names array prop"); }
    if (!Array.isArray(names)) { throw new Error("Not an array: ", names); }
    if (!names.length) { throw new Error("Got an empty array", names)}

    const labeledCheckboxes = useRef(
        names.map(name => {
            return <LabeledCheckbox name={name} isColumn={isColumn} key={getRandomKey()}/>
        })
    )

    return (
        <div className='labeled-checkbox-group-wrapper'>
            <div className='labeled-checkbox-group'>
                {labeledCheckboxes.current}
            </div>
        </div>
    )
}

export default LabeledCheckboxGroup;