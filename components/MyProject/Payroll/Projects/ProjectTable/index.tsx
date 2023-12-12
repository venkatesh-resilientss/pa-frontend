import { useState } from "react";
import ReactSelect from "react-select";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

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
  File,
  MoreVertical,
  Users,
} from "react-feather";
import GridTable from "components/grid-tables/gridTable";

const ProjectsListTable = () => {
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
  
  const [projectModal, setProjectModal] = useState(false);
  const toggle = () => setProjectModal(!projectModal);

  const rowData = [
    {
      id: 1,
      production_name: "Endomal Private",
      project_name: "On Happy Day",
      project_type: "MOW",
      department: "Crew, DGA, SAG",
      IsActive: true,
      created_date: "09/31/2023"
    },
    {
      id: 2,
      production_name: "MTV Studios",
      project_name: "Perhaps Love",
      project_type: "MVPA",
      department: "Crew, DGA, SAG",
      IsActive: true,
      created_date: "08/24/2023"
    },
    {
      id: 3,
      production_name: "Smuggler Film",
      project_name: "Rainy Days",
      project_type: "MOW",
      department: "Crew, DGA, SAG",
      IsActive: true,
      created_date: "08/15/2023"
    },
    {
      id: 4,
      production_name: "Crossroads",
      project_name: "Delta Down",
      project_type: "LOW",
      department: "Crew, DGA, SAG",
      IsActive: true,
      created_date: "07/21/2023"
    },
    {
      id: 5,
      production_name: "Endomal Private",
      project_name: "Hari Krishna",
      project_type: "MOW",
      department: "Crew, DGA, SAG",
      IsActive: true,
      created_date: "07/1/2023"
    },
    {
      id: 6,
      production_name: "Smuggler Film",
      project_name: "Smuggler Film",
      project_type: "MOW",
      department: "Crew, DGA, SAG",
      IsActive: true,
      created_date: "06/31/2023"
    },
    {
      id: 7,
      production_name: "Crossroads",
      project_name: "On Happy Day",
      project_type: "MOW",
      department: "Crew, DGA, SAG",
      IsActive: true,
      created_date: "06/3/2023"
    }
  ];

  const addNewProjectSoftwares = [
    {
      name: "Production Accounting",
      value: "Production Accounting",
      type: "radio",
    },
    {
      name: "Payroll",
      value: "Payroll",
      type: "radio",
    },
    {
      name: "Commercial Accounting",
      value: "Commercial Accounting",
      type: "radio",
    },
    {
      name: "ACA",
      value: "ACA",
      type: "radio",
    },
    {
      name: "Production Calendar",
      value: "Production Calendar",
      type: "radio",
    },
    {
      name: "Script Keeper",
      value: "Script Keeper",
      type: "radio",
    },
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
                e.preventDefault(), router.push(`/payroll/projects/edit-project`);
              }}
            >
              <File size={14} className="me-50" />
              <span className="align-middle">Edit Details</span>
            </DropdownItem>
            {/* <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => e.preventDefault()}
            >
              <FcFilmReel size={14} className="me-50" />
              <span className="align-middle">View Project</span>
            </DropdownItem> */}
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
            {/* {hasPermission("project_management", "edit_project") && (
              <DropdownItem className="w-100">
                <Edit size={14} className="me-50 cursor-pointer" />
                <span className="align-middle">Edit</span>
              </DropdownItem>
            )}
            {hasPermission("project_management", "deactivate_project") && (
              <DropdownItem className="w-100">
                <Trash size={14} className="me-50 cursor-pointer" />
                <span className="align-middle">Delete</span>
              </DropdownItem>
            )} */}
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    );
  };

  const columns = [
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
      headerName: "Project Type",
      sortable: true,
      field: "project_type"
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
      <Card className="w-100 p-3 project-card-bg my-3">
        <div className="d-flex justify-content-between ">
          <div className="pt-2 cardheader-text">All Projects</div>
          <div
            className="d-flex align-items-center viewall-table"
          >
            <Input className="date m-2" type="date" placeholder="Select Date"></Input>
            <ReactSelect options={options} placeholder="Filter by month" />
            <Input
              onChange={(e) => setSearchText(e.target.value)}
              type="search"
              className="searchConfig top-search m-2"
              placeholder="Search..."
            />
          </div>
          <Button
            className="my-1 my-sm-0 button-props border-0 "
            onClick={() => {
              router.push("/payroll/projects/create-project");
            }}
          >
            <Users size={14} /> Create Project
          </Button>
          {/* {hasPermission("project_management", "create_project") && (
            <Button
              className="my-1 my-sm-0 button-props border-0 "
              onClick={toggle}
            >
              <Users size={14} /> Create Project
            </Button>
          )} */}
        </div>
      </Card>
      <GridTable rowData={rowData} columnDefs={columns} pageSize={4} searchText={searchText} />
      {/* <DataTableWithButtons
        tableTitle={"All Projects"}
        data={projectData}
        columns={columns}
        showButton={true}
        buttonClick={() => router.push(`/payroll/projects/create-project`)}
        buttonName={
          <div>
            <Users size={14} /> Create Project
          </div>
        }
      /> */}
      <Modal isOpen={projectModal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add New Project</ModalHeader>
        <ModalBody>
          <p>Softwares</p>
          <Form>
            <div className="d-flex flex-wrap gap-2">
              {addNewProjectSoftwares.map((software, index) => (
                <FormGroup key={index} check>
                  <Input
                    id="checkbox2"
                    type="checkbox"
                    value={software.value}
                  />{" "}
                  <Label check>{software.name}</Label>
                </FormGroup>
              ))}
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => {
              toggle();
              router.push("/payroll/projects/create-project");
            }}
          >
            Create
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ProjectsListTable;
