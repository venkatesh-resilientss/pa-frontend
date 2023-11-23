import APIService from "./api.service";
import { BANKS_DETAIL_ENDPOINT, CREATE_BANK, DELETE_BANKS, EDIT_BANKS, GET_BANKS,UPLOAD_BANK_LIST } from "../lib/endpoints";

class BankService extends APIService {
  getBanks(): Promise<any> {
    return this.get(`${GET_BANKS}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  createBank(data:any) {
    return this
      .post(CREATE_BANK, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }
  // static uploadbanklist(data:any) {
  //   return this
  //     .post(UPLOAD_BANK_LIST, data)
  //     .then((response) => {
  //       return response.data;
  //     })
  //     .catch((error) => {
  //       throw error.response.data;
  //     });
  // }

  
    uploadbanklist(fileName: any) {
      // Create a FormData object
      const formData = new FormData();

      // Append the file name to the FormData object with the specified field name
      formData.append("file", fileName);

      return this.post(UPLOAD_BANK_LIST, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
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

  deleteBank(id: any) {
    return this
      .delete(DELETE_BANKS(id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  editBank(id: any,data) {
    return this
      .put(EDIT_BANKS(id),data)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  bankDetails(id: any) {
    return this
      .get(BANKS_DETAIL_ENDPOINT(id))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }
}

export default BankService;
