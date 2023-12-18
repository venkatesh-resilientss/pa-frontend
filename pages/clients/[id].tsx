import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap-button-loader";

import { hasAccess } from "@/commonFunctions/hasAccess";
import ClientTabs from "@/components/clients/ClientTabs";

import { ClientsService } from "services";
import { allFields } from "@/commonData";
import { getClientData, updateClientPayload } from "@/commonFunctions/payloads";
import NoClientPage from "@/components/clients/NoClientPage";

function Clients({ router, user }) {
  const clientService = new ClientsService();
  const [isEditing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState<any>(true);
  const [err, setErr] = useState(false);

  const defaultClientData: any = {
    logoFile: null,
    Softwares: [],

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
        LastName: "",
        FirstName: "",
        MiddleName: "",
        Title: "",
        OfficePhone: "",
        CellPhone: "",
        EmailID: "",
      },
      SecondaryContact: {
        LastName: "",
        FirstName: "",
        MiddleName: "",
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
  const [clientData, setClientData] = useState<any>(defaultClientData);

  useEffect(() => {
    const getClientDetails = async () => {
      try {
        setLoad(true);
        const resp = await clientService.getClientDetails(
          Number(router.query.id)
        );
        setClientData(getClientData({ ...clientData, ...resp }));
        setLoad(false);
      } catch (e) {
        setLoad(false);
        toast.error(e?.error || e || "Error");
      }
    };
    if (Number(router.query.id)) getClientDetails();
  }, [router.query.id]);

  const hasPermission = hasAccess(user, "client_management", "edit_client");
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const handleEdit = async () => {
    if (isEditing) {
      // form submission
      let tempErr = false;
      const getObjectValue = (obj, path) => {
        const keys = path.split(".");

        return keys.reduce((acc, key) => {
          return acc ? acc[key] : undefined;
        }, obj);
      };

      [...(allFields || [])].map((el) => {
        if (
          el.err &&
          (el.typ === "select"
            ? !getObjectValue(clientData, el.vl)
            : (el.vl === "Company.SecondaryContact.EmailID" &&
                getObjectValue(clientData, el.vl).toString().trim() &&
                (!emailRegex.test(
                  getObjectValue(clientData, el.vl).toString().trim()
                ) ||
                  getObjectValue(clientData, el.vl).toString().trim() ===
                    getObjectValue(clientData, "Company.PrimaryContact.EmailID")
                      .toString()
                      .trim())) ||
              (el.vl === "Company.PrimaryContact.EmailID" &&
                !emailRegex.test(getObjectValue(clientData, el.vl))) ||
              (el.vl === "Tenant.Slug" &&
                !new RegExp(/^[a-z0-9-_]{2,}$/).test(
                  getObjectValue(clientData, el.vl)
                )) ||
              (el.vl !== "Company.SecondaryContact.EmailID" &&
                !getObjectValue(clientData, el.vl).toString().trim()))
        )
          tempErr = true;
      });

      if (!clientData?.IsActive && !clientData?.DeactivationReason)
        tempErr = true;

      setErr(tempErr);
      if (tempErr) {
        toast.error("Please check for invalid fields");
        return;
      }
      let url: any = clientData?.LogoUrl || "";
      try {
        setLoading(true);
        if (clientData.logoFile) {
          const formData = new FormData();
          formData.append("file", clientData.logoFile);
          formData.append("name", "uploadedFile");

          const fileUpload = await clientService.s3upload(formData);
          url = fileUpload.url;
        }

        const payload = updateClientPayload({ ...clientData, LogoUrl: url });

        await clientService.editClient(Number(router.query.id), payload);
        setEditing(false);
        setLoading(false);
        router.push(`/clients`);
        toast.success("Client Updated Successfully");
      } catch (e) {
        if (clientData.logoFile && !url) toast.error("Error Saving Logo");
        toast.error(e?.error || e || "Error");
        setLoading(false);
      }
    } else {
      if (hasPermission) setEditing(true);
      else toast.error("Access Denied");
    }
  };

  const hasViewPermission = hasAccess(
    user,
    "client_management",
    "view_all_clients"
  );
  return (
    <>
      {load ? (
        <></>
      ) : user && !hasViewPermission ? (
        <NoClientPage
          {...{ router, user }}
          typ={user && !hasViewPermission ? "Access Denied" : ""}
        />
      ) : (
        <div className="p-4 text-black">
          <div className="d-flex justify-content-between">
            <div className="d-flex gap-1">
              {clientData?.LogoUrl ? (
                <img
                  src={clientData?.LogoUrl || "/endamol.svg"}
                  width={48}
                  height={48}
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

          <hr />

          <ClientTabs
            {...{ clientData, setClientData, disabled: !isEditing, isEditing }}
            {...{ router }}
            errors={err}
          />
        </div>
      )}
    </>
  );
}

export default Clients;
