import { useSelector, useDispatch } from "react-redux";
import { UserInfo } from "redux/slices/mySlices/roles";
// const roleInfo =  useSelector(UserInfo);
export const hasPermission = (category, action) => {
  const userInfo = useSelector(UserInfo);
  try {
    /**Staff User for bulk upload */
    if (action === "bulk_upload"){
      return userInfo.responseData.IsStaffUser || false;
    }
      if (userInfo.responseData.Role.AccessType == "full_access") {
        return true;
      } else {
        return userInfo.responseData.Role.Permissions[category][action];
      }
  } catch (err) {}
};
