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
import { SetsService } from "@src/services";
import useSWR from "swr";
import moment from "moment";

const AllSetsTable = () => {
  const history = useHistory();
  const setsService = new SetsService();

  const {
    data: setsData,
    isLoading: userLoading,
    error: userError,
    mutate: userMutate,
  } = useSWR("LIST_SETS", () => setsService.getSets());

  // const tableData = [
  //   {
  //     id: 1,
  //     set_name: "Studio A",
  //     dateCreated: "2020-01-15",
  //     status: "Active",
  //     description: "hello",
  //     created_by: "John",
  //     set_id: "9359",
  //     location: "2485 Jarvisville Road",
  //   },
  //   {
  //     id: 2,

  //     set_name: "Outdoor Backlot",
  //     dateCreated: "2018-06-23",
  //     status: "Active",
  //     description: "hello",
  //     created_by: "Musk",
  //     set_id: "9359",
  //     location: "2485 Jarvisville Road",
  //   },
  //   {
  //     id: 3,
  //     set_name: "Victorian Era Street",
  //     dateCreated: "2019-03-10",
  //     status: "Active",
  //     description: "hello",
  //     created_by: "Andrew",
  //     set_id: "9359",
  //     location: "2485 Jarvisville Road",
  //   },
  //   {
  //     id: 4,
  //     set_name: "Sci-Fi Spaceship",
  //     dateCreated: "2017-11-05",
  //     status: "In-Active",
  //     description: "hello",
  //     created_by: "Vegas",
  //     set_id: "9359",
  //     location: "2485 Jarvisville Road",
  //   },
  //   {
  //     id: 5,
  //     set_name: "Tropical Paradise",
  //     dateCreated: "2021-02-20",
  //     status: "Active",
  //     description: "hello",
  //     created_by: "phillip",
  //     set_id: "9359",
  //     location: "2485 Jarvisville Road",
  //   },

  //   {
  //     id: 6,
  //     set_name: "Medieval Castle",
  //     dateCreated: "2020-01-15",
  //     status: "Active",
  //     description: "hello",
  //     created_by: "John",
  //     set_id: "9359",
  //     location: "2485 Jarvisville Road",
  //   },
  //   {
  //     id: 7,
  //     set_name: "Wild West Town",
  //     dateCreated: "2018-06-23",
  //     status: "Active",
  //     description: "hello",
  //     created_by: "Musk",
  //     set_id: "9359",
  //     location: "2485 Jarvisville Road",
  //   },
  //   {
  //     id: 8,
  //     set_name: "Futuristic Lab",
  //     dateCreated: "2019-03-10",
  //     status: "Active",
  //     description: "hello",
  //     created_by: "Andrew",
  //     set_id: "9359",
  //     location: "2485 Jarvisville Road",
  //   },
  //   {
  //     id: 9,
  //     set_name: "Futuristic Lab",
  //     dateCreated: "2017-11-05",
  //     status: "In-Active",
  //     description: "hello",
  //     created_by: "Vegas",
  //     set_id: "9359",
  //     location: "2485 Jarvisville Road",
  //   },
  //   {
  //     id: 10,
  //     set_name: "DevOps",
  //     dateCreated: "2021-02-20",
  //     status: "Active",
  //     description: "hello",
  //     created_by: "phillip",
  //     set_id: "9359",
  //     location: "2485 Jarvisville Road",
  //   },
  // ];

  const columns = [
    {
      name: <div>Set Code</div>,
      width: "140px",
      sortable: true,
      sortField: "Code",
      selector: (row) => row?.Code,
      cell: (row) => row?.Code,
    },
    {
      name: <div>Set Name</div>,
      width: "170px",
      sortable: true,
      sortField: "Name",
      selector: (row) => row?.Name,
      cell: (row) => row?.Name,
    },

    {
      name: <div>Description</div>,
      width: "160px",
      sortable: true,
      sortField: "Description",
      selector: (row) => row?.Description,
      cell: (row) => row?.Description,
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
      sortField: "UpdatedDate",
      selector: (row) => row?.UpdatedDate,
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
              onClick={() => history.push(`/edit-set/${row?.id}`, { row })}
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
          tableTitle={"All Sets"}
          header={true}
          data={setsData}
          columns={columns}
          showButton={true}
          buttonClick={() => history.push(`/add-set`)}
          buttonName={
            <div>
              <Plus size={16} />
              Create Set
            </div>
          }
        />
      </CardBody>
    </Card>
  );
};

export default AllSetsTable;
