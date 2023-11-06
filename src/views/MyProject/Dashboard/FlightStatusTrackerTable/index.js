import {
  Card,
  CardBody,
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import {
  ArrowDown,
  ArrowUp,
  Edit,
  File,
  MoreVertical,
  Plus,
  Trash,
} from "react-feather";
import axios from "axios";
import DataTableWithButtons from "../../../Generic/Table/index";
import { FcFilmReel } from "react-icons/fc";
import { useHistory } from "react-router-dom";

const FlightStatusTrackerTable = () => {
  const history = useHistory();

  const tableData = [
    {
      id: 1,
      set_name: "Studio A",
      dateCreated: "2020-01-15",
      status: "Active",
      production: " Set PA",
      delayed: "1hr",
      created_by: "John",
      client: " SocialSEO",
      location: "2485 Jarvisville Road",
      payroll_id: "558612",
    },
    {
      id: 2,

      set_name: "Outdoor Backlot",
      dateCreated: "2018-06-23",
      status: "Active",
      production: " Set PA",
      delayed: "1hr",
      created_by: "Musk",
      client: " SocialSEO",
      location: "2485 Jarvisville Road",
      payroll_id: "558612",
    },
    {
      id: 3,
      set_name: "Victorian Era Street",
      dateCreated: "2019-03-10",
      status: "Active",
      production: " Set PA",
      delayed: "1hr",
      created_by: "Andrew",
      client: " SocialSEO",
      location: "2485 Jarvisville Road",
      payroll_id: "558612",
    },
    {
      id: 4,
      set_name: "Sci-Fi Spaceship",
      dateCreated: "2017-11-05",
      status: "In-Active",
      production: " Set PA",
      delayed: "1hr",
      created_by: "Vegas",
      client: " SocialSEO",
      location: "2485 Jarvisville Road",
      payroll_id: "558612",
    },
    {
      id: 5,
      set_name: "Tropical Paradise",
      dateCreated: "2021-02-20",
      status: "Active",
      production: " Set PA",
      created_by: "phillip",
      client: " SocialSEO",
      location: "2485 Jarvisville Road",
      payroll_id: "558612",
      delayed: "1hr",
    },

    {
      id: 6,
      set_name: "Medieval Castle",
      dateCreated: "2020-01-15",
      status: "Active",
      production: " Set PA",
      created_by: "John",
      client: " SocialSEO",
      payroll_id: "558612",
      location: "2485 Jarvisville Road",
      delayed: "1hr",
    },
    {
      id: 7,
      set_name: "Wild West Town",
      dateCreated: "2018-06-23",
      status: "Active",
      production: " Set PA",
      delayed: "1hr",
      created_by: "Musk",
      client: " SocialSEO",
      location: "2485 Jarvisville Road",
      payroll_id: "558612",
    },
    {
      id: 8,
      set_name: "Futuristic Lab",
      dateCreated: "2019-03-10",
      status: "Active",
      production: " Set PA",
      delayed: "1hr",
      created_by: "Andrew",
      client: " SocialSEO",
      location: "2485 Jarvisville Road",
      payroll_id: "558612",
    },
    {
      id: 9,
      set_name: "Futuristic Lab",
      dateCreated: "2017-11-05",
      status: "In-Active",
      production: " Set PA",
      delayed: "1hr",
      created_by: "Vegas",
      client: " SocialSEO",
      location: "2485 Jarvisville Road",
      payroll_id: "558612",
    },
    {
      id: 10,
      set_name: "DevOps",
      dateCreated: "2021-02-20",
      status: "Active",
      production: " Set PA",
      delayed: "1hr",
      created_by: "phillip",
      client: " SocialSEO",
      location: "2485 Jarvisville Road",
      payroll_id: "558612",
    },
  ];

  const columns = [
    {
      name: <div>Payroll ID</div>,
      sortable: true,
      sortField: "fullName",
      selector: (row) => row?.payroll_id,
      cell: (row) => row?.payroll_id,
    },

    {
      name: <div>Client</div>,
      sortable: true,
      sortField: "fullName",
      selector: (row) => row?.fullName,
      cell: (row) => row?.client,
    },

    {
      name: <div>Production</div>,
      sortable: true,
      sortField: "fullName",
      selector: (row) => row?.fullName,
      width: "140px",
      cell: (row) => row?.production,
    },

    {
      name: <div>Due Date</div>,
      sortable: true,
      sortField: "fullName",
      selector: (row) => row?.fullName,
      cell: (row) => row?.dateCreated,
    },

    {
      name: <div>Delayed</div>,
      sortable: true,
      sortField: "fullName",
      selector: (row) => row?.fullName,
      cell: (row) => row?.delayed,
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
          tableTitle={"Flight Status Tracker"}
          title={true}
          data={tableData}
          columns={columns}
        />
      </CardBody>
    </Card>
  );
};

export default FlightStatusTrackerTable;
