import ReactSelect from "react-select";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useRouter } from "next/router";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditRole() {
  const router = useRouter();

  const notify = () => toast.success(" Role Is Edited Succesfully");

  const [restricted, setRestricted] = useState(false);

  return (
    <div className="overflow-auto text-black mt-4 p-3">
      <div
        className="text-black"
        style={{ fontSize: "16px", fontWeight: "600" }}
      >
        All Roles
      </div>

      <div className="d-flex justify-content-between">
        <div
          className="text-black"
          style={{ fontSize: "32px", fontWeight: "600" }}
        >
          Edit Role
        </div>
        <div className="d-flex gap-1">
          <Button
            onClick={() => router.back()}
            color="white"
            size="sm"
            className="px-3"
          >
            Back
          </Button>
          <Button size="sm" color="primary" className="px-3">
            Edit
          </Button>
        </div>
      </div>

      <hr style={{ height: "2px" }} />

      <div className="d-flex gap-1">
        <Form>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleEmail">Role Name</Label>
                <Input
                  id="exampleEmail"
                  name="email"
                  placeholder="Enter Role Name"
                  type="email"
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="examplePassword">Role Id</Label>
                <Input
                  id="examplePassword"
                  name="password"
                  placeholder="Enter Role Id"
                  type="password"
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </div>

      <div className="d-flex flex-column mt-1">
        <Label
          className="text-black"
          style={{ fontSize: "12px", fontWeight: "400" }}
        >
          <h6>Access</h6>
        </Label>
        <div className="d-flex gap-4">
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
            <div>Restricted Access</div>
          </div>
        </div>
      </div>

      {restricted && (
        <div className="col-4">
          <div
            className="d-flex ms-3 justify-content-between"
            style={{ fontSize: "16px", fontWeight: "600" }}
          >
            <div>Permissions</div>
            <div>Yes/No</div>
          </div>
          <hr className="hrline" />

          <CustomPermissions title={"Create Client"} />
          <CustomPermissions title={"Edit Client"} />
          <CustomPermissions title={"Deactivate Client"} />
          <CustomPermissions title={"Create Production"} />
          <CustomPermissions title={"Edit Production"} />
          <CustomPermissions title={"Deactivate Production"} />
          <CustomPermissions title={"Create New Configuration"} />
          <CustomPermissions title={"Edit Configuration"} />
          <CustomPermissions title={"Deactivate Configuration"} />
          <CustomPermissions title={"Add User"} />
          <CustomPermissions title={"Edit User"} />
          <CustomPermissions title={"Delete User"} />
        </div>
      )}
    </div>
  );
}

export default EditRole;

const CustomPermissions = ({ title }) => {
  return (
    <div className="d-flex justify-content-between">
      <div>{title}</div>
      <div className="form-check form-switch ">
        <Input type="switch" name="customSwitch" id="exampleCustomSwitch" />
      </div>
    </div>
  );
};
