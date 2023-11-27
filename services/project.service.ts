import APIService from './api.service';
import { CREATE_PROJECT, GET_PO_APPROVERS, GET_PROJECTS,GET_AP_APPROVERS,CREATE_APPROVERS } from '../lib/endpoints';

class ProjectService extends APIService {
  getProjects(): Promise<any> {
    return this.get(`${GET_PROJECTS}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  getPOApprovers(id:any): Promise<any> {
    return this.get(`${GET_PO_APPROVERS(id)}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }


  getAPApprovers(id:any): Promise<any> {
    return this.get(`${GET_AP_APPROVERS(id)}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

createApprover(data:any): Promise<any>{
  return this.post(`${CREATE_APPROVERS}`, data)
      .then((res) => {
        return res.data;

      })
      .catch((error: any) => {
        throw error.response.data;
      }); 
}


  createProject(data:any): Promise<any> {
    return this
      .post(CREATE_PROJECT, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }
}

export default ProjectService;
