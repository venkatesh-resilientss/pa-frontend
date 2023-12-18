import React, { useEffect, useState } from "react";
import useSWR from "swr";

import FormFields from "@/components/clients/FormFields";

import { ClientsService } from "services";
import { iFields, pFields } from "@/commonData";

const clientService = new ClientsService();

export default function Address(props) {
  const { step, clientData, errors } = props;
  const [err, setErr] = useState(false);

  useEffect(() => {
    if (errors) setErr(errors);
  }, [errors]);
  const physicalFields = [...pFields];

  const invoiceFields = [...iFields];

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
      return clientService.getCountries(value).then((res) => {
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
