import { useEffect, useState } from "react";
import { IoAlertCircle, IoTimerOutline } from "react-icons/io5";
import { MdCancel, MdPlayCircleFilled } from "react-icons/md";
import { AiFillCheckCircle } from "react-icons/ai";
import { FcFilmReel } from "react-icons/fc";
import projectLogo from "src/assets/MyImages/project.svg";
import BluBlu from "src/assets/MyImages/blublu.svg";
import storyFoam from "src/assets/MyImages/storyfarm.svg";
import Indigo from "src/assets/MyImages/indigo.svg";
import fiveFilms from "src/assets/MyImages/5films.svg";
import { hasPermission } from "commonFunctions/functions";
import editIocn from "assets/myIcons/edit_square.svg";
import deleteIcon from "assets/myIcons/delete.svg";
import detailsIocn from "assets/myIcons/list.svg";
import actionIcon from "assets/MyImages/charm_menu-kebab.svg";
import Image from "next/image";
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
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Card,
  CardBody,
  Button,
  CardTitle,
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  ArrowUp,
  Check,
  CheckCircle,
  Copy,
  Download,
  Edit,
  File,
  MoreVertical,
  Plus,
  Trash,
  User,
  Users,
  X,
} from "react-feather";
import axios from "axios";
import DataTableWithButtons from "../../../Table/index";
import { BiCheckCircle } from "react-icons/bi";
import { openDeleteProjectPopup } from "redux/slices/mySlices/payroll";
import { ProjectService } from "services";
import DatePicker from "react-datepicker";

import useSWR from "swr";
import moment from "moment";
import GridTable from "components/grid-tables/gridTable";
import { checkTenant } from "constants/function";

const ProjectsListTable = () => {
  const dispatch = useDispatch();
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
  const [tenantId, setTenantId] = useState("");
  useEffect(() => {
    const getTenant = async () => {
      const tenant = await checkTenant();
      // console.log(tenant, "tenant");
      if (tenant) {
        setTenantId(tenant.id);
      }
    };
    getTenant();
  }, []);
  const [projectModal, setProjectModal] = useState(false);
  const toggle = () => setProjectModal(!projectModal);

  const projectService = new ProjectService();

  const { data: projectData } = useSWR("LIST_PROJECTS", () =>
  projectService.getProjects(tenantId)
  );

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

  const ActionsButton = (props) => {
    const id = `action-popover-${props.value}`;
    const [open, setOpen] = useState(false);
    const toggle = () => {
      setOpen(!open);
    };
    const Action = ({ icon, name, action }) => {
      return (
        <div onClick={action} className="d-flex align-items-center gap-2">
          <Image src={icon} alt={name} />
          <p>{name}</p>
        </div>
      );
    };
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
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => e.preventDefault()}
            >
              <FcFilmReel size={14} className="me-50" />
              <span className="align-middle">View Project</span>
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
            {hasPermission("project_management", "edit_project") && (
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
            )}
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
      field: "production_name"
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
                className="d-flex align-items-center"
                style={{ gap: "10px" }}
              >
                <DatePicker
                  className="filter-datepicker"
                  placeholderText="Select a date"
                  dateFormat="yyyy-MM-dd'T'HH:mm:ssxxx" // Set the desired date format
                />
                 <ReactSelect options={options} placeholder="Filter by month" />
          <Input
                  onChange={(e) => setSearchText(e.target.value)}
                  type="search"
                  className="searchConfig"
                  placeholder="Search..."
                  style={{ width: "217px", height: "38px" }}
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
