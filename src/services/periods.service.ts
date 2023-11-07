  import axios from 'axios';
  import APIService from './api.service';
  import {DELETE_PERIODS, EDIT_PERIODS, GET_CLIENTS, GET_PERIODS} from '../lib/endpoints';

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


    static delete(id: any) {
      return axios
        .delete(DELETE_PERIODS(id))
        .then((response) => {
          return response?.data;
        })
        .catch((error) => {
          throw error?.response?.data;
        });
    }

    static edit(id: any) {
      return axios
        .put(EDIT_PERIODS(id))
        .then((response) => {
          return response?.data;
        })
        .catch((error) => {
          throw error?.response?.data;
        });
    }

    
  }

  export default PeriodsService;