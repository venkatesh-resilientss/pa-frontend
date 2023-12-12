// import { useRouter } from "next/router";
import { Users } from "react-feather";
import { ClientsService } from "services";
// import moment from "moment";

import {
  Card,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";
import moment from "moment";
import CustomBadge from "components/Generic/CustomBadge";
import actionIcon from "assets/MyImages/charm_menu-kebab.svg";
import editIocn from "assets/myIcons/edit_square.svg";
import AGGridTable from "@/components/dataTable/gridTable";
import { useRouter } from "next/router";
import Image from "next/image";
import { hasPermission } from "commonFunctions/functions";

import NoDataPage from "components/NoDataPage";

const clientService = new ClientsService();

const ClientsListTable = () => {
  const router = useRouter();
  const recordsPerPage = 10;

  // const hasCreateConfiguration = hasPermission(
  //   "configuration_management",
  //   "create_configuration"
  // );

  // const { data: clientData } = useSWR("LIST_CLIENTS", () =>
  //   clientService.getClients({ search: "", pageLimit: 25, offset: 0 })
  // );

  // const columns = [
  //   {
  //     name: <div>Client Info</div>,
  //     width: "290px",
  //     sortable: true,
  //     sortField: "production_name",
  //     // selector: (row) => row?.production_name,
  //     cell: (row) => (
  //       <div className="d-flex gap-2">
  //         {row?.LogoUrl ? (
  //           <img
  //             src={row?.LogoUrl || "/endamol.svg"}
  //             width={30}
  //             height={30}
  //             className="rounded-circle"
  //           />
  //         ) : (
  //           <div className="img-div-30">
  //             {(row?.Name || "").charAt(0).toUpperCase()}
  //           </div>
  //         )}
  //         <div className="d-flex flex-column" style={{ gap: "3px" }}>
  //           <div className="m-auto fw-bolder">{row?.Company.name}</div>
  //           <div className="f-10">{row?.Name}</div>
  //           <div className="f-10">{row?.ClientAdmin?.email} &nbsp; </div>
  //         </div>
  //       </div>
  //     ),
  //   },

  //   // {
  //   //   name: <div>Active Productions</div>,
  //   //   width: "170px",
  //   //   sortable: true,
  //   //   sortField: "production_name",
  //   //   selector: (row) => row?.production_name,
  //   //   cell: (row) => row?.active_projects,
  //   // },

  //   {
  //     name: <div>RSSL Support User</div>,
  //     width: "150px",
  //     sortable: true,
  //     sortField: "production_name",
  //     selector: (row) => row?.production_name,
  //     cell: (row) => row?.RsslSupportUser?.email,
  //   },

  //   {
  //     name: <div>Created By</div>,
  //     width: "140px",
  //     sortable: true,
  //     sortField: "CreatedBy",
  //     selector: (row) => row?.CreatedBy,
  //     cell: (row) =>
  //       (row?.Created?.first_name || "") +
  //       " " +
  //       (row?.Created?.last_name || ""),
  //   },

  //   {
  //     name: <div>Created On</div>,
  //     sortable: true,
  //     sortField: "production_name",
  //     selector: (row) => row?.production_name,
  //     cell: (row) => moment(row?.UpdatedDate).format("YYYY-MM-DD "),
  //     width: "130px",
  //   },

  //   {
  //     name: <div>Status</div>,
  //     cell: (row) => (
  //       <div>
  //         {row?.IsActive ? (
  //           <Badge color={"success"}>Active</Badge>
  //         ) : (
  //           <Badge color={"danger"}>In-Active</Badge>
  //         )}
  //       </div>
  //     ),
  //   },

  //   {
  //     name: <div>Options</div>,
  //     cell: (row) => (
  //       <UncontrolledDropdown>
  //         <DropdownToggle tag="span">
  //           <MoreVertical size={17} className="cursor-pointer" />
  //         </DropdownToggle>
  //         <DropdownMenu end container="body" className="py-0">
  //           <DropdownItem
  //             tag="a"
  //             href="/"
  //             className="w-100"
  //             onClick={(e) => {
  //               e.preventDefault(),
  //                 router.push(`/clients/edit-client/${row.ID}`);
  //             }}
  //           >
  //             <File size={14} className="me-50" />
  //             <span className="align-middle p-1">View/Edit Details</span>
  //           </DropdownItem>
  //           <DropdownItem
  //             tag="a"
  //             href="/"
  //             className="w-100 "
  //             onClick={(e) => e.preventDefault()}
  //           >
  //             <FcFilmReel size={14} className="me-50 " />
  //             <span className="align-middle p-1">View Productions</span>
  //           </DropdownItem>
  //         </DropdownMenu>
  //       </UncontrolledDropdown>
  //     ),
  //   },
  // ];

  const fetchData = async (pageNumber) => {
    try {
      const response = await clientService.getClients({
        search: "",
        limit: recordsPerPage,
        offset: pageNumber,
      });
      const data = response || []; // Adjust based on the actual structure of the response
      const totalRecords = response.length || 0; // Adjust based on the actual structure of the response
      return { data, totalRecords };
    } catch (error) {
      return { data: null, totalRecords: 0 };
    }
  };

  // console.log("", countryData);

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
            {/* <DropdownItem>
              <Action
                icon={detailsIocn}
                name={"View Details"}
                
              />
            </DropdownItem> */}

            <DropdownItem
              tag="a"
              className="w-100"
              onClick={() =>
                router.push(`/configurations/edit-country/${props.data?.ID}`)
              }
            >
              <Action icon={editIocn} name={"Edit"} />
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
              <div className="f-10">{params?.data?.Name}</div>
              <div className="f-10">
                {params?.data?.ClientAdmin?.email} &nbsp;{" "}
              </div>
            </div>
          </div>
        );
      },
      sortable: true,
      resizable: true,
      cellStyle: { fontSize: "14px", fontWeight: "400" },
      headerClass: "custom-header-class",
    },
    {
      headerName: "RSSL Support User",
      field: "RsslSupportUser.email",
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
      headerName: "Created On",
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

      // cellStyle: {
      //   textAlign: "center",
      // },
    },
  ];

  return (
    <div className="py-4">
      <Card className="w-100 p-3 client-card-bg my-3">
        <div className="d-flex justify-content-between ">
          <div className="pt-2 cardheader-text">All Clients</div>
          {/* <Button
            className="my-1 my-sm-0 button-props border-0 "
            onClick={toggle}
          >
            <Users size={14} /> Create Client
          </Button> */}
          {hasPermission("client_management", "create_client") && (
            <Button
              className="my-1 my-sm-0 button-props border-0 "
              onClick={() => router.push("/clients/create-client")}
            >
              <Users size={14} /> Create Client
            </Button>
          )}
        </div>
      </Card>
      {/* <GridTable rowData={clientData} columnDefs={columns} pageSize={4} /> */}
      {/* <DataTableWithButtons data={clientData} columns={columns} /> */}

      <div className="mt-3">
        <AGGridTable
          rerender={false}
          columnDefs={columnDefs}
          searchText={""}
          fetchData={fetchData}
          pageSize={recordsPerPage}
          noDataPage={() => (
            <NoDataPage
              // buttonName={"Create COA"}
              buttonName={"Create Client"}
              buttonLink={"/create-client"}
            />
          )}
        />
      </div>
    </div>
  );
};

export default ClientsListTable;
