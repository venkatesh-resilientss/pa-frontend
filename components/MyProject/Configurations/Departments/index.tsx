import AllDepartmentsTable from "./AllDepartmentsTable";
import DepartmentBulkUploadPopup from "./DepartmentBulkUploadPopup";
import { useState } from "react";
function Department() {
  const [rerender, setRerender] = useState(false);
  return (
    <div>
      <DepartmentBulkUploadPopup {...{ setRerender, rerender }} />
      <AllDepartmentsTable {...{ rerender}} />
    </div>
  );
}

export default Department;
