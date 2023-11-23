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

    createCountry(data:any) {
      return this
        .post(CREATE_COUNTRIES, data)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    }


      uploadcouuntrieslist(fileName: any) {
      // Create a FormData object
      const formData = new FormData();

      // Append the file name to the FormData object with the specified field name
      formData.append("file", fileName);

      return this.post(UPLOAD_COUNTRIES_LIST, formData, {
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

    deleteCountry(id: any) {
      return this
        .delete(DELETE_COUNTRIES(id))
        .then((response) => {
          return response?.data;
        })
        .catch((error) => {
          throw error?.response?.data;
        });
    }

    editCountry(id: any,data) {
      return this
        .put(EDIT_COUNTRIES(id),data)
        .then((response) => {
          return response?.data;
        })
        .catch((error) => {
          throw error?.response?.data;
        });
    }

    countryDetails(id: string) {
      return this
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
