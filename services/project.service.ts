import APIService from './api.service';
import { GET_PROJECTS } from '../lib/endpoints';

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
}

export default ProjectService;
