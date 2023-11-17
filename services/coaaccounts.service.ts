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
  getCoasAccounts(): Promise<any> {
    return this.get(`${GET_COAACCOUNTS}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  static details(id: any) {
    return axios
      .get(COAACCOUNTS_DETAIL_ENDPOINT(id))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  static create(data: any) {
    return axios
      .post(CREATE_COAACCOUNTS, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  static delete(id: any) {
    return axios
      .delete(DELETE_COAACCOUNTS(id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  static edit(id: any,data) {
    return axios
      .put(EDIT_COAACCOUNTS(id),data)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}

export default COAAccountsService;
