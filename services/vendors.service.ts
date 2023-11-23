
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

  deleteVendor(id: any) {
    return this
      .delete(DELETE_VENDORS(id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  editVendor(id: any) {
    return this
      .put(EDIT_VENDORS(id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  createVendor(data:any) {
    return this
      .post(CREATE_VENDORS, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

    uploadVendors(file:any){
     // Create a FormData object
     const formData = new FormData();

     // Append the file name to the FormData object with the specified field name
     formData.append("file", file);

     return this.post(UPLOAD_VENDORS_LIST, formData, {
      'Content-Type': 'multipart/form-data',
    },)
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
