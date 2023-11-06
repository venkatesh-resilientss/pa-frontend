import axios from 'axios';
import APIService from './api.service';
import {GET_TAXCODES} from '../lib/endpoints';

class TaxCodesService extends APIService {
  getTaxCodes(): Promise<any> {
    return this.get(`${GET_TAXCODES}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }
}

export default TaxCodesService;
