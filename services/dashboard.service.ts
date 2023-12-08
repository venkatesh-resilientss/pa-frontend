import APIService from './api.service';
import { GET_DASHBOARD_STATS, GET_ONBOARDED_CLIENTS, GET_RECENT_PRODUCTIONS, ON_BOARDED_PROJECTS } from 'lib/endpoints';

class DashboardService extends APIService {
  static getProductionDetails(production_id: string | string[]): any {
    throw new Error("Method not implemented.");
  }
  
  getStats(): Promise<any> {
    return this.get(`${GET_DASHBOARD_STATS}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }


  getRecentProductions(): Promise<any> {
    return this.get(`${GET_RECENT_PRODUCTIONS}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }


  getOnBoardedClients(): Promise<any> {
    return this.get(`${GET_ONBOARDED_CLIENTS}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

    getProductionDetails(id: any) {
      // console.log(id)
    return this.get(ON_BOARDED_PROJECTS(id))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  
}

export default DashboardService;
