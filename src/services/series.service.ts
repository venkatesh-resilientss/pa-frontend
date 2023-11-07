  import axios from 'axios';
  import APIService from './api.service';
  import {CREATE_SERIES, GET_SERIES} from '../lib/endpoints';

  class SeriesService extends APIService {
    getSeries(): Promise<any> {
      return this.get(`${GET_SERIES}`)
        .then((res) => {
          return res?.data;
        })
        .catch((error: any) => {
          throw error?.response?.data;
        });
    }

    static create(data:any) {
      return axios
        .post(CREATE_SERIES, data)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    }


    
  }

  export default SeriesService;
