import APIService from './api.service';
import {CREATE_PAYCODE, PAYCODE_DETAIL_ENDPOINT, DELETE_PAYCODE, EDIT_PAYCODE, GET_PAYCODES} from '../lib/endpoints';

class PaycodesService extends APIService {

  getPaycodes(params?): Promise<any> {
    const queryParams = new URLSearchParams(params).toString();
    return this.get(`${GET_PAYCODES}?${queryParams}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  paycodeDetails(id: any) {
    return this
      .get(PAYCODE_DETAIL_ENDPOINT(id))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  createPaycode(data:any) {
    return this
      .post(CREATE_PAYCODE, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  deletePaycode(id: any) {
    return this
      .delete(DELETE_PAYCODE(id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  editPaycode(id: any,data) {
    return this
      .put(EDIT_PAYCODE(id),data)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}

export default PaycodesService;
