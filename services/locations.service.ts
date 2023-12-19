import APIService from './api.service';
import {CREATE_LOCATIONS, DELETE_LOCATION, EDIT_LOCATION, GET_LOCATIONS, LOCATION_DETAIL_ENDPOINT,UPLOAD_LOCATION_LIST} from '../lib/endpoints';

class LocationsService extends APIService {
  getLocations(params?,data?): Promise<any> {
    const queryParams = new URLSearchParams(params).toString();
    return this.post(`${GET_LOCATIONS}?${queryParams}`,data)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }


  createLocation(data:any) {
    return this
      .post(CREATE_LOCATIONS, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  uploadlocationlist(fileName: any,clientId : any,projectId : any) {
      // Create a FormData object
      const formData = new FormData();

      // Append the file name to the FormData object with the specified field name
      formData.append("file", fileName);
      formData.append("cientId",clientId);
      formData.append("projectId",projectId);

      return this.post(UPLOAD_LOCATION_LIST, formData,  {
          'Content-Type': 'multipart/form-data',
        },)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        
        
        throw error.response.data;
      });
    }

  deleteLocation(id: any) {
    return this
      .delete(DELETE_LOCATION(id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  editLocation(id: any,data) {
    return this
      .put(EDIT_LOCATION(id),data)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }


  locationDetails(id: string) {
    return this
      .get(LOCATION_DETAIL_ENDPOINT(id))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }
}





export default LocationsService;
