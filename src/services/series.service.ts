  import axios from 'axios';
  import APIService from './api.service';
  import {GET_SERIES} from '../lib/endpoints';

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
  }

  export default SeriesService;
