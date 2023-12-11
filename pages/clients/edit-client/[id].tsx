import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap-button-loader";

import ClientTabs from "@/components/clients/ClientTabs";

import { ClientsService } from "services";

function Clients() {
  const router = useRouter();
  const clientService = new ClientsService();
  const [isEditing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const defaultClientData: any = {
    SoftwareID: "",

    Name: "",
    Code: "",
    LegalName: "",
    clientType: null,
    ClientTypeID: 0,

    PhysicalAddress: {
      Line1: "",
      Line2: "",
      CityName: "",
      state: null,
      country: null,
      StateID: 0,
      CountryID: 0,
      Zipcode: "",
    },
    MailingAddress: {
      Line1: "",
      Line2: "",
      CityName: "",
      state: null,
      country: null,
      StateID: 0,
      CountryID: 0,
      Zipcode: "",
    },

    Company: {
      PrimaryContact: {
        FullName: "",
        Title: "",
        OfficePhone: "",
        CellPhone: "",
        EmailID: "",
      },
      SecondaryContact: {
        FullName: "",
        Title: "",
        OfficePhone: "",
        CellPhone: "",
        EmailID: "",
      },
    },

    Meta: { ClientFile: [] },

    LogoUrl: "",
    Tenant: {
      Slug: "",
    },
    clientAdmin: null,
    ClientAdminID: 0,
    rsslSupportUser: null,
    RsslSupportUserID: 0,
  };
  const [clientData, setClientData] = useState(defaultClientData);

  useEffect(() => {
    const getClientDetails = async () => {
      try {
        const resp = await clientService.getClientDetails(
          Number(router.query.id)
        );
        const tempObj: any = { ...clientData, ...resp?.client };
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
          resp?.mailing_address?.country_name
            ? {
                label: resp?.mailing_address?.country_name,
                value: tempObj?.PhysicalAddress?.CountryID,
              }
            : null;

        tempObj.PhysicalAddress.state =
          tempObj?.PhysicalAddress?.StateID && resp?.mailing_address?.state_name
            ? {
                label: resp?.mailing_address?.state_name,
                value: tempObj?.PhysicalAddress?.StateID,
              }
            : null;

        tempObj.MailingAddress.country =
          tempObj?.MailingAddress?.CountryID &&
          resp?.mailing_address?.country_name
            ? {
                label: resp?.mailing_address?.country_name,
                value: tempObj?.MailingAddress?.CountryID,
              }
            : null;

        tempObj.MailingAddress.state =
          tempObj?.MailingAddress?.StateID && resp?.mailing_address?.state_name
            ? {
                label: resp?.mailing_address?.state_name,
                value: tempObj?.MailingAddress?.StateID,
              }
            : null;
        tempObj.Company.PrimaryContact.EmailID =
          resp?.primary_contactID?.email_id || "";
        tempObj.Company.SecondaryContact.EmailID =
          resp?.secondary_contactID?.email_id || "";
        setClientData(tempObj);
      } catch (e) {
        toast.error(e?.error || e || "Error");
      }
    };
    if (Number(router.query.id)) getClientDetails();
  }, [router.query.id]);

  const handleEdit = async () => {
    if (isEditing) {
      // form submission
      setLoading(true);
      try {
        const payload = { ...clientData };
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
        if (clientData.MailingAddress.Zipcode)
          payload["MailingAddress"]["Zipcode"] =
            Number(clientData.MailingAddress.Zipcode) || 0;

        if (clientData.PhysicalAddress.country)
          payload["PhysicalAddress"]["CountryID"] =
            clientData.PhysicalAddress.country.value;
        if (clientData.PhysicalAddress.state)
          payload["PhysicalAddress"]["StateID"] =
            clientData.PhysicalAddress.state.value;
        if (clientData.PhysicalAddress.Zipcode)
          payload["PhysicalAddress"]["Zipcode"] =
            Number(clientData.PhysicalAddress.Zipcode) || 0;
        await clientService.editClient(Number(router.query.id), payload);
        setEditing(false);
        setLoading(false);
        toast.success("Client Updated Successfully");
      } catch (e) {
        setLoading(false);
        toast.error(e?.error || e || "Error");
      }
    } else {
      setEditing(true);
    }
  };

  return (
    <>
      {clientData?.ID && (
        <div style={{ fontFamily: "Segoe UI" }} className="p-4 text-black">
          <div className="d-flex justify-content-between">
            <div className="d-flex gap-1">
              {clientData?.LogoUrl ? (
                <img
                  src={clientData?.LogoUrl || "/endamol.svg"}
                  width={50}
                  height={50}
                  className="rounded-circle"
                />
              ) : (
                <div className="img-div">
                  {(clientData?.Name || "").charAt(0).toUpperCase()}
                </div>
              )}

              <div>
                <div className="fw-bold f-20">{clientData?.Name}</div>
                <div className="f-12">
                  {clientData?.Tenant?.Slug &&
                    `${clientData?.Tenant?.Slug}.${process.env.NEXT_PUBLIC_REDIRECT}`}
                  {/* | Client Admin Name | Client Admin Email */}
                </div>
              </div>
            </div>
            <div className="my-auto">
              <button
                onClick={() => router.push("/clients")}
                className="btn f-14"
              >
                Dismiss
              </button>
              <Button
                size="sm"
                color="info"
                onClick={handleEdit}
                loading={loading}
                disabled={loading}
                spinColor="#ffffff"
                className="px-3 py-2"
              >
                {isEditing ? "Save" : "Edit"}
              </Button>
            </div>
          </div>

          <hr style={{ height: "2px" }} />

          <ClientTabs
            {...{ clientData, setClientData, disabled: !isEditing, isEditing }}
          />
        </div>
      )}
    </>
  );
}

export default Clients;
