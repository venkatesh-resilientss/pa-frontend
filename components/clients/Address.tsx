import React, { useEffect, useState } from "react";
import useSWR from "swr";

import FormFields from "@/components/clients/FormFields";

import { ClientsService } from "services";

const clientService = new ClientsService();

export default function Address(props) {
  const { step, clientData } = props;
  const [err, setErr] = useState(false);

  const physicalFields = [
    {
      lb: "Address Line 1",
      ph: "Enter Address",
      typ: "text",
      vl: "PhysicalAddress.Line1",
      err: "Enter Address",
    },
    {
      lb: "Address Line 2",
      ph: "Enter Address",
      typ: "text",
      vl: "PhysicalAddress.Line2",
      err: "",
    },
    {
      lb: "City",
      ph: "Select City",
      typ: "text",
      vl: "PhysicalAddress.CityName",
      err: "Enter City Name",
    },
    {
      lb: "Country",
      ph: "Select Country",
      typ: "select",
      vl: "PhysicalAddress.country",
      err: "Select Country",
    },
    {
      lb: "State",
      ph: "Select State",
      typ: "select",
      vl: "PhysicalAddress.state",
      err: "Select State",
    },
    {
      lb: "Zip Code",
      ph: "Enter Zip Code",
      typ: "number",
      vl: "PhysicalAddress.Zipcode",
      err: "Enter Zip Code",
    },
  ];

  const invoiceFields = [
    {
      lb: "Address Line 1",
      ph: "Enter Address",
      typ: "text",
      vl: "MailingAddress.Line1",
      err: "Enter Address",
    },
    {
      lb: "Address Line 2",
      ph: "Enter Address",
      typ: "text",
      vl: "MailingAddress.Line2",
      err: "",
    },
    {
      lb: "City",
      ph: "Select City",
      typ: "text",
      vl: "MailingAddress.CityName",
      err: "Enter City Name",
    },
    {
      lb: "Country",
      ph: "Select Country",
      typ: "select",
      vl: "MailingAddress.country",
      err: "Select Country",
    },
    {
      lb: "State",
      ph: "Select State",
      typ: "select",
      vl: "MailingAddress.state",
      err: "Select State",
    },
    {
      lb: "Zip Code",
      ph: "Enter Zip Code",
      typ: "number",
      vl: "MailingAddress.Zipcode",
      err: "Enter Zip Code",
    },
  ];

  const getObjectValue = (obj, path) => {
    const keys = path.split(".");

    return keys.reduce((acc, key) => {
      return acc ? acc[key] : undefined;
    }, obj);
  };

  const { data } = useSWR("Countries", () => clientService.getCountries());
  const { data: pStates, mutate: pMutate } = useSWR("States", () =>
    clientService.getStates(
      getObjectValue(clientData, "PhysicalAddress.country")?.value || 0
    )
  );
  const { data: iStates, mutate: iMutate } = useSWR("States", () =>
    clientService.getStates(
      getObjectValue(clientData, "MailingAddress.country")?.value || 0
    )
  );

  useEffect(() => {
    pMutate();
  }, [clientData?.PhysicalAddress?.country]);
  useEffect(() => {
    iMutate();
  }, [clientData?.MailingAddress?.country]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadOptions = (value, vl) => {
    if (vl.includes(".country"))
      return clientService.getCountries().then((res) => {
        return [...(res?.data || [])].map((e) => {
          return { label: e.Name, value: e.ID };
        });
      });
    else if (vl.includes(".state"))
      return clientService
        .getStates(
          getObjectValue(clientData, `${vl.replace(".state", ".country")}`)
            ?.value || 0
        )
        .then((res) => {
          return [...res].map((e) => {
            return { label: e.Name, value: e.ID };
          });
        });
  };

  const dt = data?.data || [];
  const addressProps = { ...props, data: dt, pStates, iStates, loadOptions };

  if (step !== 2) return <></>;
  return (
    <div>
      <p className="text-black f-20 fw-600">Physical Address</p>
      <FormFields
        {...addressProps}
        {...{ err, setErr }}
        fields={physicalFields}
        hideBtns={true}
      />

      <p className="text-black f-20 fw-600">Mailing/Invoice Address</p>
      <FormFields
        {...addressProps}
        {...{ err, setErr }}
        fields={invoiceFields}
        validate={physicalFields}
      />
    </div>
  );
}
