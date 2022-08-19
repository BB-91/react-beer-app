import React, { useRef } from 'react';
import { getRandomKey } from '../../Util/Util';
import LabeledCheckbox from '../LabeledCheckbox/LabeledCheckbox';
import "./LabeledCheckboxGroup.scss";

const LabeledCheckboxGroup = (props) => {
    const { names, isColumn, setFilteredBeers } = props;

    if (!names) { throw new Error("Requires a names array prop"); }
    if (!Array.isArray(names)) { throw new Error("Not an array: ", names); }
    if (!names.length) { throw new Error("Got an empty array", names)}

    const labeledCheckboxes = useRef(
        names.map(name => {
            return <LabeledCheckbox name={name} isColumn={isColumn} key={getRandomKey()} setFilteredBeers={setFilteredBeers}/>
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