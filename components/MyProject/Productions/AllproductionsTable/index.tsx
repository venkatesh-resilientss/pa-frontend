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
import { ProjectService } from "services";
import useSWR from "swr";
import moment from "moment";

const AllProductionsTable = () => {
  const dispatch = useDispatch();

  const projectService = new ProjectService();

  const { data: projectsData } = useSWR(["LIST_PROJECTS", ""], () =>
    projectService.getProjects()
  );

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
              onClick={() => router.push(`/edit-production/${props.data.ID}`)}
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
      field: "Created",
      cellRenderer: (params) => {
        return (
          <div className="f-ellipsis">
            {(params?.data?.Created?.first_name || "") +
              " " +
              (params?.data?.Created?.last_name || "")}
          </div>
        );
      },
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
      cellRenderer: ActionsButton,
      cellStyle: {
        textAlign: "center",
      },
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
        rowData={{
          data: projectsData,
          limit: 10,
          offset: 0,
          total_records: 25,
        }}
        columnDefs={columnDefs}
        pageSize={10}
        searchText={undefined}
      />
    </div>
  );
};

export default AllProductionsTable;
