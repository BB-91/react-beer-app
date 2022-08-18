import React from 'react';
import LabeledCheckboxGroup from '../../components/LabeledCheckboxGroup/LabeledCheckboxGroup';
import "./Sidebar.scss";

const Sidebar = () => {
  return (
    <div className='sidebar'>

        <form action="">

            <LabeledCheckboxGroup
                names={["High Alcohol", "Classic Range", "High Acidity"]}
                isColumn={false}
            />

            <div>
                <p>Search</p>
                <input type="search" name="search-filter" id="search-filter" />
            </div>

        </form>

    </div>
  )
}

export default Sidebar;