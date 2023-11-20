import axios from 'axios';
import APIService from './api.service';
import {CREATE_SETS, DELETE_SETS, EDIT_SERIES, GET_SETS, SETS_DETAIL_ENDPOINT,UPLOAD_SET_LIST} from '../lib/endpoints';

class SetsService extends APIService {
  getSets(): Promise<any> {
    return this.get(`${GET_SETS}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  static create(data:any) {
    return axios
      .post(CREATE_SETS, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  static uploadsetlist(fileName: any) {
      // Create a FormData object
      const formData = new FormData();

      // Append the file name to the FormData object with the specified field name
      formData.append("file", fileName);

      return axios.post(UPLOAD_SET_LIST, formData, {
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
      .delete(DELETE_SETS(id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  static edit(id: any,data) {
    return axios
      .put(EDIT_SERIES(id),data)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  static details(id: string) {
    return axios
      .get(SETS_DETAIL_ENDPOINT(id))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }
}

export default SetsService;
