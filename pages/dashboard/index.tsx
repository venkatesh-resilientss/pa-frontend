import { useEffect } from "react";
import cookie from "js-cookie";

import Dashboard from "components/MyProject/Dashboard";

import { AuthService } from "services";
import ProductionDashboard from "@/components/productionDashboard";

const authService = new AuthService();

function Index({ loginStatus, user, mutate, router }) {
  useEffect(() => {
    const getTenant = async () => {
      try {
        const accessToken: any = router?.query?.accessToken;

        const res = await authService.getUserDetailsWithToken(accessToken);
        const email = res?.data?.email;
        const isStaffUser = res?.data?.isStaffUser;

        const resp = await authService.checkTenant({ email });
        const tenant = isStaffUser ? "app" : resp?.Slug.toLowerCase();
        const prefix = window.location.hostname.split(".")[0];
        await authService.authenticateUser(accessToken);

        if (prefix !== tenant)
          window.location.href = `http://${tenant}.${process.env.NEXT_PUBLIC_REDIRECT}/dashboard/?accessToken=${accessToken}`;
        else {
          router.replace("/dashboard");
          // setTimeout(() => router.reload(), 500);
        }
      } catch (e) {
        await authService.logout();
        await mutate();
        const prefix = window.location.hostname.split(".")[0];
        if (prefix !== "app")
          window.location.href = `http://app.${process.env.NEXT_PUBLIC_REDIRECT}/?reset=true`;
      }
    };

    if (router.isReady && router.query?.accessToken) getTenant();
    else if (
      router.isReady &&
      loginStatus === "loggedOut" &&
      !cookie.get("accessToken")
    )
      window.location.href = `http://app.${process.env.NEXT_PUBLIC_REDIRECT}/?reset=true`;
  }, [user, loginStatus, router.query?.accessToken]);

  return (
    <div>
      {loginStatus === "loading" ? (
        <></>
      ) : user?.IsStaffUser ? (
        <Dashboard {...{ router, user }} />
      ) : (
        <ProductionDashboard />
      )}
    </div>
  );
}

export default Index;
