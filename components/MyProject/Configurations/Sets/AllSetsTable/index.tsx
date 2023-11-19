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
import DataTableWithButtons from "../../../../Generic/Table/index";
import { FcFilmReel } from "react-icons/fc";
import GridTable from "components/grid-tables/gridTable";
import actionIcon from "assets/MyImages/charm_menu-kebab.svg";
import editIocn from "assets/myIcons/edit_square.svg";
import deleteIcon from "assets/myIcons/delete.svg";
import detailsIocn from "assets/myIcons/list.svg";
import { useRouter } from "next/router";
import { SetsService } from "services";
import useSWR from "swr";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  openBulkUploadSetsPopup,
  openDeleteSetPopup,
} from "redux/slices/mySlices/configurations";
import CustomBadge from "components/Generic/CustomBadge";
import Image from "next/image";
import { useState } from "react";
import plusIcon from "assets/myIcons/plusIcon1.svg";
import plusWhiteIcon from "assets/myIcons/plus.svg";
import NoDataPage from "components/NoDataPage";

const AllSetsTable = () => {
  const setsService = new SetsService();
  const router = useRouter();

  const dispatch = useDispatch();

  const {
    data: setsData,
    isLoading: userLoading,
    error: userError,
    mutate: userMutate,
  } = useSWR("LIST_SETS", () => setsService.getSets());
  const dataSource = setsData?.result;

  console.log(setsData, "setsData");

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
              onClick={() =>
                router.push(`/configurations/edit-set/${props.data.ID}`)
              }
              tag="a"
              className="w-100"
            >
              <Action icon={editIocn} name={"Edit"} action={() => {}} />
            </DropdownItem>
            <DropdownItem
              tag="a"
              className="w-100"
              onClick={() => dispatch(openDeleteSetPopup(props.data?.ID))}
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
      headerName: "Set Code",
      field: "Code",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Set Name",
      field: "Name",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "Description",
      field: "Description",
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
      field: "ID",
      cellRenderer: ActionsButton,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
  ];
  const rowData = [
    {
      id: 1,
      SetCode: "SET001",
      SetName: "Product Set 1",
      Description: "This is the first product set",
      CreatedBy: "UserA",
      UpdatedOn: "2023-01-15",
      Status: "active",
    },
    {
      id: 2,
      SetCode: "SET002",
      SetName: "Product Set 2",
      Description: "This is the second product set",
      CreatedBy: "UserB",
      UpdatedOn: "2023-02-20",
      Status: "inactive",
    },
    {
      id: 3,
      SetCode: "SET003",
      SetName: "Product Set 3",
      Description: "This is the third product set",
      CreatedBy: "UserC",
      UpdatedOn: "2023-03-25",
      Status: "active",
    },
    {
      id: 4,
      SetCode: "SET004",
      SetName: "Product Set 4",
      Description: "This is the fourth product set",
      CreatedBy: "UserD",
      UpdatedOn: "2023-04-10",
      Status: "active",
    },
    {
      id: 5,
      SetCode: "SET005",
      SetName: "Product Set 5",
      Description: "This is the fifth product set",
      CreatedBy: "UserE",
      UpdatedOn: "2023-05-15",
      Status: "inactive",
    },
    {
      id: 6,
      SetCode: "SET006",
      SetName: "Product Set 6",
      Description: "This is the sixth product set",
      CreatedBy: "UserF",
      UpdatedOn: "2023-06-20",
      Status: "active",
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
                      All Sets
                    </div>
                  </div>

                  <div
                    className="d-flex align-items-center"
                    style={{ gap: "10px" }}
                  >
                    <div style={{ fontSize: "16px", fontWeight: "400" }}>
                      {setsData?.result.length} Sets
                    </div>

                    <Input
                      type="search"
                      className="searchConfig"
                      placeholder="Search..."
                      style={{ width: "217px", height: "38px" }}
                    />

                    <Button
                      onClick={() =>
                        dispatch(openBulkUploadSetsPopup("upload"))
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
                      onClick={() => router.push(`/configurations/add-set`)}
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
                      Create Sets
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
          {setsData?.result.length > 0 ? (
            <div className="mt-2">
              <GridTable
                rowData={dataSource}
                columnDefs={columnDefs}
                pageSize={4} searchText={undefined}              />
            </div>
          ) : (
            <div>
              <NoDataPage
                buttonName={"Create Set"}
                buttonLink={"/configurations/add-set"}
              />
            </div>
          )}
        
    </div>
  );
};

export default AllSetsTable;
