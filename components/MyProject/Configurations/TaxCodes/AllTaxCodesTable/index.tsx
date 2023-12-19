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
import { useRouter } from "next/router";
import { TaxCodesService } from "services";
import CustomBadge from "components/Generic/CustomBadge";
import actionIcon from "assets/MyImages/charm_menu-kebab.svg";
import editIocn from "assets/myIcons/edit_square.svg";
import moment from "moment";
import { useDispatch } from "react-redux";
import { hasPermission } from "commonFunctions/functions";
import { openBulkUploadTaxCodesPopup } from "redux/slices/mySlices/configurations";
import Image from "next/image";
import plusIcon from "assets/myIcons/plusIcon1.svg";
import plusWhiteIcon from "assets/myIcons/plus.svg";
import NoDataPage from "components/NoDataPage";
import GridWithPagination from "@/components/dataTable/GridWithPagination";
import { debounce } from "@/commonFunctions/common";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TableLoading } from "@/components/Loaders";
import detailsIocn from "assets/myIcons/list.svg";

const AllTaxCodesTable = ({ rerender }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const hasCreateConfiguration = hasPermission(
    "configuration_management",
    "create_configuration"
  );
  const hasEditConfigurationPermission = hasPermission(
    "configuration_management",
    "edit_configuration"
  );

  const hasBulkUploadConfiguration = hasPermission("", "bulk_upload");

  const taxcodesService = new TaxCodesService();
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
        const response = await taxcodesService.getTaxCodes(queryParams);
        setTableData({
          data: response.data || [],
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
              onClick={(e) => {
                e.preventDefault();
                router.push(`/configurations/edit-taxcode/${props.data.ID}`);
              }}
            >
              <Action icon={detailsIocn} name={"View Details"} />
            </DropdownItem>
            {hasEditConfigurationPermission && (
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/configurations/edit-taxcode/${props.data.ID}`);
                }}
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
      headerName: "Tax Code",
      field: "Code",
      sortable: true,
      unSortIcon: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Name",
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
      headerClass: "custom-header-class",

      cellStyle: {
        textAlign: "center",
        fontSize: "14px",
        fontWeight: "400",
      },
    },
  ];

  return (
    <div>
      <div className="section ">
        <Card
          className="mt-2"
          style={{
            backgroundColor: "#E7EFFF",
            boxShadow: "0px 2.53521px 10.14085px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          <CardBody>
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center configuration-table">
                <div className="title">All Tax Codes</div>
              </div>

              <div
                className="d-flex align-items-center"
                style={{ gap: "10px" }}
              >
                <div
                  className=""
                  style={{ fontSize: "16px", fontWeight: "400" }}
                >
                  Tax Codes
                </div>

                <Input
                  onChange={debounce(handleSearch)}
                  className="searchConfig"
                  type="search"
                  placeholder="Search..."
                  style={{ width: "217px", height: "38px" }}
                />

                {hasBulkUploadConfiguration && (
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
                )}

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

      <div className="mt-3">
        {isLoading ? (
          <TableLoading />
        ) : tableData.data.length === 0 ? (
          <NoDataPage
            buttonName={
              hasCreateConfiguration ? "Create Tax Code" : "No button"
            }
            buttonLink={"/configurations/add-tax-code"}
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

export default AllTaxCodesTable;
