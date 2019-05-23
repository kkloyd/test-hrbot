import {
  observable, computed, configure, action,
} from 'mobx';
import { createContext } from 'react';


import axios from 'axios';


const URL = 'http://api.openweathermap.org/data/2.5/weather?q=';
const API_KEY = 'b069a4be2b74bbfdfda671cbb63da6a2';

configure({ enforceActions: 'observed' });

const requestWeatherData = async city => {
  try {
    if (city) {
      const response = await axios.get(`${URL}${city}&appid=${API_KEY}&units=metric`);
      const data = await response;
      console.log(data);
      return data;
    }
  } catch (err) {
    console.log(err);
  }
  return {};

};


// dumb status data
const statuses = {
  error: 'error',
  loading: 'loading',
  success: 'success',
};

class WeatherStore {
  @observable status = {};

  @observable city = null;
  @observable temperature = null;
  @observable coordinates = {
    lat: null,
    lon: null,

  };

  @computed get allInfo() {
    return `${this.city}: ${this.temperature}: ${this.coordinates}`;
  }

  @action setStatus(value) { this.status = value; console.log(this.status); }
  @action setCity(value) { this.city = value; }
  @action setTemp(value) { this.temperature = value; }
  @action setCoord(value) { this.coordinates = value; console.log(value); }

  @action async getData(city) {
    const json = await requestWeatherData(city);
    if (json.status === 200) {
      this.setStatus(statuses.success);
      this.setCity(city);
      this.setCoord(json.data.coord);
      this.setTemp(json.data.main.temp);
    } else {
      this.setStatus(statuses.error);
    }

  }

}


export default createContext(new WeatherStore());
