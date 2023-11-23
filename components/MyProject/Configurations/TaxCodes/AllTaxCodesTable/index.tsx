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
import DataTableWithButtons from "components/Generic/Table/index";
import { useRouter } from "next/router";
import { TaxCodesService } from "services";
import GridTable from "components/grid-tables/gridTable";
import CustomBadge from "components/Generic/CustomBadge";
import actionIcon from "assets/MyImages/charm_menu-kebab.svg";
import editIocn from "assets/myIcons/edit_square.svg";
import deleteIcon from "assets/myIcons/delete.svg";
import detailsIocn from "assets/myIcons/list.svg";
import useSWR from "swr";
import moment from "moment";
import { useDispatch } from "react-redux";
import { hasPermission } from "commonFunctions/functions";
import {
  openBulkUploadTaxCodesPopup,
  openDeleteTaxCodesPopup,
} from "redux/slices/mySlices/configurations";
import { useState, useEffect } from "react";
import Image from "next/image";
import plusIcon from "assets/myIcons/plusIcon1.svg";
import plusWhiteIcon from "assets/myIcons/plus.svg";
import NoDataPage from "components/NoDataPage";
import { checkTenant } from "constants/function";

const AllTaxCodesTable = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
   
  const hasCreateConfiguration = hasPermission(
    "configuration_management",
    "create_configuration"
  );

  const taxcodesService = new TaxCodesService();

  const {
    data: taxcodesData,
    isLoading: taxCodesLoading,
    error: userError,
    mutate: userMutate,
  } = useSWR(["LIST_TAXCODES", searchText], () =>
    taxcodesService.getTaxCodes()
  );

  const dataSource = taxcodesData?.data;

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
    console.log(props.data.id, "props");
    const row = props.data;
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
              style={{ marginLeft: "-100px" }}
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
              onClick={() =>
                router.push(`/configurations/edit-taxcode/${props.data.ID}`)
              }
            >
              <Action icon={editIocn} name={"Edit"} action={() => {}} />
            </DropdownItem>
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => e.preventDefault()}
            >
              <Action
                icon={deleteIcon}
                name={"Delete"}
                action={() => {
                  dispatch(openDeleteTaxCodesPopup(props.data.ID));
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
      headerName: "Tax Code",
      field: "Code",
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
      headerName: "Created By",
      field: "CreatedBy",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },

    {
      headerName: "Updated On",
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
      headerClass: "custom-header-class",

      cellStyle: {
        textAlign: "center",
        fontSize: "14px",
        fontWeight: "400",
      },
    },
  ];
  const rowData = [
    {
      id: 1,
      TaxCode: "TC001",
      Description: "Sample Description 1",
      CreatedBy: "UserA",
      UpdatedOn: "2023-01-01",
      Status: "active",
    },
    {
      id: 2,
      TaxCode: "TC002",
      Description: "Sample Description 2",
      CreatedBy: "UserB",
      UpdatedOn: "2023-02-01",
      Status: "inactive",
    },
    {
      id: 3,
      TaxCode: "TC002",
      Description: "Sample Description 2",
      CreatedBy: "UserB",
      UpdatedOn: "2023-02-01",
      Status: "inactive",
    },
    {
      id: 4,
      TaxCode: "TC002",
      Description: "Sample Description 2",
      CreatedBy: "UserB",
      UpdatedOn: "2023-02-01",
      Status: "inactive",
    },
    {
      id: 5,
      TaxCode: "TC002",
      Description: "Sample Description 2",
      CreatedBy: "UserB",
      UpdatedOn: "2023-02-01",
      Status: "inactive",
    },
  ];
  return (
    <div>
      <div className="section">
        <Card
          className="mt-2"
          style={{
            backgroundColor: "#E7EFFF",
            boxShadow: "0px 2.53521px 10.14085px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          <CardBody>
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center ">
                <div
                  className="m-2"
                  style={{ fontSize: "16px", fontWeight: "600" }}
                >
                  All Tax Codes
                </div>
              </div>

              <div
                className="d-flex align-items-center"
                style={{ gap: "10px" }}
              >
                <div
                  className=""
                  style={{ fontSize: "16px", fontWeight: "400" }}
                >
                  {taxcodesData?.data.length} Tax Codes
                </div>

                <Input
                  onChange={(e) => setSearchText(e.target.value)}
                  className="searchConfig"
                  type="search"
                  placeholder="Search..."
                  style={{ width: "217px", height: "38px" }}
                />

                <Button
                  onClick={() =>
                    dispatch(openBulkUploadTaxCodesPopup("upload"))
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

                {/* <Button
                  style={{
                    height: "38px",
                    backgroundColor: "#00AEEF",
                    fontSize: "14px",
                    fontWeight: "600",
                    border: "none",
                  }}
                  onClick={() => router.push(`/configurations/add-tax-code`)}
                >
                  <Image
                    style={{ width: "14px", height: "14px" }}
                    src={plusWhiteIcon}
                    alt="plus-icon"
                  />{" "}
                  Add Tax Code
                </Button> */}
                {hasCreateConfiguration && (
                  <Button
                    style={{
                      height: "38px",
                      backgroundColor: "#00AEEF",
                      fontSize: "14px",
                      fontWeight: "600",
                      border: "none",
                    }}
                    onClick={() => router.push(`/configurations/add-tax-code`)}
                  >
                    <Image
                      style={{ width: "14px", height: "14px" }}
                      src={plusWhiteIcon}
                      alt="plus-icon"
                    />{" "}
                    Add Tax Code
                  </Button>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {taxCodesLoading ? (
        <div className="mt-2">
          <GridTable
            rowData={dataSource}
            columnDefs={columnDefs}
            pageSize={10}
            searchText={searchText}
          />
        </div>
      ) : (
        <>
          {dataSource?.length > 0 ? (
            <div className="mt-2">
              <GridTable
                rowData={dataSource}
                columnDefs={columnDefs}
                pageSize={10}
                searchText={searchText}
              />
            </div>
          ) : (
            <div>
              <NoDataPage
                // buttonName={"Add Tax Code"}
                buttonName={
                  hasCreateConfiguration ? "Create Tax Code" : "No button"
                }
                buttonLink={"/configurations/add-tax-code"}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllTaxCodesTable;
