import React from 'react';


import './checkbox.scss';

const Checkbox = (props) => {

    const handleClick = (event) => {
        event.stopPropagation();

        if(event.target.nodeName === "INPUT") {
            const isChecked = event.target.checked;
            props.onClick && props.onClick(event, isChecked);
        }
    }


    return (
        <label className="container" onClick={handleClick} checked={props.checked}>
            <input type="checkbox"/>
            <span className="checkmark"></span>
        </label>
    );
}

export default Checkbox;