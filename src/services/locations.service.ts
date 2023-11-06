import axios from 'axios';
import APIService from './api.service';
import {GET_LOCATIONS} from '../lib/endpoints';

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
}

export default LocationsService;
