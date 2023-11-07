  import axios from 'axios';
  import APIService from './api.service';
import { CREATE_USERS, EDIT_USERS, GET_USERS } from '../lib/endpoints';

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

    static edit(id: any) {
      return axios
        .put(EDIT_USERS(id))
        .then((response) => {
          return response?.data;
        })
        .catch((error) => {
          throw error?.response?.data;
        });
    }
  
    
  }

  export default UsersService;
