import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import "config/axios.config";
import "styles/App.scss";
import { store } from "redux/store";

import MainLayout from "@/layouts";
import useUser from "@/hooks/useUser";
import { checkTenant } from "@/constants/function";

import { AuthService } from "services";

const authService = new AuthService();

function MyApp({ Component, pageProps, err }) {
  const router = useRouter();

  const { loginStatus, user, mutate } = useUser();
  const mPageProps = { ...pageProps, loginStatus, user, mutate, router, err };

  useEffect(() => {
    const getTenant = async () => {
      await checkTenant();
    };
    getTenant();
  }, []);

  useEffect(() => {
    const publicPages = [
      "/",
      "/forgot-password",
      "/reset-password",
      "/dashboard",
    ];
    const reset = async () => {
      await authService.logout();
      await mutate();
      router.replace("/");
    };

    const getUser = async () => {
      try {
        const resp = await authService.checkTenant({ email: user?.email });
        const tenant = user?.isStaffUser ? "app" : resp?.Slug.toLowerCase();
        const prefix = window.location.hostname.split(".")[0];
        const accessToken = await authService.getAccessToken();

        if (prefix !== tenant)
          window.location.href = `http://${tenant}.${process.env.NEXT_PUBLIC_REDIRECT}/dashboard/?accessToken=${accessToken}`;
        else router.replace("/dashboard");
      } catch (e) {
        await reset();
        const prefix = window.location.hostname.split(".")[0];
        if (prefix !== "app")
          window.location.href = `http://app.${process.env.NEXT_PUBLIC_REDIRECT}/?reset=true`;
      }
    };
    if (router.pathname === "/" && router.query.reset) reset();
    else {
      if (publicPages.includes(router.pathname) && loginStatus === "loggedIn")
        getUser();

      if (!publicPages.includes(router.pathname) && loginStatus === "loggedOut")
        window.location.href = `http://app.${process.env.NEXT_PUBLIC_REDIRECT}`;
    }
  }, [user, loginStatus, router.asPath]);

  return (
    <>
      <Head>
        <title>RSSL</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Provider store={store}>
        <MainLayout {...{ router, user, mutate }}>
          <ToastContainer />
          <Component {...mPageProps} />
        </MainLayout>
      </Provider>
    </>
  );
}

export default MyApp;
