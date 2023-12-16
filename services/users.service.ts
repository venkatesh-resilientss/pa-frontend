import APIService from "./api.service";
// cookie
import cookie from "js-cookie";
import {
  CREATE_USERS,
  EDIT_USERS,
  GET_CLIENT_USERS,
  GET_USERS,
  USERS_DETAIL_ENDPOINT,
  getProductionByClint,
  RESEND_RESET_PASSWORD_LINK,
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

  resendResetPasswordLink(data): Promise<any> {
    return this.post(`${RESEND_RESET_PASSWORD_LINK}`, data)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  getClientUsers(id: any, queries: any): Promise<any> {
    const queryParams = new URLSearchParams(queries).toString();
    return this.get(`${GET_CLIENT_USERS(id)}?${queryParams}`)
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
        return res?.data?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }
  getProductionsByClient(clientId): Promise<any> {
    return this.get(`${getProductionByClint(clientId)}`)
      .then((res) => {
        return res?.data?.data;
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
