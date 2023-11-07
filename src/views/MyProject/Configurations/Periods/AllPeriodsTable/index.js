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
import DataTableWithButtons from "@src/views/Generic/Table/index";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { PeriodsService } from "@src/services";
import useSWR from "swr";
import { useDispatch } from "react-redux";
import { openDeletePeriodPopup } from "../../../../../redux/slices/mySlices/configurations";

const AllPeriodsTable = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const periodsService = new PeriodsService();

  const {
    data: periodData,
    isLoading: userLoading,
    error: userError,
    mutate: userMutate,
  } = useSWR("LIST_USERS", () => periodsService.getPeriods());

  const columns = [
    {
      name: <div>Period Name</div>,
      width: "170px",
      sortable: true,
      sortField: "Name",
      selector: (row) => row?.Name,
      cell: (row) => row?.Name,
    },

    {
      name: <div>Start Date</div>,
      width: "140px",
      sortable: true,
      sortField: "Start",
      selector: (row) => row?.Start,
      cell: (row) => moment(row?.start).format("YYYY-MM-DD "),
    },

    {
      name: <div>End Date</div>,
      width: "140px",
      sortable: true,
      sortField: "End",
      selector: (row) => row?.End,
      cell: (row) => row?.End,
    },

    {
      name: <div>Description</div>,
      width: "140px",
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
              onClick={() => history.push(`/edit-period/${row?.id}`, { row })}
            >
              <Edit size={14} className="me-50" />
              <span className="align-middle">Edit</span>
            </DropdownItem>
            <DropdownItem
              onClick={() => dispatch(openDeletePeriodPopup(row.ID))}
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
    <Card className="col-12">
      <CardBody className="overflow-auto">
        {/* <Table
          columns={columns}
          //   customHook={tableData}
          customHook={tableData}   
          showSearch={true}
        /> */}
        <DataTableWithButtons
          tableTitle={"All Periods"}
          header={true}
          data={periodData}
          columns={columns}
          showButton={true}
          buttonClick={() => history.push(`/add-period`)}
          buttonName={
            <div>
              <Plus size={16} />
              Add Period
            </div>
          }
        />
      </CardBody>
    </Card>
  );
};

export default AllPeriodsTable;
