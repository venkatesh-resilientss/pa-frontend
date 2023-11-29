import axios from 'axios';
// endpoints
import {AUTH_LOGIN} from '../constants/endpoints';
import APIService from './api.service';
import {
  LOGIN,
  TENANT_LOGIN,GET_USER_FROM_TOKEN, OKTA_LOGIN
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
  //user logout
  logout(){
    this.purgeAuth();
  }
  getUserFromToken(): Promise<any> {
    return this.get(`${GET_USER_FROM_TOKEN}`)
      .then((res) => {
        return res.data;

      })
      .catch((error: any) => {
        throw error.response;
      });
  }


  oktaUserLogin(token: string): Promise<any> {
  return this.post(`${OKTA_LOGIN}`, token)
    .then((res) => {
      return res.data;
    })
    .catch((error: any) => {
      throw error.response.data;
    });
}

  authenticateUser(access: string): void {
    this.setAccessToken(access);
    axios.defaults.headers.common.Authorization = `Bearer ${access}`;
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


   createUser(data) {
    return this
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