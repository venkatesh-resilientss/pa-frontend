import { Plus } from "react-feather";
import { hasAccess } from "@/commonFunctions/hasAccess";
import Link from "next/link";

export default function CreateBankButton({ user, cls }) {
  const hasPermission = hasAccess(
    user,
    "configuration_management",
    "create_configuration"
  );

  return (
    <>
      {hasPermission && (
        <Link href="/banks/add-bank">
          <button
            className={
              "btn btn-primary d-flex justify-content-between align-items-center gap-2 " +
              cls
            }
          >
            <Plus size={14} />
            Add Bank
          </button>
        </Link>
      )}
    </>
  );
}
