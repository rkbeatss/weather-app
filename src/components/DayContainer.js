import React, { Component } from 'react';
import '../App.css';
import Day from './Day';
import propTypes from 'prop-types'

/**
 * Container component that holds each day's weather information
 * @component
 */

class DayContainer extends Component {
   static propTypes = {
       weather: propTypes.array,
       degree: propTypes.string
   }
    render(){
        const { weather, degree } = this.props;
        return (
            <div className = "day-container">
                {weather.map((weatherItem, index) => {
                    return (
                        <div className = "day-box" key = {index}>
                            <Day date = {weatherItem.dt} icon={weatherItem.weather[0].id} min = {weatherItem.temp.min} max = {weatherItem.temp.max} desc = {weatherItem.weather[0].description} degree = {degree} />
                        </div>
                    );
                })}
            </div>
        );
    }
}
export default DayContainer; 