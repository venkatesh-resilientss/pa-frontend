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
import Link from "next/link";
import { MoreVertical, Plus } from "react-feather";
import { useRouter } from "next/router";
import NoDataPage from "components/NoDataPage";
import { hasPermission } from "commonFunctions/functions";
// import { checkTenant } from "constants/function";
import moment from "moment";
import { Image } from "react-bootstrap";
import { useState } from "react";
import AGGridTable from "@/components/grid-tables/AGGridTable";
import CustomBadge from "components/Generic/CustomBadge";

const AllRoleTable = () => {
  const router = useRouter();
  //
  const [searchText, setSearchText] = useState("");
  const [rerender, setRerender] = useState(false);
  const perPage = 10;

  const roleservice = new RoleService();
  const hasCreateRolePermission = hasPermission(
    "user_and_role_management",
    "create_role"
  );

  // const hasDeactivateRolePermission = hasPermission(
  //   "user_and_role_management",
  //   "deactivate_role"
  // );

  const StateBadge = (props) => {
    const stateDir = {
      true: "success",
      false: "danger",
    };
    return (
      <CustomBadge
        bg={stateDir[props.value]}
        value={props.value ? "Active" : "In-active"}
      />
    );
  };

  const fetchData1 = async (pageNumber) => {
    // setBankLoading(true)
    try {
      const response = await roleservice.getRoles({
        search: searchText,
        pageLimit: perPage,
        offset: pageNumber,
      });
      const data = response.result; // Adjust based on the actual structure of the response

      const totalRecords = response.total_records; // Adjust based on the actual structure of the response
      return { data, totalRecords };
    } catch (error) {
      setRerender(!rerender);
      return { data: null, totalRecords: 0 };
    } finally {
      // setBankLoading(false)
    }
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

      cellRenderer: (params) => {
        if (params?.data?.AccessType === "restricted") {
          return "Restricted Access";
        } else if (params?.data?.AccessType === "full_access") {
          return "Full Access";
        }
        // If the condition does not match, return the original value
        return params?.data?.AccessType;
      },
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
      field: "IsActive",
      cellRenderer: StateBadge,
      cellStyle: { fontSize: "16px", fontWeight: "400" },
      headerClass: "custom-header-class",
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
              <>{row.ID}</>
              <Link
                href={`/settings/roles?q=view_role&role_id=${row?.data?.ID}`}
              >
                <DropdownItem
                  onClick={() => {
                    document.body.click();
                  }}
                  className="menu-item"
                >
                  <div className="d-flex flex-row">
                    <Image src="/edit_square.svg" className="menu-item-icon" />
                    <p className="menu-item-text mb-0">View/Edit Role</p>
                  </div>
                </DropdownItem>
              </Link>
            </DropdownMenu>
          </UncontrolledDropdown>
        );
      },
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
            <div className="d-flex align-items-center" style={{ gap: "10px" }}>
              <Form>
                <input
                  className="search mr-2"
                  onChange={(e) => setSearchText(e.target.value)}
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

      <div className="mt-3">
        <AGGridTable
          rerender={rerender}
          columnDefs={columns}
          searchText={searchText}
          fetchData={fetchData1}
          pageSize={perPage}
          noDataPage={() => (
            <NoDataPage
              buttonName={hasCreateRolePermission ? "Create Role" : "No button"}
              buttonLink={"/settings/add-role"}
            />
          )}
        />
      </div>
    </>
  );
};

export default AllRoleTable;
