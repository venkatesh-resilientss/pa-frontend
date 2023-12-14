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

import { useRouter } from "next/router";
import { StatesService } from "services";
import moment from "moment";
import { useDispatch } from "react-redux";
import { openBulkUploadStatesPopup } from "redux/slices/mySlices/configurations";
import CustomBadge from "components/Generic/CustomBadge";
import actionIcon from "assets/MyImages/charm_menu-kebab.svg";
import editIocn from "assets/myIcons/edit_square.svg";
import Image from "next/image";
import plusIcon from "assets/myIcons/plusIcon1.svg";
import plusWhiteIcon from "assets/myIcons/plus.svg";
import { hasPermission } from "commonFunctions/functions";
import NoDataPage from "components/NoDataPage";
import AGGridTable from "@/components/grid-tables/AGGridTable";

const AllStatesTable = ({ rerender, searchText, setSearchText }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const recordLimit = 10;

  const hasCreateConfiguration = hasPermission(
    "configuration_management",
    "create_configuration"
  );
  const hasEditConfigurationPermission = hasPermission(
    "configuration_management",
    "edit_configuration"
  );
  const hasBulkUploadConfiguration = hasPermission("", "bulk_upload");

  const statesService = new StatesService();

  const fetchData = async (pageNumber) => {
    try {
      const response = await statesService.getStates({
        search: searchText,
        pageLimit: recordLimit,
        offset: pageNumber,
      });
      const data = response.data; // Adjust based on the actual structure of the response

      const totalRecords = response.total_records; // Adjust based on the actual structure of the response
      return { data, totalRecords };
    } catch (error) {
      return { data: null, totalRecords: 0 };
    } finally {
      // setBankLoading(false)
    }
  };

  function myComparator(value1, value2) {
    if (value1 === null && value2 === null) {
      return 0;
    }
    if (value1 === null) {
      return -1;
    }
    if (value2 === null) {
      return 1;
    }
    return value1 - value2;
  }

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

    const Action = ({ icon, name, action }) => {
      return (
        <div onClick={action} className="d-flex align-items-center gap-2">
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
                className="w-100"
                onClick={() =>
                  router.push(`/configurations/edit-state/${props.data?.ID}`)
                }
              >
                <Action
                  icon={editIocn}
                  name={"Edit"}
                  action={() => {
                    //
                  }}
                />
              </DropdownItem>
            )}
            {/* {hasDeactivateConfiguration && (
              <DropdownItem
                tag="a"
                className="w-100 cursor-pointer"
                onClick={(e) => e.preventDefault()}
              >
                <Action
                  icon={deleteIcon}
                  name={"Delete"}
                  action={() => {
                    dispatch(openDeleteStatePopup(props.data.ID));
                  }}
                />
              </DropdownItem>
            )} */}
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    );
  };
  const columnDefs = [
    {
      headerName: "State Code",
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
      headerName: "State Name",
      field: "Name",
      sortable: true,
      unSortIcon: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
      comparator: myComparator,

      valueFormatter: (params) =>
        params?.data?.Name?.charAt(0).toUpperCase() +
        params?.data?.Name?.slice(1),
    },
    {
      headerName: "Country",
      field: "Country.Name",
      sortable: true,
      unSortIcon: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
      comparator: myComparator,

      cellRenderer: (params: any) => {
        return (
          <>
            {params?.data?.Country?.Name.charAt(0).toUpperCase() +
              params?.data?.Country?.Name.slice(1)}
          </>
        );
      },
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
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },

    {
      headerName: "Updated On",
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
      field: "id",
      cellRenderer: ActionsButton,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
      // cellStyle: {
      //   textAlign: "center",
      // },
    },
  ];

  return (
    <div>
      <div className="section">
        <Card
          className="mt-2"
          style={{
            backgroundColor: "#E7EFFF",
            boxShadow: "0px 2.53521px 10.14085px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          <CardBody>
            <div className="d-flex justify-content-between configuration-table">
              <div>
                <div className="m-2 title">All States</div>
              </div>

              <div
                className="d-flex align-items-center"
                style={{ gap: "10px" }}
              >
                <div style={{ fontSize: "16px", fontWeight: "400" }}>
                  States
                </div>

                <Input
                  onChange={(e) => setSearchText(e.target.value)}
                  type="search"
                  className="searchConfig"
                  placeholder="Search..."
                  style={{ width: "217px", height: "38px" }}
                />

                {hasBulkUploadConfiguration && (
                  <Button
                    onClick={() =>
                      dispatch(openBulkUploadStatesPopup("upload"))
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
                    />{" "}
                    Bulk Upload
                  </Button>
                )}

                {/* <Button
                  style={{
                    height: "38px",
                    backgroundColor: "#00AEEF",
                    fontSize: "14px",
                    fontWeight: "600",
                    border: "none",
                  }}
                  onClick={() => router.push(`/configurations/add-state`)}
                >
                  <Image
                    style={{ width: "14px", height: "14px" }}
                    src={plusWhiteIcon}
                    alt="plus-icon"
                  />{" "}
                  Add State
                </Button> */}
                {hasCreateConfiguration && (
                  <Button
                    style={{
                      height: "38px",
                      backgroundColor: "#00AEEF",
                      fontSize: "14px",
                      fontWeight: "600",
                      border: "none",
                    }}
                    onClick={() => router.push(`/configurations/add-state`)}
                  >
                    <Image
                      style={{ width: "14px", height: "14px" }}
                      src={plusWhiteIcon}
                      alt="plus-icon"
                    />{" "}
                    Add State
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
          pageSize={recordLimit}
          noDataPage={() => (
            <NoDataPage
              // buttonName={"Add State"}
              buttonName={hasCreateConfiguration ? "Add State" : ""}
              buttonLink={"/configurations/add-state"}
            />
          )}
        />
      </div>
    </div>
  );
};

export default AllStatesTable;
