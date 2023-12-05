import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Row,
  Col,
} from "reactstrap";
import GridTable from "components/grid-tables/gridTable";
import { openAssignRSSLPopup } from "../../../../redux/slices/mySlices/productions";
import actionIcon from "assets/MyImages/charm_menu-kebab.svg";
import editIocn from "assets/myIcons/edit_square.svg";
import detailsIocn from "assets/myIcons/list.svg";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";

import Image from "next/image";
import Select from "react-select";

const PendingProductionsTable = () => {
  const dispatch = useDispatch();
  const options = [
    { value: "Client is All", label: "Chocolate" },
    { value: "Date is All", label: "Strawberry" },
    { value: "Production is All", label: "Vanilla" },
    { value: "Status is All", label: "Vanilla" },
  ];

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
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => e.preventDefault()}
            >
              <Action
                icon={editIocn}
                name={"Edit"}
                action={() => {
                  //
                }}
              />
            </DropdownItem>
            <DropdownItem tag="a" href="/" className="w-100">
              <Action
                icon={detailsIocn}
                name={"Assign RSSL User"}
                action={(e) => {
                  e.preventDefault(), dispatch(openAssignRSSLPopup("data"));
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
      width: 150,
    },
    {
      headerName: "Client Name",
      field: "ClientName",
      sortable: true,
      resizable: true,
      width: 100,
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
      headerName: "Start Date",
      field: "StartDate",
      sortable: true,
      resizable: true,
      width: 150,
    },

    {
      headerName: "Actions",
      field: "id",
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
      ClientName: "Client X",
      LastPayrollDate: "2023-11-01",
      LabourType: "Skilled",
      CreatedBy: "John Doe",
      CreatedOn: "2023-10-15",
      StartDate: "2023-11-05",
      id: 1,
    },
    {
      ProductionCode: "P002",
      ProductionName: "Product B",
      ProductionType: "Type 2",
      ClientName: "Client Y",
      LastPayrollDate: "2023-11-05",
      LabourType: "Unskilled",
      CreatedBy: "Jane Smith",
      CreatedOn: "2023-10-20",
      StartDate: "2023-11-10",
      id: 2,
    },
    {
      ProductionCode: "P003",
      ProductionName: "Product C",
      ProductionType: "Type 1",
      ClientName: "Client Z",
      LastPayrollDate: "2023-11-10",
      LabourType: "Skilled",
      CreatedBy: "Bob Johnson",
      CreatedOn: "2023-10-25",
      StartDate: "2023-11-15",
      id: 3,
    },
    {
      ProductionCode: "P004",
      ProductionName: "Product D",
      ProductionType: "Type 3",
      ClientName: "Client W",
      LastPayrollDate: "2023-11-15",
      LabourType: "Skilled",
      CreatedBy: "Alice Brown",
      CreatedOn: "2023-11-01",
      StartDate: "2023-11-20",
      id: 4,
    },
    {
      ProductionCode: "P005",
      ProductionName: "Product E",
      ProductionType: "Type 2",
      ClientName: "Client V",
      LastPayrollDate: "2023-11-20",
      LabourType: "Unskilled",
      CreatedBy: "Charlie Green",
      CreatedOn: "2023-11-05",
      StartDate: "2023-11-25",
      id: 5,
    },
    {
      ProductionCode: "P006",
      ProductionName: "Product F",
      ProductionType: "Type 1",
      ClientName: "Client U",
      LastPayrollDate: "2023-11-25",
      LabourType: "Unskilled",
      CreatedBy: "Eva White",
      CreatedOn: "2023-11-10",
      StartDate: "2023-11-30",
      id: 6,
    },
    {
      ProductionCode: "P007",
      ProductionName: "Product G",
      ProductionType: "Type 3",
      ClientName: "Client T",
      LastPayrollDate: "2023-11-30",
      LabourType: "Skilled",
      CreatedBy: "David Black",
      CreatedOn: "2023-11-15",
      StartDate: "2023-12-05",
      id: 7,
    },
  ];

  const handleChange = () => {
    // setSelectedOption();
  };
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
  return (
    <div>
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
              onChange={handleChange}
              options={options}
              defaultInputValue="Client is All"
              styles={customStyles}
            />
            <Select
              value={null}
              onChange={handleChange}
              defaultInputValue="Date is All"
              options={options}
              styles={customStyles}
            />
            <Select
              value={null}
              onChange={handleChange}
              defaultInputValue="Production is All"
              options={options}
              styles={customStyles}
            />
            <Select
              value={null}
              onChange={handleChange}
              defaultInputValue="Status is All"
              options={options}
              styles={customStyles}
            />
            {/* <Select options={options} />
            <Select options={options} />
            <Select options={options} /> */}
            {/* <Form.Select style={selectStyle}>
              <option value="1">
                Client <span>is</span> All
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

export default PendingProductionsTable;
