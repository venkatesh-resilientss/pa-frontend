import AllPeriodsTable from "./AllPeriodsTable";
import DeletePeriodPopup from "./DeletePeriodPopup";

function Periods() {
  return (
    <div>
      <DeletePeriodPopup id={undefined} />
      <AllPeriodsTable />
    </div>
  );
}

export default Periods;
