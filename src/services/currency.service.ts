  import axios from 'axios';
  import APIService from './api.service';
  import {GET_COUNTRIES, GET_CURRENCIES} from '../lib/endpoints';

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
  }

  export default CurrencyService;
