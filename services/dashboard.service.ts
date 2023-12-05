import APIService from './api.service';
import { GET_DASHBOARD_STATS, GET_ONBOARDED_CLIENTS, GET_RECENT_PRODUCTIONS } from 'lib/endpoints';

class DashboardService extends APIService {
  
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

  
}

export default DashboardService;
