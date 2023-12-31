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
import moment from "moment";
import actionIcon from "assets/MyImages/charm_menu-kebab.svg";
import CustomBadge from "components/Generic/CustomBadge";
import { useDispatch } from "react-redux";
import { hasPermission } from "commonFunctions/functions";
import { openBulkUploadCurrenciesPopup } from "redux/slices/mySlices/configurations";
import Image from "next/image";
import plusIcon from "assets/myIcons/plusIcon1.svg";
import plusWhiteIcon from "assets/myIcons/plus.svg";
import NoDataPage from "components/NoDataPage";
import { useEffect, useState } from "react";
import GridWithPagination from "@/components/dataTable/GridWithPagination";
import { toast } from "react-toastify";
import { TableLoading } from "@/components/Loaders";
import detailsIocn from "assets/myIcons/list.svg";
import { debounce, getLabel } from "@/commonFunctions/common";
const AllCurrencyTable = ({ rerender }) => {
  const router = useRouter();
  const hasCreateConfiguration = hasPermission(
    "configuration_management",
    "create_configuration"
  );

  const hasUploadConfigurationPermission =
    hasPermission("", "bulk_upload") && hasCreateConfiguration;

  const dispatch = useDispatch();

  const currencyService = new CurrencyService();
  const [tableData, setTableData] = useState({
    data: [],
    total_records: 0,
  });
  const [filters, setFilters] = useState({
    search: "",
    limit: 10,
    offset: 0,
    pageNumber: 1,
  });
  const handleSearch = (e) => {
    const searchText = e.target.value;
    setFilters({
      ...filters,
      search: searchText,
    });
  };
  const [isLoading, setLoader] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = {
          ...filters,
        };
        const response = await currencyService.getCurrencies(queryParams);
        setTableData({
          data: response.result || [],
          total_records: response.total_records,
        });
        setLoader(false);
      } catch (error) {
        toast.error(error?.error || error?.Message || "Unable to get data");
        setLoader(false);
      }
    };
    fetchData();
  }, [filters, rerender]);

  const StateBadge = (props) => {
    const sateDir = {
      true: "success",
      false: "danger",
    };
    return (
      <CustomBadge
        bg={sateDir[props.value]}
        value={props.value === true ? "Active" : "In-active"}
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
            <DropdownItem
              className="w-100"
              onClick={() =>
                router.push(`/configurations/edit-currencies/${props.data?.ID}`)
              }
            >
              <Action icon={detailsIocn} name={"View Details"} />
            </DropdownItem>
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
      cellRenderer: (row) => {
        return getLabel(row.value);
      },
    },
    {
      headerName: "Is Base Currency",
      field: "BaseCurrency",
      sortable: true,
      unSortIcon: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
      cellRenderer: (row) => {
        return row.value ? "Yes" : "No";
      },
    },
    {
      headerName: "Created By",
      field: "Created",
      cellRenderer: (params) => {
        return getLabel(
          params?.data?.Created?.last_name +
            " " +
            params?.data?.Created?.first_name
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
        const formattedDate = moment(params.value).format("YYYY/MM/DD , HH:MM");
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
                    {tableData.total_records}{" "}
                    {tableData.total_records === 1 ? "Currencie" : "Currencies"}
                  </div>

                  <Input
                    onChange={debounce(handleSearch, 200)}
                    type="search"
                    className="searchConfig"
                    placeholder="Search..."
                    style={{ width: "217px", height: "38px" }}
                  />

                  {hasUploadConfigurationPermission && (
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
                  )}

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
        <div className="mt-3">
          {isLoading ? (
            <TableLoading />
          ) : tableData.data.length === 0 ? (
            <NoDataPage
              buttonName={
                hasCreateConfiguration ? "Create Currency" : "No button"
              }
              buttonLink={"/configurations/add-currency"}
            />
          ) : (
            <GridWithPagination
              rowData={tableData}
              columnDefs={columnDefs}
              limit={filters.limit}
              pageNumber={filters.pageNumber}
              setPageNumber={setFilters}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AllCurrencyTable;
