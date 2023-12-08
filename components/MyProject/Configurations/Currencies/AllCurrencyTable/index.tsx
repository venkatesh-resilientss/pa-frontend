import {
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Input,
} from "reactstrap";
import { useRouter } from "next/router";
import { CurrencyService } from "services";
import useSWR from "swr";
import moment from "moment";
import GridTable from "components/grid-tables/gridTable";
import actionIcon from "assets/MyImages/charm_menu-kebab.svg";
import editIocn from "assets/myIcons/edit_square.svg";
import CustomBadge from "components/Generic/CustomBadge";
import { useDispatch } from "react-redux";
import { hasPermission } from "commonFunctions/functions";
import { openBulkUploadCurrenciesPopup } from "redux/slices/mySlices/configurations";
import Image from "next/image";
import { useState } from "react";
import plusIcon from "assets/myIcons/plusIcon1.svg";
import plusWhiteIcon from "assets/myIcons/plus.svg";
import NoDataPage from "components/NoDataPage";

const AllCurrencyTable = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  const hasCreateConfiguration = hasPermission(
    "configuration_management",
    "create_configuration"
  );

  const hasEditConfigurationPermission = hasPermission(
    "configuration_management",
    "edit_configuration"
  );
  // const hasDeactivateConfiguration = hasPermission(
  //   "configuration_management",
  //   "deactivate_configuration"
  // );

  const dispatch = useDispatch();

  const currencyService = new CurrencyService();

  const { data: currencyData, isLoading: currenciesLoading } = useSWR(
    ["LIST_CURRENCIES", searchText],
    () =>
      currencyService.getCurrencies({ search: "", pageLimit: 25, offset: 0 })
  );
  const dataSource = { data: currencyData?.result };

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

    const Action = ({ icon, name }) => {
      return (
        <div className="d-flex align-items-center gap-2">
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
            {/* <DropdownItem className="w-100">
              <Action
                icon={detailsIocn}
                name={"View Details"}
                
              />
            </DropdownItem> */}
            {hasEditConfigurationPermission && (
              <DropdownItem
                tag="a"
                className="w-100 cursor-pointer"
                onClick={() =>
                  router.push(
                    `/configurations/edit-currencies/${props.data?.ID}`
                  )
                }
              >
                <Action icon={editIocn} name={"Edit"} />
              </DropdownItem>
            )}
            {/* {hasDeactivateConfiguration && (
              <DropdownItem
                tag="a"
                className="w-100 cursor-pointer"
                onClick={() => dispatch(openDeleteCurrencyPopup(props.data.ID))}
              >
                <Action icon={deleteIcon} name={"Delete"} />
              </DropdownItem>
            )} */}
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    );
  };
  const columnDefs = [
    {
      headerName: "Currencies Code",
      field: "Code",
      sortable: true,
      unSortIcon: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Currencies Name",
      field: "Name",
      sortable: true,
      unSortIcon: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Created By",
      field: "Created",
      cellRenderer: (params) => {
        return (
          <div className="f-ellipsis">
            {(params?.data?.Created?.first_name || "") +
              " " +
              (params?.data?.Created?.last_name || "")}
          </div>
        );
      },
      sortable: true,
      unSortIcon: true,
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
      unSortIcon: true,
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
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },

    {
      headerName: "Options",
      field: "id",
      cellRenderer: ActionsButton,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
  ];
  return (
    <>
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
              <div className="d-flex justify-content-between configuration-table">
                <div>
                  <div className="m-2 title">All Currencies</div>
                </div>

                <div
                  className="d-flex align-items-center"
                  style={{ gap: "10px" }}
                >
                  <div style={{ fontSize: "16px", fontWeight: "400" }}>
                    {currencyData?.result.length} Currencies
                  </div>

                  <Input
                    onChange={(e) => setSearchText(e.target.value)}
                    type="search"
                    className="searchConfig"
                    placeholder="Search..."
                    style={{ width: "217px", height: "38px" }}
                  />

                  <Button
                    onClick={() =>
                      dispatch(openBulkUploadCurrenciesPopup("upload"))
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
                    />{" "}
                    Bulk Upload
                  </Button>

                  {/* <Button
                    onClick={() => router.push(`/configurations/add-currency`)}
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
                    Add Currency
                  </Button> */}
                  {hasCreateConfiguration && (
                    <Button
                      onClick={() =>
                        router.push(`/configurations/add-currency`)
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
                      Add Currency
                    </Button>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        {currenciesLoading ? (
          <div className="mt-3">
            <GridTable
              rowData={dataSource}
              columnDefs={columnDefs}
              pageSize={10}
              searchText={searchText}
            />
          </div>
        ) : (
          <>
            {currencyData?.result.length > 0 ? (
              <div className="mt-3">
                <GridTable
                  rowData={dataSource}
                  columnDefs={columnDefs}
                  pageSize={9}
                  searchText={searchText}
                />
              </div>
            ) : (
              <div>
                <NoDataPage
                  // buttonName={"Create Currency"}
                  buttonName={
                    hasCreateConfiguration ? "Create Currency" : "No button"
                  }
                  buttonLink={"/configurations/add-currency"}
                />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default AllCurrencyTable;
