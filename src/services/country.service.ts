  import axios from 'axios';
  import APIService from './api.service';
  import {CREATE_COUNTRIES, DELETE_COUNTRIES, EDIT_COUNTRIES, GET_COUNTRIES} from '../lib/endpoints';

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

    static delete(id: any) {
      return axios
        .delete(DELETE_COUNTRIES(id))
        .then((response) => {
          return response?.data;
        })
        .catch((error) => {
          throw error?.response?.data;
        });
    }

    static edit(id: any) {
      return axios
        .put(EDIT_COUNTRIES(id))
        .then((response) => {
          return response?.data;
        })
        .catch((error) => {
          throw error?.response?.data;
        });
    }
  }

  export default CountryService;
