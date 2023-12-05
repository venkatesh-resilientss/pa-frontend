import APIService from "./api.service";
import { RESET_PASSWORD, GET_FORGETPASSWORD } from "../lib/endpoints";

class ForgotPasswordService extends APIService {
  forgotPassword(data: any): Promise<any> {
    return this.post(`${GET_FORGETPASSWORD}`, data)
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data;
      });
  }
  resetPassword(data: any): Promise<any> {
    return this.post(`${RESET_PASSWORD}`, data)
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data;
      });
  }
}

export default ForgotPasswordService;
