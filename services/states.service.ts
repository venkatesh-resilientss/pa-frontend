import APIService from './api.service';
import {CREATE_STATES, DELETE_STATES, EDIT_STATES, GET_STATES, GET_STATES_BY_COUNTRY, STATES_DETAIL_ENDPOINT,UPLOAD_STATES_LIST} from '../lib/endpoints';

class StatesService extends APIService {
  getStates(params): Promise<any> {
    const queryParams = new URLSearchParams(params).toString();
    return this.get(`${GET_STATES}?${queryParams}`)
    // return this.get(`${GET_STATES}?limit=${params.pageLimit}&offset=${params.offset}&search=${params.search}&is_active=${params.is_active}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  getStatesByCountry(id: any): Promise<any> {
    return this.get(`${GET_STATES_BY_COUNTRY(id)}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  createState(data:any) {
    return this
      .post(CREATE_STATES, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }


      uploadstateslist(fileName: any) {
      // Create a FormData object
      const formData = new FormData();

      // Append the file name to the FormData object with the specified field name
      formData.append("file", fileName);

      return this.post(UPLOAD_STATES_LIST, formData,  {
          'Content-Type': 'multipart/form-data',
        },)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        
        
        throw error.response.data;
      });
    }

  deleteState(id: any) {
    return this
      .delete(DELETE_STATES(id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }


  editState(id: any,data) {
    return this
      .put(EDIT_STATES(id),data)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }


  stateDetails(id: string) {
    return this
      .get(STATES_DETAIL_ENDPOINT(id))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }
}

export default StatesService;
