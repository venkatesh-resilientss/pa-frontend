  import axios from 'axios';
  import APIService from './api.service';
  import {DELETE_CLIENTS, EDIT_CLIENTS, GET_CLIENTS} from '../lib/endpoints';

  class ClientsService extends APIService {
    getClients(tenant_id:any): Promise<any> {
      return this.get(`${GET_CLIENTS(tenant_id)}`)
        .then((res) => {
          return res?.data;
        })
        .catch((error: any) => {
          throw error?.response?.data;
        });
    }

    static delete(tenant_id:any,id: any) {
      return axios
        .delete(DELETE_CLIENTS(tenant_id,id))
        .then((response) => {
          return response?.data;
        })
        .catch((error) => {
          throw error?.response?.data;
        });
    }

    static edit(tenant_id:any,id: any) {
      return axios
        .put(EDIT_CLIENTS(tenant_id,id))
        .then((response) => {
          return response?.data;
        })
        .catch((error) => {
          throw error?.response?.data;
        });
    }

    
  }

  export default ClientsService;
