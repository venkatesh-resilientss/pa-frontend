import {
  Card,
  CardBody,
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Edit, File, MoreVertical, Plus, Trash } from "react-feather";
import axios from "axios";
import DataTableWithButtons from "../../../Table/index";
import { FcFilmReel } from "react-icons/fc";
import { useHistory } from "react-router-dom";
import useSWR from "swr";
import { DepartmentsService } from "@src/services";
import moment from "moment";
import { toast } from "react-toastify";

const AllDepartmentsTable = () => {
  const history = useHistory();

  const departmentsService = new DepartmentsService();

  const {
    data: departmentsData,
    isLoading: userLoading,
    error: userError,
    mutate: userMutate,
  } = useSWR("LIST_DEPARTMENTS", () => departmentsService.getDepartments());

  const handleDeleteDepartment = async ({ id }) => {
    console.log("IDDD", id);
    try {
      await DepartmentsService.delete(id);
      toast.success("Department Deleted Successfully");
    } catch (error) {
      console.error("Error deleting Department:", error);
    }
  };

  // const tableData = [
  //   {
  //     id: 1,
  //     department: "Software Development",
  //     dateCreated: "2020-01-15",
  //     status: "Active",
  //     description: "hello",
  //     created_by: "John",
  //   },
  //   {
  //     id: 2,

  //     department: "Network Administration",
  //     dateCreated: "2018-06-23",
  //     status: "Active",
  //     description: "hello",
  //     created_by: "Musk",
  //   },
  //   {
  //     id: 3,
  //     department: "Cybersecurity",
  //     dateCreated: "2019-03-10",
  //     status: "Active",
  //     description: "hello",
  //     created_by: "Andrew",
  //   },
  //   {
  //     id: 4,
  //     department: "Database Management",
  //     dateCreated: "2017-11-05",
  //     status: "In-Active",
  //     description: "hello",
  //     created_by: "Vegas",
  //   },
  //   {
  //     id: 5,
  //     department: "DevOps",
  //     dateCreated: "2021-02-20",
  //     status: "Active",
  //     description: "hello",
  //     created_by: "phillip",
  //   },

  //   {
  //     id: 6,
  //     department: "Software Development",
  //     dateCreated: "2020-01-15",
  //     status: "Active",
  //     description: "hello",
  //     created_by: "John",
  //   },
  //   {
  //     id: 7,
  //     department: "Network Administration",
  //     dateCreated: "2018-06-23",
  //     status: "Active",
  //     description: "hello",
  //     created_by: "Musk",
  //   },
  //   {
  //     id: 8,
  //     department: "Cybersecurity",
  //     dateCreated: "2019-03-10",
  //     status: "Active",
  //     description: "hello",
  //     created_by: "Andrew",
  //   },
  //   {
  //     id: 9,
  //     department: "Database Management",
  //     dateCreated: "2017-11-05",
  //     status: "In-Active",
  //     description: "hello",
  //     created_by: "Vegas",
  //   },
  //   {
  //     id: 10,
  //     department: "DevOps",
  //     dateCreated: "2021-02-20",
  //     status: "Active",
  //     description: "hello",
  //     created_by: "phillip",
  //   },
  // ];

  const columns = [
    {
      name: <div>Department Name</div>,
      width: "170px",
      sortable: true,
      sortField: "Name",
      selector: (row) => row?.Name,
      cell: (row) => row?.Name,
    },

    {
      name: <div>Description</div>,
      width: "130px",
      sortable: true,
      sortField: "Description",
      selector: (row) => row?.Description,
      cell: (row) => row?.Description,
    },

    {
      name: <div>Created By</div>,
      width: "140px",
      sortable: true,
      sortField: "CreatedBy",
      selector: (row) => row?.CreatedBy,
      cell: (row) => row?.CreatedBy,
    },

    {
      name: <div>Created On</div>,
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
              onClick={() =>
                history.push(`/edit-department/${row?.ID}`, { row })
              }
            >
              <Edit size={14} className="me-50" />
              <span className="align-middle">Edit</span>
            </DropdownItem>

            <DropdownItem
              onClick={() => handleDeleteDepartment({ id: row.ID })}
              className="w-100"
            >
              <Trash size={14} className="me-50" />
              <span className="align-middle">Delete</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      ),
    },
  ];

  return (
    <Card className="col-12 overflow-auto">
      <CardBody className="overflow-auto">
        {/* <Table
          columns={columns}
          //   customHook={tableData}
          customHook={tableData}   
          showSearch={true}
        /> */}
        <DataTableWithButtons
          tableTitle={"All Departments"}
          data={departmentsData}
          columns={columns}
          showButton={true}
          buttonClick={() => history.push(`/add-department`)}
          buttonName={
            <div>
              <Plus size={16} />
              Add Department
            </div>
          }
        />
      </CardBody>
    </Card>
  );
};

export default AllDepartmentsTable;
