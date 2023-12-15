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
import { BudgetService } from "services";
import actionIcon from "assets/MyImages/charm_menu-kebab.svg";
import editIocn from "assets/myIcons/edit_square.svg";
import moment from "moment";
import { hasPermission } from "commonFunctions/functions";
import Image from "next/image";
import CustomBadge from "components/Generic/CustomBadge";
import plusWhiteIcon from "assets/myIcons/plus.svg";
import NoDataPage from "components/NoDataPage";
import { getSessionVariables } from "@/constants/function";
import AGGridTable from "@/components/grid-tables/AGGridTable";
import { getLabel } from "@/commonFunctions/common";
const AllBudgetTable = ({ rerender, searchText, setSearchText }) => {
  const router = useRouter();
  const recordsPerPage = 10;

  const hasCreateConfiguration = hasPermission(
    "configuration_management",
    "create_configuration"
  );
  const hasEditConfigurationPermission = hasPermission(
    "configuration_management",
    "edit_configuration"
  );

  const budgetService = new BudgetService();

  const fetchData = async (pageNumber) => {
    try {
      const { clientID, projectID } = getSessionVariables();
      const response = await budgetService.getBudgets(
        {
          clientID,
          projectID,
        },
        {
          search: searchText,
          pageLimit: recordsPerPage,
          offset: pageNumber,
        }
      );
      const data = response.data; // Adjust based on the actual structure of the response
      const totalRecords = response.totalCount; // Adjust based on the actual structure of the response
      return { data, totalRecords };
    } catch (error) {
      return { data: null, totalRecords: 0 };
    }
  };

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
                  router.push(`/configurations/edit-budget/${props.data?.ID}`)
                }
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
      headerName: "Budget Code",
      field: "Code",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
      cellRenderer: (row: any) => {
        if (typeof row.value === "number") {
          // If it's a number, just display it as is
          return <>{row.value}</>;
        } else if (typeof row.value === "string") {
          // If it's a string, display the uppercase version
          return getLabel(row.value);
        } else {
          // Handle other types if needed
          return null;
        }
      },
    },
    {
      headerName: "Budget Name",
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
      headerName: "Client",
      field: "Client.Name",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
      cellRenderer: (params) => {
        return getLabel(params?.data?.Client?.Name);
      },
    },
    {
      headerName: "Production",
      field: "Project.Name",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
      cellRenderer: (params) => {
        return getLabel(params?.data?.Project?.Name);
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
                  All Budgets
                </div>
              </div>

              <div
                className="d-flex align-items-center"
                style={{ gap: "10px" }}
              >
                <div style={{ fontSize: "16px", fontWeight: "400" }}>
                  Budgets
                </div>

                <Input
                  onChange={(e) => setSearchText(e.target.value)}
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
                  onClick={() => router.push(`/configurations/add-budget`)}
                >
                  <Image
                    style={{ width: "14px", height: "14px" }}
                    src={plusWhiteIcon}
                    alt="plus-icon"
                  />{" "}
                  Add Budget
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
                    onClick={() => router.push(`/configurations/add-budget`)}
                  >
                    <Image
                      style={{ width: "14px", height: "14px" }}
                      src={plusWhiteIcon}
                      alt="plus-icon"
                    />{" "}
                    Add Budget
                  </Button>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="mt-3">
        <AGGridTable
          rerender={rerender}
          columnDefs={columnDefs}
          searchText={searchText}
          fetchData={fetchData}
          pageSize={recordsPerPage}
          noDataPage={() => (
            <NoDataPage
              // buttonName={"Add Budget"}
              buttonName={hasCreateConfiguration ? "Create Budget" : ""}
              buttonLink={"/configurations/add-budget"}
            />
          )}
        />
      </div>
    </div>
  );
};

export default AllBudgetTable;
