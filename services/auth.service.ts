import axios from "axios"
// endpoints
import APIService from "./api.service"
import {
  LOGIN,
  TENANT_LOGIN,
  GET_USER_FROM_TOKEN,
  GET_FORGETPASSWORD,
  RESET_PASSWORD,
} from "lib/endpoints"
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

  getUserFromToken(): Promise<any> {
    return this.get(`${GET_USER_FROM_TOKEN}`)
      .then((res) => {
        return res.data
      })
      .catch((error: any) => {
        throw error.response.data
      })
  }

  authenticateUser(access: string): void {
    this.setAccessToken(access)
    axios.defaults.headers.common.Authorization = `Bearer ${access}`
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
    return this.post(`${GET_FORGETPASSWORD}`, data)
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
