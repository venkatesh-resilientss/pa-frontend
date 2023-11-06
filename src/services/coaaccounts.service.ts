import axios from 'axios';
import APIService from './api.service';
import {GET_COAACCOUNTS} from '../lib/endpoints';

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
}

export default COAAccountsService;
