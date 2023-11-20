import axios from 'axios';
import APIService from './api.service';
import {CREATE_STATES, DELETE_STATES, EDIT_SERIES, GET_STATES, STATES_DETAIL_ENDPOINT,UPLOAD_STATES_LIST} from '../lib/endpoints';

class StatesService extends APIService {
  getStates(tenant_id:any): Promise<any> {
    return this.get(`${GET_STATES(tenant_id)}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  static create(tenant_id:any,data:any) {
    return axios
      .post(CREATE_STATES(tenant_id), data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }


      static uploadstateslist(tenant_id:any,fileName: any) {
      // Create a FormData object
      const formData = new FormData();

      // Append the file name to the FormData object with the specified field name
      formData.append("file", fileName);

      return axios.post(UPLOAD_STATES_LIST(tenant_id), formData, {
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
      .delete(DELETE_STATES(tenant_id,id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }


  static edit(tenant_id:any,id: any,data) {
    return axios
      .put(EDIT_SERIES(tenant_id,id),data)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }


  static details(tenant_id:any,id: string) {
    return axios
      .get(STATES_DETAIL_ENDPOINT(tenant_id,id))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }
}

export default StatesService;
