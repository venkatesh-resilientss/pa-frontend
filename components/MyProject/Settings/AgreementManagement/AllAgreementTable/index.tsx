import {
  Card,
  CardBody,
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
} from "reactstrap";
import { Edit, File, MoreVertical, Plus, Trash } from "react-feather";
import DataTableWithButtons from "components/Generic/Table/index";
const AllAgreementTable = () => {
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
      name: <div>Role</div>,
      sortable: true,
      sortField: "production_name",
      selector: (row) => row?.production_name,

      cell: (row) => row?.role,
    },

    {
      name: <div>Access Leve</div>,
      sortable: true,
      sortField: "production_name",
      selector: (row) => row?.production_name,

      cell: (row) => row?.project,
    },

    {
      name: <div>Created On</div>,
      sortable: true,
      sortField: "production_name",
      selector: (row) => row?.production_name,
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
      cell: () => (
        <UncontrolledDropdown>
          <DropdownToggle tag="span">
            <MoreVertical size={17} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu end container="body">
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => e.preventDefault()}
            >
              <File size={14} className="me-50" />
              <span className="align-middle">View Details</span>
            </DropdownItem>

            <DropdownItem className="w-100">
              <Edit size={14} className="me-50" />
              <span className="align-middle">Edit Role</span>
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
    <>
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
              <p className="m-2">All Agreements</p>
            </div>
            <div className="d-flex align-items-center">
              <Form onSubmit={(e) => e.preventDefault()}>
                <input
                  className="search mr-2"
                  type="search"
                  placeholder="Search..."
                />
              </Form>
              <button className="btn btn-primary">
                <Plus size={16} /> Add Agreement
              </button>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card className="col-12">
        <CardBody className="overflow-auto">
          <DataTableWithButtons data={tableData} columns={columns} />
        </CardBody>
      </Card>
    </>
  );
};

export default AllAgreementTable;
