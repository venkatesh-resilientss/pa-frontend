import useSWR from "swr";
import cookie from "js-cookie";

import "config/axios.config";
import { AuthService } from "services";

const authService = new AuthService();

function useUser(): any {
  const { data, error, mutate } = useSWR("GET_USER_DETAILS", async () => {
    if (!cookie.get("accessToken")) {
      throw { data: "No accessToken" };
    }
    return await authService.getUserDetails();
  });
  if (data?.data?.ID === 0) cookie.remove("accessToken");
  return {
    loginStatus:
      error || data?.data?.ID === 0
        ? ("loggedOut" as const)
        : !data
        ? ("loading" as const)
        : ("loggedIn" as const),
    error: error?.data?.error || error?.data,
    user: data?.data,
    mutate,
  };
}

export default useUser;
