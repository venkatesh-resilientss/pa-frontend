import axios from "axios";
import APIService from "./api.service";
import { BANKS_DETAIL_ENDPOINT, CREATE_BANK, DELETE_BANKS, EDIT_BANKS, GET_BANKS,UPLOAD_BANK_LIST } from "../lib/endpoints";

class BankService extends APIService {
  getBanks(): Promise<any> {
    return this.get(`${GET_BANKS}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  static create(data:any) {
    return axios
      .post(CREATE_BANK, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }
  // static uploadbanklist(data:any) {
  //   return axios
  //     .post(UPLOAD_BANK_LIST, data)
  //     .then((response) => {
  //       return response.data;
  //     })
  //     .catch((error) => {
  //       throw error.response.data;
  //     });
  // }

  
    static uploadbanklist(fileName: any) {
      // Create a FormData object
      const formData = new FormData();

      // Append the file name to the FormData object with the specified field name
      formData.append("file", fileName);

      return axios.post(UPLOAD_BANK_LIST, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Upload failed", error);
        // Log the entire error response
        console.log("Error Response:", error.response);
        throw error.response.data;
      });
    }

  static delete(id: any) {
    return axios
      .delete(DELETE_BANKS(id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  static edit(id: any,data) {
    return axios
      .put(EDIT_BANKS(id),data)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  static details(id: string) {
    return axios
      .get(BANKS_DETAIL_ENDPOINT(id))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }
}

export default BankService;
