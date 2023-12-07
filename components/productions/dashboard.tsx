import {  Col, Row } from "reactstrap";
import helpcenter1 from 'assets/DashboardIcons/helpcenter1.svg'
import helpcenter2 from 'assets/DashboardIcons/helpcenter2.svg'
import helpcenter3 from 'assets/DashboardIcons/helpcenter3.svg'
import HelpCenterCard from "../MyProject/Dashboard/HelpCenter/HelpCenterCard";
import { Card } from "react-bootstrap";




function ProductionDashboard() {

    const createCard = (title, iconSrc, subTitle, content) => (
    <Col>
      <Card border="primary" className="productionCards">
        <Card.Body>
          <Card.Title className="text-white">
            <img src={iconSrc} alt={title} />
          </Card.Title>
          <Card.Title className="text-white font-size-12 fw-600">
            {title}
          </Card.Title>
          <Card.Text className="text-white">
            {subTitle && <h6>{subTitle}</h6>}
            {content}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );

  const helpCenterData = [
  {
    title: 'Support Center',
    description: 'Your direct line to our support team.',
    link: 'Get Help',
    image: helpcenter1,
  },
  {
    title: 'Knowledgebase & Resources',
    description: 'Answers at your fingertips.',
    link: 'Explore Resources',
    image: helpcenter2,
  },
  {
    title: 'Feedback and Feature Requests',
    description: 'Help shape the future of our software',
    link: 'Share Feedback',
    image: helpcenter3,
  },
];


  return (
    <>
      <div className="rounded mt-3">
        <Row noGutters className="d-flex gap-2">
          {createCard("Total Active Productions", "total_budget.svg", null, <h4>2</h4>)}
          {createCard("Total Budget Vs Actual Spending", "total_budget.svg", "The Lost Heirloom", <p>$500,000 vs $350,000</p>)}
          {createCard("Remaining Budget Allocation", "remaining_budget.svg", "The Lost Heirloom", <p>$150,000</p>)}
          {createCard("Pending Approval Items", "pending_approval.svg", null, (
            <div className="row">
              <div className="col-md-4">
                <h6 className="text-center">Account Payable</h6>
                <p className="text-center">21</p>
              </div>
              <div className="col-md-4 text-nowrap">
                <h6 className="text-center">Petty Cash</h6>
                <p className="text-center font-size-16">21</p>
              </div>
              <div className="col-md-4">
                <h6 className="text-center">Journal Entry</h6>
                <p className="text-center font-size-16">21</p>
              </div>
            </div>
          ))}
        </Row>
      </div>

      <div className="col-md-6 mt-3">
        <Card style={{borderRadius: "10px" }} className="p-3">
        <Col>
          <div className="d-flex justify-content-between">
            <div>
                <h4 className="text-nowrap fw-bold">Prduction Name</h4>
            </div>
            <div
                className="border rounded cursor-pointer text-black text-center d-flex align-items-center py-1 px-2"
                style={{fontSize: "10px",fontWeight: "400",gap: "3px",}}
                >
                <div>
                    <img src="view_details.svg" style={{ height: "11px", width: "11px" }} alt="" />
                </div>{" "}
                <p>View Details</p>
                </div>
          </div>
          <div className="d-flex justify-content-between mt-2">
            <div>
                <p>Payroll Coordinator : John Duo</p>
            </div>
            <div>
                <div>
                    <span style={{fontSize:"10px"}}><img src="calender.svg" style={{ height: "11px", width: "11px" }} alt="" /> Apr 1, 2023 - Dec 31 2023</span>
                </div>
                
            </div>
          </div>
          <div className="d-flex justify-content-between mt-4">
            <div>
                <div>
                    <span style={{fontSize:"18px"}}><img src="budget_allocated.svg"/> Budget Allocated</span>
                </div>
            </div>
            <div>
                <div>
                    <span style={{fontSize:"18px"}}><img src="budget_spend.svg" alt="" /> Budget Spend</span>
                </div>
                
            </div>
          </div>
          <div className="d-flex justify-content-between mt-4">
            <div>
                <div>
                   <p style={{fontSize:"21px", fontWeight:"600"}}>$500,000</p>
                </div>
            </div>
            <div>
                <div>
                    <p style={{fontSize:"21px", fontWeight:"600"}}>$350,190</p>
                </div>
                
            </div>
          </div>
        </Col>
        <div className="row mt-2">
            <div className="col-md-4">
                <h6 className="text-center">Project Type</h6>
                <p className="text-center" style={{fontWeight:"600"}}>Costume Design</p>
            </div>
            <div className="col-md-4 text-nowrap">
                <h6 className="text-center">Last Payroll Date</h6>
                <p className="text-center" style={{fontWeight:"600"}}>Sep 30, 2023</p>
            </div>
            <div className="col-md-4">
                <h6 className="text-center">Labour Type</h6>
                <p className="text-center" style={{fontWeight:"600"}}>Union</p>
            </div>
        </div>
        <div className="mt-2">
            <p><img src="software_subscribed.svg" alt="" /> Softwares Subscribed</p>
        </div>
        <div className="d-flex mt-3">
            <p className="mr-4 productionBorder">Production Accounting</p>
        </div>
        

    </Card>
      </div>
      {/* <div className="col-md-6 mt-3">
        <Card style={{borderRadius: "10px" }} className="p-3">
        <Col>
          <div className="d-flex justify-content-between">
            <div>
                <h4 className="text-nowrap fw-bold">Prduction Name</h4>
            </div>
            <div
                className="border rounded cursor-pointer text-black text-center d-flex align-items-center py-1 px-2"
                style={{fontSize: "10px",fontWeight: "400",gap: "3px",}}
                >
                <div>
                    <img src="view_details.svg" style={{ height: "11px", width: "11px" }} alt="" />
                </div>{" "}
                <p>View Details</p>
                </div>
          </div>
          <div className="d-flex justify-content-between mt-2">
            <div>
                <p>Payroll Coordinator : John Duo</p>
            </div>
            <div>
                <div>
                    <span style={{fontSize:"10px"}}><img src="calender.svg" style={{ height: "11px", width: "11px" }} alt="" /> Apr 1, 2023 - Dec 31 2023</span>
                </div>
                
            </div>
          </div>
          <div className="d-flex justify-content-between mt-4">
            <div>
                <div>
                    <span style={{fontSize:"18px"}}><img src="budget_allocated.svg"/> Budget Allocated</span>
                </div>
            </div>
            <div>
                <div>
                    <span style={{fontSize:"18px"}}><img src="budget_spend.svg" alt="" /> Budget Spend</span>
                </div>
                
            </div>
          </div>
          <div className="d-flex justify-content-between mt-4">
            <div>
                <div>
                   <p style={{fontSize:"21px", fontWeight:"600"}}>$500,000</p>
                </div>
            </div>
            <div>
                <div>
                    <p style={{fontSize:"21px", fontWeight:"600"}}>$350,190</p>
                </div>
                
            </div>
          </div>
        </Col>
        <div className="row mt-2">
            <div className="col-md-4">
                <h6 className="text-center">Project Type</h6>
                <p className="text-center" style={{fontWeight:"600"}}>Costume Design</p>
            </div>
            <div className="col-md-4 text-nowrap">
                <h6 className="text-center">Last Payroll Date</h6>
                <p className="text-center" style={{fontWeight:"600"}}>Sep 30, 2023</p>
            </div>
            <div className="col-md-4">
                <h6 className="text-center">Labour Type</h6>
                <p className="text-center" style={{fontWeight:"600"}}>Union</p>
            </div>
        </div>
        <div className="mt-2">
            <p><img src="software_subscribed.svg" alt="" /> Softwares Subscribed</p>
        </div>
        <div className="d-flex mt-3">
            <p className="mr-4 productionBorder">Production Accounting</p>
        </div>
        

    </Card>
      </div> */}

       
     
      <div className="my-1 mt-2 mb-2" style={{ fontSize: '18px', fontWeight: '600', color: '#030229' }}>
        Help Center
      </div>
      <div style={{ marginBottom: '4rem' }}>
       <Row className="mt-2">
        {helpCenterData.map((data, index) => (
            <Col xl="4" key={index}>
            <HelpCenterCard {...data} />
            </Col>
        ))}
        </Row>
    
        </div>
    </>
  );
}
export default ProductionDashboard;
