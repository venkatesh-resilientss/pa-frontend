import AllSetsTable from "./AllSetsTable";
import DeleteSetPopup from "./DeleteSetPopup";
import SetsBulkUploadPopup from "./SetsBulkUploadPopup";

function Sets() {
  return (
    <div>
      <SetsBulkUploadPopup />
      <DeleteSetPopup />
      <AllSetsTable />
    </div>
  );
}

export default Sets;
