import APIService from "./api.service";
import {
  BANKS_DETAIL_ENDPOINT,
  CREATE_BANK,
  DELETE_BANKS,
  EDIT_BANKS,
  GET_BANKS,
  UPLOAD_BANK_LIST,
  ADDRESSES,
  BANK_CONFIG,
  BANK_CONFIG_details,
  BANK_ACHES,
  BANK_ACH_DETAILS,
} from "../lib/endpoints";

class BankService extends APIService {
  getBanksNew(params, data): Promise<any> {
    return this.post(
      `${GET_BANKS}?limit=${params.limit}&offset=${params.offset}&search=${params.search}`,
      data
    )
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }
  getBanks(params): Promise<any> {
    return this.post(
      `${GET_BANKS}?limit=${params.pageLimit}&offset=${params.offset}&search=${params.search}`
    )
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  getBankDeatils(): Promise<any> {
    return this.get(`${GET_BANKS}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  createBank(data: any) {
    return this.post(CREATE_BANK, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  createBankConfig(data: any) {
    return this.post(BANK_CONFIG, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }
  getBankConfigDetails(id: any) {
    return this.get(BANK_CONFIG_details(id))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }
  getBankAchDetails(id: any) {
    return this.get(BANK_ACH_DETAILS(id))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }
  updateBankAchDetails(id: any, data: any) {
    return this.post(BANK_ACH_DETAILS(id), data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }
  createBankAch(data: any) {
    return this.post(BANK_ACHES, data)
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
      "Content-Type": "multipart/form-data",
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
    return this.delete(DELETE_BANKS(id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  editBank(id: any, data) {
    return this.put(EDIT_BANKS(id), data)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  bankDetails(id: any) {
    return this.get(BANKS_DETAIL_ENDPOINT(id))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }
}

export default BankService;
