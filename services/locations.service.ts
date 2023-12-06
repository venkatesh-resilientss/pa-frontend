import APIService from './api.service';
import {CREATE_LOCATIONS, DELETE_LOCATION, EDIT_LOCATION, GET_LOCATIONS, LOCATION_DETAIL_ENDPOINT,UPLOAD_LOCATION_LIST} from '../lib/endpoints';

class LocationsService extends APIService {
  getLocations(params): Promise<any> {
    return this.get(`${GET_LOCATIONS}?limit=${params.pageLimit}&offset=${params.offset}&search=${params.search}`)
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

  uploadlocationlist(fileName: any) {
      // Create a FormData object
      const formData = new FormData();

      // Append the file name to the FormData object with the specified field name
      formData.append("file", fileName);

      return this.post(UPLOAD_LOCATION_LIST, formData,  {
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
