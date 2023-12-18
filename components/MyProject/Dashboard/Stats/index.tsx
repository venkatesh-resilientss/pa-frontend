import { Col, Row } from "reactstrap";
import StatsHorizontal from "./StatsHorizontol/index";
import activeProject from "assets/MyImages/activeProject.svg";
import user from "assets/MyImages/user.svg";
import svg1 from "assets/DashboardIcons/svg1.svg";
import fluentMoneyHand from "assets/DashboardIcons/fluentMoneyHand.svg";
import prospectClientIcon from "assets/DashboardIcons/prospectClientsIcon.svg";
import { DashboardService } from "services";
import useSWR from "swr";
import Link from "next/link";

function Stats() {
  const statsService = new DashboardService();

  // useEffect(() => {
  //   const getTenant = async () => {
  //     const tenant = await checkTenant();
  //     console.log(tenant, "tenant");
  //     if (tenant) {
  //       setTenantId(tenant.id);
  //     }
  //   };
  //   getTenant();
  // }, []);
  const { data: statsData } = useSWR("GET_STATS", () =>
    statsService.getStats()
  );
  return (
    <div className="rounded mt-3 p-3" style={{ backgroundColor: "#EAEDFF" }}>
      <Row noGutters className="d-flex gap-2">
        <Col>
          <StatsHorizontal
            statTitle="Total Clients"
            statTooltip="The total number of clients currently registered in the system."
            icon={svg1}
            renderStats={
              <h2 className="fw-bolder mb-75  ">
                {statsData?.TotalActiveClients ? (
                  <Link href={`/clients`}>{statsData?.TotalActiveClients}</Link>
                ) : (
                  statsData?.TotalActiveClients
                )}
              </h2>
            }
            stats={statsData?.TotalActiveClients}
          />
        </Col>

        <Col>
          <StatsHorizontal
            statTitle="New Clients this Month"
            statTooltip="Shows the count of new clients added to the platform during the current month."
            icon={user}
            renderStats={
              <h2 className="fw-bolder mb-75  ">
                {statsData?.NewClientsThisMonth ? (
                  <Link href={`/clients`}>
                    {statsData?.NewClientsThisMonth}
                  </Link>
                ) : (
                  statsData?.NewClientsThisMonth
                )}
              </h2>
            }
            stats={statsData?.NewClientsThisMonth}
          />
        </Col>

        <Col>
          <StatsHorizontal
            statTitle="Active Projects"
            icon={activeProject}
            statTooltip="Displays the number of ongoing projects actively managed within the system."
            renderStats={
              <h2 className="fw-bolder mb-75  ">
                {statsData?.ActiveProjects ? (
                  <Link href={`/productions`}>{statsData?.ActiveProjects}</Link>
                ) : (
                  statsData?.ActiveProjects
                )}
              </h2>
            }
            stats={statsData?.ActiveProjects}
          />
        </Col>
        <Col>
          <StatsHorizontal
            statTitle="Prospects Clients"
            icon={prospectClientIcon}
            statTooltip="Indicates the number of potential clients or leads being actively considered for engagement."
            renderStats={
              <h2 className="fw-bolder mb-75  ">
                {statsData?.ProspectClients ? (
                  <Link href={`/clients`}>{statsData?.ProspectClients}</Link>
                ) : (
                  statsData?.ProspectClients
                )}
              </h2>
            }
            stats={statsData?.ProspectClients}
          />
        </Col>
        <Col>
          <StatsHorizontal
            statTitle="Outstanding Invoices"
            icon={fluentMoneyHand}
            statTooltip="Represents the total amount of payments that are pending or overdue."
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
