import ReactSelect from "react-select";
import {
  Button,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from "reactstrap";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ClientsService, RoleService, ProjectService } from "services";
import { toast } from "react-toastify";

const permissionSetData = {
  "Client Management": {
    state: false,
    permissions: {
      "Create Client": { state: false },
      "Edit Client": { state: false },
      "Deactivate Client": { state: false },
    },
  },
  "Production Management": {
    state: false,
    permissions: {
      "Create Production": { state: false },
      "Edit Production": { state: false },
      "Deactivate Production": { state: false },
    },
  },
  "Configuration Management": {
    state: false,
    permissions: {
      "Create Configuration": { state: false },
      "Edit Configuration": { state: false },
      "Deactivate Configuration": { state: false },
    },
  },
  "User & Role Management": {
    state: false,
    permissions: {
      "Create User": { state: false },
      "Edit User": { state: false },
      "Deactivate User": { state: false },
      "Create Role": { state: false },
      "Edit Role": { state: false },
      "Deactivate Role": { state: false },
    },
  },
  "Transaction Management": {
    state: false,
    permissions: {
      "Create Purchase Order": { state: false },
      "Edit Purchase Order": { state: false },
      "View Purchase Order List": { state: false },
      "Approve or Reject Purchase Order": { state: false },
      "Create Account Pay": { state: false },
      "Edit Account Pay": { state: false },
      "View Account Pay List": { state: false },
      "Approve or Reject Account Pay": { state: false },
      "Create Journal Entry": { state: false },
      "Edit Journal Entry": { state: false },
      "View Journal Entry List": { state: false },
      "Create Petty Cash": { state: false },
      "Edit Petty Cash": { state: false },
      "View Petty Cash List": { state: false },
      "Approve or Reject Petty Cash": { state: false },
      "Create Payroll": { state: false },
      "Edit Payroll": { state: false },
      "View Payroll List": { state: false },
      "Approve or Reject Payroll": { state: false },
    },
  },
  "Payments Management": {
    state: false,
    permissions: {
      "View All Payments": { state: false },
      "Check Signature Access": { state: false },
      "Check Payment Processing": { state: false },
      "EFT Payment Processing": { state: false },
      "Wire Payment Processing": { state: false },
      "Manual Check Processing": { state: false },
      "Approve or Reject Payment": { state: false },
    },
  },
  "Reports Management": {
    state: false,
    permissions: {
      "Trail Balance": { state: false },
      "General Ledger Reporting": { state: false },
      "Cost Report": { state: false },
      "Purchase Order Reporting": { state: false },
      "Check Register": { state: false },
      "Vendor Reporting": { state: false },
      "Vendor Listing": { state: false },
      "Chart of Accounts": { state: false },
      "Asset Report": { state: false },
      "Audit Report by Transaction": { state: false },
      "Audit Report by Account": { state: false },
      "Posting Report by Transaction": { state: false },
      "Posting Report by Account": { state: false },
      "Bank Reconciliation Report": { state: false },
    },
  },
};

