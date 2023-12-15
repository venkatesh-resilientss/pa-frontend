import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import cookie from "js-cookie";

import "config/axios.config";
import "styles/App.scss";
import { store } from "redux/store";

import MainLayout from "@/layouts";
import useUser from "@/hooks/useUser";

import { AuthService } from "services";

const authService = new AuthService();

function MyApp({ Component, pageProps, err }) {
  const router = useRouter();
  const [clientData, setClient] = useState<any>({
    staffUser: false,
    name: "",
    id: "",
  });

  const { loginStatus, user, mutate } = useUser();

  useEffect(() => {
    const getTenant = async () => {
      try {
        const name = window.location.hostname.split(".")[0];
        if (name === "app") {
          cookie.set("tenant_id", "1");
          setClient({ staffUser: true, name: "", id: "" });
        } else {
          const tenant = await authService.checkTenant({ name });
          if (Number(tenant?.ID)) cookie.set("tenant_id", tenant.ID);
          if (Number(tenant?.clientId))
            setClient({
              staffUser: true,
              name: tenant?.ClientName,
              id: Number(tenant?.ClientID),
            });
        }
        //  eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        //
      }
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
    else if (router.isReady) {
      if (publicPages.includes(router.pathname) && loginStatus === "loggedIn")
        getUser();

      if (!publicPages.includes(router.pathname) && loginStatus === "loggedOut")
        window.location.href = `http://app.${process.env.NEXT_PUBLIC_REDIRECT}`;
    }
  }, [user, loginStatus, router.asPath, router.isReady]);

  const mPageProps = { ...pageProps, loginStatus, user, mutate, router, err };
  return (
    <>
      <Head>
        <title>RSSL</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://db.onlinewebfonts.com/c/860a62f61e94367696df249678cf8efc?family=Segoe+Bold" rel="stylesheet"></link>
      </Head>

      <Provider store={store}>
        <MainLayout {...{ router, user, mutate }}>
          <ToastContainer />
          <Component {...mPageProps} {...{ clientData }} />
        </MainLayout>
      </Provider>
    </>
  );
}

export default MyApp;
