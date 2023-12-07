import APIService from "./api.service";
import {
  CLIENTS_DETAIL_ENDPOINT,
  CREATE_CLIENT,
  DELETE_CLIENTS,
  EDIT_CLIENTS,
  GET_CLIENTS,
  GET_SOFTWARES,
  GET_PRODUCTIONS,
} from "../lib/endpoints";

class ClientsService extends APIService {
  getSoftwares(): Promise<any> {
    return this.get(`${GET_SOFTWARES}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  getClients(): Promise<any> {
    return this.get(`${GET_CLIENTS}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }
  getClientDetails(id: any): Promise<any> {
    return this.get(`${CLIENTS_DETAIL_ENDPOINT(id)}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  createClient(data: any): Promise<any> {
    return this.post(`${CREATE_CLIENT}`, data)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  deleteClient(id: any) {
    return this.delete(DELETE_CLIENTS(id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  editClient(id: any) {
    return this.put(EDIT_CLIENTS(id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
  getProductions(): Promise<any> {
    return this.get(`${GET_PRODUCTIONS}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }
}

export default ClientsService;
