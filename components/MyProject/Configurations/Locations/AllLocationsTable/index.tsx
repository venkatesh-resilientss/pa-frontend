import {
  Card,
  CardBody,
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  Button,
  Input,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { UserInfo } from "redux/slices/mySlices/roles";
import { ArrowUp, Edit, File, MoreVertical, Plus, Trash } from "react-feather";
import GridTable from "components/grid-tables/gridTable";
import actionIcon from "assets/MyImages/charm_menu-kebab.svg";
import editIocn from "assets/myIcons/edit_square.svg";
import deleteIcon from "assets/myIcons/delete.svg";
import detailsIocn from "assets/myIcons/list.svg";
import CustomBadge from "components/Generic/CustomBadge";
import { hasPermission } from "commonFunctions/functions";
import axios from "axios";
import DataTableWithButtons from "components/Generic/Table/index";
import { FcFilmReel } from "react-icons/fc";
import { useRouter } from "next/router";
import { LocationsService } from "services";
import useSWR from "swr";
import moment from "moment";
import {
  openBulkUploadLocationsPopup,
  openDeleteLocationPopup,
} from "redux/slices/mySlices/configurations";
import { useState, useEffect } from "react";
import Image from "next/image";
import plusIcon from "assets/myIcons/plusIcon1.svg";
import plusWhiteIcon from "assets/myIcons/plus.svg";
import NoDataPage from "components/NoDataPage";
import { checkTenant } from "constants/function";

const AllLocationsTable = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
   
  const hasCreateConfiguration = hasPermission(
    "configuration_management",
    "create_configuration"
  );

  const locationsService = new LocationsService();

  const {
    data: locationsData,
    isLoading: locationsLoading,
    error: userError,
    mutate: userMutate,
  } = useSWR(["LIST_LOCATIONS", searchText], () =>
    locationsService.getLocations()
  );
  const dataSource = locationsData?.result;

  const AddLocation = (e) => {
    e.preventDefault();
    router.push({
      pathname: `/configurations/add-location`,
    });
  };
  const StateBadge = (props) => {
    const sateDir = {
      true: "success",
      false: "danger",
    };
    return (
      <CustomBadge
        bg={sateDir[props.value]}
        value={props.value ? "active" : "In-active"}
      />
    );
  };

  const ActionsButton = (props) => {
    const id = `action-popover-${props.value}`;

    console.log("PROPS", props);

    const [open, setOpen] = useState(false);

    const toggle = () => {
      setOpen(!open);
    };
    const Action = ({ icon, name, action }) => {
      return (
        <div onClick={action} className="d-flex align-items-center gap-2">
          <Image src={icon} alt={name} />
          <p>{name}</p>
        </div>
      );
    };
    return (
      <div>
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
            <DropdownItem className="w-100">
              <Action
                icon={detailsIocn}
                name={"View Details"}
                action={() => {}}
              />
            </DropdownItem>
            <DropdownItem
              tag="a"
              className="w-100 cursor-pointer"
              onClick={(e) =>
                router.push(`/configurations/edit-location/${props.data.ID}`)
              }
            >
              <Action icon={editIocn} name={"Edit"} action={() => {}} />
            </DropdownItem>
            <DropdownItem
              tag="a"
              className="w-100 cursor-pointer"
              onClick={(e) => dispatch(openDeleteLocationPopup(props.data.ID))}
            >
              <Action icon={deleteIcon} name={"Delete"} action={() => {}} />
            </DropdownItem>
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
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Location Name",
      field: "Name",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Description",
      field: "Description",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Created By",
      field: "CreatedBy",
      sortable: true,
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
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Status",
      field: "IsActive",
      cellRenderer: StateBadge,
      sortable: true,
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
  const rowData = [
    {
      LocationCode: "001",
      LocationName: "Location A",
      Description: "Description",
      CreatedBy: "John Doe",
      UpdatedOn: "2023-11-13",
      Status: "active",
      id: 1,
    },
    {
      LocationCode: "002",
      LocationName: "Location B",
      Description: "Description",
      CreatedBy: "Jane Smith",
      UpdatedOn: "2023-11-12",
      Status: "inactive",
      id: 2,
    },
    {
      LocationCode: "003",
      LocationName: "Location C",
      Description: "Description",
      CreatedBy: "Mike Johnson",
      UpdatedOn: "2023-11-11",
      Status: "active",
      id: 3,
    },
    {
      LocationCode: "004",
      LocationName: "Location D",
      Description: "Description",
      CreatedBy: "Sara Williams",
      UpdatedOn: "2023-11-10",
      Status: "inactive",
      id: 4,
    },
    {
      LocationCode: "005",
      LocationName: "Location E",
      Description: "Description",
      CreatedBy: "David Brown",
      UpdatedOn: "2023-11-09",
      Status: "active",
      id: 5,
    },
    {
      LocationCode: "006",
      LocationName: "Location F",
      Description: "Description",
      CreatedBy: "Emily Davis",
      UpdatedOn: "2023-11-08",
      Status: "inactive",
      id: 6,
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
                  All Locations
                </div>
              </div>

              <div
                className="d-flex align-items-center"
                style={{ gap: "10px" }}
              >
                <div style={{ fontSize: "16px", fontWeight: "400" }}>
                  {locationsData?.result.length} Locations
                </div>

                <Input
                  onChange={(e) => setSearchText(e.target.value)}
                  type="search"
                  className="searchConfig"
                  placeholder="Search..."
                  style={{ width: "217px", height: "38px" }}
                />

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
      {locationsLoading ? (
        <div className="mt-2">
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
            <div className="mt-2">
              <GridTable
                rowData={dataSource}
                columnDefs={columnDefs}
                pageSize={9}
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
      )}
    </div>
  );
};

export default AllLocationsTable;
