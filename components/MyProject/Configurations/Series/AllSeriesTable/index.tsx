import {
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Button,
} from "reactstrap";
// import GridTable from "components/grid-tables/gridTable";
import CustomBadge from "components/Generic/CustomBadge";
import actionIcon from "assets/MyImages/charm_menu-kebab.svg";
import { useRouter } from "next/router";
import { SeriesService } from "services";
import moment from "moment";
import { useDispatch } from "react-redux";
import { openBulkUploadSeriesPopup } from "redux/slices/mySlices/configurations";
import Image from "next/image";
import plusIcon from "assets/myIcons/plusIcon1.svg";
import plusWhiteIcon from "assets/myIcons/plus.svg";
import NoDataPage from "components/NoDataPage";
import { hasPermission } from "commonFunctions/functions";
import { TableLoading } from "@/components/Loaders";
import { getSessionVariables } from "@/constants/function";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import detailsIocn from "assets/myIcons/list.svg";
import { debounce, getLabel } from "@/commonFunctions/common";
import GridWithPagination from "@/components/dataTable/GridWithPagination";

const AllSeriesTable = ({ rerender }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const hasCreateConfiguration = hasPermission(
    "configuration_management",
    "create_configuration"
  );
   
  const hasUploadConfigurationPermission =
    hasPermission("", "bulk_upload") && hasCreateConfiguration;
  const seriesService = new SeriesService();
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
  const [isLoading, setLoader] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = {
          ...filters,
        };
        const { clientID, projectID } = getSessionVariables();
        if (!clientID || !projectID)
          throw new Error("Client and Project not found");
        const response = await seriesService.getSeries(queryParams, {
          clientID,
          projectID,
        });
        setTableData({
          data: response.data || [],
          total_records: response.total_records,
        });
        setLoader(false);
      } catch (error) {
        toast.error(
          error?.error ||
          error?.Message ||
          error?.message ||
          "Unable to get data"
        );
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
            <DropdownItem
              className="w-100"
              onClick={() =>
                router.push(`/configurations/edit-series/${props.data?.ID}`)
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
      headerName: "Series Code",
      field: "Code",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Series Name",
      field: "Name",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
      cellRenderer: (row) => {
        return getLabel(row.value);
      },
    },
    {
      headerName: "Description",
      field: "Description",
      sortable: true,
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
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },

    {
      headerName: "Updated On",
      // field: "UpdatedDate",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
      cellRenderer: (params) => {
        const formattedDate = moment(params.value).format("YYYY-MM-DD , HH:MM");
        return <div>{formattedDate}</div>;
      },
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
      field: "id",
      cellRenderer: ActionsButton,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
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
                  All Series
                </div>
              </div>

              <div
                className="d-flex align-items-center"
                style={{ gap: "10px" }}
              >
                {/* <div style={{ fontSize: "16px", fontWeight: "400" }}>
                  {seriesData?.data.length} Series
                </div> */}

                <Input
                  onChange={debounce(handleSearch)}
                  type="search"
                  className="searchConfig"
                  placeholder="Search..."
                  style={{ width: "217px", height: "38px" }}
                />
                {hasUploadConfigurationPermission && (
                  <Button
                    onClick={() =>
                      dispatch(openBulkUploadSeriesPopup("upload"))
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
            buttonName={hasCreateConfiguration ? "Create Series" : "No button"}
            buttonLink={"/configurations/add-series"}
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

export default AllSeriesTable;
