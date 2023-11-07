  import axios from 'axios';
  import APIService from './api.service';
  import {GET_CLIENTS} from '../lib/endpoints';

  class ClientsService extends APIService {
    getCountries(): Promise<any> {
      return this.get(`${GET_CLIENTS}`)
        .then((res) => {
          return res?.data;
        })
        .catch((error: any) => {
          throw error?.response?.data;
        });
    }

    
  }

  export default ClientsService;
