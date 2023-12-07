import APIService from './api.service';
import {CREATE_TAXCODES, DELETE_TAXCODES, EDIT_TAXCODES, GET_TAXCODES, TAXCODES_DETAIL_ENDPOINT,UPLOAD_TAX_CODE_LIST} from '../lib/endpoints';

class TaxCodesService extends APIService {
  getTaxCodes(params?): Promise<any> {
    return this.get(`${GET_TAXCODES}?limit=${params.pageLimit}&offset=${params.offset}&search=${params.search}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  createTaxCode(data:any) {
    return this
      .post(CREATE_TAXCODES, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

    uploadtaxcodeslist(fileName: any) {
      // Create a FormData object
      const formData = new FormData();

      // Append the file name to the FormData object with the specified field name
      formData.append("file", fileName);

      return this.post(UPLOAD_TAX_CODE_LIST, formData,  {
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

  deleteTaxCode(id: any) {
    return this
      .delete(DELETE_TAXCODES(id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  editTaxCode(id: any,data) {
    return this
      .put(EDIT_TAXCODES(id),data)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }


    taxCodeDetails(id: string) {
      return this
        .get(TAXCODES_DETAIL_ENDPOINT(id))
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    }
}

export default TaxCodesService;
