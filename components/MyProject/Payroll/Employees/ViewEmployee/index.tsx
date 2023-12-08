import { Col, Row, Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import GridTable from "components/grid-tables/gridTable";
import { useState } from "react";

const employee = {
  last_name: 'Tom',
  first_name: 'Cruise',
  role: 'Actor',
  dob: 'Jun 06, 1991',
  email: 'Tomcruise12@gmail.com',
  ssn: 'XXX-XX-4567',
  address: 'Woodlands, California, CA, 90038',
  payment_method: 'Direct Deposite to XXXXXXXXX835',
  account: 'This is RSSL Account. They can manage Payments & Tax',
  documents: [
    { name: 'I-9', status: 'Filled & Signed' },
    { name: 'W-4', status: 'Filled' },
    { name: 'W-9', status: 'Filled & Signed' }
  ],
  projects: [
    {
      name: 'On Happy Day',
      worked_from: 'Aug 15th, 2023 - Sep 14th, 2023',
      location: 'CA Street',
      dollars: '200.50',
      hours: '8',
      days: '8',
      aggrements: 'Signed'
    }
  ],
  payments: [
    { payroll: '00000263', issued_on: 'Jun 12, 2023 11:30AM', requests: 'Kit Rental', Status: 'Processing', net_pay: '74.10' },
    { payroll: '00000728', issued_on: 'Jun 12, 2023 11:30AM', requests: 'Car Rental', Status: 'Paid', net_pay: '65.05' },
    { payroll: '00000987', issued_on: 'Jun 12, 2023 11:30AM', requests: 'Cellphone Rental', Status: 'Processing', net_pay: '34.10' },
    { payroll: '00000367', issued_on: 'Jun 12, 2023 11:30AM', requests: 'Other Expense', Status: 'Paid', net_pay: '84.15' },
    { payroll: '00000289', issued_on: 'Jun 12, 2023 11:30AM', requests: 'Other Expense', Status: 'Processing', net_pay: '44.10' }

  ]

}

function ViewEmployee() {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const searchText = ""
  const columns = [
    {
      headerName: "Payroll",
      sortable: true,
      field: "payroll"
    },
    {
      headerName: "Issued",
      sortable: true,
      field: "issued_on"
    },
    {
      headerName: "Requests",
      sortable: true,
      field: "requests"
    },
    {
      headerName: "Status",
      sortable: true,
      field: "Status"
    },

    {
      headerName: "Net Pay",
      sortable: true,
      field: "net_pay"
    }
  ];
  return (
    <div>
    <div className="p-4">
      <div
        className="text-black form-label"
      >
        All Employees
      </div>
      <p className="font-size-32 fw-600">Employee Profile</p>

      <hr />
      <Row>
        <Col xl="5">
          <div
            className="d-flex flex-column text-center align-items-center card p-3 mb-3 border-0"
          >
            <img
              src="/defaultemployee.jpeg"
              className="employee-profile-img"
              alt=""
            />
            <div className="text-black form-label">
              <span>{employee.last_name}</span>
              <span className="m-1">{employee.first_name}</span>
            </div>
            <div>
              {employee.role}
            </div>
          </div>
          <div className="card p-3 mb-3 border-0 bg-light">
            <div>DOB</div>
            <div>{employee.dob}</div>
          </div>
          <div className="card p-3 mb-3 border-0">
            <div>Email</div>
            <div>{employee.email}</div>
          </div>
          <div className="card p-3 mb-3 border-0 bg-light">
            <div>SSN</div>
            <div>{employee.ssn}</div>
          </div>
          <div className="card p-3 mb-3 border-0">
            <div>Address</div>
            <div>{employee.address}</div>
          </div>
          <div className="card p-3 mb-3 border-0 bg-light">
            <div>Payment Method</div>
            <div>{employee.dob}</div>
          </div>
          <div className="card p-3 mb-3 border-0">
            <div>Account</div>
            <div>{employee.dob}</div>
          </div>
          <div>
            <div>Employment Documents</div>
            <div>
              {
                employee.documents.map((item, index) => (
                  <div key={index} className="card p-3 mb-3 border-0">
                    <div>{item.name}</div>
                    <div>{item.status}</div>
                  </div>))
              }
            </div>
          </div>
        </Col>
        <Col xl="7">
          {
            employee.projects.map((project, index) => (
              <div className="card p-3 mb-3 border-0" key={index}>
                <div
                  className="text-black form-label"
                >
                  Project {index + 1}
                </div>
                <hr />
                <Row>
                  <Col xl="4">
                    <div>Project Name</div>
                    <div>{project.name}</div>
                  </Col>
                  <Col xl="4">
                    <div>Worked From</div>
                    <div>{project.worked_from}</div>
                  </Col>
                  <Col xl="4">
                    <div>Location</div>
                    <div>{project.location}</div>
                  </Col>
                </Row>
                <Row>
                  <Col xl="4">
                    <div>Payment</div>
                    <div>${project.dollars}/{project.hours}-hours day - {project.days}</div>
                  </Col>
                  <Col xl="4">
                    <div>Agreements</div>
                    <div>{project.aggrements}</div>
                  </Col>
                </Row>
                <Row>
                  <Col xl="4">
                    <Button
                      className="button-props mt-3"
                    >
                      View Details
                    </Button>
                  </Col>
                </Row>
              </div>
            ))
          }
          <Row>
            <Col xl="6">
              <div className="card">
              <div
                  className="text-black form-label text-bold m-auto mt-3"
                >
                  DIRECT DEPOSIT
                </div>
                <hr />
                <div className="card p-3 mb-3 border-0 bg-light">
                  <div>Bank Name</div>
                  <div>Wells fargo</div>
                </div>
                <div className="card p-3 mb-3 border-0">
                  <div>Routing No</div>
                  <div>123456789</div>
                </div>
                <div className="card p-3 mb-3 border-0 bg-light">
                  <div>Account</div>
                  <div>123456789</div>
                </div>
                <div className="card p-3 mb-3 border-0">
                  <div>Amount</div>
                  <div>$123456789</div>
                </div>
                <div className="card p-3 mb-3 border-0 bg-light">
                  <div>Account Type</div>
                  <div>Checking</div>
                </div>
                <Row>
                  <Col xl="12">
                    <Button
                      className="button-props mt-3 m-3"
                    >
                      View Details
                    </Button>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col xl="6">
              <div className="card">
              <div
                  className="text-black form-label text-bold m-auto mt-3"
                >
                  AGENT INFORMATION
                </div>
                <hr />
                <div className="card p-3 mb-3 border-0 bg-light">
                  <div>Agency Name</div>
                  <div>CAA</div>
                </div>
                <div className="card p-3 mb-3 border-0">
                  <div>Attention</div>
                  <div>1234</div>
                </div>
                <div className="card p-3 mb-3 border-0 bg-light">
                  <div>Agency Address</div>
                  <div>CA Street</div>
                </div>
                <div className="card p-3 mb-3 border-0">
                  <div>As of Date</div>
                  <div>10-12-2023</div>
                </div>
                <div className="card p-3 mb-3 border-0 bg-light">
                  <div>Rate %</div>
                  <div>10</div>
                </div>
                <Row>
                  <Col xl="12">
                    <Button
                      className="button-props mt-3 m-3"
                    >
                      View Details
                    </Button>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xl="12">
            <div className="card p-4 text-center pe-auto cursor-pointer" onClick={toggle}>
            DEAL MEMO
            </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <h5 className="mb-3">Payments</h5>
        <GridTable rowData={{data: employee.payments}} columnDefs={columns} pageSize={4} searchText={searchText} />
      </Row>
      <hr />
      
    </div>
    <Modal isOpen={modal} toggle={toggle} className="modal-xl">
        <ModalHeader toggle={toggle}>DEAL DEMO</ModalHeader>
        <ModalBody>
          <div>
            <div className="card mb-3">
            <Row>
            <Col xl="12" className="m-3 mb-0"><h6><strong>View Form</strong></h6></Col>
            </Row>
            <hr></hr>
            <Row className="p-2 m-2 bg-white">
              <Col>EMPLOYEE START DATE</Col>
              <Col>: 10/05/2023</Col>
              <Col>JOB DESCRIPTION OVERRIDE</Col>
              <Col>: CLT</Col>
            </Row>
            <Row className="p-2 m-2 bg-light">
              <Col>UNION/GUILD</Col>
              <Col>: Directors Guild of America</Col>
              <Col>FLSA</Col>
              <Col>: Non-Exempt</Col>
            </Row>
            <Row className="p-2 m-2 bg-white">
              <Col>OCC CODE</Col>
              <Col>: Vo-Voice Over</Col>
              <Col>DEPT</Col>
              <Col>: DGA</Col>
            </Row>
            <Row className="p-2 m-2 bg-light">
              <Col>SCHEDULE</Col>
              <Col>: A</Col>
              <Col>HIRING LOCATION</Col>
              <Col>: CA, US, Woodland Hills</Col>
            </Row>
            </div>
            <div className="card mb-3">
            <Row className="p-2">
            <Col xl="12" className="m-3 mb-0"><h6><strong>Pay Rates</strong></h6></Col>
            </Row>
            <hr></hr>
            <Row className="p-2 m-2 bg-white">
              <Col>Location</Col>
              <Col>: Studio</Col>
              <Col>Location</Col>
              <Col>: Distant</Col>
            </Row>
            <Row className="p-2 m-2 bg-light">
              <Col>Schedule</Col>
              <Col>: Weekly</Col>
              <Col>Schedule</Col>
              <Col>: Daily</Col>
            </Row>
            <Row className="p-2 m-2 bg-white">
              <Col>Hourly Rate</Col>
              <Col>: $ 58.5678</Col>
              <Col>Hourly Rate</Col>
              <Col>: $ 58.5678</Col>
            </Row>
            <Row className="p-2 m-2 bg-light">
              <Col>Weekly Rate</Col>
              <Col>: $ 2,321.00</Col>
              <Col>Weekly Rate</Col>
              <Col>: $ 2,321.00</Col>
            </Row>
            </div>
            <div className="card">
            <Row className="p-2">
            <Col xl="12" className="m-3 mb-0"><h6><strong>Allowances/Rentals</strong></h6></Col>
            </Row>
            <hr></hr>
            <Row className="p-2 m-2 bg-white">
              <Col>KIT</Col>
              <Col>Amount</Col>
              <Col>: $200.00</Col>
              <Col>Schedule</Col>
              <Col>: Weekly</Col>
              <Col>Pay only on Worked Days</Col>
              <Col>: YES</Col>
            </Row>
            <Row className="p-2 m-2 bg-light">
              <Col>CAR</Col>
              <Col>Amount</Col>
              <Col>: $15.00</Col>
              <Col>Schedule</Col>
              <Col>: Daily</Col>
              <Col>Pay only on Worked Days</Col>
              <Col>: YES</Col>
            </Row>
            <Row className="p-2 m-2 bg-white">
              <Col>Cellphone</Col>
              <Col>Amount</Col>
              <Col>: $200.00</Col>
              <Col>Schedule</Col>
              <Col>: Weekly</Col>
              <Col>Pay only on Worked Days</Col>
              <Col>: No</Col>
            </Row>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default ViewEmployee;
