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
  UPLOAD_FILE_S3,
  GET_STAFF_ROLE_USERS,
  GET_CLIENT_USERS,
  GET_CLIENTS_LIST,
  GET_CLIENTS_FILTERS,
} from "../lib/endpoints";

class ClientsService extends APIService {
  getStaffRoleUsers(queries: any): Promise<any> {
    return this.get(`${GET_STAFF_ROLE_USERS}${queries}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }
  getClientUsers(id: any, queries: any): Promise<any> {
    return this.get(`${GET_CLIENT_USERS(id)}${queries}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }
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
  getClientsFilters(): Promise<any> {
    return this.get(`${GET_CLIENTS_FILTERS}`)
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

  // getClients(): Promise<any> {
  //   return this.get(`${GET_CLIENTS}`)
  //     .then((res) => {
  //       return res?.data;
  //     })
  //     .catch((error: any) => {
  //       throw error?.response?.data;
  //     });
  // }
  getClients(data): Promise<any> {
    return this.post(`${GET_CLIENTS}`, data)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }
  getClientsList(data): Promise<any> {
    return this.post(`${GET_CLIENTS_LIST}`, data)
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

  editClient(id: any, data: any) {
    return this.put(EDIT_CLIENTS(id), data)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
  getProductions(search): Promise<any> {
    return this.get(`${GET_PRODUCTIONS(search)}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }
}

export default ClientsService;
