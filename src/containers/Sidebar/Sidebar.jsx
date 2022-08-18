import React from 'react';
import LabeledCheckboxGroup from '../../components/LabeledCheckboxGroup/LabeledCheckboxGroup';
import "./Sidebar.scss";

const Sidebar = (props) => {
    const { checkboxNames } = props;

    return (
        <div className='sidebar'>

            <LabeledCheckboxGroup
                names={checkboxNames}
                isColumn={false}
            />

            <div>
                <p>Search</p>
                <input type="search" name="search-filter" id="search-filter" />
            </div>


        </div>
    )
}

export default Sidebar;