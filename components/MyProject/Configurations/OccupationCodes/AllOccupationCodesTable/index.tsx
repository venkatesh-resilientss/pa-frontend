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

const AllOccupationCodesTable = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const ActionsButton = (props) => {
    return (
      <div className="d-flex align-items-center gap-2">
        {/* {hasPermission("user_and_role_management", "edit_user") && ( */}
        <div
          onClick={() => router.push(`/configurations/edit-occupation-codes/${props.data?.ID}`)}
          className="cursor-pointer occupation-edit"
        >
          <img src={"/icons/edit_square.svg"} alt="Edit" width={15} className="occpation-edit-img" />
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
      headerName: "OCC Code",
      field: "OCCCode",
      sortable: true,
      resizable: true,
      headerClass: "custom-header-class",
    },
    {
      headerName: "Description",
      field: "Description",
      sortable: true,
      resizable: true,
      headerClass: "custom-header-class",
    },
    {
      headerName: "WC Class",
      field: "WcClass",
      sortable: true,
      resizable: true,
      headerClass: "custom-header-class",
    },

    {
      headerName: "Employee Type",
      field: "EmployeeType",
      sortable: true,
      resizable: true,
      headerClass: "custom-header-class",
    },

    {
      headerName: "OFF Production",
      field: "OFFProduction",
      sortable: true,
      resizable: true,
      headerClass: "custom-header-class",

    },
    {
      headerName: "Agreements",
      field: "Agreements",
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
          className="mt-2 occupation-list"
        >
          <CardBody>
            <div className="d-flex justify-content-between">
              <div>
                <div
                  className="m-2 occupation-list-header"
                >
                  All Occupation Codes
                </div>
              </div>

              <div
                className="d-flex align-items-center gap-10"
              >
                <div className="occupation-subheader">
                  {5} Occupation codes
                </div>

                <Input
                  onChange={(e) => setSearchText(e.target.value)}
                  type="search"
                  className="searchConfig occupation-search"
                  placeholder="Search..."
                />

                <Button
                  onClick={() => router.push(`/configurations/add-occupation-codes`)}
                  className="occupation-add-button"
                >
                  <Image
                    className="occupation-plus-icon"
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
