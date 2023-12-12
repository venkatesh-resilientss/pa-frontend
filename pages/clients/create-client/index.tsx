import { useEffect, useState } from "react";

import PayrollCreateClient from "components/MyProject/Clients/CreateClient";
import CreateClient from "@/components/clients/CreateClient";

import { SoftwaresModal } from "@/components/clients";

function Index({ router }) {
  const [show, setShow] = useState(true);

  const defaultClientData: any = {
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
    if (clientData.Softwares.length === 0) setShow(true);
  }, [clientData]);

  return (
    <div>
      {clientData.Softwares.length === 0 ||
      (clientData.Softwares.length === 1 &&
        clientData.Softwares.find(
          (e) => e.Name === "Production Accounting"
        )) ? (
        <CreateClient {...{ show, setShow, clientData, setClientData }} />
      ) : (
        <PayrollCreateClient />
      )}

      <SoftwaresModal
        {...{ router, show, setShow, clientData, setClientData }}
      />
    </div>
  );
}

export default Index;
