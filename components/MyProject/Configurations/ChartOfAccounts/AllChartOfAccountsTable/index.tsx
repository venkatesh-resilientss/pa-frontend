import {
  Card,
  CardBody,
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  Button,
  Input,
} from "reactstrap";
import { ArrowUp, Edit, File, MoreVertical, Plus, Trash } from "react-feather";
import axios from "axios";
import DataTableWithButtons from "components/Generic/Table/index";
import { FcFilmReel } from "react-icons/fc";
import { useRouter } from "next/router";
import moment from "moment";
import useSWR from "swr";
import { COAAccountsService } from "services";
import GridTable from "components/grid-tables/gridTable";
import actionIcon from "assets/MyImages/charm_menu-kebab.svg";
import editIocn from "assets/myIcons/edit_square.svg";
import deleteIcon from "assets/myIcons/delete.svg";
import detailsIocn from "assets/myIcons/list.svg";
import Image from "next/image";
import { useState } from "react";
import CustomBadge from "components/Generic/CustomBadge";
import plusIcon from "assets/myIcons/plusIcon1.svg";
import plusWhiteIcon from "assets/myIcons/plus.svg";
import { openDeleteAccountPayablePopup } from "redux/slices/mySlices/transactions";
import { useDispatch } from "react-redux";
import { openDeleteCOAPopup } from "redux/slices/mySlices/configurations";
import NoDataPage from "components/NoDataPage";

const AllChartOfAccountsTable = () => {
  const dispatch = useDispatch();
  const CoasService = new COAAccountsService();
  const router = useRouter();

  const {
    data: coasData,
    isLoading: userLoading,
    error: userError,
    mutate: userMutate,
  } = useSWR("LIST_LOCATIONS", () => CoasService.getCoasAccounts());
  const dataSource = coasData?.result;

  const StateBadge = (props) => {
    console.log("PROPS", props.value);

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

  const CreateCOA = (e) => {
    e.preventDefault();
    router.push({
      pathname: `/configurations/add-chart-of-accounts`,
    });
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
              onClick={() =>
                router.push(
                  `/configurations/edit-chartofaccounts/${props.data.ID}`
                )
              }
              className="w-100"
            >
              <Action icon={editIocn} name={"Edit"} action={() => {}} />
            </DropdownItem>
            <DropdownItem
              tag="a"
              className="w-100"
              onClick={(e) => dispatch(openDeleteCOAPopup(props.data.ID))}
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
      headerName: "COA Code",
      field: "Code",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "COA Name",
      field: "Name",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Postable",
      field: "Postable",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "COA Parent",
      field: "COAParent",
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
      field: "id",
      cellRenderer: ActionsButton,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
  ];
  const rowData = [
    {
      id: 1,
      COACode: "1001",
      COAName: "Assets",
      Postable: true,
      COAParent: null,
      CreatedBy: "UserA",
      UpdatedOn: "2023-01-15",
      Status: "active",
    },
    {
      id: 2,
      COACode: "2001",
      COAName: "Liabilities",
      Postable: true,
      COAParent: null,
      CreatedBy: "UserB",
      UpdatedOn: "2023-02-20",
      Status: "inctive",
    },
    {
      id: 3,
      COACode: "3001",
      COAName: "Revenue",
      Postable: true,
      COAParent: null,
      CreatedBy: "UserC",
      UpdatedOn: "2023-03-25",
      Status: "Active",
    },
    {
      id: 4,
      COACode: "4001",
      COAName: "Expenses",
      Postable: true,
      COAParent: null,
      CreatedBy: "UserD",
      UpdatedOn: "2023-04-10",
      Status: "Active",
    },
    {
      id: 5,
      COACode: "1101",
      COAName: "Cash",
      Postable: true,
      COAParent: "1001",
      CreatedBy: "UserE",
      UpdatedOn: "2023-05-15",
      Status: "inctive",
    },
    {
      id: 6,
      COACode: "1201",
      COAName: "Accounts Receivable",
      Postable: true,
      COAParent: "1001",
      CreatedBy: "UserF",
      UpdatedOn: "2023-06-20",
      Status: "active",
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
                      All Chart of Accounts(COA)
                    </div>
                  </div>

                  <div
                    className="d-flex align-items-center"
                    style={{ gap: "10px" }}
                  >
                    <div style={{ fontSize: "16px", fontWeight: "400" }}>
                      {coasData?.result.length} COAs
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
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
          {coasData?.result.length > 0 ? (
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
                buttonName={"Create COA"}
                buttonLink={"/configurations/add-chart-of-accounts"}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllChartOfAccountsTable;
