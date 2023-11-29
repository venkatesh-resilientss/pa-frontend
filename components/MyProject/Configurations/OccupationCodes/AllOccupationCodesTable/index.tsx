import {
  Card,
  CardBody,
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  Input,
  Button,
} from "reactstrap";
import { ArrowUp, Edit, File, MoreVertical, Plus, Trash } from "react-feather";
import GridTable from "components/grid-tables/gridTable";
import CustomBadge from "components/Generic/CustomBadge";
import actionIcon from "assets/MyImages/charm_menu-kebab.svg";
import editIocn from "assets/myIcons/edit_square.svg";
import deleteIcon from "assets/myIcons/delete.svg";
import detailsIocn from "assets/myIcons/list.svg";
import axios from "axios";
import DataTableWithButtons from "components/Generic/Table/index";
import { useRouter } from "next/router";
import { SeriesService } from "services";
import moment from "moment";
import useSWR from "swr";
import { useDispatch } from "react-redux";
import {
  openBulkUploadSeriesPopup,
  openDeleteSeriesPopup,
} from "redux/slices/mySlices/configurations";
import Image from "next/image";
import { useState, useEffect } from "react";
import plusIcon from "assets/myIcons/plusIcon1.svg";
import plusWhiteIcon from "assets/myIcons/plus.svg";
import NoDataPage from "components/NoDataPage";
import { hasPermission } from "commonFunctions/functions";
import { checkTenant } from "constants/function";
import React from "react";

const AllOccupationCodesTable = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const ActionsButton = (props) => {
    console.log(props.data.id, "props");
    const id = `action-popover-${props.value}`;
    const [open, setOpen] = useState(false);
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
              className="w-100"
              onClick={(e) =>
                router.push(`/configurations/edit-occupation-codes/${props.data?.ID}`)
              }
            >
              <Action icon={editIocn} name={"Edit"} action={() => {}} />
            </DropdownItem>
            <DropdownItem
              tag="a"
              className="w-100"
              onClick={(e) => e.preventDefault()}
            >
              <Action
                icon={deleteIcon}
                name={"Delete"}
                action={() => {
                  dispatch(openDeleteSeriesPopup(props.data?.ID));
                }}
              />
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    );
  };
  const columnDefs = [
    {
      headerName: "OCC Code",
      field: "OCCCode",
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
      headerName: "WC Class",
      field: "WcClass",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },

    {
      headerName: "Employee Type",
      field: "EmployeeType",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },

    {
      headerName: "OFF Production",
      field: "OFFProduction",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
      
    },
    {
      headerName: "Agreements",
      field: "Agreements",
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
      id: 1,
      OCCCode: "SER001",
      WcClass: "WL",
      Description: "This is the first product series",
      EmployeeType: "CR",
      OFFProduction: "True",
      Agreements: "active",
    },
    {
      id: 2,
      OCCCode: "SER002",
      WcClass: "WC",
      Description: "This is the second product series",
      EmployeeType: "CR",
      OFFProduction: "True",
      Agreements: "inactive",
    },
    {
      id: 3,
      OCCCode: "SER003",
      WcClass: "WC",
      Description: "This is the third product series",
      EmployeeType: "TAL",
      OFFProduction: "False",
      Agreements: "active",
    },
    {
      id: 4,
      OCCCode: "SER003",
      WcClass: "WC",
      Description: "This is the third product series",
      EmployeeType: "TAL",
      OFFProduction: "True",
      Agreements: "inactive",
    },
    {
      id: 5,
      OCCCode: "SER003",
      WcClass: "WL",
      Description: "This is the third product series",
      EmployeeType: "CR",
      OFFProduction: "True",
      Agreements: "active",
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
                  All Occupation Codes
                </div>
              </div>

              <div
                className="d-flex align-items-center"
                style={{ gap: "10px" }}
              >
                <div style={{ fontSize: "16px", fontWeight: "400" }}>
                  {5} Occupation codes
                </div>

                <Input
                  onChange={(e) => setSearchText(e.target.value)}
                  type="search"
                  className="searchConfig"
                  placeholder="Search..."
                  style={{ width: "217px", height: "38px" }}
                />

                <Button
                  onClick={() => dispatch(openBulkUploadSeriesPopup("upload"))}
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

                <Button
                  onClick={() => router.push(`/configurations/add-occupation-codes`)}
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
                  Add New
                </Button>
                {/* {hasPermission(
                  "configuration_management",
                  "create_configuration"
                ) && (
                  <Button
                    onClick={() => router.push(`/configurations/add-series`)}
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
                    Add Series
                  </Button>
                )} */}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      
        <div className="mt-2">
          <GridTable
            rowData={rowData}
            columnDefs={columnDefs}
            pageSize={10}
            searchText={searchText}
          />
        </div>
     
       
    </div>
  );
};

export default AllOccupationCodesTable;
