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
import moment from "moment";
import { COAAccountsService } from "services";
import actionIcon from "assets/MyImages/charm_menu-kebab.svg";
import editIocn from "assets/myIcons/edit_square.svg";
import Image from "next/image";
import CustomBadge from "components/Generic/CustomBadge";
import plusIcon from "assets/myIcons/plusIcon1.svg";
import plusWhiteIcon from "assets/myIcons/plus.svg";
import { useDispatch } from "react-redux";
import { hasPermission } from "commonFunctions/functions";
import { openBulkUploadCOAPopup } from "redux/slices/mySlices/configurations";
import NoDataPage from "components/NoDataPage";
import detailsIocn from "assets/myIcons/list.svg";
import { getSessionVariables } from "@/constants/function";
import { TableLoading } from "@/components/Loaders";
import GridWithPagination from "@/components/dataTable/GridWithPagination";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { debounce, getLabel } from "@/commonFunctions/common";

const AllChartOfAccountsTable = ({ rerender}) => {
  const dispatch = useDispatch();
  const coasService = new COAAccountsService();
  const router = useRouter();

  const hasCreateConfiguration = hasPermission(
    "configuration_management",
    "create_configuration"
  );
  const hasEditConfigurationPermission = hasPermission(
    "configuration_management",
    "edit_configuration"
  );

  const hasUploadConfigurationPermission =
    hasPermission("", "bulk_upload") && hasCreateConfiguration;

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
        const response = await coasService.getCoasAccounts(
          {
            clientID,
            projectID,
          },
          queryParams
        );
        setTableData({
          data: response.result || [],
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
                router.push(
                  `/configurations/edit-chartofaccounts/${props.data.ID}`
                )
              }
            >
              <Action icon={detailsIocn} name={"View Details"} />
            </DropdownItem>
            {hasEditConfigurationPermission && (
              <DropdownItem
                onClick={() =>
                  router.push(
                    `/configurations/edit-chartofaccounts/${props.data.ID}`
                  )
                }
                className="w-100"
              >
                <Action icon={editIocn} name={"Edit"} />
              </DropdownItem>
            )}
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    );
  };

  const columnDefs = [
    {
      headerName: "COA Code",
      field: "Code",
      sortable: true,
      unSortIcon: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "COA Name",
      field: "Name",
      sortable: true,
      unSortIcon: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
      cellRenderer: (params) => {
        return (
          params?.data?.Name.charAt(0).toUpperCase() +
          params?.data?.Name.slice(1)
        );
      },
    },
    // {
    //   headerName: "Postable",
    //   field: "Postable",
    //   sortable: true,
    // unSortIcon: true,
    //   resizable: true,
    //   cellStyle: { fontSize: "14px", fontWeight: "400" },
    //   headerClass: "custom-header-class",
    // },
    {
      headerName: "COA Parent",
      field: "Parent.Name",
      sortable: true,
      unSortIcon: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
      cellRenderer: (row: any) => {
        if (row.value) {
          return getLabel(row.value);
        } else return "";
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
              <div>
                <div
                  className="m-2"
                  style={{ fontSize: "16px", fontWeight: "600" }}
                >
                  All Chart of Accounts(COA)
                </div>
              </div>

              <div
                className="d-flex align-items-center"
                style={{ gap: "10px" }}
              >
                <Input
                  onChange={debounce(handleSearch)}
                  type="search"
                  className="searchConfig"
                  placeholder="Search..."
                  style={{ width: "217px", height: "38px" }}
                />

                {hasUploadConfigurationPermission && (
                  <Button
                    onClick={() => dispatch(openBulkUploadCOAPopup("upload"))}
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
                      router.push(`/configurations/add-chart-of-accounts`)
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
                    Create COA
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
            buttonName={hasCreateConfiguration ? "Create COA" : "No button"}
            buttonLink={"/configurations/add-chart-of-accounts"}
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

export default AllChartOfAccountsTable;
