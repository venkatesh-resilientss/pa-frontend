import { Row } from "reactstrap";
import AllDepartmentsTable from "./AllDepartmentsTable";
import DeleteDepartmentPopup from "./DeleteDepartmentPopup";
import DepartmentBulkUploadPopup from "./DepartmentBulkUploadPopup";

function Department() {
  return (
    <div>
      <DepartmentBulkUploadPopup />
      <DeleteDepartmentPopup />
      <Row>
        <AllDepartmentsTable />
      </Row>
    </div>
  );
}

export default Department;
