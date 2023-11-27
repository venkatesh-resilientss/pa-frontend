import { Row } from "reactstrap";
import AllDepartmentsTable from "./AllDepartmentsTable";
import DeleteClientPopup from "../../Clients/DeleteClientPopup";
import DeleteDepartmentPopup from "./DeleteDepartmentPopup";
import DepartmentBulkUploadPopup from "./DepartmentBulkUploadPopup";

function Department() {
  return (
    <div>
      <DepartmentBulkUploadPopup />
      <DeleteDepartmentPopup id={undefined} />
      <Row>
        <AllDepartmentsTable />
      </Row>
    </div>
  );
}

export default Department;
