import APIService from "./api.service";
import {
  CREATE_PROJECTTYPE,
  DELETE_PROJECTTYPE,
  PROJECTTYPES_DETAIL_ENDPOINT,
  EDIT_PROJECTTYPE,
  GET_PROJECTTYPES,UPLOAD_PROJECTTYPE_LIST
} from "../lib/endpoints";

class ProjectTypesService extends APIService {
  getProjecttypes(): Promise<any> {
    return this.get(`${GET_PROJECTTYPES}`)
      .then((res) => {
        return res?.data;
      })
      .catch((error: any) => {
        throw error?.response?.data;
      });
  }

  createProjecttype(data: any) {
    return this
      .post(CREATE_PROJECTTYPE, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }


    uploadprojecttypelist(fileName: any) {
      // Create a FormData object
      const formData = new FormData();

      // Append the file name to the FormData object with the specified field name
      formData.append("file", fileName);

      return this.post(UPLOAD_PROJECTTYPE_LIST, formData,  {
          'Content-Type': 'multipart/form-data',
        },)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
    }

    projecttypeDetails(id: any) {
    return this
      .get(PROJECTTYPES_DETAIL_ENDPOINT(id))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error.response.data;
      });
  }

  deleteProjecttype(id: any) {
    return this
      .delete(DELETE_PROJECTTYPE(id))
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  editProjecttype(id: any, updatedData: any) {
    return this
      .put(EDIT_PROJECTTYPE(id), updatedData)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}

export default ProjectTypesService;
