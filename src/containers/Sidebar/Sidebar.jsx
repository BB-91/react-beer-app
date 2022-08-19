import React from 'react';
import LabeledCheckboxGroup from '../../components/LabeledCheckboxGroup/LabeledCheckboxGroup';
import { filterCriteria, getNewlyFilteredBeers } from '../../App';
import "./Sidebar.scss";


const Sidebar = (props) => {
    const { checkboxNames, setFilteredBeers } = props;

    const handleInput = (event) => {
        filterCriteria.search = event.target.value;  
        setFilteredBeers(getNewlyFilteredBeers());
    }

    return (
        <div className='sidebar'>
            <LabeledCheckboxGroup names={checkboxNames} isColumn={false} setFilteredBeers={setFilteredBeers} />
            <div>
                <input type="search"
                        name="search-filter"
                        id="search-filter"
                        placeholder="Filter by name"
                        onInput={handleInput}
                />
            </div>
        </div>
    )
}

export default Sidebar;