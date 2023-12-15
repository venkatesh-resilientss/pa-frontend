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
import actionIcon from "assets/MyImages/charm_menu-kebab.svg";
import editIocn from "assets/myIcons/edit_square.svg";
import { useRouter } from "next/router";
import { SetsService } from "services";
import moment from "moment";
import { useDispatch } from "react-redux";
import { openBulkUploadSetsPopup } from "redux/slices/mySlices/configurations";
import CustomBadge from "components/Generic/CustomBadge";
import Image from "next/image";
import plusIcon from "assets/myIcons/plusIcon1.svg";
import plusWhiteIcon from "assets/myIcons/plus.svg";
import NoDataPage from "components/NoDataPage";
import { hasPermission } from "commonFunctions/functions";

import GridTable from "@/components/grid-tables/gridTable";
import { useEffect, useRef, useState } from "react";
const setsService = new SetsService();

const AllSetsTable = ({ searchText, setSearchText }) => {
  // const setsService = new SetsService();
  const router = useRouter();
  // const [searchText, setSearchText] = useState("");

  const [tableData, setTableData] = useState() as any;
  const [loading, setLoading] = useState() as any;
  const [pageNumber, setPageNumber] = useState(1) as any;
  const [pageLimit] = useState(10) as any;
  const [sessionData, setSessionData] = useState() as any;

  const hasCreateConfiguration = hasPermission(
    "configuration_management",
    "create_configuration"
  );
  const hasEditConfigurationPermission = hasPermission(
    "configuration_management",
    "edit_configuration"
  );
  const dispatch = useDispatch();

  const intervalIdRef = useRef(null);
  const attemptsCountRef = useRef(0);
  const maxAttempts = 10;

  useEffect(() => {
    const retrieveSessionData = () => {
      // Retrieve data from sessionStorage
      const clientID = parseInt(sessionStorage.getItem("clientid"));
      const projectID = parseInt(sessionStorage.getItem("projectid"));

      if ((clientID && projectID) || attemptsCountRef.current >= maxAttempts) {
        clearInterval(intervalIdRef.current);
        if (clientID && projectID) {
          setSessionData({ clientID: clientID, projectID: projectID });
        }
      }

      // Increment the attempts count
      attemptsCountRef.current += 1;
    };

    // Retrieve session data initially
    retrieveSessionData();

    // Set up interval to check for session data every 1 second
    intervalIdRef.current = setInterval(retrieveSessionData, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalIdRef.current);
  }, []);

  useEffect(() => {
    if (sessionData) {
      setLoading(true);
      // const pageNumber = 1
      const offfset = (pageNumber - 1) * pageLimit;
      const queryParams = {
        search: searchText,
        pageLimit: pageLimit,
        offset: offfset,
      };
      const payload = {
        clientId: sessionData.clientID,
        projectId: sessionData.projectID,
      };
      setsService
        .getSets(queryParams, payload)
        .then((response) => {
          setTableData(response);
          setLoading(false);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [sessionData, searchText, pageNumber]);

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
                onClick={() =>
                  router.push(`/configurations/edit-set/${props.data.ID}`)
                }
                tag="a"
                className="w-100 cursor-pointer"
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
      headerName: "Set Code",
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
          return <>{row.value.charAt(0).toUpperCase() + row.value.slice(1)}</>;
        } else {
          // Handle other types if needed
          return null;
        }
      },
    },
    {
      headerName: "Set Name",
      field: "Name",
      sortable: true,
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
      field: "UpdatedDate",
      cellRenderer: (params) => {
        if (params.value) {
          const formattedDate = moment(params.value).format("YYYY-MM-DD");
          return <div>{formattedDate}</div>;
        }
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
                {/* <div style={{ fontSize: "16px", fontWeight: "400" }}>
                  {setsData?.result.length} Sets
                </div> */}

                <Input
                  onChange={(e) => setSearchText(e.target.value)}
                  type="search"
                  className="searchConfig"
                  placeholder="Search..."
                  style={{ width: "217px", height: "38px" }}
                />

                <Button
                  onClick={() => dispatch(openBulkUploadSetsPopup("upload"))}
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

                {/* <Button
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
                  Create Set
                </Button> */}
                {hasCreateConfiguration && (
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
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      {loading ? (
        <div className="mt-3">
          <GridTable
            rowData={{}}
            columnDefs={columnDefs}
            pageSize={pageLimit}
            searchText={searchText}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            setLoading={setLoading}
          />
        </div>
      ) : (
        <>
          {tableData?.data?.length > 0 ? (
            <div className="mt-3">
              <GridTable
                rowData={tableData}
                columnDefs={columnDefs}
                pageSize={pageLimit}
                searchText={searchText}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                setLoading={setLoading}
              />
            </div>
          ) : (
            <div>
              <NoDataPage
                // buttonName={"Create Set"}
                buttonName={hasCreateConfiguration ? "Create Set" : "No button"}
                buttonLink={"/configurations/add-set"}
              />
            </div>
          )}
        </>
      )}
      {/* <AGGridTable
        rerender={rerender}
        columnDefs={columnDefs}
        searchText={searchText}
        fetchData={fetchData1}
        pageSize={pageLimit}
        noDataPage={() => (
          <NoDataPage
            buttonName={hasCreateConfiguration ? "Create Set" : "No button"}
            buttonLink={"/configurations/add-set"}
          />
        )}
      /> */}
    </div>
  );
};

export default AllSetsTable;
