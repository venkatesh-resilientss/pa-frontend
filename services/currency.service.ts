  import axios from 'axios';
  import APIService from './api.service';
  import {CREATE_CURRENCIES, CURRENCY_DETAIL_ENDPOINT, DELETE_CURRENCIES, EDIT_CURRENCIES, GET_COUNTRIES, GET_CURRENCIES,UPLOAD_CURRENCIES_LIST} from '../lib/endpoints';

  class CurrencyService extends APIService {
    getCurrencies(): Promise<any> {
      return this.get(`${GET_CURRENCIES}`)
        .then((res) => {
          return res?.data;
        })
        .catch((error: any) => {
          throw error?.response?.data;
        });
    }

    static details(id: any) {
      return axios
        .get(CURRENCY_DETAIL_ENDPOINT(id))
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    }

    static create(data:any) {
      return axios
        .post(CREATE_CURRENCIES, data)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    }

      static uploadcurrencylist(fileName: any) {
      // Create a FormData object
      const formData = new FormData();

      // Append the file name to the FormData object with the specified field name
      formData.append("file", fileName);

      return axios.post(UPLOAD_CURRENCIES_LIST, formData, {
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
        .delete(DELETE_CURRENCIES(id))
        .then((response) => {
          return response?.data;
        })
        .catch((error) => {
          throw error?.response?.data;
        });
    }

    static edit(id: any,data) {
      return axios
        .put(EDIT_CURRENCIES(id),data)
        .then((response) => {
          return response?.data;
        })
        .catch((error) => {
          throw error?.response?.data;
        });
    }
  }

  export default CurrencyService;
