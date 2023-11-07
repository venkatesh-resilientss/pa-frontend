import { useParams, useLocation } from "react-router-dom";
import ReactSelect from "react-select";
import { Button, Col, Input, Label } from "reactstrap";
import { useHistory } from "react-router-dom";
import VendorAccordion from "./Accordion";

function index() {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();

  console.log("ID", location);
  return (
    <div style={{ fontFamily: "Segoe UI" }} className="overflow-auto">
      <div
        className="text-black"
        style={{ fontSize: "16px", fontWeight: "600" }}
      >
        All Vendors
      </div>

      <div className="d-flex justify-content-between">
        <div
          className="text-black"
          style={{ fontSize: "25px", fontWeight: "600" }}
        >
          Edit Vendor
        </div>
        <div className="d-flex gap-1">
          <Button onClick={() => history.goBack()} color="white" size="sm">
            Back
          </Button>
          <Button size="sm" color="info">
            Edit
          </Button>
        </div>
      </div>

      <hr style={{ height: "2px" }} />

      <VendorAccordion />
    </div>
  );
}

export default index;
