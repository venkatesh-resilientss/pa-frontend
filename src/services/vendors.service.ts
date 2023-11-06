import axios from 'axios';
import APIService from './api.service';
import {GET_VENDORS} from '../lib/endpoints';

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
}

export default VendorsService;
