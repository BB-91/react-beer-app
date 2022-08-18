import React from 'react';
import "./CheckboxGraphic.scss";

const CheckboxGraphic = (props) => {
    const { checked } = props;

    const getCheckedClass = () => {
        return checked ? "checked" : "unchecked"
    }

    return (
        <div className={`checkbox-graphic ${getCheckedClass()}`}></div>
    )
}

export default CheckboxGraphic;