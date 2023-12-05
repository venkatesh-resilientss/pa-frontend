import {
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
} from "reactstrap";
import { RoleService } from "services";
import CustomBadge from "components/Generic/CustomBadge";
import { toast } from "react-toastify";
import Link from "next/link";
import useSWR from "swr";
import { Edit, File, MoreVertical, Plus, Trash } from "react-feather";
import { useRouter } from "next/router";
import GridTable from "components/grid-tables/gridTable";
import NoDataPage from "components/NoDataPage";
import { hasPermission } from "commonFunctions/functions";
// import { checkTenant } from "constants/function";
import moment from "moment";

const AllRoleTable = () => {
  const router = useRouter();
  //

  const roleservice = new RoleService();
  const hasCreateRolePermission = hasPermission(
    "user_and_role_management",
    "create_role"
  );
  const hasEditrolePermission = hasPermission(
    "user_and_role_management",
    "edit_role"
  );
  const hasDeactivateRolePermission = hasPermission(
    "user_and_role_management",
    "deactivate_role"
  );

  const {
    data: rolesdata,
    isLoading: rolesLoading,
    mutate: mutateRoles,
  } = useSWR("LIST_ROLES", () => roleservice.getRoles());

  const StateBadge = (props) => {
    const sateDir = {
      true: "success",
      false: "danger",
    };
    return (
      <CustomBadge
        bg={sateDir[props.value]}
        value={props.value === true ? "active" : "In-active"}
      />
    );
  };

  const columns = [
    {
      sortable: true,
      field: "RoleName",
      // selector: (row) => row?.RollName,
      cell: (row) => row.RoleName,
    },

    {
      sortable: true,
      field: "AccessType",
      selector: (row) => row.AccessType,
    },

    {
      sortable: true,
      field: "CreatedDate",
      cellRenderer: (params) => {
        const formattedDate = moment(params.CreatedDate).format(
          "MM/DD/YYYY, HH:mm"
        );
        return <span>{formattedDate}</span>;
      },
    },

    {
      name: <div>Status</div>,
      field: "IsActive",
      cellRenderer: StateBadge,
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
      // cellRenderer: (row) => (row.IsActive ? "Active" : "In-active"),
    },
    {
      field: "Options",
      cellRenderer: (row) => {
        return (
          <UncontrolledDropdown>
            <DropdownToggle tag="span">
              <MoreVertical size={17} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu end container="body">
              <Link
                href={`/settings/roles?q=view_role&role_id=${row.data.ID}`}
                style={{
                  textDecoration: "none",
                  color: "#030229",
                  fontSize: "16px",
                }}
              >
                <DropdownItem className="w-100">
                  <File size={14} className="me-50" />
                  <span className="align-middle">View Details</span>
                </DropdownItem>
              </Link>
              {hasEditrolePermission && (
                <Link
                  href={`/settings/roles?q=edit_role&role_id=${row.data.ID}`}
                  style={{
                    textDecoration: "none",
                    color: "#030229",
                    fontSize: "16px",
                  }}
                >
                  <DropdownItem className="w-100">
                    <Edit size={14} className="me-50" />
                    <span className="align-middle">Edit Role</span>
                  </DropdownItem>
                </Link>
              )}
              {hasDeactivateRolePermission && (
                <DropdownItem
                  className="w-100"
                  onClick={() => deleteRole(row.data.ID)}
                >
                  <Trash size={14} className="me-50" />
                  <span className="align-middle">Delete</span>
                </DropdownItem>
              )}
            </DropdownMenu>
          </UncontrolledDropdown>
        );
      },
    },
  ];

  const deleteRole = (role_id) => {
    roleservice.delete_role(role_id).then(() => {
      mutateRoles();
      toast.success("Role delelted successfully");
    });
  };

  return (
    <>
      <Card
        className="mt-2"
        style={{
          backgroundColor: "#E7EFFF",
          boxShadow: "0px 2.53521px 10.14085px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <CardBody>
          <div className="d-flex justify-content-between">
            <div>
              <p className="m-2" style={{ fontWeight: "bold" }}>
                All Roles
              </p>
            </div>
            <div className="d-flex align-items-center">
              <Form onSubmit={(e) => e.preventDefault()}>
                <input
                  className="search mr-2"
                  type="search"
                  placeholder="Search..."
                />
              </Form>
              {hasCreateRolePermission && (
                <button
                  className="btn btn-primary"
                  onClick={() => router.push("/settings/roles?q=create_role")}
                >
                  <Plus size={16} /> Create Role
                </button>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
      {rolesLoading ? (
        <div className="mt-2">
          <GridTable
            rowData={rolesdata}
            columnDefs={columns}
            pageSize={10}
            searchText={undefined}
          />
        </div>
      ) : (
        <>
          {rolesdata?.length > 0 ? (
            <div className="mt-2">
              <GridTable
                rowData={rolesdata}
                columnDefs={columns}
                pageSize={10}
                searchText={undefined}
              />
            </div>
          ) : (
            <div>
              <NoDataPage
                buttonName={
                  hasCreateRolePermission ? "Create Role" : "No button"
                }
                buttonLink={"/settings/add-role"}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default AllRoleTable;
