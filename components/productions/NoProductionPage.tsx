import CreateProductionButton from "@/components/productions/CreateProductionButton";

export default function NoProductionPage({ user }) {
  return (
    <div className="text-center nodataAvailable">
      <img
        src="/no_client_data_available.svg"
        alt="No clients available"
        className="w-m-100"
      />
      <p className="nodataAvailable">No Data available.</p>
      <h6 className="text-sm">
        Please create your first client to be able to work.
      </h6>

      <CreateProductionButton {...{ user }} cls="f-14 mx-auto" />
    </div>
  );
}
