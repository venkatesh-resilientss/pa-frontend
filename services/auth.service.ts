import axios from 'axios';
// endpoints
import {AUTH_LOGIN} from '../constants/endpoints';
import APIService from './api.service';
import {
  LOGIN,
  TENANT_LOGIN
} from "lib/endpoints";
class AuthService extends APIService {


  // user sign in
  userSignIN(data: any): Promise<any> {
    return this.post(`${LOGIN}`, data)
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data;
      });
  }

    // tenant user sign in
    tenantSignIn(data: any): Promise<any> {
      return this.post(`${TENANT_LOGIN}`, data)
        .then((res) => {
          return res.data;
        })
        .catch((error: any) => {
          throw error.response.data;
        });
    }


  static create(data) {
    return axios
      .post(AUTH_LOGIN, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }
}

export default AuthService;
