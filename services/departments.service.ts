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
  getDepartments(tenant_id:any): Promise<any> {
    return this.get(`${GET_DEPARTMENTS(tenant_id)}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  static create(tenant_id:any,data: any) {
    return axios
      .post(CREATE_DEPARTMENTS(tenant_id), data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }


    static uploaddepartmentlist(tenant_id:any,fileName: any) {
      // Create a FormData object
      const formData = new FormData();

      // Append the file name to the FormData object with the specified field name
      formData.append("file", fileName);

      return axios.post(UPLOAD_DEPARTMENT_LIST(tenant_id), formData, {
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

  static details(tenant_id:any,id: any) {
    return axios
      .get(DEPARTMENT_DETAIL_ENDPOINT(tenant_id,id))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  static delete(tenant_id:any,id: any) {
    return axios
      .delete(DELETE_DEPARTMENTS(tenant_id,id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  static edit(tenant_id:any,id: any, updatedData: any) {
    return axios
      .put(EDIT_DEPARTMENTS(tenant_id,id), updatedData)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}

export default DepartmentsService;
