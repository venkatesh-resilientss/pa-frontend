import { useSelector, useDispatch } from "react-redux";
import {
  UserInfo,
} from "redux/slices/mySlices/roles";
export const hasPermission = (category, action) => {
    const roleInfo = useSelector(UserInfo);
    console.log(roleInfo,'common function',category,action)
    try {
        if (roleInfo.responseData.AccessType == "full_access") {
            return true
        } else {
            return  roleInfo.responseData.Permissions[category][action];
      }
  } catch (err) {}
};