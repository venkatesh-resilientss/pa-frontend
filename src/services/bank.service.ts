  import axios from 'axios';
  import APIService from './api.service';
  import { DELETE_BANKS, EDIT_BANKS, GET_BANKS } from '../lib/endpoints';

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

    static delete(id: any) {
      return axios
        .delete(DELETE_BANKS(id))
        .then((response) => {
          return response?.data;
        })
        .catch((error) => {
          throw error?.response?.data;
        });
    }

    static edit(id: any) {
      return axios
        .put(EDIT_BANKS(id))
        .then((response) => {
          return response?.data;
        })
        .catch((error) => {
          throw error?.response?.data;
        });
    }
  }

  export default BankService;
