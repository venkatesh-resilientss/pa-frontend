import AllChartOfAccountsTable from "./AllChartOfAccountsTable";
import COABulkUploadPopup from "./COABulkUploadPopup";
import DeleteCOAPopup from "./DeleteCOAPopup";

function ChartOfAccounts() {
  return (
    <div>
      <COABulkUploadPopup />
      <DeleteCOAPopup />
      <AllChartOfAccountsTable />
    </div>
  );
}

export default ChartOfAccounts;
