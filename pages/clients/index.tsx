import { forwardRef, useEffect, useState } from "react";
import Image from "next/image";
import { Card, UncontrolledDropdown } from "reactstrap";
import { DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import moment from "moment";
import DatePicker from "react-datepicker";
import Select from "react-select";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";

import editIocn from "assets/myIcons/edit_square.svg";
import actionIcon from "assets/MyImages/charm_menu-kebab.svg";
import CustomBadge from "components/Generic/CustomBadge";
import { CreateClientButton } from "@/components/clients";
import NoClientPage from "@/components/clients/NoClientPage";
import GridWithPagination from "@/components/dataTable/GridWithPagination";

import { ClientsService } from "services";
import Link from "next/link";
import { getLabel, objectsAreEqual } from "@/commonFunctions/common";
import { dateFormat } from "@/commonFunctions/common";
import { hasAccess } from "@/commonFunctions/hasAccess";

const clientService = new ClientsService();

export default function Clients({ router, user }) {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState<any>({
    data: [],
    total_records: 0,
  });
  const [clFilters, setClFilters] = useState<any>([]);
  const [swFilters, setSwFilters] = useState<any>([]);

  const defaultFilters: any = {
    dateStart: "",
    dateEnd: "",
    clients: [],
    softwares: [],
    limit: 10,
    offset: 0,
    search: "",
    status: "",
    pageNumber: 1,
  };

  const [filters, setFilters] = useState<any>(defaultFilters);

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

    singleValue: (provided) => ({ ...provided, color: "#212529" }),

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
    const getFiltersData = async () => {
      try {
        const clients = await clientService.getClientsFilters();
        const softwares = await clientService.getSoftwares();
        setClFilters(clients.map((e) => ({ label: e.name, value: e.id })));
        setSwFilters(softwares.map((e) => ({ label: e.Name, value: e.ID })));
        /*  eslint-disable-next-line @typescript-eslint/no-unused-vars */
      } catch (e) {
        //
      }
    };
    getFiltersData();
  }, []);

  useEffect(() => {
    const getTableData = async () => {
      try {
        const dateStart = dateFormat(filters.dateStart);
        const dateEnd = dateFormat(filters.dateEnd);
        if ((dateStart && !dateEnd) || (!dateStart && dateEnd)) return;
        const payload = {
          ...filters,
          clients: filters.clients.map((e) => e.value),
          softwares: filters.softwares.map((e) => e.value),
          dateStart,
          dateEnd,
        };
        const response = await clientService.getClientsList(payload);
        setTableData({
          data: response.data || [],
          total_records: response.total_records || 0,
        });
        setLoading(false);
        /*  eslint-disable-next-line @typescript-eslint/no-unused-vars */
      } catch (e) {
        setLoading(false);
      }
    };
    getTableData();
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

    const Action = ({ icon, name }) => {
      return (
        <div className="d-flex align-items-center gap-2">
          <Image src={icon} alt={name} />
          <p>{name}</p>
        </div>
      );
    };

    return (
      <div className="cr-p">
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
            <Link href={`/clients/${props.data?.ID}`}>
              <DropdownItem tag="span" className="w-100 cr-p">
                <Action icon={editIocn} name={"View/Edit Client"} />
              </DropdownItem>
            </Link>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    );
  };
  const columnDefs = [
    {
      headerName: "Client Info",
      field: "ClientAdmin",
      cellRenderer: (params) => {
        return (
          <div className="d-flex gap-2">
            {params?.data?.LogoUrl ? (
              <img
                src={params?.data?.LogoUrl}
                width={30}
                height={30}
                className="rounded-circle"
              />
            ) : (
              <div className="img-div-30 mt-2">
                {params?.data?.Name?.charAt(0)?.toUpperCase()}
              </div>
            )}
            <div className="d-flex flex-column" style={{ gap: "3px" }}>
              <div className="m-auto fw-bolder">
                {params?.data?.Company.name}
              </div>
              <div className="">{getLabel(params?.data?.Name)}</div>
              <div className="">
                {params?.data?.ClientAdmin?.email}
                &nbsp;
              </div>
            </div>
          </div>
        );
      },
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
      flex: 3,
      suppressSizeToFit: true,
    },
    {
      headerName: "RSSL Support User",
      field: "RsslSupportUser.email",
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
      flex: 2,
      suppressSizeToFit: true,
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
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
      flex: 2,
      suppressSizeToFit: true,
    },

    {
      headerName: "Created On",
      cellRenderer: (params) => {
        const formattedDate = moment(params.value).format("YYYY-MM-DD");
        return <div>{formattedDate}</div>;
      },
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
      flex: 1,
      suppressSizeToFit: true,
    },
    {
      headerName: "Status",
      field: "IsActive",
      cellRenderer: StateBadge,
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
      flex: 1,
      suppressSizeToFit: true,
    },

    {
      headerName: "Options",
      field: "ID",
      cellRenderer: ActionsButton,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
      flex: 1,
      suppressSizeToFit: true,

      // cellStyle: {
      //   textAlign: "center",
      // },
    },
  ];

  const CustomDatePicker = forwardRef(({ value, onClick }: any, ref: any) => (
    <button className="btn border bg-white" onClick={onClick} ref={ref}>
      <span className="clr-dblack fw-600">Date</span> {value ? "from " : "is "}
      <span className={"clr-dblack fw-600" + (value ? " me-3" : "")}>
        {value
          .split(" - ")
          .map((e) => dateFormat(e))
          .join(" - ") || "All"}
      </span>
    </button>
  ));

  const statusOpts = [
    { label: "All", value: "all" },
    { label: "Active", value: "true" },
    { label: "In-active", value: "false" },
  ];

  const hasPermission = hasAccess(
    user,
    "client_management",
    "view_all_clients"
  );
  return (
    <div className="py-4">
      <Card className="w-100 p-3 client-card-bg my-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="f-18 fw-600 clr-dblack">All Clients</div>

          <CreateClientButton {...{ router, user }} cls="" />
        </div>
      </Card>

      <div className="d-flex flex-wrap align-items-center gap-2 filters-div">
        <div className="z-index-999">
          <DatePicker
            id="startDatePicker"
            className="w-100 form-control"
            placeholderText="Select Start date"
            startDate={filters.dateStart ? filters.dateStart : null}
            endDate={filters.dateEnd ? filters.dateEnd : null}
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
            isClearable
          />
        </div>

        <div className="">
          <ReactMultiSelectCheckboxes
            className="drop-down"
            value={filters.clients}
            placeholderButtonLabel={
              <div className="f-16">
                <span className="clr-dblack fw-600">Client</span>
                &nbsp;is&nbsp;
                <span className="clr-dblack fw-600">All</span>
              </div>
            }
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
            value={filters.softwares}
            placeholderButtonLabel={
              <div className="f-16">
                <span className="clr-dblack fw-600">Software</span>
                &nbsp;is&nbsp;
                <span className="clr-dblack fw-600">All</span>
              </div>
            }
            options={[
              { label: "Select All", value: "s" },
              { label: "Unselect All", value: "u" },
              ...swFilters,
            ]}
            onChange={(value) => {
              let softwareData = value;
              const i = value.findIndex((e) => e.value === "s");
              if (value.length === 0) {
                //
              } else if (value[value.length - 1].value === "s") {
                const _x = [];
                softwareData = _x.concat(swFilters);
              } else if (value[value.length - 1].value === "u") {
                softwareData = [];
              } else if (i > -1 && value.length === swFilters.length) {
                softwareData.splice(i, 1);
              }

              setFilters({
                ...filters,
                pageNumber: 1,
                offset: 0,
                softwares: softwareData,
              });
            }}
          />
        </div>

        <div className="w-m-125">
          <Select
            instanceId={`react-select-status`}
            styles={selectStyle}
            options={statusOpts}
            placeholder={
              <div className="f-16">
                <span className="clr-dblack fw-600">Status</span>
                &nbsp;is&nbsp;
                <span className="clr-dblack fw-600">All</span>
              </div>
            }
            value={statusOpts.find((e) => e.value === filters.status) || null}
            onChange={(e) =>
              setFilters({
                ...filters,
                pageNumber: 1,
                offset: 0,
                status: e.value === "all" ? "" : e.value,
              })
            }
          />
        </div>

        <div className=" ms-auto">
          <input
            className="form-control f-16 me-0 search-input"
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            type="search"
            placeholder="Search"
          />
        </div>
      </div>

      <div className="mt-3">
        {loading ? (
          <></>
        ) : (tableData.data.length === 0 &&
            objectsAreEqual(defaultFilters, filters)) ||
          (user && !hasPermission) ? (
          <NoClientPage
            {...{ router, user }}
            typ={user && !hasPermission ? "Access Denied" : ""}
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
}
