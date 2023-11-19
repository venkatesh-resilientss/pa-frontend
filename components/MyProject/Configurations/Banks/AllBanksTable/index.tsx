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
import DataTableWithButtons from "components/Generic/Table/index";
import GridTable from "components/grid-tables/gridTable";
import { useRouter } from "next/router";
import { BankService } from "services";
import actionIcon from "assets/MyImages/charm_menu-kebab.svg";
import editIocn from "assets/myIcons/edit_square.svg";
import deleteIcon from "assets/myIcons/delete.svg";
import detailsIocn from "assets/myIcons/list.svg";
import useSWR from "swr";
import moment from "moment";
import {
  openBulkUploadBanksPopup,
  openDeleteBanksPopup,
} from "redux/slices/mySlices/configurations";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { useState } from "react";
import CustomBadge from "components/Generic/CustomBadge";
import plusIcon from "assets/myIcons/plusIcon1.svg";
import plusWhiteIcon from "assets/myIcons/plus.svg";
import NoDataPage from "components/NoDataPage";

const AllBanksTable = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const bankService = new BankService();

  const {
    data: bankData,
    isLoading: userLoading,
    error: userError,
    mutate: userMutate,
  } = useSWR("LIST_BANKS", () => bankService.getBanks());

  const dataSource = bankData?.data;

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
              onClick={(e) => {
                e.preventDefault();
                const additionalData = {
                  rowData: JSON.stringify(props.data),
                };
                router.push({
                  pathname: `/configurations/edit-bank/${props.data?.ID}`,
                  query: { ...additionalData },
                });
              }}
            >
              <Action icon={editIocn} name={"Edit"} action={(e) => {}} />
            </DropdownItem>
            <DropdownItem
              tag="a"
              className="w-100"
              onClick={(e) => e.preventDefault()}
            >
              <Action
                icon={deleteIcon}
                name={"Delete"}
                action={() => {
                  dispatch(openDeleteBanksPopup(props.data.ID));
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
      headerName: "Bank Code",
      field: "Code",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Bank Name",
      field: "Name",
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
      BankCode: "001",
      BankName: "Bank A",
      CreatedBy: "John Doe",
      UpdatedOn: "2023-11-13",
      Status: "active",
      id: 1,
    },
    {
      BankCode: "002",
      BankName: "Bank B",
      CreatedBy: "Jane Smith",
      UpdatedOn: "2023-11-12",
      Status: "inactive",
      id: 2,
    },
    {
      BankCode: "003",
      BankName: "Bank C",
      CreatedBy: "Mike Johnson",
      UpdatedOn: "2023-11-11",
      Status: "active",
      id: 3,
    },
    {
      BankCode: "004",
      BankName: "Bank D",
      CreatedBy: "Sara Williams",
      UpdatedOn: "2023-11-10",
      Status: "inactive",
      id: 4,
    },
    {
      BankCode: "005",
      BankName: "Bank E",
      CreatedBy: "David Brown",
      UpdatedOn: "2023-11-09",
      Status: "active",
      id: 5,
    },
    {
      BankCode: "006",
      BankName: "Bank F",
      CreatedBy: "Emily Davis",
      UpdatedOn: "2023-11-08",
      Status: "inactive",
      id: 6,
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
                      All Banks
                    </div>
                  </div>

                  <div
                    className="d-flex align-items-center"
                    style={{ gap: "10px" }}
                  >
                    <div style={{ fontSize: "16px", fontWeight: "400" }}>
                      {bankData?.data.length} Banks
                    </div>

                    <Input
                      type="search"
                      className="searchConfig"
                      placeholder="Search..."
                      style={{ width: "217px", height: "38px" }}
                    />

                    <Button
                      onClick={() =>
                        dispatch(openBulkUploadBanksPopup("banks"))
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

                    <Button
                      style={{
                        height: "38px",
                        backgroundColor: "#00AEEF",
                        fontSize: "14px",
                        fontWeight: "600",
                        border: "none",
                      }}
                      onClick={() => router.push(`/configurations/add-bank`)}
                    >
                      <Image
                        style={{ width: "14px", height: "14px" }}
                        src={plusWhiteIcon}
                        alt="plus-icon"
                      />{" "}
                      Add Bank
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
                pageSize={4} searchText={undefined}              />
            </div>
          ) : (
            <div>
              <NoDataPage
                buttonName={"Create Bank"}
                buttonLink={"/configurations/add-bank"}
              />
            </div>
          )}
        </div>
      
  );
};

export default AllBanksTable;
