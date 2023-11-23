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

    createPeriod(data:any) {
      return this
        .post(GET_PERIODS, data)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    }

       uploadperiodslist(fileName: any) {
      // Create a FormData object
      const formData = new FormData();

      // Append the file name to the FormData object with the specified field name
      formData.append("file", fileName);

      return this.post(UPLOAD_PERIODS_LIST, formData, {
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

    deletePeriod(id: any) {
      return this
        .delete(DELETE_PERIODS(id))
        .then((response) => {
          return response?.data;
        })
        .catch((error) => {
          throw error?.response?.data;
        });
    }

    editPeriod(id: any,data) {
      return this
        .put(EDIT_PERIODS(id),data)
        .then((response) => {
          return response?.data;
        })
        .catch((error) => {
          throw error?.response?.data;
        });
    }

    periodDetails(id: string) {
      return this
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
