import apiConfig from './keys';
import Geocode from 'react-geocode';

const OpenWeather_URL = 'https://api.openweathermap.org/data/2.5/onecall?';
const NASA_URL = `https://api.nasa.gov/planetary/apod?api_key=${apiConfig.nasa_key}`;
Geocode.setApiKey(apiConfig.geocode_key);

const API = {

    getBackgroundFromNasa: async () => {
        const res = await fetch(NASA_URL);
        if(res.ok){
            return await res.json();
        } else {
            throw new Error(res.statusText);
        }
    },

    getCoordinates: async (name) => {
        const res = await Geocode.fromAddress(name); 
        const {lat, lng} = await res.results[0].geometry.location;
        return [lat, lng];
    }, 

    buildUrl: (coord, unit) => OpenWeather_URL + `lat=${coord[0]}&lon=${coord[1]}&units=${unit}&exclude=hourly,minutely&appid=${apiConfig.weather_key}`,
    
    getWeather: async (searchName, unit) => {
        let coord = await API.getCoordinates(searchName);
        let url =  API.buildUrl(coord, unit)
        const res = await fetch(url);
        if (res.ok){
            return await res.json();
        } else {
            throw new Error (res.statusText);
        }
    }
    // create even more functions as the app expands
}
export default API; 