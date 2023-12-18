import { include } from "@/commonFunctions/common";

export const createClientPayload = (clientData) => {
  const payload: any = { ...clientData };

  payload["ClientSoftwares"] = clientData.Softwares.map((e) => ({
    SoftwareID: e,
  }));
  if (clientData.clientType)
    payload["ClientTypeID"] = clientData.clientType.value;

  if (clientData.MailingAddress.country)
    payload["MailingAddress"]["CountryID"] =
      clientData.MailingAddress.country.value;
  if (clientData.MailingAddress.state)
    payload["MailingAddress"]["StateID"] =
      clientData.MailingAddress.state.value;

  payload["MailingAddress"]["Zipcode"] =
    Number(clientData.MailingAddress.Zipcode) || 0;

  if (clientData.PhysicalAddress.country)
    payload["PhysicalAddress"]["CountryID"] =
      clientData.PhysicalAddress.country.value;
  if (clientData.PhysicalAddress.state)
    payload["PhysicalAddress"]["StateID"] =
      clientData.PhysicalAddress.state.value;

  payload["PhysicalAddress"]["Zipcode"] =
    Number(clientData.PhysicalAddress.Zipcode) || 0;

  const pick1 = ["Name", "Code", "LegalName", "ClientTypeID"];
  const pick2 = ["PhysicalAddress", "MailingAddress", "Company", "Meta"];
  const pick3 = ["LogoUrl", "Tenant", "ClientSoftwares"];

  const pick = [...pick1, ...pick2, ...pick3];

  return include(payload, pick);
};

export const getClientData = (clientData) => {
  const tempObj: any = { ...clientData };
  tempObj.clientType = tempObj?.ClientType?.ID
    ? {
        label: tempObj?.ClientType?.Name,
        value: tempObj?.ClientType?.ID,
      }
    : null;
  tempObj.clientAdmin = tempObj?.ClientAdmin?.ID
    ? {
        label:
          (tempObj?.ClientAdmin?.first_name || "") +
          " " +
          (tempObj?.ClientAdmin?.last_name || ""),
        value: tempObj?.ClientAdmin?.ID,
      }
    : null;

  tempObj.rsslSupportUser = tempObj?.RsslSupportUser?.ID
    ? {
        label:
          (tempObj?.RsslSupportUser?.first_name || "") +
          " " +
          (tempObj?.RsslSupportUser?.last_name || ""),
        value: tempObj?.RsslSupportUser?.ID,
      }
    : null;

  tempObj.PhysicalAddress.country =
    tempObj?.PhysicalAddress?.CountryID &&
    tempObj?.PhysicalAddress?.Country?.Name
      ? {
          label: tempObj?.PhysicalAddress?.Country?.Name,
          value: tempObj?.PhysicalAddress?.CountryID,
        }
      : null;

  tempObj.PhysicalAddress.state =
    tempObj?.PhysicalAddress?.StateID && tempObj?.PhysicalAddress?.State?.Name
      ? {
          label: tempObj?.PhysicalAddress?.State?.Name,
          value: tempObj?.PhysicalAddress?.StateID,
        }
      : null;

  tempObj.PhysicalAddress.Zipcode = tempObj?.PhysicalAddress?.Zipcode || "";

  tempObj.MailingAddress.country =
    tempObj?.MailingAddress?.CountryID && tempObj?.MailingAddress?.Country?.Name
      ? {
          label: tempObj?.MailingAddress?.Country?.Name,
          value: tempObj?.MailingAddress?.CountryID,
        }
      : null;

  tempObj.MailingAddress.state =
    tempObj?.MailingAddress?.StateID && tempObj?.MailingAddress?.State?.Name
      ? {
          label: tempObj?.MailingAddress?.State?.Name,
          value: tempObj?.MailingAddress?.StateID,
        }
      : null;

  tempObj.MailingAddress.Zipcode = tempObj?.MailingAddress?.Zipcode || "";

  return tempObj;
};

export const updateClientPayload = (clientData) => {
  const payload: any = { ...clientData };

  if (clientData.clientType)
    payload["ClientTypeID"] = clientData.clientType.value;
  if (clientData.clientAdmin)
    payload["ClientAdminID"] = clientData.clientAdmin.value;
  if (clientData.rsslSupportUser)
    payload["RsslSupportUserID"] = clientData.rsslSupportUser.value;

  if (clientData.MailingAddress.country)
    payload["MailingAddress"]["CountryID"] =
      clientData.MailingAddress.country.value;
  if (clientData.MailingAddress.state)
    payload["MailingAddress"]["StateID"] =
      clientData.MailingAddress.state.value;

  payload["MailingAddress"]["Zipcode"] =
    Number(clientData.MailingAddress.Zipcode) || 0;

  if (clientData.PhysicalAddress.country)
    payload["PhysicalAddress"]["CountryID"] =
      clientData.PhysicalAddress.country.value;
  if (clientData.PhysicalAddress.state)
    payload["PhysicalAddress"]["StateID"] =
      clientData.PhysicalAddress.state.value;

  payload["PhysicalAddress"]["Zipcode"] =
    Number(clientData.PhysicalAddress.Zipcode) || 0;

  const pick1 = ["Name", "Code", "LegalName", "ClientTypeID"];
  const pick2 = ["PhysicalAddress", "MailingAddress", "Company", "Meta"];
  const pick3 = ["LogoUrl", "Tenant", "ClientAdminID", "RsslSupportUserID"];
  const pick4 = ["DeactivationReason", "IsActive"];

  const pick = [...pick1, ...pick2, ...pick3, ...pick4];

  return include(payload, pick);
};
