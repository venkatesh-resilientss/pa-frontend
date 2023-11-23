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

  coaDetails(id: any) {
    return this
      .get(COAACCOUNTS_DETAIL_ENDPOINT(id))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  createCOA(data: any) {
    return this
      .post(CREATE_COAACCOUNTS, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  deleteCOA(id: any) {
    return this
      .delete(DELETE_COAACCOUNTS(id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  editCOA(id: any,data) {
    return this
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
