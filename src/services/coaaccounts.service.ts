import axios from 'axios';
import APIService from './api.service';
import {DELETE_COAACCOUNTS, EDIT_COAACCOUNTS, GET_COAACCOUNTS} from '../lib/endpoints';

class COAAccountsService extends APIService {
  getCoasAccounts(): Promise<any> {
    return this.get(`${GET_COAACCOUNTS}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  static delete(id: any) {
    return axios
      .delete(DELETE_COAACCOUNTS(id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  static edit(id: any) {
    return axios
      .put(EDIT_COAACCOUNTS(id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}

export default COAAccountsService;
