import React, { useEffect, useState } from "react";
import useSWR from "swr";

import FormFields from "@/components/clients/FormFields";

import { ClientsService } from "services";
import { bIFields } from "@/commonData";

const clientService = new ClientsService();

export default function BasicInformation(props: any) {
  const { step, setStep, errors } = props;
  const [err, setErr] = useState(false);

  useEffect(() => {
    if (errors) setErr(errors);
  }, [errors]);

  const fields = [...bIFields];

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

      <FormFields
        {...props}
        {...{ fields, data, loadOptions, err, setErr, setStep }}
      />
    </div>
  );
}
