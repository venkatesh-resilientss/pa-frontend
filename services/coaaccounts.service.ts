import axios from "axios";
import APIService from "./api.service";
import {
  DELETE_COAACCOUNTS,
  EDIT_COAACCOUNTS,
  GET_COAACCOUNTS,
  CREATE_COAACCOUNTS,
  COAACCOUNTS_DETAIL_ENDPOINT,
} from "../lib/endpoints";

class COAAccountsService extends APIService {
  getCoasAccounts(tenant_id:any): Promise<any> {
    return this.get(`${GET_COAACCOUNTS(tenant_id)}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  static details(tenant_id:any,id: any) {
    return axios
      .get(COAACCOUNTS_DETAIL_ENDPOINT(tenant_id,id))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  static create(tenant_id:any,data: any) {
    return axios
      .post(CREATE_COAACCOUNTS(tenant_id), data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  static delete(tenant_id:any,id: any) {
    return axios
      .delete(DELETE_COAACCOUNTS(tenant_id,id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  static edit(tenant_id:any,id: any,data) {
    return axios
      .put(EDIT_COAACCOUNTS(tenant_id,id),data)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}

export default COAAccountsService;
