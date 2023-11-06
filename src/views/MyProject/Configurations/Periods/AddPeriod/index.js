import ReactSelect from "react-select";
import { Button, Col, Input, Label } from "reactstrap";
import { useHistory } from "react-router-dom";

function index() {
  const history = useHistory();
  return (
    <div style={{ fontFamily: "Segoe UI" }} className="overflow-auto">
      <div
        className="text-black"
        style={{ fontSize: "16px", fontWeight: "600" }}
      >
        All Periods
      </div>

      <div className="d-flex justify-content-between">
        <div
          className="text-black"
          style={{ fontSize: "25px", fontWeight: "600" }}
        >
          Add New Period
        </div>
        <div className="d-flex gap-1">
          <Button onClick={() => history.goBack()} color="white" size="sm">
            Dismiss
          </Button>
          <Button size="sm" color="info">
            Save
          </Button>
        </div>
      </div>

      <hr style={{ height: "2px" }} />

      <Col xl="4">
        <Label
          className="text-black"
          style={{ fontSize: "12px", fontWeight: "400" }}
        >
          Period Name
        </Label>
        <Input placeholder="Tax Code" />
      </Col>

      <Col xl="4" className="d-flex gap-1">
        <Col xl="6">
          <Label
            className="text-black"
            style={{ fontSize: "12px", fontWeight: "400" }}
          >
            Start Date
          </Label>
          <Input type="date" />
        </Col>

        <Col xl="6">
          {" "}
          <Label
            className="text-black"
            style={{ fontSize: "12px", fontWeight: "400" }}
          >
            End Date
          </Label>
          <Input type="date" />
        </Col>
      </Col>

      <Col xl="4">
        <Label
          className="text-black"
          style={{ fontSize: "12px", fontWeight: "400" }}
        >
          Description
        </Label>
        <Input type="textarea" placeholder=" Description" />
      </Col>

      <div className="d-flex flex-column mt-1">
        <Label
          className="text-black"
          style={{ fontSize: "12px", fontWeight: "400" }}
        >
          Status{" "}
        </Label>
        <div className="d-flex gap-1">
          <div className="d-flex gap-1">
            <input type="radio" />
            <div>Active</div>
          </div>
          <div className="d-flex gap-1">
            <input type="radio" />
            <div>In-Active</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
