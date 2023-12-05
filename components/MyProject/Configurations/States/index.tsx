import AllStatesTable from "./AllStatesTable";
import DeleteStatePopup from "./DeleteStatePopup";
import StatesBulkUploadPopup from "./StatesBulkUploadPopup";

function States() {
  return (
    <div>
      <StatesBulkUploadPopup />
      <DeleteStatePopup />
      <AllStatesTable />
    </div>
  );
}

export default States;
