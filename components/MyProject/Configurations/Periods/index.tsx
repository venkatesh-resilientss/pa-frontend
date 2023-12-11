import AllPeriodsTable from "./AllPeriodsTable";
import DeletePeriodPopup from "./DeletePeriodPopup";
import PeriodsBulkUploadPopup from "./PeriodsBulkUploadPopup";
import { useState } from "react";
function Periods() {
  const [searchText, setSearchText] = useState("");
  const [rerender, setRerender] = useState(false);
  return (
    <div>
      <PeriodsBulkUploadPopup  {...{ setRerender, rerender }} />
      <DeletePeriodPopup />
      <AllPeriodsTable {...{ rerender, searchText, setSearchText }}/>
    </div>
  );
}

export default Periods;
