import { TenantService } from "services";

const tenantService = new TenantService();

export const checkTenant = async () => {
  try {
    const prefix = window.location.hostname.split(".")[0];
    const tenantDetails = await tenantService.getTenantData(prefix);
    if (tenantDetails) return tenantDetails;
  } catch (error) {
    return null;
  }
};
