import { CreateClientButton } from "@/components/clients";

export default function NoClientPage({ router, user, typ }: any) {
  return (
    <div className="text-center nodataAvailable">
      <img
        src="/no_client_data_available.svg"
        alt="No clients available"
        className="w-m-100"
      />
      <p className="nodataAvailable">
        {typ === "Access Denied" ? typ : "No Data available."}
      </p>
      <h6 className="text-sm">
        {typ === "Access Denied"
          ? "Please contact support"
          : "Please create your first client to be able to work."}
      </h6>

      {typ !== "Access Denied" && (
        <CreateClientButton {...{ router, user }} cls="f-14 mx-auto" />
      )}
    </div>
  );
}
