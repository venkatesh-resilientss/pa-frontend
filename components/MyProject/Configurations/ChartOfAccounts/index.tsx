import AllChartOfAccountsTable from "./AllChartOfAccountsTable";
import COABulkUploadPopup from "./COABulkUploadPopup";
import { useState } from "react";
function ChartOfAccounts() {
  const [rerender, setRerender] = useState(false);
  return (
    <div>
      <COABulkUploadPopup {...{ setRerender, rerender }} />
      <AllChartOfAccountsTable {...{ rerender}} />
    </div>
  );
}

export default ChartOfAccounts;
