import APIService from "./api.service";
// cookie
import cookie from "js-cookie";
import {
  CREATE_USERS,
  EDIT_USERS,
  GET_USERS,
  USERS_DETAIL_ENDPOINT,
  getProductionByClint,
} from "../lib/endpoints";

class UsersService extends APIService {
  getUsers(params): Promise<any> {
    const queryParams = new URLSearchParams(params).toString();
    return this.get(`${GET_USERS}?${queryParams}`)
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

  // Getting refresh token from cookie
  getRefreshToken(): string | undefined {
    return cookie.get("refreshToken");
  }
}

export default UsersService;
