import APIService from './api.service';
import {CREATE_LEGISLATIVE, LEGISLATIVE_DETAIL_ENDPOINT, DELETE_LEGISLATIVE, EDIT_LEGISLATIVE, GET_LEGISLATIVES} from '../lib/endpoints';

class LegislativesService extends APIService {

  getlegislatives(params?): Promise<any> {
    const queryParams = new URLSearchParams(params).toString();
    return this.get(`${GET_LEGISLATIVES}?${queryParams}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  legislativesDetails(id: any) {
    return this
      .get(LEGISLATIVE_DETAIL_ENDPOINT(id))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  createlegislatives(data:any) {
    return this
      .post(CREATE_LEGISLATIVE, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  deletelegislatives(id: any) {
    return this
      .delete(DELETE_LEGISLATIVE(id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  editlegislatives(id: any,data) {
    return this
      .put(EDIT_LEGISLATIVE(id),data)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}

export default LegislativesService;
