import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RoleService } from "services";
import { toast } from "react-toastify";
import { roleCreationData } from "constants/common";

const roleservice = new RoleService();
function AddRole() {
  const router = useRouter();

  const [restricted, setRestricted] = useState(false);
  const [role_name, setRole_name] = useState("");
  const [role_id, setRole_id] = useState();
  const [viewmode, setViewmode] = useState(false);
  const [permissionSet, setPermissionSet]: any = useState(roleCreationData);

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

  useEffect(() => {
    if (router.query.q === "view_role") {
      setViewmode(true);
    } else {
      setViewmode(false);
    }
    if (router.query.q === "edit_role" || router.query.q === "view_role") {
      roleservice.getrole_by_id(router.query.role_id).then((res) => {
        setRole_name(res.RoleName);
        setRole_id(res.RoleId);

        if (res.AccessType === "full_access") {
          setRestricted(false);
        } else setRestricted(true);
        if (res.Permissions) {
          const apiPermissions = res.Permissions;
          setPermissionSet((prevPermissionSet) => {
            const updatedPermissionSet = { ...prevPermissionSet };
            // Iterate over each category
            Object.entries(updatedPermissionSet).forEach(
              ([category, value]: any) => {
                // Update category state
                updatedPermissionSet[category].state =
                  apiPermissions[value.value]?.state || false;
                // Iterate over each permission in the category
                Object.entries(
                  updatedPermissionSet[category].permissions
                ).forEach(([permission, valuess]: any) => {
                  // Update permission state
                  const apiPermission = apiPermissions[value.value];
                  updatedPermissionSet[category].permissions[permission].state =
                    apiPermission[valuess.value] || false;
                });
              }
            );
            return updatedPermissionSet;
          });
        }
      });
    }
  }, [router]);

  // const convertToPayload = (permissionSet) => {
  //   const payload = {};

  //   Object.entries(permissionSet).forEach(
  //     ([category, { state, permissions }]: any) => {
  //       const formattedCategory = category
  //         .replace(/\s/g, "")
  //         .replace("&", "And"); // Remove spaces from category names
  //       payload[formattedCategory] = {};

  //       Object.entries(permissions).forEach(([permission, { state }]: any) => {
  //         const formattedPermission = permission.replace(/\s/g, ""); // Remove spaces from permission names
  //         payload[formattedCategory][formattedPermission] = state;
  //       });
  //     }
  //   );

  //   return payload;
  // };

  function convertToNewFormat(oldPermissions: any) {
    const newPermissions: any = {};

    // Iterate through each role in the oldPermissions

    /*  eslint-disable-next-line @typescript-eslint/no-unused-vars */
    for (const [roleName, roleData] of Object.entries<any>(oldPermissions)) {
      // Set the state and value for the role
      newPermissions[roleData.value] = {
        state: roleData.state,
        // permissions: {},
      };

      // Iterate through each permission in the role

      /*  eslint-disable-next-line @typescript-eslint/no-unused-vars */
      for (const [permissionName, permissionData] of Object.entries<any>(
        roleData.permissions
      )) {
        // Set the state for the permission
        newPermissions[roleData.value][permissionData.value] =
          permissionData.state;
      }
    }

    return newPermissions;
  }

  const resetData = () => {
    setPermissionSet(roleCreationData);
    setRole_id(null);
    setRole_name("");
    setRestricted(false);
  };

  const save_role = () => {
    if (!role_name || !role_id) {
      toast.error("Please enter roleId and role name");
      return;
    }
    // return;
    const payload: any = {
      CreatedBy: 2,
      IsActive: true,
      RoleName: role_name,
      RoleID: parseInt(role_id),
      AccessType: restricted ? "restricted" : "full_access",
    };
    if (restricted) {
      const convertedPayload = convertToNewFormat(permissionSet);
      // const convertedPayload = convertToPayload(permissionSet);
      payload.permissions = convertedPayload;
    }

    roleservice.post_roles(payload).then(() => {
      toast.success("Role created successfully");
      router.push("/settings/rolemanagement");
      resetData();
    });
  };
  const updateRole = (roleId) => {
    if (!role_name || !role_id) {
      toast.error("Please enter roleId and role name");
      return;
    }
    // return;
    const payload: any = {
      CreatedBy: 2,
      IsActive: true,
      RoleName: role_name,
      RoleID: parseInt(role_id),
      AccessType: restricted ? "restricted" : "full_access",
    };
    if (restricted) {
      const convertedPayload = convertToNewFormat(permissionSet);
      // const convertedPayload = convertToPayload(permissionSet);
      payload.permissions = convertedPayload;
    }

    roleservice.update_role(roleId, payload).then(() => {
      toast.success("Role updated successfully");
      router.push("/settings/rolemanagement");
      resetData();
    });
  };

  const handleCategoryChange = (category, newValue) => {
    setPermissionSet((prevPermissionSet) => {
      const updatedPermissionSet = { ...prevPermissionSet };
      updatedPermissionSet[category].state = newValue;

      // Update all permissions within the category
      Object.keys(updatedPermissionSet[category].permissions).forEach(
        (permission) => {
          updatedPermissionSet[category].permissions[permission].state =
            newValue;
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
          {router.query.q === "create_role" ? "Create New Role" : "Edit role"}
        </div>
        {router.query.q === "view_role" ? (
          <div className="d-flex gap-1">
            <Button
              onClick={() => router.back()}
              color="white"
              size="sm"
              className="px-3"
            >
              Back
            </Button>
            <Button
              size="sm"
              color="primary"
              className="px-3"
              onClick={() =>
                router.push(
                  `/settings/roles?q=edit_role&role_id=${router.query.role_id}`
                )
              }
            >
              Edit
            </Button>
          </div>
        ) : router.query.q === "edit_role" ? (
          <div className="d-flex gap-1">
            <Button
              onClick={() => router.back()}
              color="white"
              size="sm"
              className="px-3"
            >
              Back
            </Button>
            <Button
              size="sm"
              color="primary"
              className="px-3"
              onClick={() => updateRole(router.query.role_id)}
            >
              Update
            </Button>
          </div>
        ) : (
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
        )}
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
                  disabled={viewmode}
                  placeholder="Enter Role Name"
                  type="text"
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
                  disabled={viewmode}
                  placeholder="Enter Role Id"
                  type="text"
                  value={role_id}
                  onChange={(e: any) => {
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
              disabled={viewmode}
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
              disabled={viewmode}
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
              return (
                <CustomPermissions
                  key={`custompermission-set-${key}`}
                  keys={key}
                  value={value}
                  handlePermissionChange={handlePermissionChange}
                  handleCategoryChange={handleCategoryChange}
                  viewmode={viewmode}
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
  viewmode,
}) => {
  const toggleCategoryState = (e) => {
    const newValue = e.target.checked;
    handleCategoryChange(keys, newValue);

    // Toggle all permissions under this category
    Object.entries(value.permissions).forEach(([permission]) => {
      handlePermissionChange(keys, permission, newValue);
    });
  };

  return (
    <>
      <div className="d-flex gap-2">
        <Input
          type="checkbox"
          checked={value.state}
          disabled={viewmode}
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
                  disabled={viewmode}
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
