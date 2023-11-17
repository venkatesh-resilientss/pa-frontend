import React, { useEffect, useState } from "react";
// config
import "../config/axios.config";
import Head from "next/head";
// styles
import "../styles/App.scss";

import { store } from "redux/store";
import { Provider } from "react-redux";
import Sidebar from "components/Sidebar";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps, err }) {
  const router = useRouter();
  const Layout = Component.Layout || React.Fragment;
  const modifiedPageProps = { ...pageProps, err };
  /**
   * Pages not to render sidebar -
   */
  const noSidebar = ["/login", "/forgot-password", "/", "/reset-password"]; // add any new new routes to hide sidebar. Ex: /register
  const [activeRoute, setActiveRoute] = useState("/");
  useEffect(() => {
    setActiveRoute(router.pathname);
  }, [router.pathname]);
  return (
    <>
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
  );
}

export default MyApp;
