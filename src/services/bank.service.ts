  import axios from 'axios';
  import APIService from './api.service';
  import { GET_BANKS } from '../lib/endpoints';

  class BankService extends APIService {
    getBanks(): Promise<any> {
      return this.get(`${GET_BANKS}`)
        .then((res) => {
          return res?.data;
        })
        .catch((error: any) => {
          throw error?.response?.data;
        });
    }
  }

  export default BankService;
