import { useSelector, useDispatch } from "react-redux";
import {
  UserInfo,
} from "redux/slices/mySlices/roles";
// const roleInfo =  useSelector(UserInfo);
export const hasPermission = (category, action) => {
  const roleInfo = useSelector(UserInfo);
  try {
        if (roleInfo.responseData.Role.AccessType == "full_access") {
            return true
        } else {
            return  roleInfo.responseData.Role.Permissions[category][action];
      }
  } catch (err) {}
};