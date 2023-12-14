import { useState } from "react";
import Image from "next/image";
import { DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { UncontrolledDropdown } from "reactstrap";
import moment from "moment";

import actionIcon from "assets/MyImages/charm_menu-kebab.svg";
import detailsIocn from "assets/myIcons/list.svg";
import CustomBadge from "components/Generic/CustomBadge";

import GridWithPagination from "@/components/dataTable/GridWithPagination";

export default function Productions(props) {
  const { router, clientData } = props;

  const [filters, setFilters] = useState<any>({
    dateStart: "",
    dateEnd: "",
    clients: [],
    softwares: [],
    limit: 10,
    offset: 10,
    search: "",
    status: "",
    pageNumber: 1,
  });

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
              onClick={() => router.push(`/production/${props.data.ID}`)}
            >
              <Action
                icon={detailsIocn}
                name={"View Details"}
                action={() => {
                  //
                }}
              />
            </DropdownItem>

            {/* <DropdownItem className="w-100">
              <Action
                icon={detailsIocn}
                name={"Assign RSSL User"}
                action={() => {
                  dispatch(openAssignRSSLPopup(props.data));
                }}
              />
            </DropdownItem> */}
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
    },
    {
      headerName: "Production Name",
      field: "Name",
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
      flex: 2,
    },
    {
      headerName: "Production Type",
      field: "ProjectType.Name",
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
      flex: 1,
    },
    // {
    //   headerName: "Client",
    //   field: "Client.Name",
    //   sortable: true,
    //   resizable: true,
    // },
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

  return (
    <div className="mt-3">
      {clientData?.Projects?.length > 0 ? (
        <GridWithPagination
          rowData={{
            data: clientData?.Projects || [],
            total_records: clientData?.Projects?.length || 0,
          }}
          columnDefs={columnDefs}
          limit={filters.limit}
          pageNumber={filters.pageNumber}
          setPageNumber={setFilters}
        />
      ) : (
        <div className="text-center nodataAvailable">
          <img
            src="/no_client_data_available.svg"
            alt="No clients available"
            className="w-m-100"
          />
          <p className="nodataAvailable">No Data available.</p>
          {/* <h6 className="text-sm">
            Please create your first production to be able to work.
          </h6> */}
        </div>
      )}
    </div>
  );
}
