import { Button } from "reactstrap";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import ClientTabs from "@/components/clients/ClientTabs";

import { ClientsService } from "services";

function Clients() {
  const router = useRouter();
  const clientService = new ClientsService();

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
              label: tempObj?.ClientAdmin?.Name,
              value: tempObj?.ClientAdmin?.ID,
            }
          : null;
        tempObj.rsslSupportUser = tempObj?.RsslSupportUser?.ID
          ? {
              label: tempObj?.RsslSupportUser?.Name,
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

  return (
    <>
      {clientData?.Name ? (
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
            <div className="d-flex gap-1" style={{ height: "30px" }}>
              <Button
                onClick={() => router.push("/clients")}
                color="white"
                size="sm"
              >
                Dismiss
              </Button>
              {/* <Button size="sm" color="info">
                Save
              </Button> */}
            </div>
          </div>

          <hr style={{ height: "2px" }} />

          <ClientTabs {...{ clientData, setClientData }} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Clients;
