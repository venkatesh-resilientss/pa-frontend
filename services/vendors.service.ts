import axios from "axios";
import APIService from "./api.service";
import { CREATE_VENDORS, DELETE_VENDORS, EDIT_VENDORS, GET_VENDORS, UPLOAD_VENDORS_LIST } from "../lib/endpoints";

class VendorsService extends APIService {
  getVendors(tenant_id:any): Promise<any> {
    return this.get(`${GET_VENDORS(tenant_id)}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  static delete(tenant_id:any,id: any) {
    return axios
      .delete(DELETE_VENDORS(tenant_id,id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  static edit(tenant_id:any,id: any) {
    return axios
      .put(EDIT_VENDORS(tenant_id,id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  static create(tenant_id:any,data:any) {
    return axios
      .post(CREATE_VENDORS(tenant_id), data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  static upload(tenant_id:any,file:any){
     // Create a FormData object
     const formData = new FormData();

     // Append the file name to the FormData object with the specified field name
     formData.append("file", file);

     return axios.post(UPLOAD_VENDORS_LIST(tenant_id), formData, {
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
