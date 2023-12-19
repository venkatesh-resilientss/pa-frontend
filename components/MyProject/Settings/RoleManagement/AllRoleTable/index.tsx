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
import { Image } from "react-bootstrap";
import { useState, useEffect } from "react";
import CustomBadge from "components/Generic/CustomBadge";
import GridWithPagination from "@/components/dataTable/GridWithPagination";
import { toast } from "react-toastify";
import { TableLoading } from "@/components/Loaders";
import { debounce } from "@/commonFunctions/common";

const AllRoleTable = () => {
  const router = useRouter();

  const roleservice = new RoleService();
  const hasCreateRolePermission = hasPermission(
    "user_and_role_management",
    "create_role"
  );

  const [tableData, setTableData] = useState({
    data: [],
    total_records: 0,
  });
  const [filters, setFilters] = useState({
    search: "",
    limit: 10,
    offset: 0,
    pageNumber: 1,
  });
  const handleSearch = (e) => {
    const searchText = e.target.value;
    setFilters({
      ...filters,
      search: searchText,
    });
  };
  const [isLoading, setLoader] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = {
          ...filters,
        };
        const response = await roleservice.getRoles(queryParams);
        setTableData({
          data: response.result || [],
          total_records: response.total_records,
        });
        setLoader(false);
      } catch (error) {
        toast.error(error?.error || error?.Message || "Unable to get data");
        setLoader(false);
      }
    };
    fetchData();
  }, [filters]);
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

  const columns = [
    {
      sortable: true,
      field: "RoleName",
      // selector: (row) => row?.RollName,
      cell: (row) => {
        row?.RollName?.charAt(0).toUpperCase() + row?.RollName?.slice(1);
      },
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
        return <span>{params?.data?.CreatedDate?.split("T")[0]}</span>;
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
                  onChange={debounce(handleSearch, 200)}
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
        {isLoading ? (
          <TableLoading />
        ) : tableData.data.length === 0 ? (
          <NoDataPage
            buttonName={hasCreateRolePermission ? "Create Role" : "No button"}
            buttonLink={"/settings/roles?q=create_role"}
          />
        ) : (
          <GridWithPagination
            rowData={tableData}
            columnDefs={columns}
            limit={filters.limit}
            pageNumber={filters.pageNumber}
            setPageNumber={setFilters}
          />
        )}
      </div>
    </>
  );
};

export default AllRoleTable;
