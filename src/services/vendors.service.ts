import axios from 'axios';
import APIService from './api.service';
import {DELETE_VENDORS, EDIT_VENDORS, GET_VENDORS} from '../lib/endpoints';

class VendorsService extends APIService {
  getVendors(): Promise<any> {
    return this.get(`${GET_VENDORS}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  static delete(id: any) {
    return axios
      .delete(DELETE_VENDORS(id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  static edit(id: any) {
    return axios
      .put(EDIT_VENDORS(id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}

export default VendorsService;
