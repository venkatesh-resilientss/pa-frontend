import { forwardRef, useEffect, useState } from "react";
import Image from "next/image";
import { Card, UncontrolledDropdown } from "reactstrap";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import moment from "moment";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import Select from "react-select";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";

import { openAssignRSSLPopup } from "@/redux/slices/mySlices/productions";
import editIocn from "assets/myIcons/edit_square.svg";
import detailsIocn from "assets/myIcons/list.svg";
import actionIcon from "assets/MyImages/charm_menu-kebab.svg";
import CustomBadge from "components/Generic/CustomBadge";

import GridWithPagination from "@/components/dataTable/GridWithPagination";
import CreateProductionButton from "@/components/productions/CreateProductionButton";
import NoProductionPage from "@/components/productions/NoProductionPage";

import { ClientsService, ProjectService } from "services";
import { getLabel } from "@/commonFunctions/common";

const clientService = new ClientsService();
const projectService = new ProjectService();

const steps = [
  "All Productions",
  "Pending Productions",
  "Completed Productions",
];

export default function Productions({ router, user }) {
  const [step, setStep] = useState(1);

  const dispatch = useDispatch();
  const [tableData, setTableData] = useState({
    data: [],
    total_records: 0,
  }) as any;
  const [clFilters, setClFilters] = useState([]) as any;

  const [filters, setFilters] = useState<any>({
    dateStart: "",
    dateEnd: "",
    clients: [],
    projectTypes: [],
    limit: 10,
    offset: 0,
    search: "",
    status: "",
    pageNumber: 1,
    isCompleted: "",
  });

  const toggle = (tab) => {
    setStep(tab);
    setFilters({
      ...filters,
      offset: 0,
      status: "",
      isCompleted: tab === 1 ? "" : tab === 2 ? "true" : "false",
    });
  };

  const selectStyle = {
    control: (base) => ({
      ...base,
      background: "#fff",
      border: "1px solid #dee2e6",
      borderRadius: "0.375rem",
      minHeight: "40px",
      boxShadow: null,
      ":hover": {
        borderColor: "#A2CFFE",
      },
    }),

    valueContainer: (base) => ({ ...base, padding: "0 6px" }),

    input: (base) => ({ ...base, margin: "0" }),

    placeholder: (base: any) => ({
      ...base,
      position: "center",
      transform: "none",
      color: "#c9c9c9 !important",
    }),

    menu: (base: any) => ({ ...base, margin: "0 !important" }),
    menuList: (base: any) => ({ ...base, padding: "0 !important" }),

    option: (base: any, state: any) => ({
      ...base,
      cursor: "pointer",
      color: "#212529",
      ":hover": {
        backgroundColor: "#c9c9c97d",
      },
      backgroundColor: state.isSelected ? "#c9c9c97d !important" : "white",
    }),

    indicatorSeparator: () => ({ display: "none" }),
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const clients = await clientService.getClientsFilters();
        setClFilters(clients.map((e) => ({ label: e.name, value: e.id })));

        /*  eslint-disable-next-line @typescript-eslint/no-unused-vars */
      } catch (e) {
        //
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const payload = {
          ...filters,
          clients: filters.clients.map((e) => e.value),
        };
        const response = await projectService.getAllProjectsList(payload);
        setTableData({
          data: response.data || [],
          total_records: response.total_records || 0,
        });
        /*  eslint-disable-next-line @typescript-eslint/no-unused-vars */
      } catch (e) {
        //
      }
    };
    getData();
  }, [filters]);

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
            <DropdownItem
              className="w-100"
              onClick={() => router.push(`/productions/${props.data.ID}`)}
            >
              <Action
                icon={editIocn}
                name={"View/Edit Production"}
                action={() => {
                  //
                }}
              />
            </DropdownItem>

            <DropdownItem className="w-100">
              <Action
                icon={detailsIocn}
                name={"Assign RSSL User"}
                action={() => dispatch(openAssignRSSLPopup(props.data))}
              />
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    );
  };

  const columnDefs = [
    {
      headerName: "Production Code",
      field: "Code",
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
      flex: 1,
      cellRenderer: (params) => {
        return getLabel(params?.data?.Code);
      },
    },
    {
      headerName: "Production Name",
      field: "Name",
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
      flex: 2,
      cellRenderer: (params) => {
        return getLabel(params?.data?.Name);
      },
    },
    {
      headerName: "Production Type",
      field: "ProjectType.Name",
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
      flex: 2,
      cellRenderer: (params) => {
        return getLabel(params?.data?.ProjectType?.Name);
      },
    },
    {
      headerName: "Client",
      field: "Client.Name",
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
      flex: 2,
      cellRenderer: (params) => {
        return (
          params?.data?.Client?.Name.charAt(0).toUpperCase() +
          params?.data?.Client?.Name.slice(1)
        );
      },
    },
    {
      headerName: "Last Payroll Date",
      field: "LastPayrollDate",
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
      flex: 1,
    },

    {
      headerName: "Labour Type",
      field: "LabourType",
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
      flex: 1,
      // cellRenderer: (params) => {
      //   return (
      //     params?.data?.LabourType.charAt(0).toUpperCase() +
      //     params?.data?.LabourType.slice(1)
      //   );
      // },
    },
    {
      headerName: "Created By",
      field: "Created",
      cellRenderer: (params) => {
        return (
          <div className="f-ellipsis">
            {getLabel(params?.data?.Created?.first_name || "") +
              " " +
              getLabel(params?.data?.Created?.last_name || "")}
          </div>
        );
      },
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
      flex: 1,
    },
    {
      headerName: "Created On",
      field: "CreatedDate",
      cellRenderer: (params) => {
        const formattedDate = moment(params.value).format("YYYY-MM-DD");
        return <div>{formattedDate}</div>;
      },
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
      flex: 1,
    },
    {
      headerName: "Status",
      field: "IsActive",
      cellRenderer: StateBadge,
      suppressSizeToFit: true,
      flex: 1,
    },
    {
      headerName: "Actions",
      field: "ID",
      cellRenderer: ActionsButton,
      cellStyle: { textAlign: "center" },
      suppressSizeToFit: true,
      flex: 1,
    },
  ];

  const CustomDatePicker = forwardRef(({ value, onClick }: any, ref: any) => (
    <button className="btn border bg-white" onClick={onClick} ref={ref}>
      <span className="clr-dblack fw-600">Date</span> is{" "}
      <span className="clr-dblack fw-600">{value || "All"}</span>
    </button>
  ));

  const statusOpts = [
    { label: "All", value: "" },
    { label: "Active", value: "true" },
    { label: "In-active", value: "false" },
  ];

  const completedOpts = [
    { label: "All", value: "" },
    { label: "Pending", value: "false" },
    { label: "Completed", value: "true" },
  ];
  return (
    <div className="py-4">
      <Card className="w-100 p-3 client-card-bg my-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="f-18 fw-600 clr-dblack">All Productions</div>

          <CreateProductionButton {...{ user }} cls="" />
        </div>
      </Card>

      <Nav
        className="bg-white mb-3"
        style={{ borderBottom: "1px solid", borderColor: "#DBDCDC" }}
      >
        {steps.map((e, id) => (
          <NavItem key={id}>
            <NavLink
              className={
                step === id + 1 ? "client-nav-active" : "client-nav-inactive"
              }
              active={step === id + 1}
              onClick={() => toggle(id + 1)}
            >
              {e}
            </NavLink>
          </NavItem>
        ))}
      </Nav>

      <div className="d-flex flex-wrap align-items-center gap-2 filters-div">
        <div className="">
          <DatePicker
            style={{ fontSize: "12px", fontWeight: "400" }}
            id="startDatePicker" // Add the id here
            className="w-100 form-control"
            placeholderText="Select Start date"
            startDate={filters.dateStart ? filters.dateStart : null}
            endDate={filters.dateEnd ? filters.dateEnd : null}
            dateFormat="yyyy-MM-dd"
            onChange={(dts) => {
              const [start, end] = dts;
              setFilters({
                ...filters,
                pageNumber: 1,
                offset: 0,
                dateStart: start,
                dateEnd: end,
              });
            }}
            selectsRange
            monthsShown={2}
            customInput={<CustomDatePicker />}
          />
        </div>
        <div className="">
          <ReactMultiSelectCheckboxes
            className="drop-down"
            value={filters.clients}
            placeholderButtonLabel="Client is All"
            options={[
              { label: "Select All", value: "s" },
              { label: "Unselect All", value: "u" },
              ...clFilters,
            ]}
            onChange={(value) => {
              let clientData = value;
              const i = value.findIndex((e) => e.value === "s");
              if (value.length === 0) {
                //
              } else if (value[value.length - 1].value === "s") {
                const _x = [];
                clientData = _x.concat(clFilters);
              } else if (value[value.length - 1].value === "u") {
                clientData = [];
              } else if (i > -1 && value.length === clFilters.length) {
                clientData.splice(i, 1);
              }

              setFilters({
                ...filters,
                pageNumber: 1,
                offset: 0,
                clients: clientData,
              });
            }}
          />
        </div>

        <div className="">
          <ReactMultiSelectCheckboxes
            className="drop-down"
            value={{ label: "Production Type is All", value: "" }}
            placeholderButtonLabel="Select Production Types"
            options={[]}
          />
        </div>

        <div className="w-m-125">
          {step !== 1 ? (
            <Select
              instanceId={`react-select-status`}
              styles={selectStyle}
              placeholder={"Status is All"}
              options={statusOpts}
              value={statusOpts.find((e) => e.value === filters.status)}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  pageNumber: 1,
                  offset: 0,
                  status: e.value,
                })
              }
            />
          ) : (
            <Select
              instanceId={`react-select-completed`}
              styles={selectStyle}
              placeholder={"Status is All"}
              options={completedOpts}
              value={completedOpts.find((e) => e.value === filters.isCompleted)}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  pageNumber: 1,
                  offset: 0,
                  isCompleted: e.value,
                })
              }
            />
          )}
        </div>
      </div>

      <TabContent className="py-3 client-fields" activeTab={step}>
        {/*  eslint-disable-next-line @typescript-eslint/no-unused-vars */}
        {[...Array(3)].map((e, id) => (
          <TabPane tabId={id + 1} key={id}>
            <div className="mt-3">
              {tableData.data.length === 0 ? (
                <NoProductionPage {...{ user }} />
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
          </TabPane>
        ))}
      </TabContent>
    </div>
  );
}
