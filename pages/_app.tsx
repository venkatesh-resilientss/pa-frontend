import React, { useEffect, useState } from "react";
// config
import "../config/axios.config";
import Head from "next/head";
// styles
import "../styles/App.scss";

import { store } from "redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "layouts/mainlayout";

function MyApp({ Component, pageProps, err }) {
  // const Layout = Component.Layout || React.Fragment;
  const modifiedPageProps = { ...pageProps, err };

  return (
    <>
      <Head>
        <title>RSSL</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Provider store={store}>
        <MainLayout>
          <Component {...modifiedPageProps} />
          <ToastContainer />
        </MainLayout>
      </Provider>
    </>
  );
}

export default MyApp;
