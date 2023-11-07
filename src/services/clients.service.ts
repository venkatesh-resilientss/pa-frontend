  import axios from 'axios';
  import APIService from './api.service';
  import {DELETE_CLIENTS, EDIT_CLIENTS, GET_CLIENTS} from '../lib/endpoints';

  class ClientsService extends APIService {
    getClients(): Promise<any> {
      return this.get(`${GET_CLIENTS}`)
        .then((res) => {
          return res?.data;
        })
        .catch((error: any) => {
          throw error?.response?.data;
        });
    }

    static delete(id: any) {
      return axios
        .delete(DELETE_CLIENTS(id))
        .then((response) => {
          return response?.data;
        })
        .catch((error) => {
          throw error?.response?.data;
        });
    }

    static edit(id: any) {
      return axios
        .put(EDIT_CLIENTS(id))
        .then((response) => {
          return response?.data;
        })
        .catch((error) => {
          throw error?.response?.data;
        });
    }

    
  }

  export default ClientsService;
