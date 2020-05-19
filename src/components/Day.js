import React, { Component } from 'react';
import '../App.css';
import propTypes from 'prop-types'

/**
 * A Day component to represent weather details of a particular day
 * @component
 */

class Day extends Component {
    static propTypes = {
        date: propTypes.number,
        icon: propTypes.number,
        min: propTypes.number,
        max: propTypes.number,
        desc: propTypes.string, 
        degree: propTypes.string
    }
    
    /**
     * Convert unix timestamp to date string in the format: Day, Month Date, Year
     * @param {*} date 
     * @return {string}
     */
    
    formatDate(date){
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        var convertedDate = new Date(date * 1000);
        var dayName = days[convertedDate.getDay()];
        var day = convertedDate.getDate()
        var month = months[convertedDate.getMonth()];
        var year = convertedDate.getFullYear();
        return `${dayName}, ${month} ${day}, ${year}`; 
    }
    render(){
        const { degree, date, icon, min, max, desc} = this.props;
        const imgURL = `owf owf-${icon} owf-4x`;
        return (
            <div className = "day-header">
                <div className = "date">
                    {this.formatDate(date)}
                </div>
                <i className={imgURL}></i>
                <ul className = "list-inline list">
                    {degree === 'metric' ? <li>{Math.round(min)}°C</li>: <li>{Math.round(min)}°F</li>}
                    {degree === 'metric' ? <li>{Math.round(max)}°C</li>: <li>{Math.round(max)}°F</li>}
                </ul>
                <p>
                    {desc}
                </p>
            </div>
        );
    }
}
export default Day; 