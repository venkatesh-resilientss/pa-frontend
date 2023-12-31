  import APIService from './api.service';
  import {CREATE_CURRENCIES, CURRENCY_DETAIL_ENDPOINT, DELETE_CURRENCIES, EDIT_CURRENCIES, GET_COUNTRIES, GET_CURRENCIES,UPLOAD_CURRENCIES_LIST} from '../lib/endpoints';

  class CurrencyService extends APIService {
    getCurrencies(params?): Promise<any> {
      const queryParams = new URLSearchParams(params).toString();
      return this.get(`${GET_CURRENCIES}?${queryParams}`)
        .then((res) => {
          return res?.data;
        })
        .catch((error: any) => {
          throw error?.response?.data;
        });
    }

    currencyDetails(id: any) {
      return this
        .get(CURRENCY_DETAIL_ENDPOINT(id))
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    }

    createCurrency(data:any) {
      return this
        .post(CREATE_CURRENCIES, data)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    }

      uploadcurrencylist(fileName: any) {
      // Create a FormData object
      const formData = new FormData();

      // Append the file name to the FormData object with the specified field name
      formData.append("file", fileName);

      return this.post(UPLOAD_CURRENCIES_LIST, formData,  {
          'Content-Type': 'multipart/form-data',
        },)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        
        
        throw error.response.data;
      });
    }

    deleteCurrency(id: any) {
      return this
        .delete(DELETE_CURRENCIES(id))
        .then((response) => {
          return response?.data;
        })
        .catch((error) => {
          throw error?.response?.data;
        });
    }

    editCurrency(id: any,data) {
      return this
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
