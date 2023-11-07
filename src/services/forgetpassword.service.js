import axios from "axios";
import APIService from "./api.service";
import { GET_DEPARTMENTS, GET_FORGETPASSWORD } from "../lib/endpoints";

class ForgotPasswordService extends APIService {
  static create(data) {
    return axios
      .post(GET_FORGETPASSWORD, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }
}

export default ForgotPasswordService;
