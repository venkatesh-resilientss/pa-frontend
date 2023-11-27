import GridTable from "components/grid-tables/gridTable";
import Form from "react-bootstrap/Form";
import { InputGroup, Row, Col } from "react-bootstrap";

import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import actionIcon from "assets/MyImages/charm_menu-kebab.svg";
import editIocn from "assets/myIcons/edit_square.svg";
import { openAssignRSSLPopup } from "../../../../redux/slices/mySlices/productions";

import { useState } from "react";
import detailsIocn from "assets/myIcons/list.svg";
import CustomBadge from "components/Generic/CustomBadge";
import Select from "react-select";

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useDispatch } from "react-redux";
import AssignRSSLPopup from "../PendingProductions/AssignRSSLPopup";
import { useRouter } from "next/router";
import { ProjectService } from "services";
import useSWR from "swr";
import moment from "moment";

const AllProductionsTable = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");

  const projectService = new ProjectService();

  const {
    data: projectsData,
    isLoading: projectsLoading,
    error: userError,
    mutate: userMutate,
  } = useSWR(["LIST_PROJECTS", searchText], () => projectService.getProjects());

  const router = useRouter();

  const options = [
    { value: "Client is All" },
    { value: "Date is All" },
    { value: "Production is All" },
    { value: "Status is All" },
  ];
  const StateBadge = (props) => {
    const sateDir = {
      true: "success",
      false: "danger",
    };

    return (
      <CustomBadge
        bg={sateDir[props.value]}
        value={props.value ? "Active" : "In-active"}
      />
    );
  };

  const ActionsButton = (props) => {
    const id = `action-popover-${props.value}`;
    const [open, setOpen] = useState(false);

    const toggle = () => {
      setOpen(!open);
    };
    const Action = ({ icon, name, action }) => {
      return (
        <div onClick={action} className="d-flex align-items-center gap-2">
          <Image src={icon} alt={name} />
          <p>{name}</p>
        </div>
      );
    };
    return (
      <div>
        <UncontrolledDropdown>
          <DropdownToggle tag="span">
            <Image
              src={actionIcon}
              alt=""
              width={14}
              id={id}
              style={{ marginLeft: "20px" }}
            />
          </DropdownToggle>
          <DropdownMenu end container="body">
            <DropdownItem className="w-100">
              <Action
                icon={detailsIocn}
                name={"View Details"}
                action={() => {}}
              />
            </DropdownItem>

            <DropdownItem
              className="w-100"
              onClick={(e) => router.push(`/edit-production/${props.data.id}`)}
            >
              <Action icon={editIocn} name={"Edit"} action={() => {}} />
            </DropdownItem>
            <DropdownItem className="w-100">
              <Action
                icon={detailsIocn}
                name={"Assign RSSL User"}
                action={(e) => {
                  dispatch(openAssignRSSLPopup(props.data));
                }}
              />
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    );
  };

  const columnDefs = [
    {
      headerName: "Production Code",
      field: "Code",
      sortable: true,
      resizable: true,
    },
    {
      headerName: "Production Name",
      field: "Name",
      sortable: true,
      resizable: true,
    },
    {
      headerName: "Production Type",
      field: "ProjectType.Name",
      sortable: true,
      resizable: true,
      // width: 300,
    },
    {
      headerName: "Client",
      field: "Client.Name",
      sortable: true,
      resizable: true,
    },
    {
      headerName: "Last Payroll Date",
      field: "LastPayrollDate",
      sortable: true,
      resizable: true,
    },

    {
      headerName: "Labour Type",
      field: "LabourType",
      sortable: true,
      resizable: true,
    },
    {
      headerName: "Created By",
      field: "CreatedBy",

      sortable: true,
      resizable: true,
    },
    {
      headerName: "Created On",
      field: "CreatedDate",
      cellRenderer: (params) => {
        const formattedDate = moment(params.value).format("YYYY-MM-DD");
        return <div>{formattedDate}</div>;
      },
      sortable: true,
      resizable: true,
    },
    {
      headerName: "Status",
      field: "IsActive",
      cellRenderer: StateBadge,
    },
    {
      headerName: "Actions",
      field: "ID",
      // cellRenderer: ActionsButton,
      cellStyle: {
        textAlign: "center",
      },
    },
  ];

  const rowData = [
    {
      ProductionCode: "P001",
      ProductionName: "Product A",
      ProductionType: "Type 1",
      Client: "Client X",
      LastPayrollDate: "2023-11-01",
      LabourType: "Skilled",
      CreatedBy: "John Doe",
      CreatedOn: "2023-10-15",
      status: "active",
      id: 1,
    },
    {
      ProductionCode: "P002",
      ProductionName: "Product B",
      ProductionType: "Type 2",
      Client: "Client Y",
      LastPayrollDate: "2023-11-05",
      LabourType: "Unskilled",
      CreatedBy: "Jane Smith",
      CreatedOn: "2023-10-20",
      status: "inactive",
      id: 2,
    },
    {
      ProductionCode: "P003",
      ProductionName: "Product C",
      ProductionType: "Type 1",
      Client: "Client Z",
      LastPayrollDate: "2023-11-10",
      LabourType: "Skilled",
      CreatedBy: "Bob Johnson",
      CreatedOn: "2023-10-25",
      status: "active",
      id: 3,
    },
    {
      ProductionCode: "P004",
      ProductionName: "Product D",
      ProductionType: "Type 3",
      Client: "Client W",
      LastPayrollDate: "2023-11-15",
      LabourType: "Skilled",
      CreatedBy: "Alice Brown",
      CreatedOn: "2023-11-01",
      status: "inactive",
      id: 4,
    },
    {
      ProductionCode: "P005",
      ProductionName: "Product E",
      ProductionType: "Type 2",
      Client: "Client V",
      LastPayrollDate: "2023-11-20",
      LabourType: "Unskilled",
      CreatedBy: "Charlie Green",
      CreatedOn: "2023-11-05",
      status: "active",
      id: 5,
    },
    {
      ProductionCode: "P006",
      ProductionName: "Product F",
      ProductionType: "Type 1",
      Client: "Client U",
      LastPayrollDate: "2023-11-25",
      LabourType: "Unskilled",
      CreatedBy: "Eva White",
      CreatedOn: "2023-11-10",
      status: "Active",
      id: 6,
    },
    {
      ProductionCode: "P007",
      ProductionName: "Product G",
      ProductionType: "Type 3",
      Client: "Client T",
      LastPayrollDate: "2023-11-30",
      LabourType: "Skilled",
      CreatedBy: "David Black",
      CreatedOn: "2023-11-15",
      status: "active",
      id: 7,
    },
  ];
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: "#9e9e9e",
      minHeight: "30px",
      height: "30px",
      width: "auto",
      boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: "30px",
      padding: "0 6px",
    }),

    input: (provided, state) => ({
      ...provided,
      margin: "0px",
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "30px",
    }),
  };
  const handleChange = (selectedOption) => {
    // setSelectedOption();
  };

  return (
    <div className="m-2">
      <Row gutter={[16, 16]} className="mt-3">
        <Col span={12}>
          <div
            style={{
              display: "flex",
              gap: 15,
            }}
          >
            <Select
              value={selectedOption}
              defaultInputValue="Cient is All"
              onChange={handleChange}
              options={options}
              styles={customStyles}
            />
            <Select
              value={selectedOption}
              defaultInputValue="Date is All"
              onChange={handleChange}
              options={options}
              styles={customStyles}
            />
            <Select
              value={selectedOption}
              defaultInputValue="Production is All"
              onChange={handleChange}
              options={options}
              styles={customStyles}
            />
            <Select
              value={selectedOption}
              defaultInputValue="Status is All"
              onChange={handleChange}
              options={options}
              styles={customStyles}
            />
            {/* <Form.Select style={selectStyle}>
              <option value="1">
                Client <span style={redTextStyle}>is</span> all
              </option>
            </Form.Select>
            <Form.Select style={selectStyle}>
              <option value="1">Date is All</option>
            </Form.Select>
            <Form.Select style={selectStyle}>
              <option value="1">Production type is All</option>
            </Form.Select>
            <Form.Select style={selectStyle}>
              <option value="1">Status is All</option>
            </Form.Select> */}
          </div>
        </Col>
        <Col span={12}>
          <div style={{ float: "right" }}>
            <div className="mb-4 flex">
              <Form onSubmit={(e) => e.preventDefault()}>
                <input
                  className="search mr-2"
                  type="search"
                  placeholder="Search..."
                />
              </Form>
            </div>
          </div>
        </Col>
      </Row>
      <GridTable
        rowData={projectsData}
        columnDefs={columnDefs}
        pageSize={4}
        searchText={undefined}
      />
    </div>
  );
};

export default AllProductionsTable;
