// services
import APIService from './api.service';
// endpoints
import {
  GET_TENANT
} from "lib/endpoints";

class TenantService extends APIService {
  getTenantData(prefix: any): Promise<any> {
    return this.get(GET_TENANT(prefix))
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data;
      });
  }
}
export default TenantService;
