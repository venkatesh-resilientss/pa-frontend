import axios from 'axios';
import APIService from './api.service';
import {GET_DEPARTMENTS} from '../lib/endpoints';

class DepartmentsService extends APIService {
  getDepartments(): Promise<any> {
    return this.get(`${GET_DEPARTMENTS}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }
}

export default DepartmentsService;
