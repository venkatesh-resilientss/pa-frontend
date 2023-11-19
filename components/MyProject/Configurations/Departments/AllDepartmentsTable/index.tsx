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
import { Edit, File, MoreVertical, Plus, Trash } from "react-feather";
import GridTable from "components/grid-tables/gridTable";
import actionIcon from "assets/MyImages/charm_menu-kebab.svg";
import editIocn from "assets/myIcons/edit_square.svg";
import deleteIcon from "assets/myIcons/delete.svg";
import detailsIocn from "assets/myIcons/list.svg";
import plusIcon from "assets/myIcons/plusIcon1.svg";
import plusWhiteIcon from "assets/myIcons/plus.svg";

import axios from "axios";
import DataTableWithButtons from "../../../Table/index";
import { FcFilmReel } from "react-icons/fc";
import { useRouter } from "next/router";
import useSWR from "swr";
import { DepartmentsService } from "services";
import moment from "moment";
import { toast } from "react-toastify";
import {
  openBulkUploadDepartmentPopup,
  openDeleteDepartmentPopup,
} from "redux/slices/mySlices/configurations";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import CustomBadge from "components/Generic/CustomBadge";

import Image from "next/image";
import NoDataPage from "components/NoDataPage";

const AllDepartmentsTable = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const departmentsService = new DepartmentsService();

  const {
    data: departmentsData,
    isLoading: userLoading,
    error: userError,
    mutate: DepartmentMutet,
  } = useSWR("LIST_DEPARTMENTS", () => departmentsService.getDepartments());
  console.log(departmentsData, "departmentsData");

  const dataSource = departmentsData && departmentsData.result;
  const dataSourceLength = dataSource && dataSource.length;

  const CreateDepartment = (e) => {
    e.preventDefault();
    router.push({
      pathname: `/configurations/add-department`,
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
              href="/"
              className="w-100"
              onClick={(e) => {
                e.preventDefault();
                router.push({
                  pathname: `/configurations/edit-department/${props.data?.ID}`,
                });
              }}
            >
              <Action icon={editIocn} name={"Edit"} action={() => {}} />
            </DropdownItem>
            <DropdownItem
              tag="a"
              className="w-100"
              onClick={() =>
                dispatch(openDeleteDepartmentPopup(props.data?.ID))
              }
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
      headerName: "Department Code",
      field: "Code",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Department Name",
      field: "Name",
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
      field: "UpdatedBy",
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
      field: "ID",
      cellRenderer: ActionsButton,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
  ];

  return (
    <div className="section">
          <div>
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
                      All Departments
                    </div>
                  </div>

                  <div
                    className="d-flex align-items-center"
                    style={{ gap: "10px" }}
                  >
                    <div style={{ fontSize: "16px", fontWeight: "400" }}>
                      {departmentsData?.result.length} Departments
                    </div>

                    <Input
                      type="search"
                      className="searchConfig"
                      placeholder="Search..."
                      style={{ width: "217px", height: "38px" }}
                    />

                    <Button
                      onClick={() =>
                        dispatch(openBulkUploadDepartmentPopup("bulkUpload"))
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
                      />
                      Bulk Upload
                    </Button>

                    <Button
                      onClick={() =>
                        router.push(`/configurations/add-department`)
                      }
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
                      Create Department
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
          {departmentsData?.result.length > 0 ? (
            <div className="mt-2">
              <GridTable
                rowData={dataSource}
                columnDefs={columnDefs}
                pageSize={4} searchText={undefined}              />
            </div>
          ) : (
            <div>
              <NoDataPage
                buttonName={"Create Department"}
                buttonLink={"/configurations/add-department"}
              />
            </div>
          )}
        
      
    </div>
  );
};

export default AllDepartmentsTable;
