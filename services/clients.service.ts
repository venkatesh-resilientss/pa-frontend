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

    deleteClient(id: any) {
      return this
        .delete(DELETE_CLIENTS(id))
        .then((response) => {
          return response?.data;
        })
        .catch((error) => {
          throw error?.response?.data;
        });
    }

    editClient(id: any) {
      return this
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
