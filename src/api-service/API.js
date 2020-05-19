import apiConfig from './keys';
import Geocode from 'react-geocode';

const URL = 'https://api.openweathermap.org/data/2.5/onecall?';
Geocode.setApiKey(apiConfig.geocode_key);

const API = {
    getCoordinates: async (name) => {
        const res = await Geocode.fromAddress(name);
        const {lat, lng} = await res.results[0].geometry.location;
        return [lat, lng];
    }, 
    buildUrl: (coord, unit) => {
        return URL + `lat=${coord[0]}&lon=${coord[1]}&units=${unit}&exclude=hourly,minutely&appid=${apiConfig.weather_key}`;
    },
    getWeather: async (searchName, unit) => {
        let coord = await API.getCoordinates(searchName);
        let url =  API.buildUrl(coord, unit)
        const res = await fetch(url);
        if (res.status !== 200){
            throw new Error(res.statusText);
        }
        else {
            return await res.json()
        }
    }
    // create even more endpoints as the app expands
}
export default API; 