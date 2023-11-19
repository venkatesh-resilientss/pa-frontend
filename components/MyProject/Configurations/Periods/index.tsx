import AllPeriodsTable from "./AllPeriodsTable";
import DeletePeriodPopup from "./DeletePeriodPopup";
import PeriodsBulkUploadPopup from "./PeriodsBulkUploadPopup";

function Periods() {
  return (
    <div>
      <PeriodsBulkUploadPopup />
      <DeletePeriodPopup id={undefined} />
      <AllPeriodsTable />
    </div>
  );
}

export default Periods;
