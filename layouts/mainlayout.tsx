import React, { FC } from "react";
import Head from "next/head";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { AuthService } from "services";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchDataSuccess,
  UserInfo,
} from "redux/slices/mySlices/roles";

const authService = new AuthService();
interface IProps {
  children: any;
}
const MainLayout: FC<IProps> = ({ children }) => {
  const dispatch = useDispatch();
  const roleInfo = useSelector(UserInfo);
  const { data: userData } = useSWR("GET_USER_DETAILS", () =>
    authService.getUserFromToken()
  );
  useEffect(() => {
    dispatch(fetchDataSuccess(userData?.data));
  }, [userData]);

  return <>{children}</>;
};

export default MainLayout;