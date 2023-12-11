import axios, { AxiosPromise } from "axios";
import jwt from "jsonwebtoken";
// cookie
import cookie from "js-cookie";
import Moment from "moment";

abstract class APIService {
  date = new Date();
  expiry = Moment(this.date).add(7, "days");
  //Passing bearer for all api calls
  getAxiosHeaders(): any {
    const token = cookie.get("accessToken");
    return {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    };
  }
  getToken(token: any): any {
    return {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-HeadePrs": "X-PINGOTHER, Content-Type",
      "Content-Type": "application/json; charset=utf-8",
      "x-token": `${token}`,
    };
  }

  verifyToken(): boolean {
    const token = cookie.get("accessToken");
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_KEY);
        return true;
      } catch (err) {
        console.log(err);
      }
    }

    return false;
  }

  // Setting access token in a cookie
  setAccessToken(token: any): void {
    cookie.set("accessToken", token, { expires: this.expiry.toDate() });
  }
  getAccessToken() {
    return cookie.get("accessToken");
  }

  // Setting refresh token in a cookie
  setRefreshToken(token: string): void {
    cookie.set("refreshToken", token, { expires: this.expiry.toDate() });
  }

  purgeAuth(): void {
    cookie.remove("accessToken");
    cookie.remove("refreshToken");
    cookie.remove("next-auth.callback-url");
    cookie.remove("next-auth.csrf-token");
    cookie.remove("session");
    cookie.remove("tenant_id");
  }

  // Axios get method
  get(url: string): AxiosPromise<any> {
    return axios({ method: "GET", url, headers: this.getAxiosHeaders() });
  }
  getWithHeaders(url: string, token: any): AxiosPromise<any> {
    return axios({
      method: "GET",
      url,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    });
  }
  // Axios post method
  post(url: string, data = {}, headers?: any): AxiosPromise<any> {
    return axios({
      method: "POST",
      url,
      data,
      headers: headers
        ? {
            ...this.getAxiosHeaders(),
            ["Content-Type"]: headers["Content-Type"],
          }
        : this.getAxiosHeaders(),
    });
  }
  postWithMultiPartHeaders(url: string, data = {}): AxiosPromise<any> {
    return axios({
      method: "POST",
      url,
      data,
      headers: {
        Authorization: `Bearer ${cookie.get("accessToken")}`,
        "Content-Type": "multipart/form-data",
      },
    });
  }
  // Axios put method
  put(url: string, data = {}): AxiosPromise<any> {
    return axios({
      method: "PUT",
      url,
      data,
      headers: this.getAxiosHeaders(),
    });
  }
  // Axios delete method
  delete(url: string): AxiosPromise<any> {
    return axios({
      method: "DELETE",
      url,
      headers: this.getAxiosHeaders(),
    });
  }
}

export default APIService;
