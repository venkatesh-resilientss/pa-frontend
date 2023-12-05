import { FcFilmReel } from "react-icons/fc";

import {
  Card,
  CardBody,
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import { Edit, File, MoreVertical, Trash } from "react-feather";
import DataTableWithButtons from "../../../../Table/index";
// import { openDeleteProjectPopup } from "redux/slices/mySlices/clients";

const RSSSupportUserTable = () => {
  const tableData = [
    {
      member: "Johnie",
      create_on: "2020-09-15",
      status: "Active",
      role: "RSS Support User",
      modules: "All Modules",
      image:
        "https://images.ctfassets.net/lh3zuq09vnm2/yBDals8aU8RWtb0xLnPkI/19b391bda8f43e16e64d40b55561e5cd/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.png",
      access: "Full",
    },
    {
      member: "Harley",
      create_on: "2020-01-15",
      status: "In-Active",
      role: "Rss Support User",
      modules: "All Modules",
      image:
        "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1280",
      access: "Full",
    },
  ];

  const columns = [
    {
      name: <div>Member </div>,
      width: "170px",
      cell: (row) => (
        <div className="d-flex gap-1">
          <img
            className="rounded-circle"
            src={row?.image}
            alt=""
            style={{
              width: "30px",
              height: "30px",
            }}
          />
          <div>
            <div className="m-auto fw-bolder">{row?.client}</div>
            <div className="m-auto" style={{ fontSize: "10px" }}>
              {row?.member}
            </div>
            <div className="m-auto" style={{ fontSize: "10px" }}>
              name@.gmail.com
            </div>
          </div>{" "}
        </div>
      ),
    },

    {
      name: <div>Role</div>,
      width: "150px",
      cell: (row) => row?.role,
    },

    {
      name: <div>Modules</div>,
      width: "140px",
      cell: (row) => row?.modules,
    },

    {
      name: <div>Access</div>,
      cell: (row) => row?.access,
      width: "130px",
    },

    {
      name: <div>Created On</div>,
      cell: (row) => row?.create_on,
      width: "150px",
    },

    {
      name: <div>Status</div>,
      cell: (row) => (
        <div>
          <Badge
            color={row?.status === "Active" ? "light-success" : "light-danger"}
          >
            {row?.status}
          </Badge>
        </div>
      ),
    },

    {
      name: <div>Options</div>,
      cell: () => (
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
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => e.preventDefault()}
            >
              <FcFilmReel size={14} className="me-50" />
              <span className="align-middle">View Productions</span>
            </DropdownItem>
            <DropdownItem className="w-100">
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
        <DataTableWithButtons data={tableData} columns={columns} />
      </CardBody>
    </Card>
  );
};

export default RSSSupportUserTable;
