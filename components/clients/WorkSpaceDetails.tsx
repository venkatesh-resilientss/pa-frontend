import React, { useState } from "react";
import useSWR from "swr";

import FormFields from "@/components/clients/FormFields";

import { ClientsService } from "services";

const clientService = new ClientsService();

export default function WorkSpaceDetails(props) {
  const { step, clientData } = props;
  const [err, setErr] = useState(false);

  const fields = [
    {
      lb: "Logo",
      ph: "Choose file",
      typ: "file",
      vl: "LogoUrl",
      err: "",
    },
    {
      lb: "Domain",
      ph: "Enter Client name",
      typ: "domain",
      vl: "Tenant.Slug",
      err: "Enter Client name",
    },
    {
      lb: "Client Admin",
      ph: "Select Admin",
      typ: "select",
      vl: "clientAdmin",
      err: "",
    },
    {
      lb: "RSSL Support User",
      ph: "Select Admin",
      typ: "select",
      vl: "rsslSupportUser",
      err: "",
    },
  ];

  const { data: users } = useSWR("Users", () =>
    clientData
      ? clientService.getClientUsers(clientData?.ID, `?limit=50&offset=0&is_active:true`)
      : null
  );
  const { data: supportUsers } = useSWR("Support Users", () =>
    clientService.getUsers(`?limit=50&offset=0&is_active:true`)
  );

  const data = [...(users?.data || [])]?.filter(
    (e) => e?.Role?.Code === "CLIENT_ADMIN"
  );
  const sUsers = [...(supportUsers?.data || [])]
    ?.filter((e) => e.IsStaffUser)
    .map((e) => ({ Name: e.adminName, ID: e.id }));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadOptions = (value, vl) => {
    if (vl === "rsslSupportUser")
      return clientService
        .getClientUsers(clientData?.ID, `?limit=50&offset=0&is_active:true`)
        .then((res) => {
          const getName = (e) =>
            (e?.first_name || "") + " " + (e?.last_name || "");

          return [...(res?.data || [])].map((e) => {
            return { label: getName(e), value: e.ID };
          });
        });
    else
      return clientService.getUsers(`?limit=50&offset=0&is_active:true`).then((res) => {
        return [...(res?.data || [])].map((e) => {
          return { label: e?.adminName, value: e.id };
        });
      });
    // return new Promise((resolve) => setTimeout(() => resolve([]), 500));
  };

  const workSpaceProps = { ...props, data, sUsers, loadOptions };

  if (step !== 5) return <></>;
  return (
    <div>
      <p className="text-black f-20 fw-600">Workspace</p>
      <FormFields {...workSpaceProps} {...{ fields, err, setErr }} cls={true} />
    </div>
  );
}
