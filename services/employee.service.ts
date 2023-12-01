import axios from 'axios';
import APIService from './api.service';
import {DELETE_EMPLOYEE, EDIT_EMPLOYEE, GET_EMPLOYEES} from '../lib/endpoints';

class EmployeeService extends APIService {
  getEmployees(tenant_id:any): Promise<any> {
    return this.get(`${GET_EMPLOYEES(tenant_id)}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  static delete(tenant_id:any,id: any) {
    return axios
      .delete(DELETE_EMPLOYEE(tenant_id,id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  static edit(tenant_id:any,id: any) {
    return axios
      .put(EDIT_EMPLOYEE(tenant_id,id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  
}

export default EmployeeService;
