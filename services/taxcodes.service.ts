import axios from 'axios';
import APIService from './api.service';
import {CREATE_TAXCODES, DELETE_TAXCODES, EDIT_TAXCODES, GET_TAXCODES, TAXCODES_DETAIL_ENDPOINT,UPLOAD_TAX_CODE_LIST} from '../lib/endpoints';

class TaxCodesService extends APIService {
  getTaxCodes(): Promise<any> {
    return this.get(`${GET_TAXCODES}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  static create(data:any) {
    return axios
      .post(CREATE_TAXCODES, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

    static uploadtaxcodeslist(fileName: any) {
      // Create a FormData object
      const formData = new FormData();

      // Append the file name to the FormData object with the specified field name
      formData.append("file", fileName);

      return axios.post(UPLOAD_TAX_CODE_LIST, formData, {
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
      .delete(DELETE_TAXCODES(id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  static edit(id: any,data) {
    return axios
      .put(EDIT_TAXCODES(id),data)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }


    static details(id: string) {
      return axios
        .get(TAXCODES_DETAIL_ENDPOINT(id))
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    }
}

export default TaxCodesService;
