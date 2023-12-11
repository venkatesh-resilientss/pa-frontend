import useSWR from "swr";
import cookie from "js-cookie";

import "config/axios.config";
import { AuthService } from "services";

const authService = new AuthService();

function useUser(): any {
  const { data, error, mutate } = useSWR("GET_USER_DETAILS", async () => {
    const res = await authService.getUserDetails();
    return res;
  });

  return {
    loginStatus: error
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
