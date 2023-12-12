import {
  Card,
  CardBody,
  Input,
  Button,
} from "reactstrap";
import GridTable from "../../../../grid-tables/gridTable";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";
import plusWhiteIcon from "assets/myIcons/plus.svg";
import React from "react";

const AllMPIPHPTable = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  // const ActionsButton = (props) => {
  //   console.log(props.data.id, "props");
  //   const id = `action-popover-${props.value}`;
  //   const [open, setOpen] = useState(false);
  //   const Action = ({ icon, name, action }) => {
  //     return (
  //       <div onClick={action} className="d-flex align-items-center gap-2">
  //         <Image src={icon} alt={name} />
  //         <p>{name}</p>
  //       </div>
  //     );
  //   };
  //   return (
  //     <div>
  //       <UncontrolledDropdown>
  //         <DropdownToggle tag="span">
  //           <Image
  //             src={actionIcon}
  //             alt=""
  //             width={14}
  //             id={id}
  //             style={{ marginLeft: "20px" }}
  //           />
  //         </DropdownToggle>
  //         <DropdownMenu end container="body">
  //           <DropdownItem className="w-100">
  //             <Action
  //               icon={detailsIocn}
  //               name={"View Details"}
  //               action={() => {}}
  //             />
  //           </DropdownItem>
  //           <DropdownItem
  //             tag="a"
  //             className="w-100"
  //             onClick={(e) =>
  //               router.push(`/configurations/edit-occupation-codes/${props.data?.ID}`)
  //             }
  //           >
  //             <Action icon={editIocn} name={"Edit"} action={() => {}} />
  //           </DropdownItem>
  //           <DropdownItem
  //             tag="a"
  //             className="w-100"
  //             onClick={(e) => e.preventDefault()}
  //           >
  //             <Action
  //               icon={deleteIcon}
  //               name={"Delete"}
  //               action={() => {
  //                 dispatch(openDeleteSeriesPopup(props.data?.ID));
  //               }}
  //             />
  //           </DropdownItem>
  //         </DropdownMenu>
  //       </UncontrolledDropdown>
  //     </div>
  //   );
  // };
  const ActionsButton = (props) => {
    return (
      <div className="d-flex align-items-center gap-2">
        {/* {hasPermission("user_and_role_management", "edit_user") && ( */}
        <div
          onClick={() => router.push(`/configurations/edit-MPIPHP/${props.data?.ID}`)}
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
      headerName: "Project Type",
      field: "OCCCode",
      sortable: true,
      resizable: true,
      headerClass: "custom-header-class",
    },
    {
      headerName: "Project Description",
      field: "Description",
      sortable: true,
      resizable: true,
      headerClass: "custom-header-class",
    },
    {
      headerName: "UNION/GUILD",
      field: "WcClass",
      sortable: true,
      resizable: true,
      headerClass: "custom-header-class",
    },

    {
      headerName: "MPIPHP Production Code",
      field: "EmployeeType",
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
          className="mt-2 agents-list"
        >
          <CardBody>
            <div className="d-flex justify-content-between">
              <div>
                <div
                  className="m-2 agents-header"
                >
                  MPIPHP Production Code List
                </div>
              </div>

              <div
                className="d-flex align-items-center gap-10"
              >
                <Input
                  onChange={(e) => setSearchText(e.target.value)}
                  type="search"
                  className="searchConfig agents-search"
                  placeholder="Search..."
                />

                <Button
                  onClick={() => router.push(`/configurations/add-MPIPHP`)}
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
                    onClick={() => router.push(`/configurations/add-MPIPHP`)}
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
          pageSize={7}
          searchText={searchText}
        />
      </div>


    </div>
  );
};

export default AllMPIPHPTable;
