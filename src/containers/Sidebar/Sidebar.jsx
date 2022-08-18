import React, { useContext } from 'react';
import LabeledCheckboxGroup from '../../components/LabeledCheckboxGroup/LabeledCheckboxGroup';
import { filterCriteria, getNewlyFilteredBeers, BeerContext } from '../../App';
import "./Sidebar.scss";


const Sidebar = (props) => {
    const { checkboxNames } = props;
    const setFilteredBeers = useContext(BeerContext);

    const handleInput = (event) => {
        filterCriteria.search = event.target.value;  
        setFilteredBeers(getNewlyFilteredBeers());
    }

    return (
        <div className='sidebar'>
            <LabeledCheckboxGroup names={checkboxNames} isColumn={false} />
            <div>
                <p>Search</p>
                <input type="search" name="search-filter" id="search-filter" onInput={handleInput}/>
            </div>
        </div>
    )
}

export default Sidebar;