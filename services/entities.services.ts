import APIService from "./api.service";
import { GET_ENTITIES, CREATE_ENTITIES, EDIT_ENTITIY, DELETE_ENTITY } from "@/lib/endpoints";
class EntitiesService extends APIService {
  getEntities(params?) {
    return this.get(GET_ENTITIES).then(response=>{
        return response.data
    })
    .catch(error=>{
        throw error.response.data;
    })
  }
  createEntities(data:any){
    return this
      .post( CREATE_ENTITIES, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  updateEntities(id:any,data:any){
    return this
      .put( EDIT_ENTITIY(id), data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  deleteEntities(id:any,data:any){
    return this
      .put( DELETE_ENTITY(id), data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }
}

export default EntitiesService;