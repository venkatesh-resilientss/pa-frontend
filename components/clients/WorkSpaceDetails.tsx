import React, { useEffect, useState } from "react";
import useSWR from "swr";

import FormFields from "@/components/clients/FormFields";

import { ClientsService } from "services";
import { wFields } from "@/commonData";

const clientService = new ClientsService();

export default function WorkSpaceDetails(props) {
  const { step, clientData, errors } = props;
  const [err, setErr] = useState(false);

  useEffect(() => {
    if (errors) setErr(errors);
  }, [errors]);

  const fields = [...wFields];

  const { data: users } = useSWR("Users", () =>
    clientData?.ID
      ? clientService.getClientUsers(
          clientData?.ID,
          `?limit=50&offset=0&is_active=true`
        )
      : null
  );
  const { data: supportUsers } = useSWR("Support Users", () =>
    clientService.getUsers(`?limit=50&offset=0&is_active=true`)
  );

  const data = [...(users?.data || [])]?.filter(
    (e) => e?.Role?.Code === "CLIENT_ADMIN"
  );
  const staffUsers = [...(supportUsers?.data || [])].map((e) => ({
    Name: e.name,
    ID: e.id,
  }));

  const loadOptions = (value, vl) => {
    if (vl === "rsslSupportUser")
      return clientService
        .getUsers(`?limit=50&offset=0&is_active=true&search=${value}`)
        .then((res) => {
          return [...(res?.data || [])].map((e) => {
            return { label: e?.name, value: e.id };
          });
        });
    else
      return clientService
        .getClientUsers(clientData?.ID, `?limit=50&offset=0&is_active=true`)
        .then((res) => {
          const getName = (e) =>
            (e?.first_name || "") + " " + (e?.last_name || "");

          return [...(res?.data || [])].map((e) => {
            return { label: getName(e), value: e.ID };
          });
        });
    // return new Promise((resolve) => setTimeout(() => resolve([]), 500));
  };

  const workSpaceProps = { ...props, data, staffUsers, loadOptions };

  if (step !== 5) return <></>;
  return (
    <div>
      <p className="text-black f-20 fw-600">Workspace</p>
      <FormFields {...workSpaceProps} {...{ fields, err, setErr }} cls={true} />
    </div>
  );
}
