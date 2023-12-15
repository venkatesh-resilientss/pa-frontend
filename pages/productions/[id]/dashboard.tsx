import { Col, Row } from "reactstrap";
import helpcenter1 from "assets/DashboardIcons/helpcenter1.svg";
import helpcenter2 from "assets/DashboardIcons/helpcenter2.svg";
import helpcenter3 from "assets/DashboardIcons/helpcenter3.svg";
import { Card } from "react-bootstrap";
import HelpCenterCard from "@/components/MyProject/Dashboard/HelpCenter/HelpCenterCard";
import { useRouter } from "next/router";
import { DashboardService } from "services";
import { useEffect, useState } from "react";
import moment from "moment";

export default function ProductionDashboard() {
  const router = useRouter();
  const { id } = router.query;
  const productionService = new DashboardService();

  const [projectDetails, setProjectDetails] = useState(null);
  const [dashboardCards, setDashboardCards] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await productionService.getProductionDetails(id);
        const projectDetailsData = result?.data?.[0];
        // Set project details state
        setProjectDetails(projectDetailsData);
        // Reset error state
        setError(null);
      } catch (error) {
        console.error("Error fetching production details:", error);
        // Set error state
        setError("record not found");
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await productionService.getDashboardCards(id);

        // Set dashboardCards state
        setDashboardCards(result);

        // Clear error state
        setError(null);
      } catch (error) {
        console.error("Error fetching dashboard cards:", error);

        // Set error state
        setError("record not found");

        // Clear dashboardCards state in case of error
        setDashboardCards(null);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

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
      title: "Support Center",
      description: "Your direct line to our support team.",
      link: "Get Help",
      image: helpcenter1,
    },
    {
      title: "Knowledgebase & Resources",
      description: "Answers at your fingertips.",
      link: "Explore Resources",
      image: helpcenter2,
    },
    {
      title: "Feedback and Feature Requests",
      description: "Help shape the future of our software",
      link: "Share Feedback",
      image: helpcenter3,
    },
  ];

  return (
    <>
      <div className="rounded mt-3">
        <Row noGutters className="d-flex gap-2">
          {createCard(
            "Total Active Productions",
            "/active_productions.png",
            null,
            <h4>{dashboardCards?.TotalActiveProductions || "-"}</h4>
          )}
          {createCard(
            "Total Budget Vs Actual Spending",
            "/total_budget.svg",
            "The Lost Heirloom",
            <p>{dashboardCards?.TotalBudget || "-"}</p>
          )}
          {createCard(
            "Remaining Budget Allocation",
            "/remaining_budget.svg",
            "The Lost Heirloom",
            <p>{dashboardCards?.RemainingBudgetAllocation || "-"}</p>
          )}
          {createCard(
            "Pending Approval Items",
            "/pending_approval.svg",
            null,
            <div className="row">
              <div className="col-md-6 text-nowrap">
                <h6 className="text-center ">Purchase Order</h6>
                <p className="text-center font-size-16 ">
                  {dashboardCards?.PendingApprovalItems?.PettyCash || "-"}
                </p>
              </div>
              <div className="col-md-6">
                <h6 className="text-center ">Account Payable</h6>
                <p className="text-center ">
                  {dashboardCards?.PendingApprovalItems?.AccountPayable || "-"}
                </p>
              </div>
            </div>
          )}
        </Row>
      </div>

      <div className="d-flex align-items-center w-100 justify-content-center col-md-6 mt-3">
        {error || !projectDetails ? (
          <div className="text-center nodataAvailable">
            <img src="/no_client_data_available.svg" alt="Error" />
            <p>No Data available.</p>
          </div>
        ) : (
          <Card style={{ borderRadius: "10px" }} className="p-3">
            <Col>
              <div className="d-flex justify-content-between">
                <div>
                  <h4 className="text-nowrap fw-bold">
                    {projectDetails?.name || "-"}
                  </h4>
                </div>
                <div
                  className="border rounded cursor-pointer text-black text-center d-flex align-items-center py-1 px-2"
                  style={{ fontSize: "10px", fontWeight: "400", gap: "3px" }}
                  onClick={() => {
                    if (id) {
                      router.push(`/productions/${id}`);
                    }
                  }}
                >
                  <div>
                    <img src="/view_details.svg" alt="" />
                  </div>{" "}
                  <p style={{ fontSize: "14px" }}>View Details</p>
                </div>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <div>
                  <p>
                    Payroll Coordinator :{" "}
                    {projectDetails?.PayrollCoordinator || "-"}
                  </p>
                </div>
                <div>
                  <div>
                    <span>
                      <img src="/calender.svg" alt="" />{" "}
                      {projectDetails?.created_date
                        ? moment(projectDetails.created_date).format(
                            "MMMM D, YYYY"
                          )
                        : "-"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between mt-4">
                <div>
                  <div>
                    <span style={{ fontSize: "18px" }}>
                      <img src="/budget_allocated.svg" /> Budget Allocated
                    </span>
                  </div>
                </div>
                <div>
                  <div>
                    <span style={{ fontSize: "18px" }}>
                      <img src="/budget_spend.svg" alt="" /> Budget Spend
                    </span>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <div>
                  <div>
                    <p style={{ fontSize: "21px", fontWeight: "600" }}>-</p>
                  </div>
                </div>
                <div>
                  <div>
                    <p style={{ fontSize: "21px", fontWeight: "600" }}>-</p>
                  </div>
                </div>
              </div>
            </Col>
            <div className="row mt-2">
              <div className="col-md-4">
                <h6 className="text-center">Project Type</h6>
                <p className="text-center" style={{ fontWeight: "600" }}>
                  {projectDetails?.projectType?.name || "-"}
                </p>
              </div>
              <div className="col-md-4 text-nowrap">
                <h6 className="text-center">Last Payroll Date</h6>
                <p className="text-center" style={{ fontWeight: "600" }}>
                  {projectDetails?.LastPayrollDate || "-"}
                </p>
              </div>
              <div className="col-md-4">
                <h6 className="text-center">Labour Type</h6>
                <p className="text-center" style={{ fontWeight: "600" }}>
                  {projectDetails?.LabourType || "-"}
                </p>
              </div>
            </div>
            <div className="mt-2">
              <p>
                <img src="/software_subscribed.svg" alt="" /> Softwares
                Subscribed
              </p>
            </div>
            <div className="d-flex mt-3">
              <p className="mr-4 productionBorder">-</p>
            </div>
          </Card>
        )}
      </div>
      <div
        className="my-1 mt-3 mb-2"
        style={{ fontSize: "18px", fontWeight: "600", color: "#030229" }}
      >
        Help Center
      </div>
      <div style={{ marginBottom: "4rem" }}>
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
