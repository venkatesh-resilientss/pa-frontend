import AllSetsTable from "./AllSetsTable";
import DeleteSetPopup from "./DeleteSetPopup";
import SetsBulkUploadPopup from "./SetsBulkUploadPopup";

function Sets() {
  return (
    <div>
      <SetsBulkUploadPopup />
      <DeleteSetPopup id={undefined} />
      <AllSetsTable />
    </div>
  );
}

export default Sets;
