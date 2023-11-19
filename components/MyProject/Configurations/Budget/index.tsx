import AllBudgetTable from "./AllBudgetTable";
import BudgetBulkUploadPopup from "./BudgetBulkUploadPopup";
import DeleteBudgetPopup from "./DeleteBudgetPopup";

function Budgets() {
  return (
    <div>
      <BudgetBulkUploadPopup />
      <DeleteBudgetPopup />
      <AllBudgetTable />
    </div>
  );
}

export default Budgets;
