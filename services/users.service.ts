import APIService from "./api.service";
// cookie
import cookie from "js-cookie";
import {
  CREATE_USERS,
  EDIT_USERS,
  GET_USERS,
  USERS_DETAIL_ENDPOINT,
  DELETE_USER,getProductionByClint
} from "../lib/endpoints";

class UsersService extends APIService {
  getUsers(params): Promise<any> {
    return this.get(`${GET_USERS}?limit=${params.pageLimit}&offset=${params.offset}&search=${params.search}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  postUsers(data): Promise<any> {
    return this.post(`${CREATE_USERS}`, data)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  editUser(id, data): Promise<any> {
    return this.put(EDIT_USERS(id), data)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  getuserbyid(id): Promise<any> {
    return this.get(`${USERS_DETAIL_ENDPOINT(id)}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }
  getProductionsByClient(clientId): Promise<any> {
    return this.get(`${getProductionByClint(clientId)}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  deleteUser(role_id): Promise<any> {
    return this.delete(`${DELETE_USER(role_id)}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  // Getting refresh token from cookie
  getRefreshToken(): string | undefined {
    return cookie.get("refreshToken");
  }
}

export default UsersService;
