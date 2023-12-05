import APIService from './api.service';
import {ADDRESSES,EDIT_ADDRESSES} from '../lib/endpoints';

class AddressService extends APIService {
  createAddress(data:any) {
    return this
      .post(ADDRESSES, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  updateAddress(id : any,data:any){
    return this.put(EDIT_ADDRESSES(id),data)
    .then(response=>{
      return response.data
    })
    .catch((error)=>{
      throw error.response.data;
    })
  }
}





export default AddressService;
