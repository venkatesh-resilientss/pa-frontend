import axios from 'axios';
import APIService from './api.service';
import {CREATE_STATES, DELETE_STATES, EDIT_SERIES, GET_STATES, STATES_DETAIL_ENDPOINT} from '../lib/endpoints';

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

  static delete(id: any) {
    return axios
      .delete(DELETE_STATES(id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }


  static edit(id: any,data) {
    return axios
      .put(EDIT_SERIES(id),data)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }


  static details(id: string) {
    return axios
      .get(STATES_DETAIL_ENDPOINT(id))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }
}

export default StatesService;
