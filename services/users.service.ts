  import axios from 'axios';
  import APIService from './api.service';
  // cookie
import cookie from "js-cookie";
import { CREATE_USERS, EDIT_USERS, GET_USERS,USERS_DETAIL_ENDPOINT,DELETE_USER } from '../lib/endpoints';

  class UsersService extends APIService {
    static postUsers: any;
    getUsers(tenant_id:any): Promise<any> {
      return this.get(`${GET_USERS(tenant_id)}`)
        .then((res) => {
          return res?.data;
        })
        .catch((error: any) => {
          throw error?.response?.data;
        });
    }

  

    postUsers(tenant_id:any,data): Promise<any> {
      return this.post(`${CREATE_USERS(tenant_id)}`,data)
        .then((res) => {
          return res?.data;
        })
        .catch((error: any) => {
          throw error?.response?.data;
        });
    }


    editUser(tenant_id:any,id,data): Promise<any> {
      return this.put(EDIT_USERS(tenant_id,id),data)
        .then((res) => {
          return res?.data;
        })
        .catch((error: any) => {
          throw error?.response?.data;
        });
    }


  getuserbyid(tenant_id:any,id): Promise<any> {
    return this.get(`${USERS_DETAIL_ENDPOINT(tenant_id,id)}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }



    deleteUser(tenant_id:any,role_id): Promise<any> {
        return this.delete(`${DELETE_USER(tenant_id,role_id)}`)
          .then((res) => {
            return res?.data;
          })
          .catch((error: any) => {
            throw error?.response?.data;
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
