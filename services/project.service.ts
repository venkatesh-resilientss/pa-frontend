import APIService from './api.service';
import { CREATE_PROJECT, GET_PO_APPROVERS, GET_PROJECTS,GET_AP_APPROVERS,CREATE_APPROVERS, EDIT_PROJECTS, PROJECT_DETAIL_ENDPOINT } from '../lib/endpoints';

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


editProject(id: any,data) {
  return this
    .put(EDIT_PROJECTS(id),data)
    .then((response) => {
      return response?.data;
    })
    .catch((error) => {
      throw error?.response?.data;
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


  projectDetails(id: any) {
    return this
      .get(PROJECT_DETAIL_ENDPOINT(id))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }
}

export default ProjectService;
