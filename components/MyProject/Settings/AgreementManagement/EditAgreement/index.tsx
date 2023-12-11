import { Button, Col, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditAgreement() {
  const router = useRouter();

  const notify = () => toast.success(" Role Is Edited Succesfully");

  const [restricted, setRestricted] = useState(false);

  return (
    <div
      style={{ fontFamily: "Segoe UI" }}
      className="overflow-auto text-black "
    >
      <div
        className="text-black m-2"
        style={{ fontSize: "16px", fontWeight: "600" }}
      >
        All Roles
      </div>

      <div className="d-flex justify-content-between">
        <div
          className="text-black"
          style={{ fontSize: "25px", fontWeight: "600" }}
        >
          Edit Role
        </div>
        <div className="d-flex gap-1">
          <Button onClick={() => router.back()} color="white" size="sm">
            Dismiss
          </Button>
          <Button size="sm" color="info" onClick={notify}>
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
            Role Name
          </Label>
          <Input />
        </Col>
        <Col xl="4">
          <Label
            className="text-black"
            style={{ fontSize: "12px", fontWeight: "400" }}
          >
            Role ID{" "}
          </Label>
          <Input />
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
            <div>Restricted Access</div>
          </div>
        </div>
      </div>

      {restricted && (
        <div className="col-4 ms-3">
          <div
            className="d-flex justify-content-between"
            style={{ fontSize: "16px", fontWeight: "600" }}
          >
            <div>Permissions</div>
            <div>Yes/No</div>
          </div>
          <hr />

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

export default EditAgreement;

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
