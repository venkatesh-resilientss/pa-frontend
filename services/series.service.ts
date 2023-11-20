  import axios from 'axios';
  import APIService from './api.service';
  import {CREATE_SERIES, DELETE_SERIES, EDIT_SERIES, GET_SERIES, SERIES_DETAIL_ENDPOINT,UPLOAD_SERIES_LIST} from '../lib/endpoints';

  class SeriesService extends APIService {
    getSeries(): Promise<any> {
      return this.get(`${GET_SERIES}`)
        .then((res) => {
          return res?.data;
        })
        .catch((error: any) => {
          throw error?.response?.data;
        });
    }

    static create(data:any) {
      return axios
        .post(CREATE_SERIES, data)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    }


      static uploadserieslist(fileName: any) {
      // Create a FormData object
      const formData = new FormData();

      // Append the file name to the FormData object with the specified field name
      formData.append("file", fileName);

      return axios.post(UPLOAD_SERIES_LIST, formData, {
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
        .delete(DELETE_SERIES(id))
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
        .get(SERIES_DETAIL_ENDPOINT(id))
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    }

    
  }

  export default SeriesService;
