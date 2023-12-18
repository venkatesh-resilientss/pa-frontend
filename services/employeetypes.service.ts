import APIService from "./api.service";
import {
  CREATE_EMPLOYEETYPE,
  DELETE_EMPLOYEETYPE,
  EMPLOYEETYPES_DETAIL_ENDPOINT,
  EDIT_EMPLOYEETYPE,
  GET_EMPLOYEETYPES,UPLOAD_EMPLOYEETYPE_LIST
} from "../lib/endpoints";

class EmployeetypesService extends APIService {

  getEmployeetypes(params?): Promise<any> {
    const queryParams = new URLSearchParams(params).toString();
    return this.get(`${GET_EMPLOYEETYPES}?${queryParams}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  createEmployeetype(data: any) {
    return this
      .post(CREATE_EMPLOYEETYPE, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }


    uploademployeetypelist(fileName: any) {
      // Create a FormData object
      const formData = new FormData();

      // Append the file name to the FormData object with the specified field name
      formData.append("file", fileName);

      return this.post(UPLOAD_EMPLOYEETYPE_LIST, formData,  {
          'Content-Type': 'multipart/form-data',
        },)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        
        
        throw error.response.data;
      });
    }

  employeetypeDetails(id: any) {
    return this
      .get(EMPLOYEETYPES_DETAIL_ENDPOINT(id))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  deleteEmployeetype(id: any) {
    return this
      .delete(DELETE_EMPLOYEETYPE(id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  editEmployeetype(id: any, updatedData: any) {
    return this
      .put(EDIT_EMPLOYEETYPE(id), updatedData)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}

export default EmployeetypesService;
