import { useParams, useLocation } from "react-router-dom";
import { Button, Col, Input, Label } from "reactstrap";
import { useHistory } from "react-router-dom";
import useSWR from "swr";
import { DepartmentsService } from "@src/services";
import { useState } from "react";

function index() {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();

  const [activeStatus, setActiveStatus] = useState();

  const { data: departmentsData } = useSWR(["DEPARTMENT_DETAILS", id], () =>
    DepartmentsService.details(id)
  );

  return (
    <div style={{ fontFamily: "Segoe UI" }} className="overflow-auto">
      <div
        className="text-black"
        style={{ fontSize: "16px", fontWeight: "600" }}
      >
        All Departments
      </div>

      <div className="d-flex justify-content-between">
        <div
          className="text-black"
          style={{ fontSize: "25px", fontWeight: "600" }}
        >
          Edit Department
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
          Department Name
        </Label>
        <Input placeholder="Department" defaultValue={departmentsData?.Name} />
      </Col>

      <Col xl="4">
        <Label
          className="text-black"
          style={{ fontSize: "12px", fontWeight: "400" }}
        >
          Description
        </Label>
        <Input
          placeholder="Details about department"
          defaultValue={departmentsData?.Description}
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
              id="ex1-active"
              name="ex1"
              value={activeStatus}
              onChange={() => {
                setActiveStatus(true);
              }}
            />
            <div>Active</div>
          </div>
          <div className="d-flex gap-1">
            <input
              type="radio"
              name="ex1"
              id="ex1-inactive"
              value={activeStatus}
              onChange={() => {
                setActiveStatus(false);
              }}
            />
            <div>In-Active</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
