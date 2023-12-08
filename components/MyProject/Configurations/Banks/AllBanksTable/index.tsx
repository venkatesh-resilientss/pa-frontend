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
// import GridTable from "components/grid-tables/gridTable";
import { useRouter } from "next/router";
import { BankService } from "services";
import actionIcon from "assets/MyImages/charm_menu-kebab.svg";
import editIocn from "assets/myIcons/edit_square.svg";
import moment from "moment";
import { hasPermission } from "commonFunctions/functions";
// import {
//   openBulkUploadBanksPopup,
//   openDeleteBanksPopup,
// } from "redux/slices/mySlices/configurations";
// import { useDispatch } from "react-redux";
import Image from "next/image";
import { useState } from "react";
import CustomBadge from "components/Generic/CustomBadge";
import plusWhiteIcon from "assets/myIcons/plus.svg";
import NoDataPage from "components/NoDataPage";
import AGGridTable from "@/components/grid-tables/AGGridTable";

const AllBanksTable = () => {
  // const dispatch = useDispatch();
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  // const [pageOffset, setPageOffset] = useState(0);
  // const [bankData, setBankData] = useState([]);
  // const [bankLoading, setBankLoading] = useState(false);
  // const [totalRecords, setTotalRecords] = useState(0);
  const [rerender] = useState(false);
  const perPage = 3;

  const bankService = new BankService();
  const hasCreateConfiguration = hasPermission(
    "configuration_management",
    "create_configuration"
  );
  const hasEditConfigurationPermission = hasPermission(
    "configuration_management",
    "edit_configuration"
  );
  // const hasDeactivateConfiguration = hasPermission(
  //   "configuration_management",
  //   "deactivate_configuration"
  // );

  const fetchData1 = async (pageNumber) => {
    const clientId = sessionStorage.getItem("clientid");
    const projectId = sessionStorage.getItem("projectid");
    if (clientId && projectId) {
      try {
        const response = await bankService.getBanksNew(
          {
            search: searchText,
            pageLimit: perPage,
            offset: pageNumber,
          },
          { clientId: parseInt(clientId), projectId: parseInt(projectId) }
        );
        const data = response.data; // Adjust based on the actual structure of the response
        const totalRecords = response.total_records; // Adjust based on the actual structure of the response
        return { data, totalRecords };
      } catch (error) {
        return { data: null, totalRecords: 0 };
      } finally {
        // setBankLoading(false)
      }
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
        value={props.value ? "active" : "In-active"}
      />
    );
  };

  const ActionsButton = (props) => {
    const id = `action-popover-${props.value}`;

    const Action = ({ icon, name, action }) => {
      return (
        <div onClick={action} className="d-flex align-items-center gap-2">
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
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  // const additionalData = {
                  //   rowData: JSON.stringify(props.data),
                  // };
                  router.push(`/configurations/edit-bank/${props.data?.ID}`);
                }}
              >
                <Action
                  icon={editIocn}
                  name={"Edit"}
                  action={() => {
                    //
                  }}
                />
              </DropdownItem>
            )}
            {/* {hasDeactivateConfiguration && (
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
            )} */}
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
      field: "Created",
      cellRenderer: (params) => {
        return (
          <div className="f-ellipsis">
            {(params?.data?.Created?.first_name || "") +
              " " +
              (params?.data?.Created?.last_name || "")}
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
        const formattedDate = moment(params.data?.UpdatedDate).format(
          "YYYY-MM-DD"
        );
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
                  All Banks
                </div>
              </div>

              <div
                className="d-flex align-items-center"
                style={{ gap: "10px" }}
              >
                {/* <div style={{ fontSize: "16px", fontWeight: "400" }}>
                  {bankData?.data.length} Banks
                </div> */}

                <Input
                  onChange={(e) => setSearchText(e.target.value)}
                  type="search"
                  className="searchConfig"
                  placeholder="Search..."
                  style={{ width: "217px", height: "38px" }}
                />
                {/* {hasCreateConfiguration && (
                  <Button
                    onClick={() => dispatch(openBulkUploadBanksPopup("banks"))}
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
                )} */}

                {/* <Button
                  style={{
                    height: "38px",
                    backgroundColor: "#00AEEF",
                    fontSize: "14px",
                    fontWeight: "600",
                    border: "none",
                  }}
                  onClick={() => router.push(`/ configurations / add - bank`)}
                >
                  <Image
                    style={{ width: "14px", height: "14px" }}
                    src={plusWhiteIcon}
                    alt="plus-icon"
                  />{" "}
                  Add Bank
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
                    onClick={() => router.push(`/configurations/add-bank`)}
                  >
                    <Image
                      style={{ width: "14px", height: "14px" }}
                      src={plusWhiteIcon}
                      alt="plus-icon"
                    />{" "}
                    Add Bank
                  </Button>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      {/* {bankLoading ? (
        <div className="mt-3">
          <GridTable
            columnDefs={columnDefs}
            pageSize={perPage}
            searchText={searchText}
            fetchData={""}
          />
        </div>
      ) : ( */}
      <AGGridTable
        rerender={rerender}
        // rowData={bankData}
        // totalRecords={totalRecords}
        columnDefs={columnDefs}
        searchText={searchText}
        fetchData={fetchData1}
        pageSize={perPage}
        // setPageOffset={setPageOffset}
        noDataPage={() => (
          <NoDataPage
            buttonName={hasCreateConfiguration ? "Create Bank" : "No button"}
            buttonLink={"/configurations/add-bank"}
          />
        )}
      />
      {/* {bankData.length > 0 ? (
      ): (
          <NoDataPage
          buttonName = {
            hasCreateConfiguration? "Create Bank": "No button"
          }
          buttonLink = { "/configurations/add-bank" }
        />)} */}
    </div>
  );
};

export default AllBanksTable;
