import { useSelector, useDispatch } from "react-redux";
import {
  UserInfo,
} from "redux/slices/mySlices/roles";
export const hasPermission = (category, action) => {
  // console.log(roleInfo,'common function',category,action)
  try {
    const roleInfo = useSelector(UserInfo);
        if (roleInfo.responseData.Role.AccessType == "full_access") {
            return true
        } else {
            return  roleInfo.responseData.Role.Permissions[category][action];
      }
  } catch (err) {}
};