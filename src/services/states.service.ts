import axios from 'axios';
import APIService from './api.service';
import {GET_STATES} from '../lib/endpoints';

class StatesService extends APIService {
  getStates(): Promise<any> {
    return this.get(`${GET_STATES}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }
}

export default StatesService;
