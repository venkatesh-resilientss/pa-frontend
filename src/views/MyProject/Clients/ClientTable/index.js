import { useEffect, useState } from "react";
import { IoAlertCircle, IoTimerOutline } from "react-icons/io5";
import { MdCancel, MdPlayCircleFilled } from "react-icons/md";
import { AiFillCheckCircle } from "react-icons/ai";
import { FcFilmReel } from "react-icons/fc";
import clientLogo from "../../../../assets/MyImages/client.svg";
import BluBlu from "../../../../assets/MyImages/blublu.svg";
import storyFoam from "../../../../assets/MyImages/storyfarm.svg";
import Indigo from "../../../../assets/MyImages/indigo.svg";
import fiveFilms from "../../../../assets/MyImages/5films.svg";

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
import { useHistory } from "react-router-dom";
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
import DataTableWithButtons from "../../Table/index";
import { BiCheckCircle } from "react-icons/bi";
import { openDeleteClientPopup } from "../../../../redux/slices/mySlices/clients";

const ClientsListTable = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const tableData = [
    {
      client: "Umault LLC",
      dateCreated: "2020-01-15",
      status: "Active",
      active_projects: "07",
      created_by: "John",
      image: clientLogo,
    },
    {
      client: "5:00 Films & Media",
      dateCreated: "2018-06-23",
      status: "Active",
      active_projects: "06",
      created_by: "Musk",
      image: fiveFilms,
    },
    {
      client: "ALCHEMY Creative",
      dateCreated: "2019-03-10",
      status: "Active",
      active_projects: "10",
      created_by: "Andrew",
      image: storyFoam,
    },
    {
      client: "BluBlu Studios Corp",
      dateCreated: "2017-11-05",
      status: "In-Active",
      active_projects: "04",
      created_by: "Vegas",
      image: BluBlu,
    },
    {
      client: "Indigo Productions ",
      dateCreated: "2021-02-20",
      status: "Active",
      active_projects: "02",
      created_by: "phillip",
      image: Indigo,
    },

    {
      client: "Umault LLC",
      dateCreated: "2020-01-15",
      status: "Active",
      active_projects: "08",
      created_by: "John",
      image: clientLogo,
    },
    {
      client: "5:00 Films & Media",
      dateCreated: "2018-06-23",
      status: "Active",
      active_projects: "08",
      created_by: "Musk",
      image: storyFoam,
    },

    {
      client: "Umault LLC",
      dateCreated: "2020-01-15",
      status: "Active",
      active_projects: "08",
      created_by: "John",
      image: storyFoam,
    },
    {
      client: "5:00 Films & Media",
      dateCreated: "2018-06-23",
      status: "Active",
      active_projects: "08",
      created_by: "Musk",
      image: storyFoam,
    },
  ];

  const columns = [
    {
      name: <div>Client Info</div>,
      width: "290px",
      sortable: true,
      sortField: "production_name",
      selector: (row) => row?.production_name,
      cell: (row) => (
        <div className="d-flex gap-1">
          <img
            className="rounded-circle"
            src={row.image}
            alt=""
            style={{
              width: "30px",
              height: "30px",
            }}
          />
          <div className="d-flex flex-column" style={{ gap: "3px" }}>
            <div className="m-auto fw-bolder">{row?.client}</div>
            <div
              className=" "
              style={{
                fontSize: "10px",
              }}
            >
              Admin Name
            </div>
            <div className="" style={{ fontSize: "10px" }}>
              name@.gmail.com
            </div>
          </div>{" "}
        </div>
      ),
    },

    {
      name: <div>Active Projects</div>,
      width: "150px",
      sortable: true,
      sortField: "production_name",
      selector: (row) => row?.production_name,
      cell: (row) => row?.active_projects,
    },

    {
      name: <div>Created By</div>,
      width: "140px",
      sortable: true,
      sortField: "production_name",
      selector: (row) => row?.production_name,
      cell: (row) => row?.created_by,
    },

    {
      name: <div>Created On</div>,
      sortable: true,
      sortField: "production_name",
      selector: (row) => row?.production_name,
      cell: (row) => row?.dateCreated,
      width: "130px",
    },

    {
      name: <div>Documents</div>,
      cell: (row) => (
        <div>
          <div style={{ fontSize: "10px", fontWeight: "400" }}>
            <BiCheckCircle className="text-success" size={14} /> Insurance
            Policy{" "}
          </div>
          <div style={{ fontSize: "10px", fontWeight: "400" }}>
            {" "}
            <BiCheckCircle className="text-success" size={14} />
            W-9 Forms{" "}
          </div>
        </div>
      ),
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
              onClick={(e) => {
                e.preventDefault(), history.push(`/client-details`);
              }}
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
            <DropdownItem
              className="w-100"
              onClick={() => dispatch(openDeleteClientPopup())}
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
          tableTitle={"All Clients"}
          data={tableData}
          columns={columns}
          showButton={true}
          buttonClick={() => history.push(`/create-client`)}
          buttonName={
            <div>
              <Users size={14} /> Create Client
            </div>
          }
        />
      </CardBody>
    </Card>
  );
};

export default ClientsListTable;
