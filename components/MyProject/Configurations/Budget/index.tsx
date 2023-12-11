import AllBudgetTable from "./AllBudgetTable";
import BudgetBulkUploadPopup from "./BudgetBulkUploadPopup";
import DeleteBudgetPopup from "./DeleteBudgetPopup";
import { useState } from "react";
function Budgets() {
  const [searchText, setSearchText] = useState("");
  const [rerender, setRerender] = useState(false);
  return (
    <div>
      <BudgetBulkUploadPopup {...{rerender,setRerender}} />
      <DeleteBudgetPopup />
      <AllBudgetTable {...{ rerender, searchText, setSearchText }} />
    </div>
  );
}

export default Budgets;
