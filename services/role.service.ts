import axios from 'axios';
import APIService from './api.service';
import { GET_ROLES, GET_ROLE_BY_ID } from '../lib/endpoints';

class RoleService extends APIService {
  getRoles(tenant_id:any): Promise<any> {
    return this.get(`${GET_ROLES(tenant_id)}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }
  post_roles(tenant_id:any,data): Promise<any> {
    return this.post(`${GET_ROLES(tenant_id)}`,data)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

   getrole_by_id(tenant_id:any,id): Promise<any> {
    return this.get(`${GET_ROLE_BY_ID(tenant_id,id)}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }
  update_role(tenant_id:any,id,data): Promise<any> {
    return this.put(GET_ROLE_BY_ID(tenant_id,id),data)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  delete_role(tenant_id:any,role_id): Promise<any> {
    return this.delete(`${GET_ROLE_BY_ID(tenant_id,role_id)}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }
}

export default RoleService;
