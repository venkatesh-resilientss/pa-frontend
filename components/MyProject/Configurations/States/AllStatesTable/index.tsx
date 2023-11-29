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
import { ArrowUp, Edit, File, MoreVertical, Plus, Trash } from "react-feather";
import axios from "axios";
import DataTableWithButtons from "components/Generic/Table/index";
import { FcFilmReel } from "react-icons/fc";
import { useRouter } from "next/router";
import { StatesService } from "services";
import useSWR from "swr";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  openBulkUploadStatesPopup,
  openDeleteStatePopup,
} from "redux/slices/mySlices/configurations";
import GridTable from "components/grid-tables/gridTable";
import CustomBadge from "components/Generic/CustomBadge";
import actionIcon from "assets/MyImages/charm_menu-kebab.svg";
import editIocn from "assets/myIcons/edit_square.svg";
import deleteIcon from "assets/myIcons/delete.svg";
import detailsIocn from "assets/myIcons/list.svg";
import Image from "next/image";
import plusIcon from "assets/myIcons/plusIcon1.svg";
import plusWhiteIcon from "assets/myIcons/plus.svg";
import { hasPermission } from "commonFunctions/functions";

import { useState, useEffect } from "react";
import NoDataPage from "components/NoDataPage";
import { checkTenant } from "constants/function";

const AllStatesTable = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  const hasCreateConfiguration = hasPermission(
    "configuration_management",
    "create_configuration"
  );
  const hasEditConfigurationPermission = hasPermission(
    "configuration_management",
    "edit_configuration"
  );
  const hasDeactivateConfiguration = hasPermission(
    "configuration_management",
    "deactivate_configuration"
  );

  const statesService = new StatesService();

  const {
    data: statesData,
    isLoading: stateLoading,
    error: userError,
    mutate: userMutate,
  } = useSWR(["LIST_STATES", searchText], () => statesService.getStates());

  const dataSource = statesData?.data;

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

    const row = props.data;
    const id = `action-popover-${props.value}`;
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
                action={() => {}}
              />
            </DropdownItem> */}
            {hasEditConfigurationPermission && (
              <DropdownItem
                tag="a"
                className="w-100"
                onClick={(e) =>
                  router.push(`/configurations/edit-state/${props.data?.ID}`)
                }
              >
                <Action icon={editIocn} name={"Edit"} action={() => { }} />
              </DropdownItem>
            )}
            {hasDeactivateConfiguration && (
              <DropdownItem
                tag="a"
                className="w-100"
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
            )}
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
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "State Name",
      field: "Name",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Country",
      field: "Country.Name",
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
      // cellStyle: {
      //   textAlign: "center",
      // },
    },
  ];
  const rowData = [
    {
      id: 1,
      StateCode: "CA",
      StateName: "California",
      Country: "United States",
      Description: "Golden State",
      CreatedBy: "UserA",
      UpdatedOn: "2023-01-15",
      Status: "active",
    },
    {
      id: 2,
      StateCode: "NY",
      StateName: "New York",
      Country: "United States",
      Description: "Empire State",
      CreatedBy: "UserB",
      UpdatedOn: "2023-02-20",
      Status: "inactive",
    },
    {
      id: 3,
      StateCode: "ON",
      StateName: "Ontario",
      Country: "Canada",
      Description: "Province in Canada",
      CreatedBy: "UserC",
      UpdatedOn: "2023-03-25",
      Status: "active",
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
            <div className="d-flex justify-content-between">
              <div>
                <div
                  className="m-2"
                  style={{ fontSize: "16px", fontWeight: "600" }}
                >
                  All States
                </div>
              </div>

              <div
                className="d-flex align-items-center"
                style={{ gap: "10px" }}
              >
                <div style={{ fontSize: "16px", fontWeight: "400" }}>
                  {statesData?.data.length} States
                </div>

                <Input
                  onChange={(e) => setSearchText(e.target.value)}
                  type="search"
                  className="searchConfig"
                  placeholder="Search..."
                  style={{ width: "217px", height: "38px" }}
                />

                <Button
                  onClick={() => dispatch(openBulkUploadStatesPopup("upload"))}
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
      {stateLoading ? (
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
                // buttonName={"Add State"}
                buttonName={hasCreateConfiguration ? "Add State" : ""}
                buttonLink={"/configurations/add-state"}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllStatesTable;
