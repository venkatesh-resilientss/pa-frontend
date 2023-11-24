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
import { FcFilmReel } from "react-icons/fc";
import { useRouter } from "next/router";
import { VendorsService } from "services";
import useSWR from "swr";
import { useState, useEffect } from "react";
import Image from "next/image";
import plusIcon from "assets/myIcons/plusIcon1.svg";
import plusWhiteIcon from "assets/myIcons/plus.svg";
import { hasPermission } from "commonFunctions/functions";
import {
  openBulkUploadVendorsPopup,
  openDeleteVendorPopup,
} from "redux/slices/mySlices/configurations";
import { useDispatch } from "react-redux";
import moment from "moment";
import NoDataPage from "components/NoDataPage";
import { checkTenant } from "constants/function";

const AllVendorsTable = () => {
  const vendorsService = new VendorsService();
  const router = useRouter();
  const dispatch = useDispatch();
   
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

  const {
    data: vendorsData,
    isLoading: vendorsLoading,
  } = useSWR("LIST_VENDORS", () => vendorsService.getVendors());

  const dataSource = vendorsData?.result;

  const AddVendors = (e) => {
    e.preventDefault();
    router.push({
      pathname: `/configurations/add-vendor`,
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
        value={props.value === true ? "active" : "In-active"}
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
            <DropdownItem className="w-100">
              <Action
                icon={detailsIocn}
                name={"View Details"}
                action={() => {}}
              />
            </DropdownItem>
            {hasEditConfigurationPermission && (
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => {
                e.preventDefault();
                router.push(`/configurations/edit-vendor/${props.data.ID}`);
              }}
            >
              <Action icon={editIocn} name={"Edit"} action={() => {}} />
            </DropdownItem>
            )}
            {hasDeactivateConfiguration && (
            <DropdownItem
              tag="a"
              className="w-100 cursor-pointer"
              onClick={() => dispatch(openDeleteVendorPopup(props.data?.ID))}
            >
              <Action icon={deleteIcon} name={"Delete"} action={() => {}} />
            </DropdownItem>
            )}
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    );
  };
  const columnDefs = [
    {
      headerName: "Vendor Code",
      field: "Code",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Vendor Name",
      field: "VendorName",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "State",
      field: "State",
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
      field: "UpdatedDate",
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
      cellStyle: { fontSize: "14px", fontWeight: "400", textAlign: "center" },
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
                  All Vendors
                </div>
              </div>

              <div
                className="d-flex align-items-center"
                style={{ gap: "10px" }}
              >
                <div style={{ fontSize: "16px", fontWeight: "400" }}>
                  {vendorsData?.result.length} Vendors
                </div>

                <Input
                  type="search"
                  className="searchConfig"
                  placeholder="Search..."
                  style={{ width: "217px", height: "38px" }}
                />

                <Button
                  onClick={() => dispatch(openBulkUploadVendorsPopup("upload"))}
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
                  onClick={() => router.push(`/configurations/add-vendor`)}
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
                  Add Vendor
                </Button> */}
                {hasCreateConfiguration && (
                  <Button
                    onClick={() => router.push(`/configurations/add-vendor`)}
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
                    Add Vendor
                  </Button>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {vendorsLoading ? (
        <div className="mt-3">
          <GridTable
            rowData={dataSource}
            columnDefs={columnDefs}
            pageSize={10}
            searchText={undefined}
          />
        </div>
      ) : (
        <>
          {" "}
          {vendorsData && vendorsData?.result?.length > 0 ? (
            <div className="mt-3">
              <GridTable
                rowData={dataSource}
                columnDefs={columnDefs}
                pageSize={10}
                searchText={undefined}
              />
            </div>
          ) : (
            <div>
              <NoDataPage
                // buttonName={"Create Vendor"}
                buttonName={
                  hasCreateConfiguration ? "Create Vendor" : "No button"
                }
                buttonLink={"/configurations/add-vendor"}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllVendorsTable;
