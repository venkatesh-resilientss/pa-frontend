import { useState } from "react";
import ReactSelect from "react-select";
import { FcFilmReel } from "react-icons/fc";
import { Input } from "reactstrap";
import {
  Card,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import { useRouter } from "next/router";
import {
  Edit,
  MoreVertical,
  Users,
} from "react-feather";
import GridTable from "components/grid-tables/gridTable";
import "react-datepicker/dist/react-datepicker.css";
// services
import EmployeeService from "services/employee.service";

const EmployeesListTable = () => {
  const options = [
    { value: "jan", label: "Jan" },
    { value: "feb", label: "Feb" },
    { value: "mar", label: "Mar" },
    { value: "apr", label: "Apr" },
    { value: "may", label: "May" },
    { value: "jun", label: "Jun" },
    { value: "jul", label: "Jul" },
    { value: "aug", label: "Aug" },
    { value: "sep", label: "Sep" },
    { value: "oct", label: "Oct" },
    { value: "nov", label: "Nov" },
    { value: "dec", label: "Dec" }
  ];

  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  const [employeeModal, setEmployeeModal] = useState(false);

  const employeeService = new EmployeeService();

  const rowData = [
    {
      id: 1,
      last_name: "Mason",
      first_name: "James",
      middle_name: "Roger",
      production_name: "Endomal Private",
      project_name: "On Happy Day",
      department: "Crew, DGA, SAG",
      created_date: "09/31/2023"
    },
    {
      id: 2,
      last_name: "Pleshette",
      first_name: "Suzzone",
      middle_name: "Feroz",
      production_name: "MTV Studios",
      project_name: "Perhaps Love",
      department: "Crew, DGA, SAG",
      created_date: "08/24/2023"
    },
    {
      id: 3,
      last_name: "Flore",
      first_name: "Gloria",
      middle_name: "Petty",
      production_name: "Smuggler Film",
      project_name: "Rainy Days",
      department: "Crew, DGA, SAG",
      created_date: "08/15/2023"
    },
    {
      id: 4,
      last_name: "Gerwing",
      first_name: "Greta",
      middle_name: "Sandy",
      production_name: "Crossroads",
      project_name: "Delta Down",
      department: "Crew, DGA, SAG",
      created_date: "07/21/2023"
    },
    {
      id: 5,
      last_name: "Mason",
      first_name: "Drawn",
      middle_name: "Mario",
      production_name: "Endomal Private",
      project_name: "Hari Krishna",
      department: "Crew, DGA, SAG",
      created_date: "07/1/2023"
    },
    {
      id: 6,
      last_name: "Pleshette",
      first_name: "James",
      middle_name: "Vandy",
      production_name: "Smuggler Film",
      project_name: "Smuggler Film",
      department: "Crew, DGA, SAG",
      created_date: "06/31/2023"
    },
    {
      id: 7,
      last_name: "Flore",
      first_name: "Omini",
      middle_name: "Nicky",
      production_name: "Crossroads",
      project_name: "On Happy Day",
      department: "Crew, DGA, SAG",
      created_date: "06/3/2023"
    }
  ];

  const ActionsButton = () => {

    return (
      <div>
        <UncontrolledDropdown>
          <DropdownToggle tag="span">
            <MoreVertical size={17} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu end container="body">
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => {
                e.preventDefault(), router.push(`/payroll/employees/edit-employee`);
              }}
            >
              <Edit size={14} className="me-50 cursor-pointer" />
              <span className="align-middle">Edit Details</span>
            </DropdownItem>
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => {
                e.preventDefault(), router.push(`/payroll/employees/view-employee`)
              }}
            >
              <FcFilmReel size={14} className="me-50" />
              <span className="align-middle">View Employee</span>
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
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    );
  };

  const columns = [
    {
      headerName: "Last Name",
      sortable: true,
      field: "last_name"
    },
    {
      headerName: "First Name",
      sortable: true,
      field: "first_name"
    },
    {
      headerName: "Middle Name",
      sortable: true,
      field: "middle_name"
    },
    {
      headerName: "Production Company",
      sortable: true,
      field: "production_name"
    },

    {
      headerName: "Project Name",
      sortable: true,
      field: "project_name"
    },

    {
      headerName: "Department",
      sortable: true,
      field: "department"
    },

    {
      headerName: "Created On",
      sortable: true,
      field: "created_date",
    },

    {
      headerName: "Action",
      field: "id",
      cellRenderer: ActionsButton,
      headerClass: "custom-header-class",

      cellStyle: {
        textAlign: "center",
      },
    },
  ];

  return (
    <div className="py-4">
      <Card className="w-100 p-3 employee-card-bg my-3">
        <div className="d-flex justify-content-between ">
          <div className="pt-2 cardheader-text">All Employees</div>
          <div
            className="d-flex align-items-center viewall-table"
          >
            <Input className="date m-2" type="date" placeholder="Select Date"></Input>
            <ReactSelect className="m-2" options={options} placeholder="Filter by month" />
            <Input
              onChange={(e) => setSearchText(e.target.value)}
              type="search"
              className="searchConfig"
              placeholder="Search..."
            />
          </div>
          <Button
            className="my-1 my-sm-0 button-props border-0 "
            onClick={() => {
              router.push("/payroll/employees/create-employee");
            }}
          >
            <Users size={14} /> Create Employee
          </Button>
          {/* {hasPermission("employee_management", "create_employee") && (
            <Button
              className="my-1 my-sm-0 button-props border-0 "
              onClick={toggle}
            >
              <Users size={14} /> Create Employee
            </Button>
          )} */}
        </div>
      </Card>
      <GridTable rowData={rowData} columnDefs={columns} pageSize={4} searchText={searchText} />
      {/* <DataTableWithButtons
        tableTitle={"All Employees"}
        data={employeeData}
        columns={columns}
        showButton={true}
        buttonClick={() => router.push(`/payroll/employees/create-employee`)}
        buttonName={
          <div>
            <Users size={14} /> Create Employee
          </div>
        }
      /> */}
    </div>
  );
};

export default EmployeesListTable;
