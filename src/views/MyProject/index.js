import { Col, Row } from "reactstrap";
import InvoiceList from "../apps/invoice/list";
import DataTableWithButtons from "./Table";
import Table from "../apps/user/list/Table";

function index() {
  return (
    <div>
      <Table />

      <Row className="match-height">
        <Col>
          <DataTableWithButtons />
        </Col>
        <Col xs="12">
          <InvoiceList />
        </Col>
      </Row>
    </div>
  );
}

export default index;
