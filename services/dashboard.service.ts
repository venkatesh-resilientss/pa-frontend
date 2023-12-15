import APIService from "./api.service";
import {
  ALL_PRODUCTIONS,
  ALL_PRODUCTION_CARDS,
  GET_DASHBOARD_STATS,
  GET_ONBOARDED_CLIENTS,
  GET_RECENT_PRODUCTIONS,
  ON_BOARDED_PROJECTS,
  PRODUCTION_DASHBOARD_CARDS,
} from "lib/endpoints";

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

  getRecentProductions(search: any): Promise<any> {
    return this.get(`${GET_RECENT_PRODUCTIONS}?search=${search}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  getAllProductions(): Promise<any> {
    return this.get(`${ALL_PRODUCTIONS}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  getAllProductionCards(): Promise<any> {
    return this.get(`${ALL_PRODUCTION_CARDS}`)
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
    return this.get(ON_BOARDED_PROJECTS(id))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  getDashboardCards(id: any) {
    return this.get(PRODUCTION_DASHBOARD_CARDS(id))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }
}

export default DashboardService;
