  import axios from 'axios';
  import APIService from './api.service';
  import {GET_CLIENTS, GET_PERIODS} from '../lib/endpoints';

  class PeriodsService extends APIService {
    getPeriods(): Promise<any> {
      return this.get(`${GET_PERIODS}`)
        .then((res) => {
          return res?.data;
        })
        .catch((error: any) => {
          throw error?.response?.data;
        });
    }

    static create(data:any) {
      return axios
        .post(GET_PERIODS, data)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    }

    
  }

  export default PeriodsService;
