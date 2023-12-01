import { Col, Row, Button } from "reactstrap";
import { useState } from "react";
import GridTable from "components/grid-tables/gridTable";

const details = { 
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
    {name: 'I-9', status: 'Filled & Signed'},
    {name: 'W-4', status: 'Filled'},
    {name: 'W-9', status: 'Filled & Signed'}
  ],
  projects: [
    {name: 'On Happy Day', 
    worked_from: 'Aug 15th, 2023 - Sep 14th, 2023', 
    location: 'CA Street', 
    dollars: '200.50', 
    hours: '8', 
    days: '8',
    aggrements: 'Signed'},
    {name: 'Rainy Days', 
    worked_from: 'Aug 15th, 2023 - Sep 14th, 2023', 
    location: 'CA Street', 
    dollars: '200.50', 
    hours: '8', 
    days: '8',
    aggrements: 'Signed'},
    {name: 'Smuggler Film', 
    worked_from: 'Aug 15th, 2023 - Sep 14th, 2023', 
    location: 'CA Street', 
    dollars: '200.50', 
    hours: '8', 
    days: '8',
    aggrements: 'Signed'}
  ],
  payments: [
    {payroll: '00000263', issued_on: 'Jun 12, 2023 11:30AM', requests: 'Kit Rental', Status: 'Processing', net_pay: '74.10'},
    {payroll: '00000728', issued_on: 'Jun 12, 2023 11:30AM', requests: 'Car Rental', Status: 'Paid', net_pay: '65.05'},
    {payroll: '00000987', issued_on: 'Jun 12, 2023 11:30AM', requests: 'Cellphone Rental', Status: 'Processing', net_pay: '34.10'},
    {payroll: '00000367', issued_on: 'Jun 12, 2023 11:30AM', requests: 'Other Expense', Status: 'Paid', net_pay: '84.15'},
    {payroll: '00000289', issued_on: 'Jun 12, 2023 11:30AM', requests: 'Other Expense', Status: 'Processing', net_pay: '44.10'}

  ]

}
 
function ViewEmployee() {
    const [employee, setEmployee] = useState(details);
    const [searchText, setSearchText] = useState("");

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
        <div style={{ fontFamily: "Segoe UI" }} className="p-4">
        <div
          className="text-black "
          style={{ fontSize: "16px", fontWeight: "600" }}
        >
          All Employees
        </div>
        <p className="font-size-32 fw-600">Employee Profile</p>
  
        <hr style={{ height: "2px" }} />
        <Row>
          <Col xl="5">
          <div
            className="d-flex flex-column text-center align-items-center card p-3 mb-3 border-0"
            style={{ fontSize: "12px" }}
          >
            <img
              src="/defaultemployee.jpeg"
              alt=""
              style={{ width: "150px", height: "150px", borderRadius: "100px" }}
            />
            <div className="text-black "
              style={{ fontSize: "16px", fontWeight: "600" }}>
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
                <div className="card p-3 mb-3 border-0">
                  <div
                    className="text-black "
                    style={{ fontSize: "16px", fontWeight: "600" }}
                  >
                    Project {index + 1}
                  </div>
                  <hr style={{ height: "2px" }} />
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
          </Col>
        </Row>
        <Row>
        <GridTable rowData={employee.payments} columnDefs={columns} pageSize={4} searchText={searchText} />
        </Row>
        <hr style={{ height: "2px" }} />
      </div>
    )
}

export default ViewEmployee;
