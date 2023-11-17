import { Row } from "reactstrap";
import AllDepartmentsTable from "./AllDepartmentsTable";
import DeleteClientPopup from "../../Clients/DeleteClientPopup";
import DeleteDepartmentPopup from "./DeleteDepartmentPopup";

function Department() {
  return (
    <div>
      <DeleteDepartmentPopup id={undefined} />
      <Row>
        <AllDepartmentsTable />
      </Row>
    </div>
  );
}

export default Department;
