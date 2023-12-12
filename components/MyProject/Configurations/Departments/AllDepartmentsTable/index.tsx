import {
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Input,
} from "reactstrap";
import AGGridTable from "@/components/grid-tables/AGGridTable";
import actionIcon from "assets/MyImages/charm_menu-kebab.svg";
import editIocn from "assets/myIcons/edit_square.svg";
import plusIcon from "assets/myIcons/plusIcon1.svg";
import plusWhiteIcon from "assets/myIcons/plus.svg";
import { hasPermission } from "commonFunctions/functions";
import { useRouter } from "next/router";
import { DepartmentsService } from "services";
import moment from "moment";
import { openBulkUploadDepartmentPopup } from "redux/slices/mySlices/configurations";
import { useDispatch } from "react-redux";
import CustomBadge from "components/Generic/CustomBadge";

import Image from "next/image";
import NoDataPage from "components/NoDataPage";

const AllDepartmentsTable = ({ rerender, searchText, setSearchText }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const recordsPerPage = 10;

  const hasCreateConfiguration = hasPermission(
    "configuration_management",
    "create_configuration"
  );
  const hasEditConfigurationPermission = hasPermission(
    "configuration_management",
    "edit_configuration"
  );
  const hasUploadConfigurationPermission = hasPermission("", "bulk_upload") &&  hasCreateConfiguration;
  // const hasDeactivateConfiguration = hasPermission(
  //   "configuration_management",
  //   "deactivate_configuration"
  // );

  const departmentsService = new DepartmentsService();

  // const { data: departmentsData, isLoading: departmentLoading } = useSWR(
  //   ["LIST_DEPARTMENTS", searchText],
  //   () => departmentsService.getDepartments()
  // );

  // const dataSource = departmentsData && departmentsData.result;
  const fetchData = async (pageNumber) => {
    const clientId = parseInt(sessionStorage.getItem("clientId")) || 0;
    try {
      const response = await departmentsService.getDepartments(
        { clientId: clientId },
        {
          search: searchText,
          pageLimit: recordsPerPage,
          offset: pageNumber,
        }
      );
      const data = response.result; // Adjust based on the actual structure of the response
      const totalRecords = response.total_records; // Adjust based on the actual structure of the response
      return { data, totalRecords };
    } catch (error) {
      return { data: null, totalRecords: 0 };
    }
  };

  const StateBadge = (props) => {
    const sateDir = {
      true: "success",
      false: "danger",
    };
    return (
      <CustomBadge
        bg={sateDir[props.value]}
        value={props.value ? "Active" : "In-active"}
      />
    );
  };

  const ActionsButton = (props) => {
    const id = `action-popover-${props.value}`;

    const Action = ({ icon, name }) => {
      return (
        <div className="d-flex align-items-center gap-2">
          <Image src={icon} alt={name} />
          <p>{name}</p>
        </div>
      );
    };
    return (
      <div className="cursor-pointer">
        <UncontrolledDropdown>
          <DropdownToggle tag="span">
            <Image
              src={actionIcon}
              alt=""
              width={14}
              id={id}
              style={{ marginLeft: "20px" }}
            />
          </DropdownToggle>
          <DropdownMenu end container="body">
            {/* <DropdownItem className="w-100">
              <Action
                icon={detailsIocn}
                name={"View Details"}
                
              />
            </DropdownItem> */}
            {hasEditConfigurationPermission && (
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  router.push({
                    pathname: `/configurations/edit-department/${props.data?.ID}`,
                  });
                }}
              >
                <Action icon={editIocn} name={"Edit"} />
              </DropdownItem>
            )}
            {/* {hasDeactivateConfiguration && (
              <DropdownItem
                tag="a"
                className="w-100 cursor-pointer"
                onClick={() =>
                  dispatch(openDeleteDepartmentPopup(props.data?.ID))
                }
              >
                <Action icon={deleteIcon} name={"Delete"} />
              </DropdownItem>
            )} */}
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    );
  };
  const columnDefs = [
    {
      headerName: "Department Code",
      field: "Code",
      sortable: true,
      resizable: true,
      unSortIcon: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Department Name",
      field: "Name",
      sortable: true,
      resizable: true,
      unSortIcon: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Description",
      field: "Description",
      sortable: true,
      resizable: true,
      unSortIcon: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Created By",
      field: "Created",
      cellRenderer: (params) => {
        return (
          <div className="f-ellipsis">
            {(params?.data?.Created?.first_name || "") +
              " " +
              (params?.data?.Created?.last_name || "")}
          </div>
        );
      },
      sortable: true,
      unSortIcon: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      resizable: true,
      headerClass: "custom-header-class",
    },

    {
      headerName: "Updated On",
      field: "UpdatedDate",
      cellRenderer: (params) => {
        const formattedDate = moment(params.value).format("YYYY-MM-DD");
        return <div>{formattedDate}</div>;
      },
      sortable: true,
      unSortIcon: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Status",
      field: "IsActive",
      cellRenderer: StateBadge,
      sortable: true,
      unSortIcon: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },

    {
      headerName: "Options",
      field: "ID",
      cellRenderer: ActionsButton,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
  ];
  return (
    <div className="section mt-4 configuration-table">
      <div>
        <Card
          style={{
            backgroundColor: "#E7EFFF",
            boxShadow: "0px 2.53521px 10.14085px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          <CardBody>
            <div className="d-flex justify-content-between">
              <div>
                <div className="m-2 title">All Departments</div>
              </div>

              <div
                className="d-flex align-items-center"
                style={{ gap: "10px" }}
              >
                <div style={{ fontSize: "16px", fontWeight: "400" }}>
                  Departments
                </div>

                <Input
                  onChange={(e) => setSearchText(e.target.value)}
                  type="search"
                  className="searchConfig"
                  placeholder="Search..."
                  style={{ width: "217px", height: "38px" }}
                />

                {hasUploadConfigurationPermission && (
                  <Button
                    onClick={() =>
                      dispatch(openBulkUploadDepartmentPopup("bulkUpload"))
                    }
                    style={{
                      height: "38px",
                      backgroundColor: "#E7EFFF",
                      color: "#4C4C61",
                      fontSize: "14px",
                      fontWeight: "600",
                      borderColor: "#4C4C61",
                    }}
                  >
                    <Image
                      style={{ width: "14px", height: "14px" }}
                      src={plusIcon}
                      alt="plus-icon"
                    />
                    Bulk Upload
                  </Button>
                )}

                {/* <Button
                  onClick={() => router.push(`/configurations/add-department`)}
                  style={{
                    height: "38px",
                    backgroundColor: "#00AEEF",
                    fontSize: "14px",
                    fontWeight: "600",
                    border: "none",
                  }}
                >
                  <Image
                    style={{ width: "14px", height: "14px" }}
                    src={plusWhiteIcon}
                    alt="plus-icon"
                  />{" "}
                  Create Department
                </Button> */}
                {hasCreateConfiguration && (
                  <Button
                    onClick={() =>
                      router.push(`/configurations/add-department`)
                    }
                    style={{
                      height: "38px",
                      backgroundColor: "#00AEEF",
                      fontSize: "14px",
                      fontWeight: "600",
                      border: "none",
                    }}
                  >
                    <Image
                      style={{ width: "14px", height: "14px" }}
                      src={plusWhiteIcon}
                      alt="plus-icon"
                    />{" "}
                    Create Department
                  </Button>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      {/* {departmentLoading ? (
        <div className="mt-3">
          <GridTable
            rowData={dataSource}
            columnDefs={columnDefs}
            pageSize={10}
            searchText={searchText}
          />
        </div>
      ) : (
        <>
          {dataSource?.length > 0 ? (
            <div className="mt-3">
              <GridTable
                rowData={dataSource}
                columnDefs={columnDefs}
                pageSize={10}
                searchText={searchText}
              />
            </div>
          ) : (
            <div>
              <NoDataPage
                // buttonName={"Create Department"}
                buttonName={
                  hasCreateConfiguration ? "Create Department" : "No button"
                }
                buttonLink={"/configurations/add-department"}
              />
            </div>
          )}
        </>
      )} */}
      <div className="mt-3">
        <AGGridTable
          rerender={rerender}
          columnDefs={columnDefs}
          searchText={searchText}
          fetchData={fetchData}
          pageSize={recordsPerPage}
          noDataPage={() => (
            <NoDataPage
              buttonName={hasCreateConfiguration ? "Create Set" : "No button"}
              buttonLink={"/configurations/add-set"}
            />
          )}
        />
      </div>
    </div>
  );
};

export default AllDepartmentsTable;
