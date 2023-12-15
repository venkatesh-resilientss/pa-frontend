import {
  Card,
  CardBody,
  Input,
  Button,
} from "reactstrap";
import GridTable from "../../../../grid-tables/gridTable";
import { useRouter } from "next/router";
import Image from "next/image";
import CustomBadge from "components/Generic/CustomBadge";
import { useState } from "react";
import plusWhiteIcon from "assets/myIcons/plus.svg";
import { LegislativesService } from "services";
import useSWR from "swr";

const AllLegislativeTypeTable = () => {
  const router = useRouter();
  const legislativesService = new LegislativesService();

  const [searchText, setSearchText] = useState("");

  const { data: rowData } = useSWR(
    ["LIST_LEGISLATIVES", searchText],
    () => legislativesService.getlegislatives()
  );


  const StateBadge = (props) => {
    const stateDir = {
      true: "success",
      false: "danger",
    };
    return (
      <CustomBadge
        bg={stateDir[props.value]}
        value={props.value ? "Active" : "In-active"}
      />
    );
  };
  const ActionsButton = (props) => {
    return (
      <div className="d-flex align-items-center gap-2">
        {/* {hasPermission("user_and_role_management", "edit_user") && ( */}
        <div
          onClick={() => router.push(`/configurations/edit-legislative-type/${props.data?.ID}`)}
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
  const columnDefs = [
    {
      headerName: "Legislative Code",
      field: "Code",
      sortable: true,
      resizable: true,
      headerClass: "custom-header-class",
    },
    {
      headerName: "Legislative Name",
      field: "Name",
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
      headerName: "Status",
      field: "IsActive",
      cellRenderer: StateBadge,
      cellStyle: { fontSize: "16px", fontWeight: "400" },
      headerClass: "custom-header-class",
      unSortIcon: true,
      sortable: true,
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
          className="mt-2 agents-list"
        >
          <CardBody>
            <div className="d-flex justify-content-between">
              <div>
                <div
                  className="m-2 agents-header"
                >
                  Legislative Type List
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
                  onClick={() => router.push(`/configurations/add-legislative-type`)}
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

export default AllLegislativeTypeTable;
