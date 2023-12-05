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

const AllAgentsTable = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const ActionsButton = (props) => {
    return (
      <div className="d-flex align-items-center gap-2">
        {/* {hasPermission("user_and_role_management", "edit_user") && ( */}
          <div
           onClick={() =>router.push(`/configurations/edit-agent/${props.data?.ID}`)}
            className="cursor-pointer"
            style={{ backgroundColor: '#AED8FF',width:"30px",height:"30px", borderRadius:"20px" }}
          >
            <img src={"/icons/edit_square.svg"} alt="Edit" width={15} style={{marginTop:"6px",marginLeft:"8px"}} />
          </div>
        {/* )} */}
        {/* {hasPermission("user_and_role_management", "deactivate_user") && ( */}
          {/* <div
            onClick={() => handleDeleteClick(id)}
            className="cursor-pointer"
            style={{ backgroundColor: '#FCB3B3',width:"30px",height:"30px" , borderRadius:"20px"   }}
          >
            <img src={"/icons/delete.svg"} alt="Delete" width={15} style={{marginTop:"7px",marginLeft:"7px"}}/>
          </div> */}
        {/* )} */}
      </div>
    );
  };
  const columnDefs = [
    {
      headerName: "Agency Name",
      field: "CompanyCode",
      sortable: true,
      resizable: true,
      headerClass: "custom-header-class",
    },
    {
      headerName: "Agency Code",
      field: "CompanyName",
      sortable: true,
      resizable: true,
      headerClass: "custom-header-class",
    },
    {
      headerName: "Agency Address ",
      field: "CompanyAddress",
      sortable: true,
      resizable: true,
      headerClass: "custom-header-class",
    },
    {
      headerName: "Agent's Name ",
      field: "CompanyAddress",
      sortable: true,
      resizable: true,
      headerClass: "custom-header-class",
    },
    {
      headerName: "Action",
      field: "id",
      cellRenderer: ActionsButton,
      headerClass: "custom-header-class",
    },
  ];
  const rowData = [
    {
      id: 1,
      CompanyCode: "001",
      CompanyName: "Resilient Software Solutions LLC",
      CompanyAddress: "XYZ Address",
    },
    {
      id: 2,
      CompanyCode: "002",
      CompanyName: "Resilient Software Solutions LLC",
      CompanyAddress: "XYZ Address",

    },
    {
      id: 3,
      CompanyCode: "003",
      CompanyName: "Resilient Software Solutions LLC",
      CompanyAddress: "XYZ Address",
    },
    {
      id: 4,
      CompanyCode: "004",
      CompanyName: "Resilient Software Solutions LLC",
      CompanyAddress: " XYZ Address,XYZ Address,XYZ Address",
    },
    {
      id: 5,
      CompanyCode: "005",
      CompanyName: "Resilient Software Solutions LLC",
    },
  ];

  return (
    <div>
      <div className="section mt-4">
        <Card
          className="mt-2 agents-list"
        >
          <CardBody>
            <div className="d-flex justify-content-between">
              <div>
                <div
                  className="m-2 agents-header"
                >
                  Agents lists
                </div>
              </div>

              <div
                className="d-flex align-items-center"
                style={{ gap: "10px" }}
              >

                <Input
                  onChange={(e) => setSearchText(e.target.value)}
                  type="search"
                  className="searchConfig agents-search"
                  placeholder="Search..."
                />

                <Button
                  onClick={() => router.push(`/configurations/add-agent`)}
                  className="agents-new-button"
                >
                  <Image
                    className="agents-plus-image"
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

export default AllAgentsTable;
