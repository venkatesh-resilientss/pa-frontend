// endpoints
import {
  LOGIN,
  TENANT_LOGIN,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
} from "constants/endpoints"
import APIService from "./api.service"

class AuthService extends APIService {
  // user sign in
  userSignIN(data: any): Promise<any> {
    return this.post(`${LOGIN}`, data)
      .then((res) => {
        return res.data
      })
      .catch((error: any) => {
        throw error.response.data
      })
  }

  // tenant user sign in
  tenantSignIn(data: any): Promise<any> {
    return this.post(`${TENANT_LOGIN}`, data)
      .then((res) => {
        return res.data
      })
      .catch((error: any) => {
        throw error.response.data
      })
  }

  forgotPassword(data: any): Promise<any> {
    return this.post(`${FORGOT_PASSWORD}`, data)
      .then((res) => {
        return res.data
      })
      .catch((error: any) => {
        throw error.response.data
      })
  }
  resetPassword(data: any): Promise<any> {
    return this.post(`${RESET_PASSWORD}`, data)
      .then((res) => {
        return res.data
      })
      .catch((error: any) => {
        throw error.response.data
      })
  }
}

export default AuthService
