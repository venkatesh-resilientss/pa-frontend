import {
  Card,
  CardBody,
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { ArrowUp, Edit, File, MoreVertical, Plus, Trash } from "react-feather";
import axios from "axios";
import DataTableWithButtons from "../../../../Generic/Table/index";
import { FcFilmReel } from "react-icons/fc";
import { useHistory } from "react-router-dom";

const AllUserManagementTable = () => {
  const history = useHistory();

  const tableData = [
    {
      id: 1,
      currency_code: "USD",
      dateCreated: "2020-01-15",
      status: "Active",
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
      created_by: "John",
      location: "2485 Jarvisville Road",
      member_name: "Jane Cooper",
      role: "Support Member",
      client: "Kathryn Murphy",
      project: "Baxter Building",
      series_name: "Series 1",
      currency_name: "United States Dollar",
      modules: "Billing",
    },
    {
      id: 2,

      dateCreated: "2018-06-23",
      status: "Active",
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
      created_by: "Musk",
      currency_code: "GBP",
      modules: "Billing",

      location: "2485 Jarvisville Road",
      member_name: "Jane Cooper",
      role: "Support Member",
      client: "Kathryn Murphy",
      project: "Baxter Building",
      series_name: "Series 1",
      currency_name: "British Pound",
    },
    {
      id: 3,
      currency_code: "EUR",
      currency_name: "Euro",

      set_name: "Victorian Era Street",
      dateCreated: "2019-03-10",
      status: "In-Active",
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
      created_by: "Andrew",
      modules: "Billing",
      location: "2485 Jarvisville Road",
      member_name: "Jane Cooper",
      role: "Support Member",
      client: "Kathryn Murphy",
      project: "Baxter Building",
      series_name: "Series 1",
    },
    {
      id: 4,
      currency_code: "JPY",
      currency_name: "Japanese Yen",

      set_name: "Sci-Fi Spaceship",
      dateCreated: "2017-11-05",
      status: "In-Active",
      description: "Assets",
      created_by: "Vegas",
      modules: "Billing",
      location: "2485 Jarvisville Road",
      member_name: "Jane Cooper",
      role: "Support Member",
      client: "Kathryn Murphy",
      project: "Baxter Building",
      series_name: "Series 1",
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 5,
      currency_code: "EUR",
      currency_name: "Euro",

      set_name: "Tropical Paradise",
      dateCreated: "2021-02-20",
      status: "Active",
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
      created_by: "phillip",
      modules: "Billing",
      location: "2485 Jarvisville Road",
      member_name: "Jane Cooper",
      role: "Support Member",
      client: "Kathryn Murphy",
      project: "Baxter Building",
      series_name: "Series 1",
    },

    {
      id: 6,
      currency_code: "INR",
      currency_name: "Indian Rupee",

      set_name: "Medieval Castle",
      dateCreated: "2020-01-15",
      status: "In-Active",
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
      created_by: "John",
      modules: "Billing",
      member_name: "Jane Cooper",
      role: "Support Member",
      client: "Kathryn Murphy",
      project: "Baxter Building",
      series_name: "Series 1",
      location: "2485 Jarvisville Road",
    },
    {
      id: 7,
      currency_code: "AED",
      currency_name: "United Arab Emirates Dirham",

      set_name: "Wild West Town",
      dateCreated: "2018-06-23",
      status: "Active",
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
      created_by: "Musk",
      modules: "Billing",
      location: "2485 Jarvisville Road",
      member_name: "Jane Cooper",
      role: "Support Member",
      client: "Kathryn Murphy",
      project: "Baxter Building",
      series_name: "Series 1",
    },
    {
      id: 8,
      currency_code: "EUR",
      currency_name: "EURO",

      set_name: "Futuristic Lab",
      dateCreated: "2019-03-10",
      status: "In-Active",
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
      created_by: "Andrew",
      modules: "Billing",
      location: "2485 Jarvisville Road",
      member_name: "Jane Cooper",
      role: "Support Member",
      client: "Kathryn Murphy",
      project: "Baxter Building",
      series_name: "Series 1",
    },
    {
      id: 9,
      currency_code: "USD",
      currency_name: "EURO",

      set_name: "Futuristic Lab",
      dateCreated: "2017-11-05",
      status: "In-Active",
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
      created_by: "Vegas",
      modules: "Billing",
      location: "2485 Jarvisville Road",
      member_name: "Jane Cooper",
      role: "Support Member",
      client: "Kathryn Murphy",
      project: "Baxter Building",
      tax_code: "1014",
    },
    {
      id: 10,
      currency_code: "USD",

      set_name: "DevOps",
      dateCreated: "2021-02-20",
      status: "Active",
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
      created_by: "phillip",
      modules: "Billing",
      location: "2485 Jarvisville Road",
      member_name: "Jane Cooper",
      role: "Support Member",
      client: "Kathryn Murphy",
      project: "Baxter Building",
      currency_name: "EURO",

      series_name: "Series 1",
    },
  ];

  const columns = [
    {
      name: <div>Member</div>,
      sortable: true,
      sortField: "production_name",
      selector: (row) => row?.production_name,
      width: "180px",
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
          <div>
            <div
              className="m-auto"
              style={{ fontSize: "12px", fontWeight: "600" }}
            >
              Admin Name
            </div>
            <div className="m-auto" style={{ fontSize: "10px" }}>
              name@.gmail.com
            </div>
          </div>{" "}
        </div>
      ),
    },

    {
      name: <div>Role</div>,
      sortable: true,
      sortField: "production_name",
      selector: (row) => row?.production_name,
      width: "150px",

      cell: (row) => row?.role,
    },

    {
      name: <div>Client</div>,
      sortable: true,
      sortField: "production_name",
      selector: (row) => row?.production_name,
      width: "150px",

      cell: (row) => row?.client,
    },

    {
      name: <div>Project</div>,
      width: "150px",
      sortable: true,
      sortField: "production_name",
      selector: (row) => row?.production_name,

      cell: (row) => row?.project,
    },

    {
      name: <div>Modules</div>,
      sortable: true,
      sortField: "production_name",
      selector: (row) => row?.production_name,
      width: "120px",

      cell: (row) => row?.modules,
    },

    {
      name: <div>Created On</div>,
      sortable: true,
      sortField: "production_name",
      selector: (row) => row?.production_name,
      width: "140px",
      cell: (row) => row?.dateCreated,
    },

    {
      name: <div>Status</div>,
      cell: (row) => (
        <div>
          <Badge
            color={row?.status === "Active" ? "light-success" : "light-danger"}
          >
            {row?.status}
          </Badge>
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
          <DropdownMenu end>
            {/* <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => e.preventDefault()}
            >
              <File size={14} className="me-50" />
              <span className="align-middle">View Details</span>
            </DropdownItem> */}

            <DropdownItem
              className="w-100"
              onClick={() => history.push(`/edit-user/${row?.id}`, { row })}
            >
              <Edit size={14} className="me-50" />
              <span className="align-middle">Edit User</span>
            </DropdownItem>
            <DropdownItem className="w-100">
              <Trash size={14} className="me-50" />
              <span className="align-middle">Delete</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      ),
    },
  ];

  return (
    <Card className="col-12">
      <CardBody className="overflow-auto">
        {/* <Table
          columns={columns}
          //   customHook={tableData}
          customHook={tableData}   
          showSearch={true}
        /> */}
        <DataTableWithButtons
          tableTitle={"User Management"}
          header={true}
          data={tableData}
          columns={columns}
          showButton={true}
          buttonClick={() => history.push(`/add-user`)}
          buttonName={
            <div>
              <Plus size={16} />
              Add User
            </div>
          }
        />
      </CardBody>
    </Card>
  );
};

export default AllUserManagementTable;
