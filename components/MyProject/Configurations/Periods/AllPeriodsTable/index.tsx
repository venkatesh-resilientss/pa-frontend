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
import CustomBadge from "components/Generic/CustomBadge";
import actionIcon from "assets/MyImages/charm_menu-kebab.svg";
import editIocn from "assets/myIcons/edit_square.svg";
import { useRouter } from "next/router";
import moment from "moment";
import { PeriodsService } from "services";
import Image from "next/image";
import plusWhiteIcon from "assets/myIcons/plus.svg";
import NoDataPage from "components/NoDataPage";
import { hasPermission } from "commonFunctions/functions";
import { getSessionVariables } from "@/constants/function";
import { useEffect, useState } from "react";
import {toast} from 'react-toastify';
import { TableLoading } from "@/components/Loaders";
import GridWithPagination from "@/components/dataTable/GridWithPagination";
import { debounce } from "@/commonFunctions/common";
import detailsIocn from "assets/myIcons/list.svg";

const AllPeriodsTable = () => {
  const router = useRouter();

  const hasCreateConfiguration = hasPermission(
    "configuration_management",
    "create_configuration"
  );
  const hasEditConfigurationPermission = hasPermission(
    "configuration_management",
    "edit_configuration"
  );

  const periodsService = new PeriodsService();

  const [isLoading, setLoader] = useState(true);
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
  const [tableData, setTableData] = useState({
    data: [],
    total_records: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = {
          ...filters,
        };
        const { clientID, projectID } = getSessionVariables();
        if (!clientID || !projectID)
          throw new Error("Client and Project not found");
        const response = await periodsService.getPeriods(
          { clientID, projectID },
          queryParams
        );
        setTableData({
          data: response.data || [],
          total_records: response.total_records,
        });
        setLoader(false);
      } catch (error) {
        setLoader(false);
        toast.error(
          error?.error ||
            error?.Message ||
            error?.message ||
            "Unable to get data"
        );
      }
    };
    fetchData();
  }, [filters]);
  

  const StateBadge = (props) => {
    const sateDir = {
      true: "success",
      false: "danger",
    };
    return (
      <CustomBadge
        bg={sateDir[props.value]}
        value={props.value ? "Active" : "In-active"}
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
            <DropdownItem className="w-100" onClick={() =>
                  router.push(`/configurations/edit-period/${props.data?.ID}`)
                }>
              <Action
                icon={detailsIocn}
                name={"View Details"}

              />
            </DropdownItem>
            {hasEditConfigurationPermission && (
              <DropdownItem
                tag="a"
                className="w-100 cursor-pointer"
                onClick={() =>
                  router.push(`/configurations/edit-period/${props.data?.ID}`)
                }
              >
                <Action
                  icon={editIocn}
                  name={"Edit"}
                />
              </DropdownItem>
            )}
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    );
  };
  const columnDefs = [
    {
      headerName: "Start Date",
      field: "Start",
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
      headerName: "End Date",
      field: "EndDate",
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
      headerName: "Description",
      field: "Description",
      sortable: true,
      unSortIcon: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
      cellRenderer: (params) => {
        return (
          params?.data?.Description.charAt(0).toUpperCase() +
          params?.data?.Description.slice(1)
        );
      },
    },

    {
      headerName: "Created By",
      field: "Created",
      cellRenderer: (params) => {
        return (
          <div className="f-ellipsis">
            {(params?.data?.Created?.first_name.charAt(0).toUpperCase() +
              params?.data?.Created?.first_name?.slice(1) || "") +
              " " +
              (params?.data?.Created?.last_name.charAt(0).toUpperCase() +
                params?.data?.Created?.last_name?.slice(1) || "")}
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
      field: "ID",
      cellRenderer: ActionsButton,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
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
            <div className="d-flex justify-content-between configuration-table">
              <div>
                <div className="title mt-2">All Periods</div>
              </div>

              <div
                className="d-flex align-items-center"
                style={{ gap: "10px" }}
              >
                <div style={{ fontSize: "16px", fontWeight: "400" }}>
                  {tableData.total_records} {tableData.total_records === 1 ? 'Period' : 'Periods'}
                </div>

                <Input
                  onChange={debounce(handleSearch)}
                  type="search"
                  className="searchConfig"
                  placeholder="Search..."
                  style={{ width: "217px", height: "38px" }}
                />

                {/* <Button
                  style={{
                    height: "38px",
                    backgroundColor: "#00AEEF",
                    fontSize: "14px",
                    fontWeight: "600",
                    border: "none",
                  }}
                  onClick={() => router.push(`/configurations/add-period`)}
                >
                  <Image
                    style={{ width: "14px", height: "14px" }}
                    src={plusWhiteIcon}
                    alt="plus-icon"
                  />{" "}
                  Add Period
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
                    onClick={() => router.push(`/configurations/add-period`)}
                  >
                    <Image
                      style={{ width: "14px", height: "14px" }}
                      src={plusWhiteIcon}
                      alt="plus-icon"
                    />{" "}
                    Add Period
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
            buttonName={hasCreateConfiguration ? "Create Period" : "No button"}
            buttonLink={"/configurations/add-period"}
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
  );
};

export default AllPeriodsTable;
