import axios from "axios";
import APIService from "./api.service";
import {
  CREATE_DEPARTMENTS,
  DELETE_DEPARTMENTS,
  DEPARTMENT_DETAIL_ENDPOINT,
  EDIT_DEPARTMENTS,
  GET_DEPARTMENTS,UPLOAD_DEPARTMENT_LIST
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


    static uploaddepartmentlist(fileName: any) {
      // Create a FormData object
      const formData = new FormData();

      // Append the file name to the FormData object with the specified field name
      formData.append("file", fileName);

      return axios.post(UPLOAD_DEPARTMENT_LIST, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Upload failed", error);
        // Log the entire error response
        console.log("Error Response:", error.response);
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
