  import axios from 'axios';
  import APIService from './api.service';
  import {DELETE_PERIODS, EDIT_PERIODS, GET_CLIENTS, GET_PERIODS, PERIODS_DETAIL_ENDPOINT,UPLOAD_PERIODS_LIST} from '../lib/endpoints';

  class PeriodsService extends APIService {
    getPeriods(): Promise<any> {
      return this.get(`${GET_PERIODS}`)
        .then((res) => {
          return res?.data;
        })
        .catch((error: any) => {
          throw error?.response?.data;
        });
    }

    static create(data:any) {
      return axios
        .post(GET_PERIODS, data)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    }

      static uploadperiodslist(fileName: any) {
      // Create a FormData object
      const formData = new FormData();

      // Append the file name to the FormData object with the specified field name
      formData.append("file", fileName);

      return axios.post(UPLOAD_PERIODS_LIST, formData, {
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
        .delete(DELETE_PERIODS(id))
        .then((response) => {
          return response?.data;
        })
        .catch((error) => {
          throw error?.response?.data;
        });
    }

    static edit(id: any,data) {
      return axios
        .put(EDIT_PERIODS(id),data)
        .then((response) => {
          return response?.data;
        })
        .catch((error) => {
          throw error?.response?.data;
        });
    }

    static details(id: string) {
      return axios
        .get(PERIODS_DETAIL_ENDPOINT(id))
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    }
    
  }

  export default PeriodsService;
