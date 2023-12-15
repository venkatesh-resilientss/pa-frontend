import { Button, Input, Label } from "reactstrap";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RoleService, AuthService } from "services";
import { toast } from "react-toastify";
// import Button from "react-bootstrap-button-loader";
import { getSessionVariables } from "@/constants/function";

import {
  roleCreationData,
  roleCreationData1,
  roleCreationData2,
} from "constants/common";
import useSWR from "swr";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const roleservice = new RoleService();
const authService = new AuthService();

function AddRole() {
  const router = useRouter();

  const { data: userData } = useSWR("GET_USER_DETAILS", () =>
    authService.getUserDetails()
  );
  const [loading, setLoading] = useState(false);

  const [restricted, setRestricted] = useState(true);
  const [role_name, setRole_name] = useState("");
  const [role_id, setRole_id] = useState("");
  const [IsStaff, setIsStaff] = useState(false);
  const [viewmode, setViewmode] = useState(false);
  const [activeStatus, setActiveStatus] = useState(true);
  const [permissionSet, setPermissionSet]: any = useState(roleCreationData);
  const [permissionSet1, setPermissionSet1]: any = useState(roleCreationData1);
  const [permissionSet2, setPermissionSet2]: any = useState(roleCreationData2);

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

  const handlePermissionChange1 = (category, permission, newValue) => {
    setPermissionSet1((prevPermissionSet) => {
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

  const handlePermissionChange2 = (category, permission, newValue) => {
    setPermissionSet2((prevPermissionSet) => {
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
        setIsStaff(res.IsStaff);
        setRole_id(res.RoleId);
        setActiveStatus(res.IsActive);

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

          setPermissionSet1((prevPermissionSet) => {
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

                  if (
                    apiPermission &&
                    apiPermission[valuess.value] !== undefined
                  ) {
                    updatedPermissionSet[category].permissions[
                      permission
                    ].state = apiPermission[valuess.value];
                  } else {
                    // Handle the case where apiPermission or apiPermission[valuess.value] is undefined.
                    updatedPermissionSet[category].permissions[
                      permission
                    ].state = false;
                  }
                });
              }
            );

            return updatedPermissionSet;
          });

          setPermissionSet2((prevPermissionSet) => {
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

                  if (
                    apiPermission &&
                    apiPermission[valuess.value] !== undefined
                  ) {
                    updatedPermissionSet[category].permissions[
                      permission
                    ].state = apiPermission[valuess.value];
                  } else {
                    // Handle the case where apiPermission or apiPermission[valuess.value] is undefined.
                    updatedPermissionSet[category].permissions[
                      permission
                    ].state = false;
                  }
                });
              }
            );

            return updatedPermissionSet;
          });

          // setPermissionSet1((prevPermissionSet) => {
          //   const updatedPermissionSet = { ...prevPermissionSet };
          //   // Iterate over each category
          //   Object.entries(updatedPermissionSet).forEach(
          //     ([category, value]: any) => {
          //       // Update category state
          //       updatedPermissionSet[category].state =
          //         apiPermissions[value.value]?.state || false;
          //       // Iterate over each permission in the category
          //       Object.entries(
          //         updatedPermissionSet[category].permissions
          //       ).forEach(([permission, valuess]: any) => {
          //         // Update permission state
          //         const apiPermission = apiPermissions[value.value];
          //         updatedPermissionSet[category].permissions[permission].state =
          //           apiPermission[valuess.value] || false;
          //       });
          //     }
          //   );
          //   return updatedPermissionSet;
          // });
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
    setPermissionSet1(roleCreationData1);
    setPermissionSet2(roleCreationData2);

    setRole_id(null);
    setRole_name("");
    setRestricted(false);
    setIsStaff(false);
  };

  const save_role = () => {
    const { clientID, projectID } = getSessionVariables();

    setLoading(true);
    if (!role_name || !role_id) {
      setLoading(false);
      toast.error("Please enter role name");
      return;
    }

    const stringWithoutSpaces = role_id.replace(/ /g, "_");
    // Convert the string to uppercase
    const uppercaseString = stringWithoutSpaces.toUpperCase();
    // return;
    const payload: any = {
      IsActive: true,
      RoleName: role_name,
      Code: uppercaseString,
      clientID,
      projectID,
      AccessType: restricted ? "restricted" : "full_access",
      IsStaff,
    };
    if (restricted) {
      const convertedPayload = convertToNewFormat(permissionSet) || {};
      const convertedPayload1 = convertToNewFormat(permissionSet1) || {};
      const convertedPayload2 = convertToNewFormat(permissionSet2) || {};

      payload.permissions = {
        ...convertedPayload,
        ...convertedPayload1,
        ...convertedPayload2,
      };
    }

    roleservice
      .post_roles(payload)
      .then(() => {
        setLoading(false);
        toast.success("Role created successfully");
        router.push("/settings/rolemanagement");
        resetData();
      })
      .catch((err) => {
        toast.error(err?.error || "Error");
        setLoading(false);
      });
  };
  const updateRole = (roleId) => {
    setLoading(true);
    const { clientID, projectID } = getSessionVariables();
    const stringWithoutSpaces = role_name.replace(/ /g, "_");

    const uppercaseString = stringWithoutSpaces.toUpperCase();

    if (!role_name) {
      toast.error("Please enter role name");
      setLoading(false);

      return;
    }
    // return;
    const payload: any = {
      IsActive: activeStatus,
      RoleName: role_name,
      Code: uppercaseString,
      clientID,
      projectID,
      AccessType: restricted ? "restricted" : "full_access",
      IsStaff,
    };
    if (restricted) {
      const convertedPayload = convertToNewFormat(permissionSet) || {};
      const convertedPayload1 = convertToNewFormat(permissionSet1) || {};
      const convertedPayload2 = convertToNewFormat(permissionSet2) || {};

      payload.permissions = {
        ...convertedPayload,
        ...convertedPayload1,
        ...convertedPayload2,
      };
    }

    roleservice
      .update_role(roleId, payload)
      .then(() => {
        toast.success("Role updated successfully");
        router.push("/settings/rolemanagement");
        resetData();
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err?.error || "Error");
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
  const handleCategoryChange1 = (category, newValue) => {
    setPermissionSet1((prevPermissionSet) => {
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
  const handleCategoryChange2 = (category, newValue) => {
    setPermissionSet2((prevPermissionSet) => {
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
              color="#000000"
              size="sm"
              className="px-3 btn-default"
              background="#FFFFFF"
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
              color="#000000"
              size="sm"
              className="px-3 btn-default"
              background="#FFFFFF"
            >
              Back
            </Button>
            <Button
              size="sm"
              loading={loading}
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
              className="px-3 btn-default"
            >
              Dismiss
            </Button>
            <Button
              size="sm"
              color="primary"
              className="px-3"
              loading={loading}
              onClick={save_role}
            >
              Save
            </Button>
          </div>
        )}
      </div>

      <hr className="mt-3 mb-2" style={{ height: "2px" }} />

      <div className="row">
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <Label for="roleName">Role Name</Label>
          <Input
            id="roleName"
            name="roleName"
            disabled={viewmode}
            placeholder="Enter Role Name"
            type="text"
            value={role_name}
            onChange={(e) => {
              setRole_name(e.target.value);
              setRole_id(e.target.value);
            }}
          />
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="h-100 d-flex align-items-end py-2">
            <input
              type="checkbox"
              className="mb-1"
              id={"Is Staff Role"}
              checked={IsStaff}
              onChange={(e) => setIsStaff(e.target.checked)}
            />
            <label htmlFor={"Is Staff Role"} className="ms-2">
              {"Is Staff Role"}
            </label>
          </div>
        </div>
      </div>

      <div className="d-flex flex-column mt-2">
        <Label
          className="text-black"
          style={{ fontSize: "16px", fontWeight: "400" }}
        >
          Status
        </Label>
        <div className="d-flex gap-4">
          <div className="d-flex gap-1">
            <input
              type="radio"
              id="active"
              name="active"
              checked={activeStatus}
              onChange={() => {
                setActiveStatus(true);
              }}
              disabled={viewmode} // Disable based on the edit mode
            />
            <div>Active</div>
          </div>
          <div className="d-flex gap-1">
            <input
              type="radio"
              name="in-active"
              id="active"
              checked={!activeStatus}
              onChange={() => {
                setActiveStatus(false);
              }}
              disabled={viewmode} // Disable based on the edit mode
            />
            <div>Inactive</div>
          </div>
        </div>
      </div>

      <div className="d-flex flex-column mt-2">
        <Label for="access">Access</Label>

        {/* { userData?.data?.Role?.AccessType === "full_accesss" ||
                userData?.data?.Role?.RoleName === "SUPER_ADMIN" ||
                userData?.data?.IsStaffUser?():()} */}

        <div className="d-flex gap-4">
          <div className="d-flex gap-1">
            <input
              type="radio"
              name="ex1"
              id="ex1-active"
              disabled={viewmode}
              checked={restricted}
              onChange={() => setRestricted(true)}
            />
            <div style={{ fontSize: "15px" }}>Restricted Access</div>

            {userData?.data?.Role?.AccessType === "full_access" ||
            userData?.data?.Role?.Code === "SUPER_ADMIN" ? (
              <>
                <div className="d-flex gap-1 cursor-pointer ms-3">
                  <input
                    type="radio"
                    id="ex1-inactive"
                    name="ex1"
                    disabled={viewmode}
                    checked={!restricted}
                    onChange={() => {
                      setRestricted(false);
                    }}
                  />
                  <div style={{ fontSize: "15px" }}>Full Access</div>
                </div>
              </>
            ) : (
              <>
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip className="mt-1" id="tooltip-engine">
                      You didn&apos;t have access to this feature
                    </Tooltip>
                  }
                >
                  <div className="d-flex gap-1 cursor-pointer ms-3">
                    <input
                      type="radio"
                      id="ex1-inactive"
                      name="ex1"
                      disabled={true}
                    />
                    <div style={{ fontSize: "15px" }}>Full Access</div>
                  </div>
                </OverlayTrigger>
              </>
            )}
          </div>
        </div>
      </div>
      {restricted && (
        <div className="col-md-12 mt-3">
          <div className="row">
            <div className="col-md-4">
              <div
                className="d-flex ms-3 justify-content-between"
                style={{ fontSize: "16px", fontWeight: "600" }}
              >
                <div>Permissions</div>
                <div>Yes/No</div>
              </div>
              <hr className="hrline" />
              <div className="mt-2">
                {Object.entries(permissionSet).map(([key, value], index) => {
                  const rowIndex = Math.floor(index / 3); // Divide into 3 rows
                  return (
                    <div
                      key={`custompermission-row-${rowIndex}`}
                      className="mb-3"
                    >
                      <CustomPermissions
                        key={`custompermission-set-${key}`}
                        keys={key}
                        value={value}
                        handlePermissionChange={handlePermissionChange}
                        handleCategoryChange={handleCategoryChange}
                        viewmode={viewmode}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="d-flex ms-3 justify-content-between"
                style={{ fontSize: "16px", fontWeight: "600" }}
              >
                <div>Permissions</div>
                <div>Yes/No</div>
              </div>
              <hr className="hrline" />
              <div className="mt-2">
                {Object.entries(permissionSet1).map(([key, value], index) => {
                  const rowIndex = Math.floor(index / 3); // Divide into 3 rows
                  return (
                    <div
                      key={`custompermission-row-${rowIndex}`}
                      className="mb-3"
                    >
                      <CustomPermissions
                        key={`custompermission-set-${key}`}
                        keys={key}
                        value={value}
                        handlePermissionChange={handlePermissionChange1}
                        handleCategoryChange={handleCategoryChange1}
                        viewmode={viewmode}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="d-flex ms-3 justify-content-between"
                style={{ fontSize: "16px", fontWeight: "600" }}
              >
                <div>Permissions</div>
                <div>Yes/No</div>
              </div>
              <hr className="hrline" />
              <div className="mt-2">
                {Object.entries(permissionSet2).map(([key, value], index) => {
                  const rowIndex = Math.floor(index / 3); // Divide into 3 rows
                  return (
                    <div
                      key={`custompermission-row-${rowIndex}`}
                      className="mb-3"
                    >
                      <CustomPermissions
                        key={`custompermission-set-${key}`}
                        keys={key}
                        value={value}
                        handlePermissionChange={handlePermissionChange2}
                        handleCategoryChange={handleCategoryChange2}
                        viewmode={viewmode}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
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
          className="ms-3 cursor-pointer"
          type="checkbox"
          checked={value.state}
          disabled={viewmode}
          onChange={toggleCategoryState}
        />
        <div className="fw-bold ms-2">{keys}</div>
      </div>
      {/* Sub Permissions */}
      <div className="ms-5">
        {Object.entries(value.permissions).map(([k, v]: any) => {
          return (
            <div
              key={`permission-set-${k}`}
              className="d-flex align-items-center justify-content-between"
            >
              <p className="">{k}</p>
              <div className="form-check form-switch cursor-pointer">
                <Input
                  className="cursor-pointer"
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
