  import axios from 'axios';
  import APIService from './api.service';
  import {CREATE_CURRENCIES, GET_COUNTRIES, GET_CURRENCIES} from '../lib/endpoints';

  class CurrencyService extends APIService {
    getCurrencies(): Promise<any> {
      return this.get(`${GET_CURRENCIES}`)
        .then((res) => {
          return res?.data;
        })
        .catch((error: any) => {
          throw error?.response?.data;
        });
    }

    static create(data:any) {
      return axios
        .post(CREATE_CURRENCIES, data)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    }
  }

  export default CurrencyService;
