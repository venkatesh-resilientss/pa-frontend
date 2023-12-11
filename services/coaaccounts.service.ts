import APIService from "./api.service";
import {
  DELETE_COAACCOUNTS,
  EDIT_COAACCOUNTS,
  GET_COAACCOUNTS,
  CREATE_COAACCOUNTS,
  COAACCOUNTS_DETAIL_ENDPOINT,
  UPLOAD_COA_LIST
} from "../lib/endpoints";

class COAAccountsService extends APIService {
  /** data => {clientId : 0, projectId : 0} */
  /** params : {pageLimit : 10, search  : "", offset : 0 } */
  getCoasAccounts(data,params?): Promise<any> {
    return this.post(
      params ?
        `${GET_COAACCOUNTS}`
        : `${GET_COAACCOUNTS}?limit=${params.pageLimit}&offset=${params.offset}&search=${params.search}`,
      data)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  coaDetails(id: any) {
    return this.get(COAACCOUNTS_DETAIL_ENDPOINT(id))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  uploadList(fileName: any, clientId : any, projetId : any) {
    // Create a FormData object
    const formData = new FormData();

    // Append the file name to the FormData object with the specified field name
    formData.append("file", fileName);
    formData.append("clientId",clientId);
    formData.append("projectId",projetId);

    return this.post(UPLOAD_COA_LIST, formData,  {
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

  createCOA(data: any) {
    return this.post(CREATE_COAACCOUNTS, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  deleteCOA(id: any) {
    return this.delete(DELETE_COAACCOUNTS(id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  editCOA(id: any, data) {
    return this.put(EDIT_COAACCOUNTS(id), data)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}

export default COAAccountsService;
