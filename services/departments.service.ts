import axios from "axios";
import APIService from "./api.service";
import {
  CREATE_DEPARTMENTS,
  DELETE_DEPARTMENTS,
  DEPARTMENT_DETAIL_ENDPOINT,
  EDIT_DEPARTMENTS,
  GET_DEPARTMENTS,
} from "../lib/endpoints";

class DepartmentsService extends APIService {
  getDepartments(): Promise<any> {
    return this.get(`${GET_DEPARTMENTS}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  static create(data: any) {
    return axios
      .post(CREATE_DEPARTMENTS, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  static details(id: any) {
    return axios
      .get(DEPARTMENT_DETAIL_ENDPOINT(id))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  static delete(id: any) {
    return axios
      .delete(DELETE_DEPARTMENTS(id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  static edit(id: any, updatedData: any) {
    return axios
      .put(EDIT_DEPARTMENTS(id), updatedData)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}

export default DepartmentsService;
