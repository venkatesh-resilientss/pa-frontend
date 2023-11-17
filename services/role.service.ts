import axios from 'axios';
import APIService from './api.service';
import { GET_ROLES } from '../lib/endpoints';

class RoleService extends APIService {
  getRoles(): Promise<any> {
    return this.get(`${GET_ROLES}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }
  post_roles(data): Promise<any> {
    return this.post(`${GET_ROLES}`,data)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }
}

export default RoleService;
