import React, { FC } from "react";
import Sidebar from "components/Sidebar";
import { useState, useEffect } from "react";
import { AuthService } from "services";
import { checkTenant } from "constants/function";

const authService = new AuthService();

interface IProps {
  children: any;
}
const DashboardLayout: FC<IProps> = ({ children }) => {
  const [userData, setUserData] = useState({ name: "", profileImg: "" });
  useEffect(() => {
    const getTenant = async () => {
      const tenant = await checkTenant();
      if (tenant) {
        authService.getUserFromToken().then((res) => {
          setUserData({
            name: `${res.data.first_name} ${res.data.last_name}`,
            profileImg: res.data.profile_image,
          });
        });
      }
    };
    getTenant();
  }, []);
  return (
    <>
      <div className="d-flex">
        {/* Display sidebar conditionally */}
        <Sidebar
          props={{
            name: userData.name,
            profileImg: userData.profileImg,
          }}
        />
        {/* Main Container Wrapper*/}
        <div
          style={{
            height: "100vh",
            width: "100%",
            overflowY: "auto",
            overflowX: "hidden",
          }}
          className="px-4"
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
