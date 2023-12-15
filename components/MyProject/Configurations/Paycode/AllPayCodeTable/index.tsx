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
import { PaycodesService } from "services";
import useSWR from "swr";
import CustomBadge from "components/Generic/CustomBadge";

const AllpayCodesTable = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const paycodesService = new PaycodesService();

  const { data: rowData } = useSWR(
    ["LIST_PAYCODES", searchText],
    () => paycodesService.getPaycodes()
  );


  const ActionsButton = (props) => {
    return (
      <div className="d-flex align-items-center gap-2">
        {/* {hasPermission("user_and_role_management", "edit_user") && ( */}
        <div
          onClick={() => router.push(`/configurations/edit-paycode/${props.data?.ID}`)}
          className="cursor-pointer"
          style={{ backgroundColor: '#AED8FF', width: "30px", height: "30px", borderRadius: "20px" }}
        >
          <img src={"/icons/edit_square.svg"} alt="Edit" width={15} style={{ marginTop: "6px", marginLeft: "8px" }} />
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

  const StateBadge = (props) => {
    const sateDir = {
      true: "success",
      false: "danger",
    };
    return (
      <CustomBadge
        bg={sateDir[props.value]}
        value={props.value === true ? "active" : "In-active"}
      />
    );
  };

  const columnDefs = [
    {
      headerName: "Code",
      field: "Code",
      sortable: true,
      resizable: true,
      width: "200px",
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: " Description",
      field: "Description",
      sortable: true,
      resizable: true,
      width: "200px",
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Short Description",
      field: "ShortName",
      width: "200px",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },

    {
      headerName: "Factor",
      field: "Factor",
      width: "200px",

      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "H/N/U/S",
      field: "Hnus",
      width: "200px",

      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: " TAXABLE",
      field: "Taxable",
      width: "200px",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
      cellRenderer: (params) => {
        return params.value ? (
          <span style={{ color: '#0A9B58' }}>&#10004;</span>
        ) : (
          <span style={{ color: 'red' }}>&#10008;</span>
        );
      }
    },
    {
      headerName: "WORK Time",
      field: "WorkTime",
      width: "200px",
      sortable: true,
      resizable: true,
      headerClass: "custom-header-class",
      cellRenderer: (params) => {
        return params.value ? (
          <span style={{ color: '#0A9B58' }}>&#10004;</span>
        ) : (
          <span style={{ color: 'red' }}>&#10008;</span>
        );
      }
    },
    {
      headerName: "Over Time",
      field: "OverTime",
      width: "200px",
      sortable: true,
      resizable: true,
      headerClass: "custom-header-class",
      cellRenderer: (params) => {
        return params.value ? (
          <span style={{ color: '#0A9B58' }}>&#10004;</span>
        ) : (
          <span style={{ color: 'red' }}>&#10008;</span>
        );
      }
    },
    {
      headerName: " SUBJECT TO WC",
      field: "SubjectToWc",
      width: "200px",

      sortable: true,
      resizable: true,
      headerClass: "custom-header-class",
      cellRenderer: (params) => {
        return params.value ? (
          <span style={{ color: '#0A9B58' }}>&#10004;</span>
        ) : (
          <span style={{ color: 'red' }}>&#10008;</span>
        );
      }
    },
    {
      headerName: "SUBJECT TO PHW",
      field: "SubjectToPhw",
      width: "200px",
      sortable: true,
      resizable: true,
      headerClass: "custom-header-class",
      cellRenderer: (params) => {
        return params.value ? (
          <span style={{ color: '#0A9B58' }}>&#10004;</span>
        ) : (
          <span style={{ color: 'red' }}>&#10008;</span>
        );
      }
    },
    {
      headerName: "STRAIGHT TIME",
      field: "StraightTime",
      width: "200px",

      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
      cellRenderer: (params) => {
        return params.value ? (
          <span style={{ color: '#0A9B58' }}>&#10004;</span>
        ) : (
          <span style={{ color: 'red' }}>&#10008;</span>
        );
      }
    },
    {
      headerName: " ALLOWANCE",
      field: "Allowance",
      width: "200px",

      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
      cellRenderer: (params) => {
        return params.value ? (
          <span style={{ color: '#0A9B58' }}>&#10004;</span>
        ) : (
          <span style={{ color: 'red' }}>&#10008;</span>
        );
      }
    },
    {
      headerName: "SICK ACCRUAL",
      field: "SickAccrual",
      width: "200px",

      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
      cellRenderer: (params) => {
        return params.value ? (
          <span style={{ color: '#0A9B58' }}>&#10004;</span>
        ) : (
          <span style={{ color: 'red' }}>&#10008;</span>
        );
      }
    },

    {
      headerName: "SICK TIME WORKED",
      field: "SickWorked",
      width: "200px",

      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
      cellRenderer: (params) => {
        return params.value ? (
          <span style={{ color: '#0A9B58' }}>&#10004;</span>
        ) : (
          <span style={{ color: 'red' }}>&#10008;</span>
        );
      }
    },
    {
      headerName: "VAC ACCRUAL",
      field: "VacationAccrual",
      width: "200px",

      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
      cellRenderer: (params) => {
        return params.value ? (
          <span style={{ color: '#0A9B58' }}>&#10004;</span>
        ) : (
          <span style={{ color: 'red' }}>&#10008;</span>
        );
      }
    },
    {
      headerName: " VAC WORKED",
      field: "VacationWorked",
      sortable: true,
      resizable: true,
      width: "200px",
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
      cellRenderer: (params) => {
        return params.value ? (
          <span style={{ color: '#0A9B58' }}>&#10004;</span>
        ) : (
          <span style={{ color: 'red' }}>&#10008;</span>
        );
      }
    },
    {
      headerName: "HOL ACCRUAL",
      field: "HolAccrual",
      sortable: true,
      width: "200px",

      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
      cellRenderer: (params) => {
        return params.value ? (
          <span style={{ color: '#0A9B58' }}>&#10004;</span>
        ) : (
          <span style={{ color: 'red' }}>&#10008;</span>
        );
      }
    },
    {
      headerName: "H-N-W",
      field: "Hnw",
      width: "200px",

      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
      cellRenderer: (params) => {
        return params.value ? (
          <span style={{ color: '#0A9B58' }}>&#10004;</span>
        ) : (
          <span style={{ color: 'red' }}>&#10008;</span>
        );
      }
    },
    {
      headerName: "HOL WORKED",
      field: "HolWorked",
      width: "200px",

      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
      cellRenderer: (params) => {
        return params.value ? (
          <span style={{ color: '#0A9B58' }}>&#10004;</span>
        ) : (
          <span style={{ color: 'red' }}>&#10008;</span>
        );
      }
    },
    {
      headerName: "ADD TO PREM OT CALC",
      field: "AddToPremOffCalc",
      sortable: true,
      width: "200px",

      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
      cellRenderer: (params) => {
        return params.value ? (
          <span style={{ color: '#0A9B58' }}>&#10004;</span>
        ) : (
          <span style={{ color: 'red' }}>&#10008;</span>
        );
      }
    },
    {
      headerName: "CATEGORY",
      field: "Description",
      width: "200px",

      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "GL CODE",
      field: "GlCodeID",
      width: "200px",
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
      unSortIcon: true,
      resizable: true,
      width: "200px",
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Action",
      field: "id",
      width: "200px",
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
