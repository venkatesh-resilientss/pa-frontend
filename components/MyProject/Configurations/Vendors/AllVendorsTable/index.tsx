import {
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Button,
} from "reactstrap";
import AGGridTable from "@/components/grid-tables/AGGridTable";
import CustomBadge from "components/Generic/CustomBadge";
import actionIcon from "assets/MyImages/charm_menu-kebab.svg";
import editIocn from "assets/myIcons/edit_square.svg";

import { useRouter } from "next/router";
import { VendorsService } from "services";
import Image from "next/image";
import plusWhiteIcon from "assets/myIcons/plus.svg";
import { hasPermission } from "commonFunctions/functions";
import moment from "moment";
import NoDataPage from "components/NoDataPage";
import { getSessionVariables } from "@/constants/function";

const AllVendorsTable = ({ rerender, searchText, setSearchText }) => {
  const vendorsService = new VendorsService();
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

  // const hasDeactivateConfiguration = hasPermission(
  //   "configuration_management",
  //   "deactivate_configuration"
  // );

  const fetchData = async (pageNumber) => {
    const { clientID, projectID } = getSessionVariables();
    try {
      const response = await vendorsService.getVendors(
        {
          clientID,
          projectID,
        },
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
        value={props.value === true ? "Active" : "In-active"}
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
            {hasEditConfigurationPermission && (
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/configurations/edit-vendor/${props.data.ID}`);
                }}
              >
                <Action icon={editIocn} name={"Edit"} />
              </DropdownItem>
            )}
            {/* {hasDeactivateConfiguration && (
              <DropdownItem
                tag="a"
                className="w-100 cursor-pointer"
                onClick={() => dispatch(openDeleteVendorPopup(props.data?.ID))}
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
      headerName: "Vendor Code",
      field: "Code",
      sortable: true,
      unSortIcon: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
      cellRenderer: (row: any) => {
        if (typeof row.value === "number") {
          // If it's a number, just display it as is
          return <>{row.value}</>;
        } else if (typeof row.value === "string") {
          // If it's a string, display the uppercase version
          return <>{row.value.charAt(0).toUpperCase() + row.value.slice(1)}</>;
        } else {
          // Handle other types if needed
          return null;
        }
      },
    },
    {
      headerName: "Vendor Name",
      field: "Name",
      sortable: true,
      unSortIcon: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
      cellRenderer: (params) => {
        return (
          params?.data?.Name.charAt(0).toUpperCase() +
          params?.data?.Name.slice(1)
        );
      },
    },
    {
      headerName: "State",
      field: "State.Name",
      sortable: true,
      unSortIcon: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
      cellRenderer: (params) => {
        return (
          params?.data?.State?.Name.charAt(0).toUpperCase() +
          params?.data?.State?.Name.slice(1)
        );
      },
    },
    {
      headerName: "Created By",
      field: "Created",
      cellRenderer: (params) => {
        return (
          <div className="f-ellipsis">
            {(params?.data?.Created?.first_name.charAt(0).toUpperCase() +
              params?.data?.Created?.first_name?.slice(1) || "") +
              " " +
              (params?.data?.Created?.last_name.charAt(0).toUpperCase() +
                params?.data?.Created?.last_name?.slice(1) || "")}
          </div>
        );
      },
      sortable: true,
      unSortIcon: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
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
      cellStyle: { fontSize: "14px", fontWeight: "400", textAlign: "center" },
      headerClass: "custom-header-class",
    },
  ];

  return (
    <div>
      <div className="section mt-4">
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
                <div
                  className="m-2"
                  style={{ fontSize: "16px", fontWeight: "600" }}
                >
                  All Vendors
                </div>
              </div>

              <div
                className="d-flex align-items-center"
                style={{ gap: "10px" }}
              >
                <div style={{ fontSize: "16px", fontWeight: "400" }}>
                  Vendors
                </div>

                <Input
                  type="search"
                  className="searchConfig"
                  placeholder="Search..."
                  style={{ width: "217px", height: "38px" }}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                />

                {/* <Button
                  onClick={() => dispatch(openBulkUploadVendorsPopup("upload"))}
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
                  />{" "}
                  Bulk Upload
                </Button> */}

                {/* <Button
                  onClick={() => router.push(`/configurations/add-vendor`)}
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
                  Add Vendor
                </Button> */}
                {hasCreateConfiguration && (
                  <Button
                    onClick={() => router.push(`/configurations/add-vendor`)}
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
                    Add Vendor
                  </Button>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="mt-3">
        <AGGridTable
          rerender={rerender}
          columnDefs={columnDefs}
          searchText={searchText}
          fetchData={fetchData}
          pageSize={recordsPerPage}
          noDataPage={() => (
            <NoDataPage
              // buttonName={"Create COA"}
              buttonName={hasCreateConfiguration ? "Create COA" : ""}
              buttonLink={"/configurations/add-chart-of-accounts"}
            />
          )}
        />
      </div>
    </div>
  );
};

export default AllVendorsTable;
