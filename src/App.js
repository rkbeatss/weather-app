import React, { Component } from 'react';
import './App.css';
import Search from './components/Search';
import DayContainer from './components/DayContainer';
import Toggle from './components/Toggle';
import ApiService from './api-service/ApiService';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        photo: '',
        dailyWeather: [],
        location: '',
        degree: 'metric',
        toggle: false,
        input: '',
        isLoading: false,
        error: ''
    }
}
componentDidMount(){
    this.setBackground();
}

handleChange = (event) => {
    this.setState({input:event.target.value});
}
keyPress = (event) => {
    if (event.key === 'Enter'){
        this.setState({location: event.target.value}, () => {this.fetchWeather()});
    }
}
changeDegree = (event) => {
    this.setState({toggle:!this.state.toggle, degree:event.target.value}, () => {this.fetchWeather()});
}

/**
 * Fetch the picture of the day from NASA and set it as background img
 */

setBackground(){
    ApiService.getBackgroundFromNasa()
    .then((data) => {
        this.setState({
            photo: data.url
        })
    })
    .catch(err => console.log(err)); // just log error for now
}

/**
 * Fetch the 7- day weather information for given location and degree
 */

fetchWeather(){
    if(this.state.location){
        this.setState({ isLoading: true});
        ApiService.getWeather(this.state.location, this.state.degree).then((data) => {
            this.setState({
                dailyWeather: data.daily,
                isLoading: false
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
  const styles = {
      root: {
          backgroundImage: `url(${this.state.photo})`,
          width:'100%',
          height: '850px',
          backgroundSize: 'cover'
      }
  }
  return (
    <div style = {styles.root}>
      <Search press = {this.keyPress} searchEvent = {event => this.handleChange(event)} />
      {this.state.location ? (
        <div> 
          <h3> {this.state.location} </h3>
          <DayContainer weather = {this.state.dailyWeather} degree = {this.state.degree} />
          <Toggle toggle = {this.state.toggle} changeDegree = {this.changeDegree} weather = {this.state.dailyWeather} /> </div>):
          (<div className = "center"> <h3> Don't be shy, enter any address to get the 7-day forecast!</h3> </div>)}
        </div>
      )}
}
export default App;
