import GridTable from "components/grid-tables/gridTable";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";

import Image from "next/image";
import actionIcon from "assets/MyImages/charm_menu-kebab.svg";
import editIocn from "assets/myIcons/edit_square.svg";
import { openAssignRSSLPopup } from "../../../../redux/slices/mySlices/productions";

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
import { useRouter } from "next/router";

const ActiveProductionsCard = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const options = [
    { value: "Client is All" },
    { value: "Date is All" },
    { value: "Production is All" },
    { value: "Status is All" },
  ];
  const StateBadge = (props) => {
    const sateDir = {
      active: "success",
      inactive: "danger",
    };
    return (
      <CustomBadge
        bg={sateDir[props.value]}
        value={props.value === "active" ? "Active" : "In-active"}
      />
    );
  };

  const ActionsButton = (props) => {
    const id = `action-popover-${props.value}`;

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
                action={() => {
                  //
                }}
              />
            </DropdownItem>

            <DropdownItem
              className="w-100"
              onClick={() => router.push(`/productions/${props.data.id}`)}
            >
              <Action
                icon={editIocn}
                name={"Edit"}
                action={() => {
                  //
                }}
              />
            </DropdownItem>
            <DropdownItem className="w-100">
              <Action
                icon={detailsIocn}
                name={"Assign RSSL User"}
                action={() => {
                  dispatch(openAssignRSSLPopup("data"));
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
      field: "ProductionCode",
      sortable: true,
      resizable: true,
      width: 150,
    },
    {
      headerName: "Production Name",
      field: "ProductionName",
      sortable: true,
      resizable: true,
      width: 150,
    },
    {
      headerName: "Production Type",
      field: "ProductionType",
      sortable: true,
      resizable: true,
      // width: 300,
      width: 150,
    },
    {
      headerName: "Client",
      field: "Client",
      sortable: true,
      resizable: true,
      width: 150,
    },
    {
      headerName: "Last Payroll Date",
      field: "LastPayrollDate",
      sortable: true,
      resizable: true,
      width: 150,
    },

    {
      headerName: "Labour Type",
      field: "LabourType",
      sortable: true,
      resizable: true,
      width: 150,
    },
    {
      headerName: "Created By",
      field: "CreatedBy",
      sortable: true,
      resizable: true,
      width: 150,
    },
    {
      headerName: "Created On",
      field: "CreatedOn",
      sortable: true,
      resizable: true,
      width: 150,
    },
    {
      headerName: "Status",
      field: "status",
      cellRenderer: StateBadge,
      width: 150,
    },
    {
      headerName: "Actions",
      field: "",
      cellRenderer: ActionsButton,
      cellStyle: {
        textAlign: "center",
      },
    },
    // Add more columns as needed
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

    valueContainer: (provided) => ({
      ...provided,
      height: "30px",
      padding: "0 6px",
    }),

    input: (provided) => ({
      ...provided,
      margin: "0px",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: "30px",
    }),
  };
  const handleChange = () => {
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
              value={null}
              defaultInputValue="Cient is All"
              onChange={handleChange}
              options={options}
              styles={customStyles}
            />
            <Select
              value={null}
              defaultInputValue="Date is All"
              onChange={handleChange}
              options={options}
              styles={customStyles}
            />
            <Select
              value={null}
              defaultInputValue="Production is All"
              onChange={handleChange}
              options={options}
              styles={customStyles}
            />
            <Select
              value={null}
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
        rowData={rowData}
        columnDefs={columnDefs}
        pageSize={4}
        searchText={undefined}
      />
    </div>
  );
};

export default ActiveProductionsCard;
