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
import GridTable from "components/grid-tables/gridTable";
import { useRouter } from "next/router";
import { BankService, BudgetService } from "services";
import actionIcon from "assets/MyImages/charm_menu-kebab.svg";
import editIocn from "assets/myIcons/edit_square.svg";
import deleteIcon from "assets/myIcons/delete.svg";
import detailsIocn from "assets/myIcons/list.svg";
import useSWR from "swr";
import moment from "moment";
import { openDeleteBanksPopup } from "redux/slices/mySlices/configurations";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { useState } from "react";
import CustomBadge from "components/Generic/CustomBadge";
import plusIcon from "assets/myIcons/plusIcon1.svg";
import plusWhiteIcon from "assets/myIcons/plus.svg";
import NoDataPage from "components/NoDataPage";

const AllBudgetTable = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const budgetService = new BudgetService();

  const {
    data: budgetData,
    isLoading: userLoading,
    error: userError,
    mutate: userMutate,
  } = useSWR("LIST_BUDGETS", () => budgetService.getBudgets());

  const dataSource = budgetData?.data;

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
              className="w-100"
              onClick={() =>
                router.push(`/configurations/edit-budget/${props.data?.ID}`)
              }
            >
              <Action icon={editIocn} name={"Edit"} action={(e) => {}} />
            </DropdownItem>
            <DropdownItem
              tag="a"
              className="w-100"
              onClick={(e) => e.preventDefault()}
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
      headerName: "Budget Code",
      field: "Cdde",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Budget Name",
      field: "Name",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Company",
      field: "Company.Name",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Production",
      field: "Project.Name",
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
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
  ];
  const rowData = [
    {
      BudgetCode: "B001",
      BudgetName: "Annual Budget",
      Company: "ABC Corp",
      Production: "2023",
      CreatedBy: "John Doe",
      UpdatedOn: "2023-11-13",
      Status: "active",
      id: 1,
    },
    {
      BudgetCode: "B002",
      BudgetName: "Quarterly Budget",
      Company: "XYZ Ltd",
      Production: "2023",
      CreatedBy: "Jane Smith",
      UpdatedOn: "2023-11-14",
      Status: "inactive",
      id: 2,
    },
    {
      BudgetCode: "B003",
      BudgetName: "Monthly Budget",
      Company: "123 Inc",
      Production: "2023",
      CreatedBy: "Bob Johnson",
      UpdatedOn: "2023-11-15",
      Status: "active",
      id: 3,
    },
    {
      BudgetCode: "B004",
      BudgetName: "Project Budget",
      Company: "456 Ltd",
      Production: "2023",
      CreatedBy: "Alice Williams",
      UpdatedOn: "2023-11-16",
      Status: "Inactive",
      id: 4,
    },
    {
      BudgetCode: "B005",
      BudgetName: "Marketing Budget",
      Company: "789 Corp",
      Production: "2023",
      CreatedBy: "Charlie Brown",
      UpdatedOn: "2023-11-17",
      Status: "Active",
      id: 5,
    },
    {
      BudgetCode: "B006",
      BudgetName: "IT Budget",
      Company: "ABC Corp",
      Production: "2023",
      CreatedBy: "Eva Davis",
      UpdatedOn: "2023-11-18",
      Status: "Inactive",
      id: 6,
    },
  ];

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
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
                      {budgetData?.data.length} Budgets
                    </div>

                    <Input
                      type="search"
                      className="search"
                      placeholder="Search..."
                      style={{ width: "217px", height: "38px" }}
                    />

                    <Button
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
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
          {dataSource?.length > 0 ? (
            <div className="mt-2">
              <GridTable
                rowData={dataSource}
                columnDefs={columnDefs}
                pageSize={4}
              />
            </div>
          ) : (
            <div>
              <NoDataPage
                buttonName={"Create Budget"}
                buttonLink={"/configurations/add-budget"}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllBudgetTable;
