import React, { Component } from 'react';
import Search from './Search';
import DayContainer from './DayContainer';
import Toggle from './Toggle';
import API from '../api-service/API';

/**
 * Weekly Component to display the full 7-day weather data
 * @component
 */

class WeeklyComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            dailyWeather: [],
            city: '',
            degree: 'metric',
            toggle: false,
            input: '',
            isLoading: false,
            error: ''
        }
        this.changeDegree = this.changeDegree.bind(this);
    }
    componentDidMount = () => {
        this.fetchWeather();
    }
    handleChange = (event) => {
        this.setState({input:event.target.value});
    }
    keyPress = (event) => {
        if (event.key === 'Enter'){
            this.setState({city: event.target.value}, () => {this.fetchWeather()});
        }
    }
    changeDegree = (event) => {
        this.setState({toggle:!this.state.toggle, degree:event.target.value}, () => {this.fetchWeather()});
    }

    /**
     * Fetch the 7- day weather information for given city and degree
     */

    fetchWeather(){
        if(this.state.city) {
            this.setState({ isLoading: true});
            API.getWeather(this.state.city, this.state.degree)
                .then((data) => {
                    this.setState({
                        dailyWeather: data.daily,
                        isLoading:false
                    })
                })
                .catch(err => this.setState({error: err.message, isLoading: false}));
        }
    }

    render(){
        if (this.state.isLoading){
            return <div className = 'center'><p> Loading...</p> </div>
        }
        if(this.state.error){
            return <div className = 'center'><p> Oops! {this.state.error} </p> </div>
        }
        return (
            <div>
                <Search press = {this.keyPress} searchEvent = {event => this.handleChange(event)} />
                {this.state.city ? (
                    <div>
                        <h3>{this.state.city} </h3>
                        <DayContainer weather={this.state.dailyWeather} degree = {this.state.degree}/>
                        <Toggle toggle = {this.state.toggle} changeDegree = {this.changeDegree} weather = {this.state.dailyWeather} /> </div>):
                        (<div className = "center"> <p>Don't be shy, enter any address to get the 7-day forecast! </p> </div>)}
                    </div>
                )
    }
}
export default WeeklyComponent;