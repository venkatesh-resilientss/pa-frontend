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
import DataTableWithButtons from "@src/views/Generic/Table/index";
import { FcFilmReel } from "react-icons/fc";
import { useHistory } from "react-router-dom";
import { VendorsService } from "@src/services";
import useSWR from "swr";

const AllVendorsTable = () => {
  const history = useHistory();

  const vendorsService = new VendorsService();

  const {
    data: vendorsData,
    isLoading: userLoading,
    error: userError,
    mutate: userMutate,
  } = useSWR("LIST_VENDORS", () => vendorsService.getVendors());

  // const tableData = [
  //   {
  //     id: 1,
  //     currency_code: "USD",
  //     dateCreated: "2020-01-15",
  //     status: "Active",
  //     description: "Cash",
  //     created_by: "John",
  //     location: "2485 Jarvisville Road",
  //     entity_type: "FC01",
  //     country: "India",
  //     currency_name: "United States Dollar",
  //     vendor_name: "The Timer",
  //     state: "Telangana",
  //   },
  //   {
  //     id: 2,

  //     dateCreated: "2018-06-23",
  //     status: "Active",
  //     description: "Cash",
  //     created_by: "Musk",
  //     currency_code: "GBP",
  //     vendor_name: "The Timer",
  //     state: "Telangana",
  //     location: "2485 Jarvisville Road",
  //     entity_type: "FC01",
  //     country: "India",
  //     currency_name: "British Pound",
  //   },
  //   {
  //     id: 3,
  //     currency_code: "EUR",
  //     currency_name: "Euro",

  //     set_name: "Victorian Era Street",
  //     dateCreated: "2019-03-10",
  //     status: "Active",
  //     description: "Cash",
  //     created_by: "Andrew",
  //     vendor_name: "The Timer",
  //     state: "Telangana",
  //     location: "2485 Jarvisville Road",
  //     entity_type: "FC01",
  //     country: "India",
  //   },
  //   {
  //     id: 4,
  //     currency_code: "JPY",
  //     currency_name: "Japanese Yen",

  //     set_name: "Sci-Fi Spaceship",
  //     dateCreated: "2017-11-05",
  //     status: "In-Active",
  //     description: "Assets",
  //     created_by: "Vegas",
  //     vendor_name: "The Timer",
  //     state: "Telangana",
  //     location: "2485 Jarvisville Road",
  //     entity_type: "FC01",
  //     country: "India",
  //   },
  //   {
  //     id: 5,
  //     currency_code: "EUR",
  //     currency_name: "Euro",

  //     set_name: "Tropical Paradise",
  //     dateCreated: "2021-02-20",
  //     status: "Active",
  //     description: "Cash",
  //     created_by: "phillip",
  //     vendor_name: "The Timer",
  //     state: "Telangana",
  //     location: "2485 Jarvisville Road",
  //     entity_type: "FC01",
  //     country: "India",
  //   },

  //   {
  //     id: 6,
  //     currency_code: "INR",
  //     currency_name: "Indian Rupee",

  //     set_name: "Medieval Castle",
  //     dateCreated: "2020-01-15",
  //     status: "Active",
  //     description: "Cash",
  //     created_by: "John",
  //     vendor_name: "The Timer",
  //     state: "Telangana",
  //     entity_type: "FC01",
  //     country: "India",

  //     location: "2485 Jarvisville Road",
  //   },
  //   {
  //     id: 7,
  //     currency_code: "AED",
  //     currency_name: "United Arab Emirates Dirham",

  //     set_name: "Wild West Town",
  //     dateCreated: "2018-06-23",
  //     status: "Active",
  //     description: "Cash",
  //     created_by: "Musk",
  //     vendor_name: "The Timer",
  //     state: "Telangana",
  //     location: "2485 Jarvisville Road",
  //     entity_type: "FC01",
  //     country: "India",
  //   },
  //   {
  //     id: 8,
  //     currency_code: "EUR",
  //     currency_name: "EURO",

  //     set_name: "Futuristic Lab",
  //     dateCreated: "2019-03-10",
  //     status: "Active",
  //     description: "Cash",
  //     created_by: "Andrew",
  //     vendor_name: "The Timer",
  //     state: "Telangana",
  //     location: "2485 Jarvisville Road",
  //     entity_type: "FC01",
  //     country: "India",
  //   },
  //   {
  //     id: 9,
  //     currency_code: "USD",
  //     currency_name: "EURO",

  //     set_name: "Futuristic Lab",
  //     dateCreated: "2017-11-05",
  //     status: "In-Active",
  //     description: "Cash",
  //     created_by: "Vegas",
  //     vendor_name: "The Timer",
  //     state: "Telangana",
  //     location: "2485 Jarvisville Road",
  //     entity_type: "FC01",
  //     country: "India",
  //   },
  //   {
  //     id: 10,
  //     currency_code: "USD",

  //     set_name: "DevOps",
  //     dateCreated: "2021-02-20",
  //     status: "Active",
  //     description: "Cash",
  //     created_by: "phillip",
  //     vendor_name: "The Timer",
  //     state: "Telangana",
  //     location: "2485 Jarvisville Road",
  //     entity_type: "FC01",
  //     currency_name: "EURO",

  //     country: "India",
  //   },
  // ];

  const columns = [
    {
      name: <div>Vendor Name</div>,
      width: "170px",
      sortable: true,
      sortField: "production_name",
      selector: (row) => row?.production_name,
      cell: (row) => row?.vendor_name,
    },

    {
      name: <div>Entity Type</div>,
      width: "140px",
      sortable: true,
      sortField: "production_name",
      selector: (row) => row?.production_name,
      cell: (row) => row?.entity_type,
    },

    {
      name: <div>Address</div>,
      width: "140px",
      sortable: true,
      sortField: "production_name",
      selector: (row) => row?.production_name,
      cell: (row) => row?.location,
    },

    {
      name: <div>Country</div>,
      width: "140px",
      sortable: true,
      sortField: "production_name",
      selector: (row) => row?.production_name,
      cell: (row) => row?.country,
    },

    {
      name: <div>State</div>,
      width: "140px",
      sortable: true,
      sortField: "production_name",
      selector: (row) => row?.production_name,
      cell: (row) => row?.state,
    },

    {
      name: <div>Created by</div>,
      width: "140px",
      sortable: true,
      sortField: "production_name",
      selector: (row) => row?.production_name,
      cell: (row) => row?.created_by,
    },

    {
      name: <div>Updated on</div>,
      width: "140px",
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
      cell: (row) => (
        <UncontrolledDropdown>
          <DropdownToggle tag="span">
            <MoreVertical size={17} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => e.preventDefault()}
            >
              <File size={14} className="me-50" />
              <span className="align-middle">View Details</span>
            </DropdownItem>

            <DropdownItem
              className="w-100"
              onClick={() => history.push(`/edit-vendor/${row?.id}`, { row })}
            >
              <Edit size={14} className="me-50" />
              <span className="align-middle">Edit</span>
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
          tableTitle={"All Vendors"}
          header={true}
          data={vendorsData}
          columns={columns}
          showButton={true}
          buttonClick={() => history.push(`/add-vendor`)}
          buttonName={
            <div>
              <Plus size={16} />
              Add Vendor
            </div>
          }
        />
      </CardBody>
    </Card>
  );
};

export default AllVendorsTable;