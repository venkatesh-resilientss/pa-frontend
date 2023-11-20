  import axios from 'axios';
  import APIService from './api.service';
  import {COUNTRIES_DETAIL_ENDPOINT, CREATE_COUNTRIES, DELETE_COUNTRIES, EDIT_COUNTRIES, GET_COUNTRIES,UPLOAD_COUNTRIES_LIST} from '../lib/endpoints';

  class CountryService extends APIService {
    getCountries(): Promise<any> {
      return this.get(`${GET_COUNTRIES}`)
        .then((res) => {
          return res?.data;
        })
        .catch((error: any) => {
          throw error?.response?.data;
        });
    }

    static create(data:any) {
      return axios
        .post(CREATE_COUNTRIES, data)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    }


      static uploadcouuntrieslist(fileName: any) {
      // Create a FormData object
      const formData = new FormData();

      // Append the file name to the FormData object with the specified field name
      formData.append("file", fileName);

      return axios.post(UPLOAD_COUNTRIES_LIST, formData, {
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
        .delete(DELETE_COUNTRIES(id))
        .then((response) => {
          return response?.data;
        })
        .catch((error) => {
          throw error?.response?.data;
        });
    }

    static edit(id: any,data) {
      return axios
        .put(EDIT_COUNTRIES(id),data)
        .then((response) => {
          return response?.data;
        })
        .catch((error) => {
          throw error?.response?.data;
        });
    }

    static details(id: string) {
      return axios
        .get(COUNTRIES_DETAIL_ENDPOINT(id))
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    }
  }

  export default CountryService;
