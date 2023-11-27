import axios from 'axios';
import APIService from './api.service';
import { GET_PROJECTS } from '../lib/endpoints';

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
}

export default ProjectService;
