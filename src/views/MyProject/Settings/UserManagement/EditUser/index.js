import ReactSelect from "react-select";
import { Button, Col, Input, Label, div } from "reactstrap";
import { useHistory } from "react-router-dom";
import { useState } from "react";

function index() {
  const history = useHistory();

  const [restricted, setRestricted] = useState(false);

  return (
    <div
      style={{ fontFamily: "Segoe UI" }}
      className="overflow-auto text-black "
    >
      <div
        className="text-black"
        style={{ fontSize: "16px", fontWeight: "600" }}
      >
        User Management
      </div>

      <div className="d-flex justify-content-between">
        <div
          className="text-black"
          style={{ fontSize: "25px", fontWeight: "600" }}
        >
          Edit User
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

      <div className="d-flex gap-1">
        <Col xl="4">
          <Label
            className="text-black"
            style={{ fontSize: "12px", fontWeight: "400" }}
          >
            Last Name
          </Label>
          <Input placeholder="Enter  Last Name" />
        </Col>
        <Col xl="4">
          <Label
            className="text-black"
            style={{ fontSize: "12px", fontWeight: "400" }}
          >
            First Name
          </Label>
          <Input placeholder="Enter  First Name" />
        </Col>
      </div>

      <div className="d-flex gap-1">
        <Col xl="4">
          <Label
            className="text-black"
            style={{ fontSize: "12px", fontWeight: "400" }}
          >
            Middle Initial Name
          </Label>
          <Input placeholder="Enter  Middle Initial Name" />
        </Col>

        <Col xl="4">
          <Label
            className="text-black"
            style={{ fontSize: "12px", fontWeight: "400" }}
          >
            Email Id
          </Label>
          <Input placeholder="Enter Email Id" type="email" />
        </Col>
      </div>

      <div className="d-flex flex-column mt-1">
        <Label
          className="text-black"
          style={{ fontSize: "12px", fontWeight: "400" }}
        >
          Access
        </Label>
        <div className="d-flex gap-1">
          <div className="d-flex gap-1">
            <input
              type="radio"
              id="ex1-active"
              name="ex1"
              onChange={() => {
                setRestricted(false);
              }}
            />
            <div>Full Access</div>
          </div>
          <div className="d-flex gap-1">
            <input
              type="radio"
              name="ex1"
              id="ex1-inactive"
              onChange={() => setRestricted(true)}
            />
            <div>Restricted (Assign Modules)</div>
          </div>
        </div>
      </div>

      {restricted && (
        <div className="col-12 my-2 d-flex flex-column gap-1">
          <div>
            <div className="d-flex gap-1">
              <input type="checkbox" />
              <div style={{ fontSize: "16px", fontWeight: "400" }}>
                Client management
              </div>
            </div>
            <div style={{ fontSize: "10px", fontWeight: "400" }}>
              User can manage Client and all their information
            </div>
          </div>
          <div className="d-flex gap-1">
            <Col xl="4">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                Client
              </Label>
              <ReactSelect placeholder="Select Client" />
            </Col>

            <Col xl="4">
              <Label
                className="text-black"
                style={{ fontSize: "12px", fontWeight: "400" }}
              >
                Project
              </Label>
              <ReactSelect placeholder="Select Project" />
            </Col>
          </div>

          <div>
            <div className="d-flex gap-1">
              <input type="checkbox" />
              <div style={{ fontSize: "16px", fontWeight: "400" }}>
                Configuration Management
              </div>
            </div>
            <div style={{ fontSize: "10px", fontWeight: "400" }}>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur ma
            </div>
          </div>

          <div>
            <div className="d-flex gap-1">
              <input type="checkbox" />
              <div style={{ fontSize: "16px", fontWeight: "400" }}>
                User Management
              </div>
            </div>
            <div style={{ fontSize: "10px", fontWeight: "400" }}>
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit, sed qu
            </div>
          </div>

          <div>
            <div className="d-flex gap-1">
              <input type="checkbox" />
              <div style={{ fontSize: "16px", fontWeight: "400" }}>
                Production Management
              </div>
            </div>
            <div style={{ fontSize: "10px", fontWeight: "400" }}>
              Ut enim ad minima veniam, quis nostrum exercitationem ullam
              corporis suscipit laboriosam, nisi ut al
            </div>
          </div>

          <div>
            <div className="d-flex gap-1">
              <input type="checkbox" />
              <div style={{ fontSize: "16px", fontWeight: "400" }}>
                Transaction Management
              </div>
            </div>
            <div style={{ fontSize: "10px", fontWeight: "400" }}>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatu
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default index;
