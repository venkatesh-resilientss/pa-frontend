import { useEffect, useState } from "react";

import PayrollCreateClient from "components/MyProject/Clients/CreateClient";
import CreateClient from "@/components/clients/CreateClient";

import { ClientsService } from "services";

const clientService = new ClientsService();

function Index({ router }) {
  const { isReady, query } = router;
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
  const [clientData, setClientData] = useState(defaultClientData);

  useEffect(() => {
    const getSoftwares = async () => {
      const resp = await clientService.getSoftwares();

      const softwaresData = (Array.isArray(resp) ? resp : []).map(
        (el) => el.ID
      );
      const Softwares = query?.softwares
        .split(",")
        .filter((e) => softwaresData.includes(Number(e)))
        .map((e) => Number(e));

      if (Softwares.length > 0) setClientData({ ...clientData, Softwares });
      else router.replace("/clients");
    };
    if (
      router.isReady &&
      query?.softwares?.trim() &&
      clientData.Softwares.length === 0
    )
      getSoftwares();
    else if (router.isReady && !(query?.softwares || "")?.trim())
      router.replace("/clients");
  }, [isReady, query, query.softwares]);

  return (
    <div>
      {clientData.Softwares.length === 0 ||
      (clientData.Softwares.length === 1 && clientData.Softwares[0] === 1) ? (
        <CreateClient {...{ router, clientData, setClientData }} />
      ) : (
        <PayrollCreateClient />
      )}
    </div>
  );
}

export default Index;
