import axios from "axios";
import APIService from "./api.service";
import { BANKS_DETAIL_ENDPOINT, CREATE_BANK, DELETE_BANKS, EDIT_BANKS, GET_BANKS,UPLOAD_BANK_LIST } from "../lib/endpoints";

class BankService extends APIService {
  getBanks(tenant_id:any): Promise<any> {
    return this.get(`${GET_BANKS(tenant_id)}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  static create(data:any,tenant_id:any) {
    return axios
      .post(CREATE_BANK(tenant_id), data)
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

  
    static uploadbanklist(tenant_id:any,fileName: any) {
      // Create a FormData object
      const formData = new FormData();

      // Append the file name to the FormData object with the specified field name
      formData.append("file", fileName);

      return axios.post(UPLOAD_BANK_LIST(tenant_id), formData, {
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

  static delete(tenant_id:any,id: any) {
    return axios
      .delete(DELETE_BANKS(tenant_id,id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  static edit(tenant_id:any,id: any,data) {
    return axios
      .put(EDIT_BANKS(tenant_id,id),data)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  static details(tenant_id:any,id: any) {
    return axios
      .get(BANKS_DETAIL_ENDPOINT(tenant_id,id))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }
}

export default BankService;
