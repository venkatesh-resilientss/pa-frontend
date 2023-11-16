import axios, {AxiosPromise} from 'axios';
import cookie from 'js-cookie';
import Moment from 'moment';

 class APIService {
  date = new Date();
  expiry = Moment(this.date).add(7, 'days');
  //Passing bearer for all api calls
  getAxiosHeaders(): any {
    const token = cookie.get('accessToken');
    return {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    };
  }
  purgeAuth(): void {
    cookie.remove('accessToken');
    cookie.remove('refreshToken');
  }
  // Setting access token in a cookie
  setAccessToken(token: string): void {
    cookie.set('accessToken', token, {expires: this.expiry.toDate()});
  }
  // Setting refresh token in a cookie
  setRefreshToken(token: string): void {
    cookie.set('refreshToken', token, {expires: this.expiry.toDate()});
  }

  // Axios get method
  get(url: string): AxiosPromise<any> {
    return axios({method: 'GET', url, headers: this.getAxiosHeaders()});
  }
  // Axios post method
  post(url: string, data = {}, headers?: any): AxiosPromise<any> {
    return axios({
      method: 'POST',
      url,
      data,
      headers: headers ? headers : this.getAxiosHeaders(),
    });
  }
  // Axios put method
  put(url: string, data = {}): AxiosPromise<any> {
    return axios({
      method: 'PUT',
      url,
      data,
      headers: this.getAxiosHeaders(),
    });
  }
  // Axios delete method
  delete(url: string): AxiosPromise<any> {
    return axios({
      method: 'DELETE',
      url,
      headers: this.getAxiosHeaders(),
    });
  }
}

export default APIService;
