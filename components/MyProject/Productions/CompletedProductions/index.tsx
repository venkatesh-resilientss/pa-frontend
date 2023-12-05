import React from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Row,
  Col,
} from "reactstrap";
import Select from "react-select";
import GridTable from "components/grid-tables/gridTable";
import actionIcon from "assets/MyImages/charm_menu-kebab.svg";
import editIocn from "assets/myIcons/edit_square.svg";
import detailsIocn from "assets/myIcons/list.svg";
import { openAssignRSSLPopup } from "../../../../redux/slices/mySlices/productions";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import Image from "next/image";

const CompletedProductions = () => {
  const dispatch = useDispatch();
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
  const options = [
    { value: "Client is All" },
    { value: "Date is All" },
    { value: "Production is All" },
    { value: "Status is All" },
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
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => {
                e.preventDefault(), dispatch(openAssignRSSLPopup("data"));
              }}
            >
              <Action
                icon={detailsIocn}
                name={"Assign RSSL User"}
                action={() => {
                  //
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
      width: 200,
    },
    {
      headerName: "Production Type",
      field: "ProductionType",
      sortable: true,
      resizable: true,
      width: 200,
    },
    {
      headerName: "Client",
      field: "Client",
      sortable: true,
      resizable: true,
      width: 100,
    },
    {
      headerName: "Last Payroll Date",
      field: "LastPayrollDate",
      sortable: true,
      resizable: true,
      width: 200,
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
      headerName: "Completed On",
      field: "CompletedOn",
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
      Client: "Client X",
      LastPayrollDate: "2023-11-01",
      LabourType: "Skilled",
      CreatedBy: "John Doe",
      CompletedOn: "2023-11-10",
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
      CompletedOn: "2023-11-15",
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
      CompletedOn: "2023-11-20",
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
      CompletedOn: "2023-11-25",
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
      CompletedOn: "2023-11-30",
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
      CompletedOn: "2023-12-05",
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
      CompletedOn: "2023-12-10",
      id: 7,
    },
  ];

  return (
    <div>
      ``{" "}
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
                defaultInputValue="Client is All"
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

              {/* <Form.Select style={selectStyle}>
                <option value="1">Client is all</option>
              </Form.Select>
              <Form.Select style={selectStyle}>
                <option value="1">Date is All</option>
              </Form.Select>
              <Form.Select style={selectStyle}>
                <option value="1">Production type is All</option>
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
    </div>
  );
};

export default CompletedProductions;