const roleservice = new RoleService();
function AddRole() {
  const router = useRouter();

  const [restricted, setRestricted] = useState(false);
  const [role_name, setRole_name] = useState("");
  const [role_id, setRole_id] = useState("");
  const [permissionSet, setPermissionSet]: any = useState(permissionSetData);

  
  const handlePermissionChange = (category, permission, newValue) => {
    setPermissionSet((prevPermissionSet) => {
      const updatedPermissionSet = { ...prevPermissionSet };
      updatedPermissionSet[category].permissions[permission].state = newValue;

      // Check if all sub-permissions are selected
      const allSubPermissionsSelected = Object.values(
        updatedPermissionSet[category].permissions
      ).every((subPermission: any) => subPermission.state);

      // Update the main permission state based on all sub-permissions
      updatedPermissionSet[category].state = allSubPermissionsSelected;

      return updatedPermissionSet;
    });
  };

  const convertToPayload = (permissionSet) => {
    const payload = {};

    Object.entries(permissionSet).forEach(
      ([category, { state, permissions }]: any) => {
        const formattedCategory = category.replace(/\s/g, ""); // Remove spaces from category names
        payload[formattedCategory] = {};

        Object.entries(permissions).forEach(([permission, { state }]: any) => {
          const formattedPermission = permission.replace(/\s/g, ""); // Remove spaces from permission names
          payload[formattedCategory][formattedPermission] = state;
        });
      }
    );

    return payload;
  };

  const resetData = () => {
    setPermissionSet(permissionSetData);
    setRole_id("");
    setRole_name("");
    setRestricted(false);
  };

  const save_role = () => {
    let payload: any = {
      CreatedBy: 2,
      IsActive: true,
      RoleName: role_name,
      RoleID: role_id,
      Access: restricted ? "restricted" : "full_access",
    };
    if (restricted) {
      const convertedPayload = convertToPayload(permissionSet);
      payload.permissions = convertedPayload;
    }

    roleservice
      .post_roles(payload)
      .then((res) => {
        toast.success("Role created successfully");
        router.push("/settings/rolemanagement");
        resetData();
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  const handleCategoryChange = (category, newValue) => {
    setPermissionSet((prevPermissionSet) => {
      const updatedPermissionSet = { ...prevPermissionSet };
      updatedPermissionSet[category].state = newValue;

      // Update all permissions within the category
      Object.keys(updatedPermissionSet[category].permissions).forEach(
        (permission) => {
          updatedPermissionSet[category].permissions[
            permission
          ].state = newValue;
        }
      );

      return updatedPermissionSet;
    });
  };

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
          style={{ fontSize: "25px", fontWeight: "600" }}
        >
          Create New Role
        </div>
        <div className="d-flex gap-1">
          <Button
            onClick={() => router.back()}
            color="white"
            size="sm"
            className="px-3"
          >
            Dismiss
          </Button>
          <Button
            size="sm"
            color="primary"
            className="px-3"
            onClick={save_role}
          >
            Save
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
                  value={role_name}
                  onChange={(e) => {
                    setRole_name(e.target.value);
                  }}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="examplePassword">Role ID</Label>
                <Input
                  id="examplePassword"
                  name="password"
                  placeholder="Enter Role Id"
                  type="password"
                  value={role_id}
                  onChange={(e) => {
                    setRole_id(e.target.value);
                  }}
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
              checked={!restricted}
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
              checked={restricted}
              onChange={() => setRestricted(true)}
            />
            <div>Restricted Access</div>
          </div>
        </div>
      </div>

      {restricted && (
        <div className="col-4 mt-2">
          <div
            className="d-flex ms-3 justify-content-between"
            style={{ fontSize: "16px", fontWeight: "600" }}
          >
            <div>Permissions</div>
            <div>Yes/No</div>
          </div>
          <hr className="hrline" />
          <div className="mt-2">
            {Object.entries(permissionSet).map(([key, value]) => {
              console.log(key, value, "key value");
              return (
                <CustomPermissions
                  key={`custompermission-set-${key}`}
                  keys={key}
                  value={value}
                  handlePermissionChange={handlePermissionChange}
                  handleCategoryChange={handleCategoryChange}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default AddRole;

const CustomPermissions = ({
  keys,
  value,
  handlePermissionChange,
  handleCategoryChange,
}) => {
  const toggleCategoryState = (e) => {
    const newValue = e.target.checked;
    handleCategoryChange(keys, newValue);

    // Toggle all permissions under this category
    Object.entries(value.permissions).forEach(
      ([permission, permissionValue]) => {
        handlePermissionChange(keys, permission, newValue);
      }
    );
  };

  return (
    <>
      <div className="d-flex gap-2">
        <Input
          type="checkbox"
          checked={value.state}
          onChange={toggleCategoryState}
        />
        <div className="fw-bold">{keys}</div>
      </div>
      {/* Sub Permissions */}
      <div className="ps-4">
        {Object.entries(value.permissions).map(([k, v]: any) => {
          return (
            <div
              key={`permission-set-${k}`}
              className="d-flex align-items-center justify-content-between"
            >
              <p className="">{k}</p>
              <div className="form-check form-switch">
                <Input
                  type="checkbox"
                  checked={v.state}
                  onChange={() => handlePermissionChange(keys, k, !v.state)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
