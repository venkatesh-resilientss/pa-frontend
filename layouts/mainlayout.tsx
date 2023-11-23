import React, { FC } from "react";
import Head from "next/head";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { AuthService } from "services";
import { useSelector, useDispatch } from "react-redux";
import { fetchDataSuccess, UserInfo } from "redux/slices/mySlices/roles";
import { checkTenant } from "constants/function";
import { useRouter } from "next/router";
import DashboardLayout from "./dashboardLayout";
import cookie from "js-cookie";
import Moment from "moment";
const authService = new AuthService();
interface IProps {
  children: any;
}
const MainLayout: FC<IProps> = ({ children }) => {
   

  useEffect(() => {
    const date = new Date();
    const getTenant = async () => {
      const expiry = Moment(date).add(7, "days");
      const tenant = await checkTenant();
      // console.log(tenant, "tenant");
      if (tenant) {
        cookie.set("tenant_id", tenant.id, { expires: expiry.toDate() });
      }
    };
    getTenant();
  }, []);
  const dispatch = useDispatch();
  const { data: userData } = useSWR("GET_USER_DETAILS", () =>
    authService.getUserFromToken()
  );
  useEffect(() => {
    dispatch(fetchDataSuccess(userData?.data));
  }, [userData]);
  const router = useRouter();

  const [activeRoute, setActiveRoute] = useState("/");

  useEffect(() => {
    setActiveRoute(router.pathname);
  }, [router.pathname]);

  const protectedRoutes = [
    "pages",
    "clients",
    "configurations",
    "create-production",
    "dashboard",
    "productions",
    "sandbox",
    "settings",
    "singlesignon",
    "transactions",
    // "/forgot-password",
    // "/login",
    // "/reset-password",
    // "/welcome"
  ];
  const isProtectedRoute = (route: string) => {
    const parentRoute = route.split("/")[1] || "";
    if (protectedRoutes.includes(parentRoute)) return true;
    else return false;
  };

  // if (isAuthenticated) {
  //   if (isProtectedRoute(activeRoute))
  //     return (
  //       <>
  //         <DashboardLayout>{children}</DashboardLayout>
  //       </>
  //     );
  //   else router.push("/dashboard");
  // } else {
  //   // not authenticated
  //   if (isProtectedRoute(activeRoute)) router.push("/");
  //   else return <>{children}</>;
  // }

  if (isProtectedRoute(activeRoute))
    return (
      <>
        <DashboardLayout>{children}</DashboardLayout>
      </>
    );
  else return <>{children}</>;
};

export default MainLayout;
