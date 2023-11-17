  import axios from 'axios';
  import APIService from './api.service';
import { CREATE_USERS, EDIT_USERS, GET_USERS,USERS_DETAIL_ENDPOINT,DELETE_USER } from '../lib/endpoints';

  class UsersService extends APIService {
    getUsers(): Promise<any> {
      return this.get(`${GET_USERS}`)
        .then((res) => {
          return res?.data;
        })
        .catch((error: any) => {
          throw error?.response?.data;
        });
    }

    static create(data:any) {
      return axios
        .post(CREATE_USERS, data)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    }
      static edit(id, data) {
        return axios
          .put(EDIT_USERS(id), data)
          .then((response) => {
            return response?.data;
          })
          .catch((error) => {
            throw error?.response?.data;
          });
      }

      

     static details(id: string) {
      return axios
        .get(USERS_DETAIL_ENDPOINT(id))
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    }

     static delete(id: string) {
      return axios
        .delete(DELETE_USER(id))
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    }
  
    
  }

  export default UsersService;
