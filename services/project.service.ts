import APIService from "./api.service";
import {
  CREATE_PROJECT,
  GET_PO_APPROVERS,
  GET_ALL_PROJECTS,
  GET_AP_APPROVERS,
  CREATE_APPROVERS,
  EDIT_PROJECTS,
  PROJECT_DETAIL_ENDPOINT,
  CREATE_CLIENT,
  GET_ALL_USERS,
  CREATE_PRODUCTION,
  CREATE_PRODUCTION_APPROVER,
  PROJECT_DETAILS,
} from "../lib/endpoints";

class ProjectService extends APIService {
  getClients(queries: any): Promise<any> {
    return this.get(`${CREATE_CLIENT}${queries}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }
  getClientUsers(queries: any): Promise<any> {
    return this.get(`${GET_ALL_USERS}${queries}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }
  createProjectApprover(id: any, data: any): Promise<any> {
    return this.post(CREATE_PRODUCTION_APPROVER(id), data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }
  getProjectDetails(id: any) {
    return this.get(PROJECT_DETAILS(id))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  getProjects(): Promise<any> {
    return this.get(`${GET_ALL_PROJECTS}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  getPOApprovers(id: any): Promise<any> {
    return this.get(`${GET_PO_APPROVERS(id)}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  getAPApprovers(id: any): Promise<any> {
    return this.get(`${GET_AP_APPROVERS(id)}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  createApprover(data: any): Promise<any> {
    return this.post(`${CREATE_APPROVERS}`, data)
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data;
      });
  }

  editProject(id: any, data) {
    return this.put(EDIT_PROJECTS(id), data)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  createProject(id: any, data: any): Promise<any> {
    return this.post(CREATE_PRODUCTION(id), data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  projectDetails(id: any) {
    return this.get(PROJECT_DETAIL_ENDPOINT(id))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }
}

export default ProjectService;
