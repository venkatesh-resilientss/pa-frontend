import axios from 'axios';
import APIService from './api.service';
import {CREATE_TAXCODES, DELETE_TAXCODES, EDIT_TAXCODES, GET_TAXCODES} from '../lib/endpoints';

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

  static create(data:any) {
    return axios
      .post(CREATE_TAXCODES, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  static delete(id: any) {
    return axios
      .delete(DELETE_TAXCODES(id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  static edit(id: any) {
    return axios
      .put(EDIT_TAXCODES(id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}

export default TaxCodesService;
