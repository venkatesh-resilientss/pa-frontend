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
import { useDispatch } from "react-redux";
// import GridTable from "components/grid-tables/gridTable";
import actionIcon from "assets/MyImages/charm_menu-kebab.svg";
import editIocn from "assets/myIcons/edit_square.svg";
import CustomBadge from "components/Generic/CustomBadge";
import { hasPermission } from "commonFunctions/functions";
import { useRouter } from "next/router";
import { LocationsService } from "services";
import moment from "moment";
import { openBulkUploadLocationsPopup } from "redux/slices/mySlices/configurations";
import Image from "next/image";
import plusIcon from "assets/myIcons/plusIcon1.svg";
import plusWhiteIcon from "assets/myIcons/plus.svg";
import NoDataPage from "components/NoDataPage";
import { getSessionVariables } from "@/constants/function";
import AGGridTable from "@/components/grid-tables/AGGridTable";

const AllLocationsTable = ({ rerender, searchText, setSearchText }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const perPage = 10;

  const hasCreateConfiguration = hasPermission(
    "configuration_management",
    "create_configuration"
  );

  const hasEditConfigurationPermission = hasPermission(
    "configuration_management",
    "edit_configuration"
  );

  const hasUploadConfigurationPermission =
    hasPermission("", "bulk_upload") && hasCreateConfiguration;
  // const hasDeactivateConfiguration = hasPermission(
  //   "configuration_management",
  //   "deactivate_configuration"
  // );

  const locationsService = new LocationsService();

  const fetchData1 = async (pageNumber) => {
    try {
      const { clientID, projectID } = getSessionVariables();
      const queryParams = {
        search: searchText,
        pageLimit: perPage,
        offset: pageNumber,
      };
      const payload = { clientId: clientID, projectId: projectID };
      const response = await locationsService.getLocations(
        queryParams,
        payload
      );
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
                className="w-100 cursor-pointer"
                onClick={() =>
                  router.push(`/configurations/edit-location/${props.data.ID}`)
                }
              >
                <Action icon={editIocn} name={"Edit"} />
              </DropdownItem>
            )}
            {/* {hasDeactivateConfiguration && (
              <DropdownItem
                tag="a"
                className="w-100 cursor-pointer"
                onClick={() => dispatch(openDeleteLocationPopup(props.data.ID))}
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
      headerName: "Location Code",
      field: "Code",
      sortable: true,
      unSortIcon: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Location Name",
      field: "Name",
      sortable: true,
      unSortIcon: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Description",
      field: "Description",
      sortable: true,
      unSortIcon: true,
      resizable: true,
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
      field: "id",
      cellRenderer: ActionsButton,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
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
              <div className="configuration-table">
                <div className="m-2 title">All Locations</div>
              </div>

              <div
                className="d-flex align-items-center"
                style={{ gap: "10px" }}
              >
                {/* <div style={{ fontSize: "16px", fontWeight: "400" }}>
                  {locationsData?.result.length} Locations
                </div> */}

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
                      dispatch(openBulkUploadLocationsPopup("upload"))
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
                  onClick={() => router.push(`/configurations/add-location`)}
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
                  Add Location
                </Button> */}
                {hasCreateConfiguration && (
                  <Button
                    onClick={() => router.push(`/configurations/add-location`)}
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
                    Add Location
                  </Button>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      {/* {locationsLoading ? (
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
          {locationsData?.result.length > 0 ? (
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
                // buttonName={"Create Location"}
                buttonName={
                  hasCreateConfiguration ? "Create Location" : "No button"
                }
                buttonLink={"/configurations/add-location"}
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
          fetchData={fetchData1}
          pageSize={perPage}
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

export default AllLocationsTable;
