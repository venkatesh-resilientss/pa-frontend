import {
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
} from "reactstrap";
import { RoleService } from "services";
import Link from "next/link";
import useSWR from "swr";
import { MoreVertical, Plus } from "react-feather";
import { useRouter } from "next/router";
import GridTable from "components/grid-tables/gridTable";
import NoDataPage from "components/NoDataPage";
import { hasPermission } from "commonFunctions/functions";
// import { checkTenant } from "constants/function";
import moment from "moment";
import { Image } from "react-bootstrap";
import { useState } from "react";
import AGGridTable from "@/components/grid-tables/AGGridTable";

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

  // const { data: rolesdata, isLoading: rolesLoading } = useSWR(
  //   "LIST_ROLES",
  //   () => roleservice.getRoles()
  // );

  const fetchData1 = async (pageNumber) => {
    // setBankLoading(true)
    try {
      const response = await roleservice.getRoles({
        search: searchText,
        pageLimit: perPage,
        offset: pageNumber,
      });
      const data = response.result; // Adjust based on the actual structure of the response
      // setBankData(data)
      // setTotalRecords(response.total_records)
      const totalRecords = response.total_records; // Adjust based on the actual structure of the response
      return { data, totalRecords };
    } catch (error) {
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
      field: "Code",
      selector: (row) => row.Code,
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
              {/* {hasEditrolePermission && (
                <Link
                  href={`/settings/roles?q=edit_role&role_id=${row?.data?.ID}`}
                >
                  <DropdownItem
                    onClick={() => {
                      document.body.click();
                    }}
                    className="menu-item"
                  >
                    <div className="d-flex flex-row">
                      <Image
                        src="/edit_square.svg"
                        className="menu-item-icon"
                      />
                      <p className="menu-item-text mb-0">Edit Role</p>
                    </div>
                  </DropdownItem>
                </Link>
              )} */}
            </DropdownMenu>
          </UncontrolledDropdown>
        );
      },
    },
  ];

  // const deleteRole = (role_id) => {
  //   roleservice.delete_role(role_id).then(() => {
  //     mutateRoles();
  //     toast.success("Role delelted successfully");
  //   });
  // };

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
              {/* <div style={{ fontSize: "16px", fontWeight: "400" }}>
                  {bankData?.data.length} Banks
                </div> */}

              <Input
                onChange={(e) => setSearchText(e.target.value)}
                type="search"
                className="searchConfig"
                placeholder="Search..."
                style={{ width: "217px", height: "38px" }}
              />
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
      {/* {rolesLoading ? (
        <div className="mt-3">
          <GridTable
            rowData={rolesdata}
            columnDefs={columns}
            pageSize={10}
            searchText={searchText}
          />
        </div>
      ) : (
        <>
          {rolesdata?.length > 0 ? (
            <div className="mt-3">
              <GridTable
                rowData={rolesdata}
                columnDefs={columns}
                pageSize={10}
                searchText={searchText}
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
      )} */}

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
