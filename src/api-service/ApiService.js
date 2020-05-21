import RequestService from './RequestService';
import apiConfig from './keys';

const OpenWeather_URL = 'https://api.openweathermap.org/data/2.5/onecall?';
const NASA_URL = `https://api.nasa.gov/planetary/apod?api_key=${apiConfig.nasa_key}`;
const Geo_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address';

class ApiService {

    getBackgroundFromNasa(){
        return RequestService.fetchRequest(NASA_URL);
    }
    async getCoordinates(name){
        let url = this.buildGeoUrl(name);
        let res = await RequestService.fetchRequest(url);
        const {lat, lng} = await res.results[0].geometry.location;
        return [lat, lng];
    }
    buildGeoUrl(param){
        return Geo_URL + `=${param}A&key=${apiConfig.geocode_key}`;
    }
    buildWeatherUrl(coord, unit) {
        return OpenWeather_URL + `lat=${coord[0]}&lon=${coord[1]}&units=${unit}&exclude=hourly,minutely&appid=${apiConfig.weather_key}`
    }
    async getWeather(searchName, unit){
        let coord = await this.getCoordinates(searchName);
        let url =  this.buildWeatherUrl(coord, unit)
        return RequestService.fetchRequest(url);
    }

}
export default new ApiService()