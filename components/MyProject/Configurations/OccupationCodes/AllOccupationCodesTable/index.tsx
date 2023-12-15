import {
  Card,
  CardBody,
  Input,
  Button,
} from "reactstrap";
import GridTable from "components/grid-tables/gridTable";
import { useRouter } from "next/router";
import Image from "next/image";
import plusWhiteIcon from "assets/myIcons/plus.svg";
import React, {useState} from "react";
import { OccupationcodeService } from "services";
import useSWR from "swr";
import CustomBadge from "components/Generic/CustomBadge";

const AllOccupationCodesTable = () => {
  const router = useRouter();
  const occupationcodeService = new OccupationcodeService();
  const [searchText, setSearchText] = useState("");

  const { data: rowData } = useSWR(
    ["LIST_OCCUPATIONCODES", searchText],
    () => occupationcodeService.getOccupationcodes()
  );
 
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
      headerName: "OCC Code",
      field: "Code",
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
      field: "WcClass.Code",
      sortable: true,
      resizable: true,
      headerClass: "custom-header-class",
    },

    {
      headerName: "Employee Type",
      field: "EmployeeType.Code",
      sortable: true,
      resizable: true,
      headerClass: "custom-header-class",
    },

    {
      headerName: "OFF Production",
      field: "OffProduction",
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
      headerName: "Action",
      field: "id",
      cellRenderer: ActionsButton,
      headerClass: "custom-header-class",
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

      <div className="mt-3">
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
