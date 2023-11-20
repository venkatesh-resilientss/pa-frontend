import axios from "axios";
import APIService from "./api.service";
import { CREATE_VENDORS, DELETE_VENDORS, EDIT_VENDORS, GET_VENDORS, UPLOAD_VENDORS_LIST } from "../lib/endpoints";

class VendorsService extends APIService {
  getVendors(): Promise<any> {
    return this.get(`${GET_VENDORS}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  static delete(id: any) {
    return axios
      .delete(DELETE_VENDORS(id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  static edit(id: any) {
    return axios
      .put(EDIT_VENDORS(id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  static create(data:any) {
    return axios
      .post(CREATE_VENDORS, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  static upload(file:any){
     // Create a FormData object
     const formData = new FormData();

     // Append the file name to the FormData object with the specified field name
     formData.append("file", file);

     return axios.post(UPLOAD_VENDORS_LIST, formData, {
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
}

export default VendorsService;
