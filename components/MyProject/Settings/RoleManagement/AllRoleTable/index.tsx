import {
  Card,
  CardBody,
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CardHeader,
  Form,
} from "reactstrap";
import { ClientsService, RoleService, ProjectService } from "services";
import CustomBadge from "components/Generic/CustomBadge";

import useSWR from "swr";
import { ArrowUp, Edit, File, MoreVertical, Plus, Trash } from "react-feather";
import axios from "axios";
import DataTableWithButtons from "components/Generic/Table/index";
import { useRouter } from "next/router";
import GridTable from "components/grid-tables/gridTable";
import { useEffect } from "react";
const AllRoleTable = () => {
  const router = useRouter();
  const roleservice = new RoleService();
  const { data: rolesdata } = useSWR("LIST_ROLES", () =>
    roleservice.getRoles()
  );

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
      field: "RollName",
      // selector: (row) => row?.RollName,
      cell: (row) => row.RollName,
    },

    {
      sortable: true,
      field: "AccessType",
      selector: (row) => row.AccessType,
    },

    {
      sortable: true,
      field: "CreatedDate",
      cell: (row) => row.CreatedDate,
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
      cellRenderer: (row) => (
        <UncontrolledDropdown>
          <DropdownToggle tag="span">
            <MoreVertical size={17} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu end container="body">
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => e.preventDefault()}
            >
              <File size={14} className="me-50" />
              <span className="align-middle">View Details</span>
            </DropdownItem>

            <DropdownItem className="w-100">
              <Edit size={14} className="me-50" />
              <span className="align-middle">Edit Role</span>
            </DropdownItem>
            <DropdownItem className="w-100">
              <Trash size={14} className="me-50" />
              <span className="align-middle">Delete</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      ),
    },
  ];

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
              <button
                className="btn btn-primary"
                onClick={() => router.push("/settings/add-role")}
              >
                <Plus size={16} /> Create Role
              </button>
            </div>
          </div>
        </CardBody>
      </Card>
      <Card className="mt-4">
        <GridTable rowData={rolesdata} columnDefs={columns} pageSize={4}  searchText={undefined}/>
      </Card>
    </>
  );
};

export default AllRoleTable;
