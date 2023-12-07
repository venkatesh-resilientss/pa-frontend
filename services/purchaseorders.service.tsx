import {
  CREATE_PURCHASE_ORDER,
  CREATE_TRANSACTION_LINES,
  DELETE_PURCHASE_ORDER,
  GET_PURCHASE_ORDERS,
} from "lib/endpoints";
import APIService from "./api.service";

class PurchaseOrderService extends APIService {
  getPurchaseOrders(): Promise<any> {
    return this.get(`${GET_PURCHASE_ORDERS}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  createPurchaseOrder(data: any) {
    return this.post(CREATE_PURCHASE_ORDER, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  createTransactionLines(data: any) {
    return this.post(CREATE_TRANSACTION_LINES, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  deletePurchaseOrder(id: any) {
    return this.delete(DELETE_PURCHASE_ORDER(id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}

export default PurchaseOrderService;
