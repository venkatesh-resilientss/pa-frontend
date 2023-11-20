import '@/styles/App.scss'
import React, { useEffect, useState } from "react";
import type { AppProps } from 'next/app'
import Head from "next/head";
import { Provider } from "react-redux";
import Sidebar from "components/Sidebar";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import store from "lib/store"

export default function App({ Component, pageProps }: any) {
  const router = useRouter();
  const Layout = Component.Layout || React.Fragment;
  const modifiedPageProps: any = { ...pageProps };
  /**
   * Pages not to render sidebar -
   */
  const noSidebar = ["/login", "/forgot-password", "/", "/reset-password"]; // add any new new routes to hide sidebar. Ex: /register
  const [activeRoute, setActiveRoute] = useState("/");
  useEffect(() => {
    setActiveRoute(router.pathname);
  }, [router.pathname]);
  return <>
    <Head>
      <title>RSSL</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="d-flex" style={{ gap: "45px" }}>
      {/* Display sidebar conditionally */}
      {noSidebar.includes(activeRoute) ? "" : <Sidebar />}
      {/* Main Container Wrapper*/}
      <div
        style={{
          height: "100vh",
          width: "100%",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Provider store={store}>
          <Layout>
            <Component {...modifiedPageProps} />
            <ToastContainer />
          </Layout>
        </Provider>
      </div>
    </div>
  </>
}
