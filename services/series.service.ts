  import APIService from './api.service';
  import {CREATE_SERIES, DELETE_SERIES, EDIT_SERIES, GET_SERIES, SERIES_DETAIL_ENDPOINT,UPLOAD_SERIES_LIST} from '../lib/endpoints';

  class SeriesService extends APIService {
    getSeries(params?,data?): Promise<any> {
      return this.post(`${GET_SERIES}?limit=${params.pageLimit}&offset=${params.offset}&search=${params.search}`,data)
        .then((res) => {
          return res?.data;
        })
        .catch((error: any) => {
          throw error?.response?.data;
        });
    }

    createSeries(data:any): Promise<any> {
      return this
        .post(CREATE_SERIES, data)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    }


       uploadserieslist(fileName: any,clientId,projectId) {
      // Create a FormData object
      const formData = new FormData();

      // Append the file name to the FormData object with the specified field name
      formData.append("file", fileName);
      formData.append("clientId",clientId);
      formData.append("projectId",projectId);

      return this.post(UPLOAD_SERIES_LIST, formData,  {
          'Content-Type': 'multipart/form-data',
        },)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        
        
        throw error.response.data;
      });
    }

    deleteSeries(id: any): Promise<any> {
      return this
        .delete(DELETE_SERIES(id))
        .then((response) => {
          return response?.data;
        })
        .catch((error) => {
          throw error?.response?.data;
        });
    }


     editSeries(id: any,data): Promise<any> {
      return this
        .put(EDIT_SERIES(id),data)
        .then((response) => {
          return response?.data;
        })
        .catch((error) => {
          throw error?.response?.data;
        });
    }


    seriesDetails(id: string) {
      return this
        .get(SERIES_DETAIL_ENDPOINT(id))
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    }

    
  }

  export default SeriesService;
