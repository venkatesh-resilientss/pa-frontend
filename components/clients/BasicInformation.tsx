import React, { useState } from "react";
import useSWR from "swr";

import FormFields from "@/components/clients/FormFields";

import { ClientsService } from "services";

const clientService = new ClientsService();

export default function BasicInformation(props: any) {
  const { step } = props;
  const [err, setErr] = useState(false);

  const fields = [
    {
      lb: "Client Name",
      ph: "Enter Client Name",
      typ: "text",
      vl: "Name",
      err: "Enter Client Name",
    },
    {
      lb: "Client Code",
      ph: "Enter Client Code",
      typ: "text",
      vl: "Code",
      err: "Enter Client Code",
    },
    {
      lb: "Client Legal Name (If different)",
      ph: "Enter Legal Name",
      typ: "text",
      vl: "LegalName",
      err: "",
    },
    {
      lb: "Client Type",
      ph: "Select",
      typ: "select",
      vl: "clientType",
      err: "Select Client Type",
    },
  ];

  const { data } = useSWR("ClientTypes", () => clientService.getClientTypes());

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadOptions = (value, lb) => {
    return clientService.getClientTypes().then((res) => {
      return [...res].map((e) => {
        return { label: e.Name, value: e.ID };
      });
    });
  };

  if (step !== 1) return <></>;
  return (
    <div>
      <p className="text-black f-20 fw-600">Basic Information</p>

      <FormFields {...props} {...{ fields, data, loadOptions, err, setErr }} />
    </div>
  );
}
