import {
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import { ArrowUp, Edit, MoreVertical, Table, Trash } from "react-feather";
import DataTableWithButtons from "../../../Generic/Table/index";
import { openAssignRSSLPopup } from "../../../../redux/slices/mySlices/productions";
import { useDispatch } from "react-redux";

const PendingProductionsTable = () => {
  const dispatch = useDispatch();

  const tableData = [
    {
      production_name: "Inceptos",
      client: "Umault LLC",
      dateCreated: "2020-01-15",
      production_id: "487441",
      created_by: "John",
    },

    {
      production_name: "Magna Malesuada",
      client: "5:00 Films & Media",
      dateCreated: "2018-06-23",
      production_id: "488768",
      created_by: "Musk",
    },

    {
      production_name: "Malesuada Ipsum",
      client: "ALCHEMY Creative",
      dateCreated: "2019-03-10",
      production_id: "487090",
      created_by: "Andrew",
    },

    {
      production_name: "Fringilla Fusce Elit",
      client: "BluBlu Studios Corp",
      dateCreated: "2017-11-05",
      status: "In-Active",
      production_id: "4874435",
      created_by: "Vegas",
    },

    {
      production_name: "Parturient Venenatis Etiam",
      client: "Indigo Productions ",
      dateCreated: "2021-02-20",
      production_id: "487987",
      created_by: "phillip",
    },

    {
      production_name: "Venenatis Mollis",
      client: "Umault LLC",
      dateCreated: "2020-01-15",
      production_id: "487487",
      created_by: "John",
    },

    {
      production_name: "Magna Malesuada",
      client: "5:00 Films & Media",
      dateCreated: "2018-06-23",
      production_id: "487889",
      created_by: "Musk",
    },

    {
      production_name: "Quam",
      client: "Umault LLC",
      dateCreated: "2020-01-15",
      production_id: "487555",
      created_by: "John",
    },

    {
      production_name: "Quam",
      client: "5:00 Films & Media",
      dateCreated: "2018-06-23",
      production_id: "487441",
      created_by: "Musk",
    },
  ];

  const columns = [
    {
      name: <div>Production Name</div>,
      width: "160px",
      sortable: true,
      sortField: "production_name",
      selector: (row) => row?.production_name,
      cell: (row) => row?.production_name,
    },

    {
      name: <div>Production Id</div>,
      width: "150px",
      sortable: true,
      sortField: "production_id",
      selector: (row) => row?.production_id,
      cell: (row) => row?.production_id,
    },

    {
      name: <div>Client Name</div>,
      width: "140px",
      sortable: true,
      sortField: "client",
      selector: (row) => row?.client,
      cell: (row) => row?.client,
    },

    {
      name: <div>Created By</div>,
      sortable: true,
      sortField: "created_by",
      selector: (row) => row?.created_by,
      cell: (row) => row?.created_by,
      width: "130px",
    },

    {
      name: <div>Created On</div>,
      sortable: true,
      sortField: "dateCreated",
      selector: (row) => row?.dateCreated,
      cell: (row) => row?.dateCreated,
      width: "130px",
    },

    {
      name: <div>Start Date</div>,
      sortable: true,
      sortField: "dateCreated",
      selector: (row) => row?.dateCreated,
      cell: (row) => row?.dateCreated,
      width: "130px",
    },

    {
      name: <div>Options</div>,

      cell: (row) => (
        <UncontrolledDropdown>
          <DropdownToggle tag="span">
            <MoreVertical size={17} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem className="w-100">
              <Edit size={14} className="me-50" />
              <span className="align-middle">Edit</span>
            </DropdownItem>
            <DropdownItem
              className="w-100"
              onClick={() => dispatch(openAssignRSSLPopup(row))}
            >
              <Table size={14} className="me-50" />
              <span className="align-middle">Assign RSSL User</span>
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
        <DataTableWithButtons data={tableData} columns={columns} />
      </CardBody>
    </Card>
  );
};

export default PendingProductionsTable;
