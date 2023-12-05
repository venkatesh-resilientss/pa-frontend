import ReactSelect from "react-select";
import { Col, Label } from "reactstrap";

function ProjectControl() {
  const options = [
    { value: "active", label: "Active" },
    { value: "in-active", label: "In-Active" },
  ];
  return (
    <div>
      <div style={{ fontSize: "20px", fontWeight: "600" }}>
        Deactivate Project Account
      </div>
      <div style={{ fontSize: "16px", fontWeight: "400" }}>
        Deactivating an account suspends the project&apos;s access to our system{" "}
      </div>
      <hr />

      <Col xl="5">
        <Label
          className="text-black"
          style={{ fontSize: "12px", fontWeight: "400" }}
        >
          HF FLAT INVOICE AMOUNT
        </Label>
        <ReactSelect options={options} />
      </Col>

      <div className="d-flex flex-column mt-1">
        <Label
          className="text-black"
          style={{ fontSize: "12px", fontWeight: "400" }}
        >
          Status{" "}
        </Label>
        <div className="d-flex gap-1">
          <div className="d-flex">
            <input type="radio" />
            <div>Active</div>
          </div>
          <div className="d-flex">
            <input type="radio" />
            <div>In-Active</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectControl;
