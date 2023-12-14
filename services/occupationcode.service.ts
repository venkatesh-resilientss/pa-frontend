  import APIService from './api.service';
  import {CREATE_OCCUPATIONCODE, OCCUPATIONCODES_DETAIL_ENDPOINT, DELETE_OCCUPATIONCODE, EDIT_OCCUPATIONCODE, GET_OCCUPATIONCODES,UPLOAD_OCCUPATIONCODES_LIST} from '../lib/endpoints';

  class OccupationcodeService extends APIService {
    getOccupationcodes(params?): Promise<any> {
      const queryParams = new URLSearchParams(params).toString();
      return this.get(`${GET_OCCUPATIONCODES}?${queryParams}`)
        .then((res) => {
          return res?.data;
        })
        .catch((error: any) => {
          throw error?.response?.data;
        });
    }
    occupationCodeDetails(id: any) {
      return this
        .get(OCCUPATIONCODES_DETAIL_ENDPOINT(id))
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    }

    createOccupationCode(data:any) {
      return this
        .post(CREATE_OCCUPATIONCODE, data)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    }

      uploadOccupationCodelist(fileName: any) {
      // Create a FormData object
      const formData = new FormData();

      // Append the file name to the FormData object with the specified field name
      formData.append("file", fileName);

      return this.post(UPLOAD_OCCUPATIONCODES_LIST, formData,  {
          'Content-Type': 'multipart/form-data',
        },)
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

    deleteOccupationCode(id: any) {
      return this
        .delete(DELETE_OCCUPATIONCODE(id))
        .then((response) => {
          return response?.data;
        })
        .catch((error) => {
          throw error?.response?.data;
        });
    }

    editOccupationCode(id: any,data) {
      return this
        .put(EDIT_OCCUPATIONCODE(id),data)
        .then((response) => {
          return response?.data;
        })
        .catch((error) => {
          throw error?.response?.data;
        });
    }
  }

  export default OccupationcodeService;
