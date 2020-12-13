import React, {useState} from "react";

import './Toggle.css'

export default function Toggle(props){

    const [IsChecked, setIsChecked]=useState(props.isChecked || false)

    function handleChange() {
        setIsChecked(!IsChecked);
        props.Status(!IsChecked);
    }

    return (
            <label className='switch'>
                <input
                    type='checkbox'
                    value={IsChecked}
                    onChange={handleChange}
                />
                <div className='slider'></div>
            </label>
        );
}
