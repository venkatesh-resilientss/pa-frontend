import AllDepartmentsTable from "./AllDepartmentsTable";
import DeleteDepartmentPopup from "./DeleteDepartmentPopup";
import DepartmentBulkUploadPopup from "./DepartmentBulkUploadPopup";
import { useState } from "react";
function Department() {
  const [searchText, setSearchText] = useState("");
  const [rerender, setRerender] = useState(false);
  return (
    <div>
      <DepartmentBulkUploadPopup {...{ setRerender, rerender }} />
      <DeleteDepartmentPopup />
        <AllDepartmentsTable {...{ rerender, searchText, setSearchText }} />
    </div>
  );
}

export default Department;
