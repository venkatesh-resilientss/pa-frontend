import { Col, Row } from "reactstrap";
import StatsHorizontal from "./StatsHorizontol/index";
import { User, Users } from "react-feather";
import activeProject from "assets/MyImages/activeProject.svg";
import user from "assets/MyImages/user.svg";
import svg1 from "assets/DashboardIcons/svg1.svg";
import fluentMoneyHand from "assets/DashboardIcons/fluentMoneyHand.svg";
import prospectClientIcon from "assets/DashboardIcons/prospectClientsIcon.svg";
import { DashboardService } from "services";
import useSWR from "swr";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { checkTenant } from "constants/function";

function Stats() {
  const statsService = new DashboardService();
  const [tenantId, setTenantId] = useState("");

  useEffect(() => {
    const getTenant = async () => {
      const tenant = await checkTenant();
      console.log(tenant, "tenant");
      if (tenant) {
        setTenantId(tenant.id);
      }
    };
    getTenant();
  }, []);
  const {
    data: statsData,
    isLoading: userLoading,
    error: userError,
    mutate: userMutate,
  } = useSWR("GET_STATS", () => statsService.getStats(tenantId));
  return (
    <div className="rounded mt-3 p-3" style={{ backgroundColor: "#EAEDFF" }}>
      <Row noGutters className="d-flex gap-2">
        <Col>
          <StatsHorizontal
            statTitle="Total Clients"
            icon={svg1}
            renderStats={
              <h2 className="fw-bolder mb-75  ">
                {statsData?.TotalActiveClients}
              </h2>
            }
            stats={statsData?.TotalActiveClients}
          />
        </Col>

        <Col>
          <StatsHorizontal
            statTitle="New Clients this Month"
            icon={user}
            renderStats={
              <h2 className="fw-bolder mb-75  ">
                {statsData?.NewClientsThisMonth}
              </h2>
            }
            stats={statsData?.NewClientsThisMonth}
          />
        </Col>

        <Col>
          <StatsHorizontal
            statTitle="Active Projects"
            icon={activeProject}
            renderStats={
              <h2 className="fw-bolder mb-75  ">{statsData?.ActiveProjects}</h2>
            }
            stats={statsData?.ActiveProjects}
          />
        </Col>
        <Col>
          <StatsHorizontal
            statTitle="Prospects Clients"
            icon={prospectClientIcon}
            renderStats={
              <h2 className="fw-bolder mb-75  ">
                {statsData?.ProspectClients}
              </h2>
            }
            stats={statsData?.ProspectClients}
          />
        </Col>
        <Col>
          <StatsHorizontal
            statTitle="Outstanding Payments"
            icon={fluentMoneyHand}
            renderStats={
              <h2 className="fw-bolder mb-75  ">
                <img src="dollar.svg" alt="dollar symbol" />
                {statsData?.OutstandingInvoices}
              </h2>
            }
            stats={statsData?.OutstandingInvoices}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Stats;
