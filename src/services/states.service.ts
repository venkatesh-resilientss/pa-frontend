import axios from 'axios';
import APIService from './api.service';
import {CREATE_STATES, GET_STATES} from '../lib/endpoints';

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

  static create(data:any) {
    return axios
      .post(CREATE_STATES, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }
}

export default StatesService;
