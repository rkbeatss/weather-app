import RequestService from './RequestService';
import apiConfig from './keys';
import Geocode from 'react-geocode';

const OpenWeather_URL = 'https://api.openweathermap.org/data/2.5/onecall?';
const NASA_URL = `https://api.nasa.gov/planetary/apod?api_key=${apiConfig.nasa_key}`;
Geocode.setApiKey(apiConfig.geocode_key);

class ApiService {

    getBackgroundFromNasa(){
        return RequestService.fetchRequest(NASA_URL);
    }
    async getCoordinates(name){
        const res = await Geocode.fromAddress(name); 
        const {lat, lng} = await res.results[0].geometry.location;
        return [lat, lng];
    }
    buildUrl(coord, unit) {
        return OpenWeather_URL + `lat=${coord[0]}&lon=${coord[1]}&units=${unit}&exclude=hourly,minutely&appid=${apiConfig.weather_key}`
    }
    async getWeather(searchName, unit){
        let coord = await this.getCoordinates(searchName);
        let url =  this.buildUrl(coord, unit)
        return RequestService.fetchRequest(url);
    }

}
export default new ApiService()