import APIService from "./api.service";
import {
  CREATE_SETS,
  DELETE_SETS,
  EDIT_SETS,
  GET_SETS,
  SETS_DETAIL_ENDPOINT,
  UPLOAD_SET_LIST,
} from "../lib/endpoints";

class SetsService extends APIService {
  getSets(params, data): Promise<any> {
    const queryParams = new URLSearchParams(params).toString();
    return this.post(`${GET_SETS}?${queryParams}`,data)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  createSet(data:any) {
    return this
      .post(CREATE_SETS, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  uploadsetlist(fileName: any,clientId,projectId) {
      // Create a FormData object
      const formData = new FormData();

    // Append the file name to the FormData object with the specified field name
    formData.append("file", fileName);
    formData.append("clientId",clientId);
    formData.append("projectId",projectId);

      return this.post(UPLOAD_SET_LIST, formData,  {
          'Content-Type': 'multipart/form-data',
        },)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        
        
        throw error.response.data;
      });
    }
  
  deleteSet(id: any) {
    return this
      .delete(DELETE_SETS(id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  editSet(id: any,data) {
    return this
      .put(EDIT_SETS(id),data)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  setsDetails(id: string) {
    return this
      .get(SETS_DETAIL_ENDPOINT(id))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }
}

export default SetsService;
