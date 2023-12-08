import cookie from "js-cookie";

import { AuthService } from "services";

const authService = new AuthService();

export const checkTenant = async () => {
  const name = window.location.hostname.split(".")[0];
  if (name === "app") {
    cookie.set("tenant_id", "1");
  } else {
    const tenant = await authService.checkTenant({ name });
    if (Number(tenant?.ID)) cookie.set("tenant_id", tenant.ID);
  }
};

export const appTenant = () => {
  const prefix = window.location.hostname.split(".")[0];
  return prefix === "app";
};

export const getSessionVariables = () => {
  const clientID = parseInt(sessionStorage.getItem("clientid")) || 0;
  const projectID = parseInt(sessionStorage.getItem("projectid")) || 0;
  return {
    clientID,
    projectID,
  };
};
