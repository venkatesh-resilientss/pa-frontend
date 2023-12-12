import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, UncontrolledDropdown } from "reactstrap";
import { DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import moment from "moment";

import editIocn from "assets/myIcons/edit_square.svg";
import actionIcon from "assets/MyImages/charm_menu-kebab.svg";
import CustomBadge from "components/Generic/CustomBadge";
import { CreateClientButton } from "@/components/clients";
import NoClientPage from "@/components/clients/NoClientPage";

import { ClientsService } from "services";
import GridTable from "@/components/dataTable/GridWithPagination";

const clientService = new ClientsService();

export default function Clients({ router, user }) {
  const [tableData, setTableData] = useState({
    data: [],
    total_records: 0,
  }) as any;

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

  useEffect(() => {
    const getData = async () => {
      try {
        const offset = (filters.pageNumber - 1) * filters.limit;
        const payload = { ...filters, offset };
        const response = await clientService.getClientsList(payload);
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
        value={props.value ? "active" : "In-active"}
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
            <DropdownItem
              tag="a"
              className="w-100 cursor-pointer"
              onClick={() =>
                router.push(`/clients/edit-client/${props.data?.ID}`)
              }
            >
              <Action icon={editIocn} name={"View/Edit Clients"} />
            </DropdownItem>
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
                src={params?.data?.LogoUrl || "/endamol.svg"}
                width={30}
                height={30}
                className="rounded-circle"
              />
            ) : (
              <div className="img-div-30">
                {(params?.data?.Name || "").charAt(0).toUpperCase()}
              </div>
            )}
            <div className="d-flex flex-column" style={{ gap: "3px" }}>
              <div className="m-auto fw-bolder">
                {params?.data?.Company.name}
              </div>
              <div className="">{params?.data?.Name}</div>
              <div className="">{params?.data?.ClientAdmin?.email} &nbsp; </div>
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

  return (
    <div className="py-4">
      <Card className="w-100 p-3 client-card-bg my-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="f-18 fw-600 clr-dblack">All Clients</div>

          <CreateClientButton {...{ router, user }} cls="" />
        </div>
      </Card>

      <div className="mt-3">
        {tableData.data.length === 0 ? (
          <NoClientPage {...{ router, user }} />
        ) : (
          <GridTable
            rowData={tableData}
            columnDefs={columnDefs}
            pageSize={filters.limit}
            searchText={filters.search}
            pageNumber={filters.pageNumber}
            setPageNumber={setFilters}
          />
        )}
      </div>
    </div>
  );
}
