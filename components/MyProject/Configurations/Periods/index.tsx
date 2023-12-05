import AllPeriodsTable from "./AllPeriodsTable";
import DeletePeriodPopup from "./DeletePeriodPopup";
import PeriodsBulkUploadPopup from "./PeriodsBulkUploadPopup";

function Periods() {
  return (
    <div>
      <PeriodsBulkUploadPopup />
      <DeletePeriodPopup />
      <AllPeriodsTable />
    </div>
  );
}

export default Periods;
