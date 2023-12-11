import AllChartOfAccountsTable from "./AllChartOfAccountsTable";
import COABulkUploadPopup from "./COABulkUploadPopup";
import DeleteCOAPopup from "./DeleteCOAPopup";
import { useState } from "react";
function ChartOfAccounts() {
  const [searchText, setSearchText] = useState("");
  const [rerender, setRerender] = useState(false);
  return (
    <div>
      <COABulkUploadPopup {...{ setRerender, rerender }} />
      <DeleteCOAPopup />
      <AllChartOfAccountsTable {...{ rerender, searchText, setSearchText }} />
    </div>
  );
}

export default ChartOfAccounts;
