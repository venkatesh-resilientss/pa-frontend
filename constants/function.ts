import cookie from "js-cookie";

import { AuthService } from "services";

const authService = new AuthService();

export const checkTenant = async () => {
  const name = window.location.hostname.split(".")[0];
  const tenant = await authService.checkTenant({ name });
  if (tenant?.ID) cookie.set("tenant_id", tenant.ID);
};

export const appTenant = () => {
  const prefix = window.location.hostname.split(".")[0];
  return prefix === "app";
};
