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
import { TaxCodesService } from "@src/services";
import useSWR from "swr";
import moment from "moment";
import { useDispatch } from "react-redux";
import { openDeleteTaxCodesPopup } from "@src/redux/slices/mySlices/configurations";

const AllTaxCodesTable = () => {
  const history = useHistory();

  const dispacth = useDispatch();

  const taxcodesService = new TaxCodesService();

  const {
    data: taxcodesData,
    isLoading: userLoading,
    error: userError,
    mutate: userMutate,
  } = useSWR("LIST_TAXCODES", () => taxcodesService.getTaxCodes());

  const columns = [
    {
      name: <div>Tax Code</div>,
      width: "170px",
      sortable: true,
      sortField: "Code",
      selector: (row) => row?.Code,
      cell: (row) => row?.Code,
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
              onClick={() => history.push(`/edit-tax-code/${row?.id}`, { row })}
            >
              <Edit size={14} className="me-50" />
              <span className="align-middle">Edit</span>
            </DropdownItem>
            <DropdownItem
              onClick={() => dispacth(openDeleteTaxCodesPopup(row.ID))}
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
          tableTitle={"All Tax Codes"}
          header={true}
          data={taxcodesData}
          columns={columns}
          showButton={true}
          buttonClick={() => history.push(`/add-tax-code`)}
          buttonName={
            <div>
              <Plus size={16} />
              Add Tax Code
            </div>
          }
        />
      </CardBody>
    </Card>
  );
};

export default AllTaxCodesTable;
