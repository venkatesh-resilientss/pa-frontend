import APIService from "./api.service"
import {
  GET_DASHBOARD_STATS,
  GET_ONBOARDED_CLIENTS,
  GET_RECENT_PRODUCTIONS,
} from "lib/endpoints"

class DashboardService extends APIService {
  getStats(tenant_id: any): Promise<any> {
    return this.get(`${GET_DASHBOARD_STATS(tenant_id)}`)
      .then((res) => {
        return res?.data
      })
      .catch((error: any) => {
        throw error?.response?.data
      })
  }

  getRecentProductions(tenant_id: any): Promise<any> {
    return this.get(`${GET_RECENT_PRODUCTIONS(tenant_id)}`)
      .then((res) => {
        return res?.data
      })
      .catch((error: any) => {
        throw error?.response?.data
      })
  }

  getOnBoardedClients(tenant_id: any): Promise<any> {
    return this.get(`${GET_ONBOARDED_CLIENTS(tenant_id)}`)
      .then((res) => {
        return res?.data
      })
      .catch((error: any) => {
        throw error?.response?.data
      })
  }
}

export default DashboardService
