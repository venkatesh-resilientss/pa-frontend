import APIService from './api.service';
import {CREATE_WCCLASS, WCCLASS_DETAIL_ENDPOINT, DELETE_WCCLASS, EDIT_WCCLASS, GET_WCCLASS} from '../lib/endpoints';

class WcclassService extends APIService {

  getWcclass(params?): Promise<any> {
    const queryParams = new URLSearchParams(params).toString();
    return this.get(`${GET_WCCLASS}?${queryParams}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  wcclassDetails(id: any) {
    return this
      .get(WCCLASS_DETAIL_ENDPOINT(id))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  createWcclass(data:any) {
    return this
      .post(CREATE_WCCLASS, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  deleteWcclass(id: any) {
    return this
      .delete(DELETE_WCCLASS(id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  editWcclass(id: any,data) {
    return this
      .put(EDIT_WCCLASS(id),data)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}

export default WcclassService;
