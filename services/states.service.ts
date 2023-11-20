import axios from 'axios';
import APIService from './api.service';
import {CREATE_STATES, DELETE_STATES, EDIT_SERIES, GET_STATES, STATES_DETAIL_ENDPOINT,UPLOAD_STATES_LIST} from '../lib/endpoints';

class StatesService extends APIService {
  getStates(): Promise<any> {
    return this.get(`${GET_STATES}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  static create(data:any) {
    return axios
      .post(CREATE_STATES, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }


      static uploadstateslist(fileName: any) {
      // Create a FormData object
      const formData = new FormData();

      // Append the file name to the FormData object with the specified field name
      formData.append("file", fileName);

      return axios.post(UPLOAD_STATES_LIST, formData, {
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
      .delete(DELETE_STATES(id))
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
      .get(STATES_DETAIL_ENDPOINT(id))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }
}

export default StatesService;
