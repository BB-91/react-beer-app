import React, { useEffect, useState } from 'react';
import { filterCriteria, getNewlyFilteredBeers } from '../../App';
import { snakeCaseToTitleCase } from '../../Util/Util';
import "./LabeledCheckbox.scss";

const LabeledCheckbox = (props) => {
    const [checked, setChecked] = useState(Boolean(props.checked));
    const { name, isColumn, setFilteredBeers } = props;
    const checkedClass = checked ? "checked" : "unchecked";
    const checkboxWrapperClass = `labeled-checkbox-wrapper` + (isColumn ? " column" : "");

    useEffect(() => {
        if (!name) {
            throw new Error(`Didn't receive name prop`);
        }

        if (!Object.keys(filterCriteria).includes(name)) {
            throw new Error(`name not a filterCriteria key: `, name, filterCriteria)
        }
    }, [])


    const handleSpanClick = () => {
        handleCheckboxClick();
    }

    const handleCheckboxClick = () => {
        const newValue = !checked;
        setChecked(newValue);

        filterCriteria[name] = newValue;
        const refilteredBeers = getNewlyFilteredBeers();   
        setFilteredBeers(refilteredBeers);
    }

    return (
        <div className={checkboxWrapperClass} >
            <span onClick={handleSpanClick}>{snakeCaseToTitleCase(name)}</span>
            <div className='checkbox' onClick={handleCheckboxClick}>
                <div className={`checkbox-graphic ${checkedClass}`}></div>
            </div>
        </div>
    )
}

export default LabeledCheckbox;