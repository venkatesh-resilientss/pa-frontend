import axios from 'axios';
import APIService from './api.service';
import {CREATE_LOCATIONS, DELETE_LOCATION, EDIT_LOCATION, GET_LOCATIONS} from '../lib/endpoints';

class LocationsService extends APIService {
  getLocations(): Promise<any> {
    return this.get(`${GET_LOCATIONS}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }


  static create(data:any) {
    return axios
      .post(CREATE_LOCATIONS, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  static delete(id: any) {
    return axios
      .delete(DELETE_LOCATION(id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  static edit(id: any) {
    return axios
      .put(EDIT_LOCATION(id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}



export default LocationsService;