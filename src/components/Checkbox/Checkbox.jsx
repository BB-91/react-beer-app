import React, { useState, useEffect, useContext } from 'react';
import CheckboxCheck from '../CheckboxGraphic/CheckboxGraphic';
import "./Checkbox.scss";
import { filterCriteria, getNewlyFilteredBeers } from '../../App';
import { BeerContext } from '../../App';

const Checkbox = (props) => {
    const [checked, setChecked] = useState(false);
    const { name, toggleHandlerRef } = props;

    const setFilteredBeers = useContext(BeerContext);

    console.log("render of checkbox: ", name, `checked:`, checked);

    useEffect(() => {
        if (!name) {
            throw new Error(`Didn't receive name prop`);
        }

        if (!Object.keys(filterCriteria).includes(name)) {
            throw new Error(`name not a filterCriteria key: `, name, filterCriteria)
        }
    }, [])


    const handleClick = () => {
        const newValue = !checked;
        console.log(`Checkbox '${name}' checked: ${!checked}.`);
        setChecked(newValue);
        
        filterCriteria[name] = newValue;
        const refilteredBeers = getNewlyFilteredBeers();


        console.log("after checkbox filter: ", refilteredBeers);     

        setFilteredBeers(refilteredBeers);
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