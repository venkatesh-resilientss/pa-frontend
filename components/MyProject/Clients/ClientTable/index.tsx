import { FcFilmReel } from "react-icons/fc";

import { hasPermission } from "commonFunctions/functions";


import {
  Card,
  Button,
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import { useRouter } from "next/router";
import {
  Edit,
  File,
  MoreVertical,
  Trash,
  Users,
} from "react-feather";
import DataTableWithButtons from "../../Table/index";
import { ClientsService } from "services";
import useSWR from "swr";
import moment from "moment";
import { toast } from "react-toastify";

const ClientsListTable = () => {

  const router = useRouter();
  const hasClientEditPermission = hasPermission(
    "client_management",
    "edit_client"
  );
  const hasDeactivateClientPermission = hasPermission(
    "client_management",
    "deactivate_client"
  );

  const clientService = new ClientsService();

  const { data: clientData, mutate } = useSWR("LIST_CLIENTS", () =>
    clientService.getClients({ search: "", pageLimit: 25, offset: 0 })
  );

  const columns = [
    {
      name: <div>Client Info</div>,
      width: "290px",
      sortable: true,
      sortField: "production_name",
      // selector: (row) => row?.production_name,
      cell: (row) => (
        <div className="d-flex gap-1">
          <img
            className="rounded-circle"
            src={row.image}
            alt=""
            style={{
              width: "30px",
              height: "30px",
            }}
          />
          <div className="d-flex flex-column" style={{ gap: "3px" }}>
            <div className="m-auto fw-bolder">{row?.Company.name}</div>
            <div
              className=" "
              style={{
                fontSize: "10px",
              }}
            >
              {row?.Name}
            </div>
            <div className="" style={{ fontSize: "10px" }}>
              name@.gmail.com
            </div>
          </div>{" "}
        </div>
      ),
    },

    {
      name: <div>Active Productions</div>,
      width: "170px",
      sortable: true,
      sortField: "production_name",
      selector: (row) => row?.production_name,
      cell: (row) => row?.active_projects,
    },

    {
      name: <div>Rss Support User</div>,
      width: "150px",
      sortable: true,
      sortField: "production_name",
      selector: (row) => row?.production_name,
      cell: (row) => row?.active_projects,
    },

    {
      name: <div>Created By</div>,
      width: "140px",
      sortable: true,
      sortField: "CreatedBy",
      selector: (row) => row?.CreatedBy,
      cell: (row) => row?.Created?.username,
    },

    {
      name: <div>Created On</div>,
      sortable: true,
      sortField: "production_name",
      selector: (row) => row?.production_name,
      cell: (row) => moment(row?.UpdatedDate).format("YYYY-MM-DD "),
      width: "130px",
    },

    // {
    //   name: <div>Documents</div>,
    //   cell: (row) => (
    //     <div>
    //       <div style={{ fontSize: "10px", fontWeight: "400" }}>
    //         <BiCheckCircle className="text-success" size={14} /> Insurance
    //         Policy{" "}
    //       </div>
    //       <div style={{ fontSize: "10px", fontWeight: "400" }}>
    //         {" "}
    //         <BiCheckCircle className="text-success" size={14} />
    //         W-9 Forms{" "}
    //       </div>
    //     </div>
    //   ),
    //   width: "150px",
    // },

    {
      name: <div>Status</div>,
      cell: (row) => (
        <div>
          {row?.IsActive ? (
            <Badge color={"success"}>Active</Badge>
          ) : (
            <Badge color={"danger"}>In-Active</Badge>
          )}
        </div>
      ),
    },

    {
      name: <div>Options</div>,
      cell: (row) => (
        <UncontrolledDropdown>
          <DropdownToggle tag="span">
            <MoreVertical size={17} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu end container="body" className="py-0">
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => {
                e.preventDefault(),
                  router.push(`/clients/edit-client/${row.ID}`);
              }}
            >
              <File size={14} className="me-50" />
              <span className="align-middle p-1">View Details</span>
            </DropdownItem>
            <DropdownItem
              tag="a"
              href="/"
              className="w-100 "
              onClick={(e) => e.preventDefault()}
            >
              <FcFilmReel size={14} className="me-50 " />
              <span className="align-middle p-1">View Productions</span>
            </DropdownItem>
            {/* <DropdownItem className="w-100">
              <Edit size={14} className="me-50" />
              <span className="align-middle">Edit</span>
            </DropdownItem>
            <DropdownItem
              className="w-100"
              
            >
              <Trash size={14} className="me-50" />
              <span className="align-middle">Delete</span>
            </DropdownItem> */}
            {hasClientEditPermission && (
              <DropdownItem className="w-100">
                <Edit size={14} className="me-50 cursor-pointer" />
                <span className="align-middle p-1">Edit</span>
              </DropdownItem>
            )}
            {hasDeactivateClientPermission && (
              <DropdownItem
                className="w-100"
                onClick={async (e) => {
                  try {
                    e.preventDefault();
                    await clientService.deleteClient(row.ID);
                    mutate();
                  } catch (er) {
                    toast.error(er?.error || er || "Error deleting client");
                  }
                }}
              >
                <Trash size={14} className="me-50 cursor-pointer" />
                <span className="align-middle p-1">Delete</span>
              </DropdownItem>
            )}
          </DropdownMenu>
        </UncontrolledDropdown>
      ),
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
      <DataTableWithButtons data={clientData} columns={columns} />
    </div>
  );
};

export default ClientsListTable;
