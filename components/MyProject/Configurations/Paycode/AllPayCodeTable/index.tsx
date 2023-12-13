import {
  Card,
  CardBody,
  Input,
  Button,
} from "reactstrap";
import GridTable from "components/grid-tables/gridTable";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";
import plusWhiteIcon from "assets/myIcons/plus.svg";
import React from "react";

const AllpayCodesTable = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
    const ActionsButton = (props) => {
    return (
      <div className="d-flex align-items-center gap-2">
        {/* {hasPermission("user_and_role_management", "edit_user") && ( */}
          <div
           onClick={() =>router.push(`/configurations/edit-paycode/${props.data?.ID}`)}
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
      headerName: "Code",
      field: "OCCCode",
      sortable: true,
      resizable: true,
      width:"200px",
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: " Description",
      field: "Description",
      sortable: true,
      resizable: true,
      width:"200px",
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Short Description",
      field: "WcClass",
      width:"200px",

      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },

    {
      headerName: "Factor",
      field: "EmployeeType",
      width:"200px",

      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "H/N/U/S",
      field: "OCCCode",
      width:"200px",

      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: " TAXABLE",
      field: "Description",
      width:"200px",

      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "WORK Time",
      field: "WcClass",
      width:"200px",

      sortable: true,
      resizable: true,

      headerClass: "custom-header-class",
    },
    {
      headerName: "Over Time",
      field: "OCCCode",
      width:"200px",

      sortable: true,
      resizable: true,
      headerClass: "custom-header-class",
    },
    {
      headerName: " SUBJECT TO WC",
      field: "Description",
      width:"200px",

      sortable: true,
      resizable: true,
      headerClass: "custom-header-class",
    },
    {
      headerName: "SUBJECT TO PHW",
      field: "WcClass",
      width:"200px",
      sortable: true,
      resizable: true,
      headerClass: "custom-header-class",
    },
    {
      headerName: "STRAIGHT TIME",
      field: "OCCCode",
      width:"200px",

      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: " ALLOWANCE",
      field: "Description",
      width:"200px",

      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "SICK ACCRUAL",
      field: "WcClass",
      width:"200px",

      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },

    {
      headerName: "SICK TIME WORKED",
      field: "EmployeeType",
      width:"200px",

      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "VAC ACCRUAL",
      field: "OCCCode",
      width:"200px",

      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: " VAC WORKED",
      field: "Description",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "HOL ACCRUAL",
      field: "WcClass",
      sortable: true,
      width:"200px",

      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "H-N-W",
      field: "OCCCode",
      width:"200px",

      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "HOL WORKED",
      field: "Description",
      width:"200px",

      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "ADD TO PREM OT CALC",
      field: "WcClass",
      sortable: true,
      width:"200px",

      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "CATEGORY",
      field: "Description",
      width:"200px",

      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "GL CODE",
      field: "WcClass",
      width:"200px",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Action",
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
                  Pay Codes List
                </div>
              </div>

              <div
                className="d-flex align-items-center"
                style={{ gap: "10px" }}
              >
                <Input
                  onChange={(e) => setSearchText(e.target.value)}
                  type="search"
                  className="searchConfig"
                  placeholder="Search..."
                  style={{ width: "217px", height: "38px" }}
                />

                <Button
                  onClick={() => router.push(`/configurations/add-paycode`)}
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
                    onClick={() => router.push(`/configurations/add-paycode`)}
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

export default AllpayCodesTable;
