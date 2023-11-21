  import axios from 'axios';
  import APIService from './api.service';
  import {COUNTRIES_DETAIL_ENDPOINT, CREATE_COUNTRIES, DELETE_COUNTRIES, EDIT_COUNTRIES, GET_COUNTRIES,UPLOAD_COUNTRIES_LIST} from '../lib/endpoints';

  class CountryService extends APIService {
    getCountries(tenant_id:any): Promise<any> {
      return this.get(`${GET_COUNTRIES(tenant_id)}`)
        .then((res) => {
          return res?.data;
        })
        .catch((error: any) => {
          throw error?.response?.data;
        });
    }

    static create(tenant_id:any,data:any) {
      return axios
        .post(CREATE_COUNTRIES(tenant_id), data)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    }


      static uploadcouuntrieslist(tenant_id:any,fileName: any) {
      // Create a FormData object
      const formData = new FormData();

      // Append the file name to the FormData object with the specified field name
      formData.append("file", fileName);

      return axios.post(UPLOAD_COUNTRIES_LIST(tenant_id), formData, {
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
        .delete(DELETE_COUNTRIES(tenant_id,id))
        .then((response) => {
          return response?.data;
        })
        .catch((error) => {
          throw error?.response?.data;
        });
    }

    static edit(tenant_id:any,id: any,data) {
      return axios
        .put(EDIT_COUNTRIES(tenant_id,id),data)
        .then((response) => {
          return response?.data;
        })
        .catch((error) => {
          throw error?.response?.data;
        });
    }

    static details(tenant_id:any,id: string) {
      return axios
        .get(COUNTRIES_DETAIL_ENDPOINT(tenant_id,id))
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    }
  }

  export default CountryService;
