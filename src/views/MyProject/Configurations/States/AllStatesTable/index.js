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
import { StatesService } from "@src/services";
import useSWR from "swr";
import moment from "moment";

const AllStatesTable = () => {
  const history = useHistory();

  const statesService = new StatesService();

  const {
    data: statesData,
    isLoading: userLoading,
    error: userError,
    mutate: userMutate,
  } = useSWR("LIST_STATES", () => statesService.getStates());

  // const tableData = [
  //   {
  //     id: 1,
  //     currency_code: "USD",
  //     dateCreated: "2020-01-15",
  //     status: "Active",
  //     description: "Cash",
  //     created_by: "John",
  //     location: "2485 Jarvisville Road",
  //     coa_number: "1-001",
  //     state: "Alabama",
  //     country: "US",
  //     tax_rate: "9.2%",
  //     currency_name: "United States Dollar",
  //     account_type: "Expenses",
  //   },
  //   {
  //     id: 2,

  //     dateCreated: "2018-06-23",
  //     status: "Active",
  //     description: "Cash",
  //     created_by: "Musk",
  //     currency_code: "GBP",
  //     account_type: "Expenses",

  //     location: "2485 Jarvisville Road",
  //     coa_number: "1-001",
  //     state: "Alabama",
  //     country: "US",
  //     tax_rate: "9.2%",
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
  //     account_type: "Expenses",
  //     location: "2485 Jarvisville Road",
  //     coa_number: "1-001",
  //     state: "Alabama",
  //     country: "US",
  //     tax_rate: "9.2%",
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
  //     account_type: "Expenses",
  //     location: "2485 Jarvisville Road",
  //     coa_number: "1-001",
  //     state: "Alabama",
  //     country: "US",
  //     tax_rate: "9.2%",
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
  //     account_type: "Expenses",
  //     location: "2485 Jarvisville Road",
  //     coa_number: "1-001",
  //     state: "Alabama",
  //     country: "US",
  //     tax_rate: "9.2%",
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
  //     account_type: "Expenses",
  //     coa_number: "1-001",
  //     state: "Alabama",
  //     country: "US",
  //     tax_rate: "9.2%",
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
  //     account_type: "Expenses",
  //     location: "2485 Jarvisville Road",
  //     coa_number: "1-001",
  //     state: "Alabama",
  //     country: "US",
  //     tax_rate: "9.2%",
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
  //     account_type: "Expenses",
  //     location: "2485 Jarvisville Road",
  //     coa_number: "1-001",
  //     state: "Alabama",
  //     country: "US",
  //     tax_rate: "9.2%",
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
  //     account_type: "Expenses",
  //     location: "2485 Jarvisville Road",
  //     coa_number: "1-001",
  //     state: "Alabama",
  //     country: "US",
  //   },
  //   {
  //     id: 10,
  //     currency_code: "USD",

  //     set_name: "DevOps",
  //     dateCreated: "2021-02-20",
  //     status: "Active",
  //     description: "Cash",
  //     created_by: "phillip",
  //     account_type: "Expenses",
  //     location: "2485 Jarvisville Road",
  //     coa_number: "1-001",
  //     currency_name: "EURO",

  //     state: "Alabama",
  //     country: "US",
  //     tax_rate: "9.2%",
  //   },
  // ];

  const columns = [
    {
      name: <div>State</div>,
      width: "170px",
      sortable: true,
      sortField: "Name",
      selector: (row) => row?.Name,
      cell: (row) => row?.Name,
    },

    {
      name: <div>Country</div>,
      width: "140px",
      sortable: true,
      sortField: "production_name",
      selector: (row) => row?.production_name,
      cell: (row) => row?.Country.code,
    },

    {
      name: <div>Created by</div>,
      width: "140px",
      sortable: true,
      sortField: "CreatedBy",
      selector: (row) => row?.CreatedBy,
      cell: (row) => row?.CreatedBy,
    },

    {
      name: <div>Updated on</div>,
      width: "140px",
      sortable: true,
      sortField: "production_name",
      selector: (row) => row?.production_name,
      cell: (row) => moment(row?.UpdatedDate).format("YYYY-MM-DD "),
    },

    {
      name: <div>Status</div>,
      cell: (row) => (
        <div>
          {row?.IsActive ? (
            <Badge color={"light-success"}>Active</Badge>
          ) : (
            <Badge color={"light-danger"}>In-Active</Badge>
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
              onClick={() => history.push(`/edit-state/${row?.id}`, { row })}
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
          tableTitle={"All States"}
          header={true}
          data={statesData}
          columns={columns}
          showButton={true}
          buttonClick={() => history.push(`/add-state`)}
          buttonName={
            <div>
              <Plus size={16} />
              Add State
            </div>
          }
        />
      </CardBody>
    </Card>
  );
};

export default AllStatesTable;
