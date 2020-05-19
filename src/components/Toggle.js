import React from 'react';

/**
 * Define a Toggle const where you can switch between celsius and farenheit degree types
 */

const Toggle = ({toggle, changeDegree, weather}) => {
    return (
        <div className = "center">
            <button className = "button"
            value = {toggle ? 'metric' : 'imperial'}
            onClick = {changeDegree}>
                {toggle && weather ? 'View in °C' : 'View in °F'}
            </button>
        </div>
    )
}
export default Toggle; 