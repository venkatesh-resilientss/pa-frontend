import APIService from "./api.service";
import {
  CLIENTS_DETAIL_ENDPOINT,
  CREATE_CLIENT,
  DELETE_CLIENTS,
  EDIT_CLIENTS,
  GET_CLIENTS,
  GET_SOFTWARES,
  GET_PRODUCTIONS,
  GET_CLIENT_TYPES,
  GET_CLIENT_COUNTRIES,
  GET_STATES_BY_COUNTRY,
  GET_USERS_BY_ROLE,
  UPLOAD_FILE_S3,
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

  getClientTypes(): Promise<any> {
    return this.get(`${GET_CLIENT_TYPES}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }
  getCountries(): Promise<any> {
    return this.get(`${GET_CLIENT_COUNTRIES}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }
  getStates(id: any): Promise<any> {
    return this.get(`${GET_STATES_BY_COUNTRY(id)}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }
  getUsersByRole(id: any): Promise<any> {
    return this.get(`${GET_USERS_BY_ROLE(id)}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  s3upload(data: any): Promise<any> {
    return this.postWithMultiPartHeaders(`${UPLOAD_FILE_S3}`, data)
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data?.msg || error.response.data;
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
