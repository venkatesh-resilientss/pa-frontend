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
import DataTableWithButtons from "@src/views/Generic/Table/index.js";

import { FcFilmReel } from "react-icons/fc";
import { useHistory } from "react-router-dom";
import { BankService } from "@src/services";
import useSWR from "swr";
import moment from "moment";
import { openDeleteBanksPopup } from "@src/redux/slices/mySlices/configurations";
import { useDispatch } from "react-redux";

const AllBanksTable = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  // const { data } = useGetAllBanksQuery();

  // console.log("DATA:", data);

  const bankService = new BankService();

  const {
    data: bankData,
    isLoading: userLoading,
    error: userError,
    mutate: userMutate,
  } = useSWR("LIST_BANKS", () => bankService.getBanks());

  console.log("BankData:", bankData);

  const columns = [
    {
      name: <div>Bank Code</div>,
      width: "140px",
      sortable: true,
      sortField: "Code",
      selector: (row) => row?.Code,
      cell: (row) => row?.Code,
    },
    {
      name: <div>Bank Name</div>,
      width: "170px",
      sortable: true,
      sortField: "Name",
      selector: (row) => row?.Name,
      cell: (row) => row?.Name,
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
              onClick={() => history.push(`/edit-bank/${row?.id}`, { row })}
            >
              <Edit size={14} className="me-50" />
              <span className="align-middle">Edit</span>
            </DropdownItem>
            <DropdownItem
              onClick={() => dispacth(openDeleteBanksPopup())}
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
          customHook={columns}
          customHook={useGetAllBanksQuery}
          showSearch={true}
        /> */}
        <DataTableWithButtons
          tableTitle={"All Banks"}
          header={true}
          data={bankData}
          columns={columns}
          showButton={true}
          buttonClick={() => history.push(`/add-bank`)}
          buttonName={
            <div>
              <Plus size={16} />
              Add Bank
            </div>
          }
        />
      </CardBody>
    </Card>
  );
};

export default AllBanksTable;
