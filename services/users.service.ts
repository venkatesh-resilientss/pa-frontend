  import axios from 'axios';
  import APIService from './api.service';
  // cookie
import cookie from "js-cookie";
import { CREATE_USERS, EDIT_USERS, GET_USERS,USERS_DETAIL_ENDPOINT,DELETE_USER } from '../lib/endpoints';

  class UsersService extends APIService {
    getUsers(tenant_id:any): Promise<any> {
      return this.get(`${GET_USERS(tenant_id)}`)
        .then((res) => {
          return res?.data;
        })
        .catch((error: any) => {
          throw error?.response?.data;
        });
    }

    static create(tenant_id:any,data:any) {
      return axios
        .post(CREATE_USERS(tenant_id), data)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    }
      static edit(tenant_id:any,id, data) {
        return axios
          .put(EDIT_USERS(tenant_id,id), data)
          .then((response) => {
            return response?.data;
          })
          .catch((error) => {
            throw error?.response?.data;
          });
      }

      

     static details(tenant_id:any,id: string) {
      return axios
        .get(USERS_DETAIL_ENDPOINT(tenant_id,id))
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    }

     static delete(tenant_id:any,id: string) {
      return axios
        .delete(DELETE_USER(tenant_id,id))
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    }

    // Getting access token from cookie
  getAccessToken(): string | undefined {
    return cookie.get("accessToken");
  }

  // Getting refresh token from cookie
  getRefreshToken(): string | undefined {
    return cookie.get("refreshToken");
  }
  
    
  }

  export default UsersService;
