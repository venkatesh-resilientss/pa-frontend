import { useParams, useLocation } from "react-router-dom";
import ReactSelect from "react-select";
import { Button, Col, Input, Label } from "reactstrap";
import { useHistory } from "react-router-dom";

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
        All Series
      </div>

      <div className="d-flex justify-content-between">
        <div
          className="text-black"
          style={{ fontSize: "25px", fontWeight: "600" }}
        >
          Edit Series
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

      <Col xl="4">
        <Label
          className="text-black"
          style={{ fontSize: "12px", fontWeight: "400" }}
        >
          Series Name
        </Label>
        <Input defaultValue={location?.state?.row?.series_name} />
      </Col>

      <Col xl="4">
        <Label
          className="text-black"
          style={{ fontSize: "12px", fontWeight: "400" }}
        >
          Description
        </Label>
        <Input
          type="textarea"
          defaultValue={location?.state?.row?.description}
        />
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
            <input
              type="radio"
              checked={location?.state?.row?.status === "Active"}
            />
            <div>Active</div>
          </div>
          <div className="d-flex gap-1">
            <input
              type="radio"
              checked={location?.state?.row?.status === "In-Active"}
            />
            <div>In-Active</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
