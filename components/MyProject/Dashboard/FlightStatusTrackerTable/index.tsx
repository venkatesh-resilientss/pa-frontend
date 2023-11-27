import {
  Card,
  CardBody,
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import axios from "axios";
import GridTable from "components/grid-tables/gridTable";

const FlightStatusTrackerTable = () => {
  const tableCustomStyles = {
    headRow: {
      style: {
        color: "#223336",
        backgroundColor: "#D9D9D9",
      },
    },
  };
  const styleColor = {
    fontSize: "14px",
  };
  const rowData = [
    {
      id: 1,
      set_name: "Studio A",
      dateCreated: "2020-01-15",
      status: "Active",
      production: " QSet PA",
      delayed: "2hr",
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
      production: " ASet PA",
      delayed: "1hr",
      created_by: "Musk",
      client: "SocialSEO",
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
      client: "SocialSEO",
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
      client: "SocialSEO",
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
      client: "SocialSEO",
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
      client: "SocialSEO",
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
      client: "SocialSEO",
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
      client: "SocialSEO",
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
      client: "SocialSEO",
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
      client: "ASocialSEO",
      location: "2485 Jarvisville Road",
      payroll_id: "558612",
    },
  ];

  const colDef = [
    {
      headerName: "Payroll ID",
      field: "payroll_id",
      sortable: true,
    },
    {
      headerName: "Client",
      field: "client",
    },
    {
      headerName: "Production",
      field: "production",
    },
    {
      headerName: "Sales Person",
      field: "",
    },
    {
      headerName: "Due Date",
      field: "",
    },
    {
      headerName: "Delayed",
      field: "delayed",
    },
  ];

  return (
    <>
    <Card className="col-12" style={{ height: "100%" }}>
      <div className="text-black p-3">
        <div className="d-flex mb-3 justify-content-between align-items-center">
          <h5 style={{fontWeight : 600}}>Flight Status Tracker</h5>
          <div className="d-flex cursor-pointer gap-2 align-items-center">
            <p>View all</p>  
            <img src="/icons/arrow-left.svg" alt="" style={{transform : 'rotate(180deg)'}} />
          </div>
        </div>

        <GridTable rowData={rowData} columnDefs={colDef} pageSize={4} searchText={undefined} />
      </div>
    </Card>
    </>
  );
};

export default FlightStatusTrackerTable;
