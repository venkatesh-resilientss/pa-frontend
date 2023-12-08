import APIService from "./api.service";
import {  BUDGETS_DETAIL_ENDPOINT, CREATE_BUDGET, DELETE_BUDGET, EDIT_BUDGET, GET_BUDGETS, GET_COMPANIES,UPLOAD_BUDGET_LIST } from "../lib/endpoints";

class BudgetService extends APIService {
  getBudgets(data,params?): Promise<any> {
    return this.post(
      params ?
      `${GET_BUDGETS}?limit=${params.pageLimit}&offset=${params.offset}&search=${params.search}` :
      `${GET_BUDGETS}`,
      data
    )
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  getCompany(): Promise<any> {
    return this.get(`${GET_COMPANIES}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  deleteBudget(id: any) {
    return this
      .delete(DELETE_BUDGET(id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      })
  }

 

  createBudget(data:any) {
    return this
      .post(CREATE_BUDGET, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }


    uploadbudgetlist(fileName: any) {
      // Create a FormData object
      const formData = new FormData();

      // Append the file name to the FormData object with the specified field name
      formData.append("file", fileName);

      return this.post(UPLOAD_BUDGET_LIST, formData,  {
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

  budgetDetails(id: string) {
    return this
      .get(BUDGETS_DETAIL_ENDPOINT(id))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  editBudget(id: any,data) {
    return this
      .put(EDIT_BUDGET(id),data)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}

export default BudgetService;
