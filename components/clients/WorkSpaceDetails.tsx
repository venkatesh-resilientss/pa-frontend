import React, { useState } from "react";
import useSWR from "swr";

import FormFields from "@/components/clients/FormFields";

import { ClientsService } from "services";

const clientService = new ClientsService();

export default function WorkSpaceDetails(props) {
  const { step } = props;
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

  const { data } = useSWR("ClientAdmins", () =>
    clientService.getUsersByRole(1)
  );
  const { data: sUsers } = useSWR("SupportUsers", () =>
    clientService.getUsersByRole(2)
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadOptions = (value, vl) => {
    return clientService
      .getUsersByRole(vl.includes("clientAdmin") ? 1 : 2)
      .then((res) => {
        return [...(res || [])].map((e) => {
          return { label: e.Name, value: e.ID };
        });
      });
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
