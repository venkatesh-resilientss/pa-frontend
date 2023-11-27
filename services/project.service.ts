import axios from 'axios';
import APIService from './api.service';
import {DELETE_PROJECTS, EDIT_PROJECTS, GET_PROJECTS } from '../lib/endpoints';

class ProjectService extends APIService {
  getProjects(tenant_id:any): Promise<any> {
    return this.get(`${GET_PROJECTS(tenant_id)}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  static delete(tenant_id:any,id: any) {
    return axios
      .delete(DELETE_PROJECTS(tenant_id,id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  static edit(tenant_id:any,id: any) {
    return axios
      .put(EDIT_PROJECTS(tenant_id,id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

}

export default ProjectService;
