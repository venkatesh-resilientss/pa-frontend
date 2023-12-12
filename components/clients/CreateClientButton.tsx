import { useState } from "react";
import { Plus, Users } from "react-feather";

import { hasAccess } from "@/commonFunctions/hasAccess";
import { SoftwaresModal } from "@/components/clients";

export default function CreateClientButton({ router, user, cls }) {
  const [show, setShow] = useState(false);

  const hasPermission = hasAccess(user, "client_management", "create_client");

  return (
    <>
      {hasPermission && (
        <button
          className={
            "btn btn-primary d-flex justify-content-between align-items-center gap-2 " +
            cls
          }
          onClick={() => setShow(true)}
        >
          {cls ? <Plus size={14} /> : <Users size={14} />} Create Client
        </button>
      )}

      <SoftwaresModal {...{ router, show, setShow }} />
    </>
  );
}
