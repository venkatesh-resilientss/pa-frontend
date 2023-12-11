import APIService from "./api.service";
import { GET_ROLES, GET_ROLE_BY_ID } from "../lib/endpoints";

class RoleService extends APIService {
  getRoles(params?): Promise<any> {
    return this.get(
      `${GET_ROLES}?limit=${params.pageLimit}&offset=${params.offset}&search=${params.search}`
    )
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  post_roles(data): Promise<any> {
    return this.post(`${GET_ROLES}`, data)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  getrole_by_id(id): Promise<any> {
    return this.get(`${GET_ROLE_BY_ID(id)}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }
  update_role(id, data): Promise<any> {
    return this.put(GET_ROLE_BY_ID(id), data)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  delete_role(role_id): Promise<any> {
    return this.delete(`${GET_ROLE_BY_ID(role_id)}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }
}

export default RoleService;
