// ** React Imports
import { Fragment, useState, forwardRef } from "react";

// ** Table Data & Columns
// import { columns } from "../../tables/data-tables/data";
import Flatpickr from "react-flatpickr";

import "@styles/react/libs/flatpickr/flatpickr.scss";

// ** Add New Modal Component
import AddNewModal from "../../tables/data-tables/basic/AddNewModal";

// ** Third Party Components
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import {
  ChevronDown,
  Share,
  Printer,
  FileText,
  File,
  Grid,
  Copy,
  Plus,
  Search,
  ArrowDown,
} from "react-feather";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Button,
  CardHeader,
  Form,
  InputGroup,
  InputGroupText,
} from "reactstrap";

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className="form-check">
    <Input type="checkbox" ref={ref} {...props} />
  </div>
));

const DataTableWithButtons = ({
  data,
  columns,
  tableTitle,
  showButton,
  buttonClick,
  buttonName,
  header,
  date,
  status,
  title,
}) => {
  // ** States
  const [modal, setModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal);

  // ** Function to handle filter
  const handleFilter = (e) => {
    const value = e.target.value;
    let updatedData = [];
    setSearchValue(value);

    const status = {
      1: { title: "Current", color: "light-primary" },
      2: { title: "Professional", color: "light-success" },
      3: { title: "Rejected", color: "light-danger" },
      4: { title: "Resigned", color: "light-warning" },
      5: { title: "Applied", color: "light-info" },
    };

    if (value.length) {
      updatedData = data.filter((item) => {
        const startsWith =
          item.full_name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.post.toLowerCase().startsWith(value.toLowerCase()) ||
          item.email.toLowerCase().startsWith(value.toLowerCase()) ||
          item.age.toLowerCase().startsWith(value.toLowerCase()) ||
          item.salary.toLowerCase().startsWith(value.toLowerCase()) ||
          item.start_date.toLowerCase().startsWith(value.toLowerCase()) ||
          status[item.status].title
            .toLowerCase()
            .startsWith(value.toLowerCase());

        const includes =
          item.full_name.toLowerCase().includes(value.toLowerCase()) ||
          item.post.toLowerCase().includes(value.toLowerCase()) ||
          item.email.toLowerCase().includes(value.toLowerCase()) ||
          item.age.toLowerCase().includes(value.toLowerCase()) ||
          item.salary.toLowerCase().includes(value.toLowerCase()) ||
          item.start_date.toLowerCase().includes(value.toLowerCase()) ||
          status[item.status].title.toLowerCase().includes(value.toLowerCase());

        if (startsWith) {
          return startsWith;
        } else if (!startsWith && includes) {
          return includes;
        } else return null;
      });
      setFilteredData(updatedData);
      setSearchValue(value);
    }
  };

  // ** Function to handle Pagination
  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={
        searchValue.length
          ? Math.ceil(filteredData.length / 7)
          : Math.ceil(data.length / 7) || 1
      }
      breakLabel="..."
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName="active"
      pageClassName="page-item"
      breakClassName="page-item"
      nextLinkClassName="page-link"
      pageLinkClassName="page-link"
      breakLinkClassName="page-link"
      previousLinkClassName="page-link"
      nextClassName="page-item next-item"
      previousClassName="page-item prev-item"
      containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
    />
  );

  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(data[0]);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv === null) return;

    const filename = "export.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }

  return (
    <Fragment>
      <Card>
        {title && (
          <div
            className="text-black"
            style={{ fontSize: "16px", fontWeight: "600" }}
          >
            {tableTitle}
          </div>
        )}
        {header && (
          <CardHeader
            className="border-bottom"
            style={{
              backgroundColor: "#E7EFFF",
              height: "62px",
              padding: "5px",
            }}
          >
            {/* <CardTitle tag="h4">{tableTitle}</CardTitle> */}
            <div
              className="text-black"
              style={{ fontSize: "16px", fontWeight: "600" }}
            >
              {tableTitle}
            </div>

            {status && (
              <div className="">
                <Input
                  className="w-auto "
                  type="select"
                  // value={statusValue} onChange={handleStatusValue}
                >
                  <option value="">Select Status</option>
                  <option value="active">Active</option>
                  <option value="In-Active">In-Active</option>
                </Input>
              </div>
            )}

            {date && (
              <Col lg="2" md="6">
                <Flatpickr
                  className="form-control"
                  id="date"
                  // value={Picker}
                  options={{ mode: "single", dateFormat: "m/d/Y" }}
                  // onChange={(date) => handleDateFilter(date)}
                />
              </Col>
            )}

            <Row className="">
              {/* <Col
              className="d-flex align-items-center justify-content-end"
              md="6"
              sm="12"
            >
              <Label className="me-1" for="search-input">
                Search
              </Label>
              <Input
                className="dataTable-filter "
                type="text"
                id="search-input"
                value={searchValue}
                onChange={handleFilter}
              />
            </Col> */}

              <Col
                className="d-flex align-items-center justify-content-end"
                md="6"
                sm="12"
              >
                <Form
                  className="faq-search-input"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <InputGroup className="input-group-merge">
                    <InputGroupText>
                      <Search size={14} />
                    </InputGroupText>
                    <Input placeholder="search..." />
                  </InputGroup>
                </Form>
              </Col>
              {showButton && (
                <Button
                  color="info"
                  className="my-1 m-auto my-sm-0 "
                  style={{ width: "190px", height: "38px" }}
                  onClick={buttonClick}
                >
                  {buttonName}
                </Button>
              )}
            </Row>
          </CardHeader>
        )}

        <div className="react-dataTable">
          <DataTable
            noHeader
            pagination
            // selectableRows
            columns={columns}
            paginationPerPage={7}
            className="react-dataTable"
            sortIcon={<ArrowDown size={10} />}
            paginationDefaultPage={currentPage + 1}
            paginationComponent={CustomPagination}
            data={searchValue.length ? filteredData : data}
            // selectableRowsComponent={BootstrapCheckbox}
          />
        </div>
      </Card>
      <AddNewModal open={modal} handleModal={handleModal} />
    </Fragment>
  );
};

export default DataTableWithButtons;
