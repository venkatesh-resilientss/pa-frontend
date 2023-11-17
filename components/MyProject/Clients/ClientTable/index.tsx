import { useEffect, useState } from "react";
import { IoAlertCircle, IoTimerOutline } from "react-icons/io5";
import { MdCancel, MdPlayCircleFilled } from "react-icons/md";
import { AiFillCheckCircle } from "react-icons/ai";
import { FcFilmReel } from "react-icons/fc";
import clientLogo from "src/assets/MyImages/client.svg";
import BluBlu from "src/assets/MyImages/blublu.svg";
import storyFoam from "src/assets/MyImages/storyfarm.svg";
import Indigo from "src/assets/MyImages/indigo.svg";
import fiveFilms from "src/assets/MyImages/5films.svg";
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
import DataTableWithButtons from "../../Table/index";
import { BiCheckCircle } from "react-icons/bi";
import { openDeleteClientPopup } from "redux/slices/mySlices/clients";
import { ClientsService } from "services";
import useSWR from "swr";
import moment from "moment";
import GridTable from "components/grid-tables/gridTable";

const ClientsListTable = () => {
  const dispatch = useDispatch();

  const router = useRouter();
  const [clientModal, setClientModal] = useState(false);
  const toggle = () => setClientModal(!clientModal);

  const clientService = new ClientsService();

  const { data: clientData } = useSWR("LIST_CLIENTS", () =>
    clientService.getClients()
  );

  const addNewClientSoftwares = [
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

  const columns = [
    {
      name: <div>Client Info</div>,
      width: "290px",
      sortable: true,
      sortField: "production_name",
      // selector: (row) => row?.production_name,
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
            <div className="m-auto fw-bolder">{row?.Company.name}</div>
            <div
              className=" "
              style={{
                fontSize: "10px",
              }}
            >
              {row?.Name}
            </div>
            <div className="" style={{ fontSize: "10px" }}>
              name@.gmail.com
            </div>
          </div>{" "}
        </div>
      ),
    },

    {
      name: <div>Active Productions</div>,
      width: "170px",
      sortable: true,
      sortField: "production_name",
      selector: (row) => row?.production_name,
      cell: (row) => row?.active_projects,
    },

    {
      name: <div>Rss Support User</div>,
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
      sortField: "CreatedBy",
      selector: (row) => row?.CreatedBy,
      cell: (row) => row?.Created?.username,
    },

    {
      name: <div>Created On</div>,
      sortable: true,
      sortField: "production_name",
      selector: (row) => row?.production_name,
      cell: (row) => moment(row?.UpdatedDate).format("YYYY-MM-DD "),
      width: "130px",
    },

    // {
    //   name: <div>Documents</div>,
    //   cell: (row) => (
    //     <div>
    //       <div style={{ fontSize: "10px", fontWeight: "400" }}>
    //         <BiCheckCircle className="text-success" size={14} /> Insurance
    //         Policy{" "}
    //       </div>
    //       <div style={{ fontSize: "10px", fontWeight: "400" }}>
    //         {" "}
    //         <BiCheckCircle className="text-success" size={14} />
    //         W-9 Forms{" "}
    //       </div>
    //     </div>
    //   ),
    //   width: "150px",
    // },

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
          <DropdownMenu end container="body">
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => {
                e.preventDefault(), router.push(`/client-details`);
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
    <div className="p-4">
      <Card className="w-100 p-3 client-card-bg my-3">
        <div className="d-flex justify-content-between ">
          <div className="pt-2 cardheader-text">All Clients</div>
          <Button
            className="my-1 my-sm-0 button-props border-0 "
            onClick={toggle}
          >
            <Users size={14} /> Create Client
          </Button>
        </div>
      </Card>
      {/* <GridTable rowData={clientData} columnDefs={columns} pageSize={4} /> */}
      <DataTableWithButtons
        tableTitle={"All Clients"}
        data={clientData}
        columns={columns}
        showButton={true}
        buttonClick={() => router.push(`/clients/create-client`)}
        buttonName={
          <div>
            <Users size={14} /> Create Client
          </div>
        }
      />
      <Modal isOpen={clientModal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add New Client</ModalHeader>
        <ModalBody>
          <p>Softwares</p>
          <Form>
            <div className="d-flex flex-wrap gap-2">
              {addNewClientSoftwares.map((software) => (
                <FormGroup check>
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
              router.push("/clients/create-client");
            }}
          >
            Create
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ClientsListTable;
