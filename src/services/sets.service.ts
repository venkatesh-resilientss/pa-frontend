import axios from 'axios';
import APIService from './api.service';
import {CREATE_SETS, GET_SETS} from '../lib/endpoints';

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

  static create(data:any) {
    return axios
      .post(CREATE_SETS, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }
}

export default SetsService;
