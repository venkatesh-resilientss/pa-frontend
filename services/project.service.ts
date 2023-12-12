import APIService from "./api.service";
import {
  GET_PO_APPROVERS,
  GET_ALL_PROJECTS,
  GET_AP_APPROVERS,
  CREATE_APPROVERS,
  EDIT_PROJECTS,
  PROJECT_DETAIL_ENDPOINT,
  CREATE_CLIENT,
  CREATE_PRODUCTION,
  CREATE_PRODUCTION_APPROVER,
  PROJECT_DETAILS,
  GET_CLIENT_USERS,
  GET_ALL_PROJECTS_LIST,
  GET_CLIENTS_LIST,
} from "../lib/endpoints";

class ProjectService extends APIService {
  getClients(data: any): Promise<any> {
    return this.post(`${GET_CLIENTS_LIST}`, data)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }
  getClientUsers(id: any, queries: any): Promise<any> {
    return this.get(`${GET_CLIENT_USERS(id)}${queries}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }
  createProjectApprover(data: any): Promise<any> {
    return this.post(CREATE_PRODUCTION_APPROVER, data)
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
  getProjectsList(query: any): Promise<any> {
    return this.get(`${GET_ALL_PROJECTS}${query}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }
  getAllProjectsList(data: any): Promise<any> {
    return this.post(`${GET_ALL_PROJECTS_LIST}`, data)
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

  createProject(data: any): Promise<any> {
    return this.post(CREATE_PRODUCTION, data)
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
