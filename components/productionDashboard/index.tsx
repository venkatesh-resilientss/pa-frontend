// Import necessary libraries and components
import React, { useEffect, useState } from "react";
import { Col, Card, Row } from "react-bootstrap";
import { DashboardService } from "services";
import HelpCenterCard from "../MyProject/Dashboard/HelpCenter/HelpCenterCard";
import helpcenter1 from 'assets/DashboardIcons/helpcenter1.svg'
import helpcenter2 from 'assets/DashboardIcons/helpcenter2.svg'
import helpcenter3 from 'assets/DashboardIcons/helpcenter3.svg'
import router from "next/router";

// Define your component
export default function ProductionDashboard() {
  const productionService = new DashboardService();
  const [productionsData, setProductionsData] = useState(null);
  const [productionCards, setProductionCards] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await productionService.getAllProductions();
        setProductionsData(result.data);
      } catch (error) {
        console.error('Error fetching production data:', error);
        setError(error.response?.data?.error || 'Unknown error occurred');
      }
    };

    fetchData();
  }, []);

  //all production cards
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await productionService.getAllProductionCards();
        // Set dashboardCards state
        setProductionCards(result);
      } catch (error) {
        console.error('Error fetching production data:', error);
        setError(error.response?.data?.error || 'Unknown error occurred');
      }
    };

    fetchData();
  }, []);

  const handleViewDetails = (productionId) => {
    router.push(`/edit-production/${productionId}`);
  };

  // Function to create a card
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

  // Sample help center data
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
          {createCard("Total Active Productions", "/active_productions.png", null, <h4>{productionCards?.TotalActiveProductions || '-'}</h4>)}
          {createCard("Total Budget Vs Actual Spending", "/total_budget.svg", "The Lost Heirloom", <p>{productionCards?.TotalBudget || '-'}</p>)}
          {createCard("Remaining Budget Allocation", "/remaining_budget.svg", "The Lost Heirloom", <p>{productionCards?.RemainingBudgetAllocation || '-'}</p>)}
          {createCard("Pending Approval Items", "/pending_approval.svg", null, (
            <div className="row">
              <div className="col-md-6 text-nowrap">
                <h6 className="text-center fw-600">Purchase Order</h6>
                <p className="text-center font-size-16">{productionCards?.PendingApprovalItems?.PettyCash || '-'}</p>
              </div>
              <div className="col-md-6">
                <h6 className="text-center fw-600">Account Payable</h6>
                <p className="text-center">{productionCards?.PendingApprovalItems?.AccountPayable || '-'}</p>
              </div>
            </div>
          ))}
        </Row>
      </div>

       <Row>
        {error ? (
          <div className="text-center nodataAvailable">
          <img src="/no_client_data_available.svg" alt="Error"/>
           <p>No Data available.</p>
        </div>
        ) : (
          productionsData && productionsData.data.length > 0 ? (
            productionsData.data.map((production) => (
              <Col key={production.id} className="mb-3 mt-3">
              <Card style={{borderRadius: "10px" }} className="p-3">
                <div className="d-flex justify-content-between">
                <div>
                    <h4 className="text-nowrap fw-bold">{production.name}</h4>
                </div>
                   <div
                  className="border rounded cursor-pointer text-black text-center d-flex align-items-center py-1 px-2"
                  style={{ fontSize: "10px", fontWeight: "400", gap: "3px" }}
                  onClick={() => handleViewDetails(production.id)}
                >
                <div>
                  <img src="/view_details.svg" alt="" />
                </div>{" "}
                <p style={{ fontSize: "14px" }}>View Details</p>
              </div>
                </div>
                <div className="d-flex justify-content-between mt-2">
                    <div>
                        <p>Payroll Coordinator : {production.PayrollCoordinator}</p>
                    </div>
                    <div>
                        <div>
                            <span style={{fontSize:"10px"}}><img src="/calender.svg" alt="" /> {production.created_date}</span>
                        </div>
                    </div>
                 </div>
                 <div className="d-flex justify-content-between mt-4">
                    <div>
                        <div>
                            <span style={{fontSize:"18px"}}><img src="/budget_allocated.svg"/> Budget Allocated</span>
                        </div>
                    </div>
                    <div>
                        <div>
                            <span style={{fontSize:"18px"}}><img src="/budget_spend.svg" alt="" /> Budget Spend</span>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-between mt-4">
                    <div>
                        <div>
                        <p className="fw-600" style={{fontSize:"21px"}}>-</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p className="fw-600" style={{fontSize:"21px"}}>-</p>
                        </div>
                    </div>
                 </div>
                 <div className="row mt-2">
                    <div className="col-md-4">
                        <h6 className="text-center">Project Type</h6>
                        <p className="text-center fw-600" >{production.projectType.name}</p>
                    </div>
                    <div className="col-md-4 text-nowrap">
                        <h6 className="text-center">Last Payroll Date</h6>
                        <p className="text-center fw-600" >{production.LastPayrollDate}</p>
                    </div>
                    <div className="col-md-4">
                        <h6 className="text-center">Labour Type</h6>
                        <p className="text-center fw-600" >{production.LabourType}</p>
                    </div>
                </div>
                 <div className="mt-2">
                    <p><img src="software_subscribed.svg" alt="Subscribed Softwares" /> Softwares Subscribed</p>
                    </div>
                    <div className="d-flex mt-3">
                        <p className="mr-4 productionBorder">Production Accounting</p>
                    </div>
              </Card>
            </Col>
            ))
          ) : (
            <Col className="text-center my-3">
              <p>No productions found.</p>
            </Col>
          )
        )}
      </Row>


      {/* Help Center section */}
      <div className="my-1 mt-3 mb-2" style={{ fontSize: '18px', fontWeight: '600', color: '#030229' }}>
        Help Center
      </div>
      <div style={{ marginBottom: '4rem' }}>
        <Row className="mt-2">
          {/* Map through helpCenterData to render help center cards */}
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
