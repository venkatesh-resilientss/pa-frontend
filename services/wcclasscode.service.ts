  import APIService from './api.service';
  import {CREATE_WCCLASSCODE, WCCLASSCODES_DETAIL_ENDPOINT, DELETE_WCCLASSCODE, EDIT_WCCLASSCODE, GET_WCCLASSCODES,UPLOAD_WCCLASSCODES_LIST} from '../lib/endpoints';

  class WcclasscodeService extends APIService {

    getWcclasscodes(params?): Promise<any> {
      const queryParams = new URLSearchParams(params).toString();
      return this.get(`${GET_WCCLASSCODES}?${queryParams}`)
        .then((res) => {
          return res?.data;
        })
        .catch((error: any) => {
          throw error?.response?.data;
        });
    }

    // getWcclasscodes(params?): Promise<any> {
    //   return this.get(`${GET_WCCLASSCODES}?limit=${params.pageLimit}&offset=${params.offset}&search=${params.search}`)
    //     .then((res) => {
    //       return res?.data;
    //     })
    //     .catch((error: any) => {
    //       throw error?.response?.data;
    //     });
    // }

    wcclassCodeDetails(id: any) {
      return this
        .get(WCCLASSCODES_DETAIL_ENDPOINT(id))
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    }

    createWcclassCode(data:any) {
      return this
        .post(CREATE_WCCLASSCODE, data)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    }

      uploadWcclassCodelist(fileName: any) {
      // Create a FormData object
      const formData = new FormData();

      // Append the file name to the FormData object with the specified field name
      formData.append("file", fileName);

      return this.post(UPLOAD_WCCLASSCODES_LIST, formData,  {
          'Content-Type': 'multipart/form-data',
        },)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        
        
        throw error.response.data;
      });
    }

    deleteWcclassCode(id: any) {
      return this
        .delete(DELETE_WCCLASSCODE(id))
        .then((response) => {
          return response?.data;
        })
        .catch((error) => {
          throw error?.response?.data;
        });
    }

    editWcclassCode(id: any,data) {
      return this
        .put(EDIT_WCCLASSCODE(id),data)
        .then((response) => {
          return response?.data;
        })
        .catch((error) => {
          throw error?.response?.data;
        });
    }
  }

  export default WcclasscodeService;
