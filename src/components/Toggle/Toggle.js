import React from "react";
import './Toggle.css'

export default function Toggle(props){

    function handleChange() {
        props.Status(!props.isChecked);
    }

    return (
            <label className='switch'>
                <input
                    type='checkbox'
                    value={props.isChecked}
                    onClick={handleChange}
                />
                <div className='slider'></div>
            </label>
        );
}
