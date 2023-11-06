import axios from 'axios';
import APIService from './api.service';
import {GET_SETS} from '../lib/endpoints';

class SetsService extends APIService {
  getSets(): Promise<any> {
    return this.get(`${GET_SETS}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }
}

export default SetsService;
