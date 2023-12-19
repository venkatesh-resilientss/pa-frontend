import APIService from "./api.service";
import {
  CREATE_DEPARTMENTS,
  DELETE_DEPARTMENTS,
  DEPARTMENT_DETAIL_ENDPOINT,
  EDIT_DEPARTMENTS,
  GET_DEPARTMENTS,
  UPLOAD_DEPARTMENT_LIST,
} from "../lib/endpoints";

class DepartmentsService extends APIService {
  getDepartments(data, params?): Promise<any> {
    const queryParams = new URLSearchParams(params).toString();
    return this.post(`${GET_DEPARTMENTS}?${queryParams}`, data)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  createDepartment(data: any) {
    return this.post(CREATE_DEPARTMENTS, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  uploaddepartmentlist(fileName: any, clientId: any) {
    // Create a FormData object
    const formData = new FormData();

    // Append the file name to the FormData object with the specified field name
    formData.append("file", fileName);
    formData.append("clientId", clientId);

    return this.post(UPLOAD_DEPARTMENT_LIST, formData, {
      "Content-Type": "multipart/form-data",
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  departmentDetails(id: any) {
    return this.get(DEPARTMENT_DETAIL_ENDPOINT(id))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  deleteDepartment(id: any) {
    return this.delete(DELETE_DEPARTMENTS(id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  editDepartment(id: any, updatedData: any) {
    return this.put(EDIT_DEPARTMENTS(id), updatedData)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}

export default DepartmentsService;
