  import axios from 'axios';
  import APIService from './api.service';
  import {CREATE_COUNTRIES, GET_COUNTRIES} from '../lib/endpoints';

  class CountryService extends APIService {
    getCountries(): Promise<any> {
      return this.get(`${GET_COUNTRIES}`)
        .then((res) => {
          return res?.data;
        })
        .catch((error: any) => {
          throw error?.response?.data;
        });
    }

    static create(data:any) {
      return axios
        .post(CREATE_COUNTRIES, data)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    }
  }

  export default CountryService;
