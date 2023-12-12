import { Plus, Users } from "react-feather";

import { hasAccess } from "@/commonFunctions/hasAccess";
import Link from "next/link";

export default function CreateProductionButton({ user, cls }) {
  const hasPermission = hasAccess(
    user,
    "production_management",
    "create_production"
  );

  return (
    <>
      {hasPermission && (
        <Link href="/create-production">
          <button
            className={
              "btn btn-primary d-flex justify-content-between align-items-center gap-2 " +
              cls
            }
          >
            {cls ? <Plus size={14} /> : <Users size={14} />} Create Production
          </button>
        </Link>
      )}
    </>
  );
}
