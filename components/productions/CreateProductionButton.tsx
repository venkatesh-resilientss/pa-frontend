import { Plus } from "react-feather";
import { BsCameraVideo } from "react-icons/bs";
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
        <Link href="/productions/create-production">
          <button
            className={
              "btn btn-primary d-flex justify-content-between align-items-center gap-2 " +
              cls
            }
          >
            {cls ? (
              <Plus size={14} />
            ) : (
              <BsCameraVideo size={14} className="mt-2px" />
            )}{" "}
            Create Production
          </button>
        </Link>
      )}
    </>
  );
}
