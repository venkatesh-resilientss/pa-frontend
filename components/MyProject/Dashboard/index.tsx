import { Col, Row } from "reactstrap";
import StatsHorizontal from "./Stats";
import Stats from "./Stats";
import Clients from "./Clients";
import RecentProductions from "./RecentProductions";
import FlightStatusTrackerTable from "./FlightStatusTrackerTable";
import HelpCenter from "./HelpCenter";
import Sidebar from "../../Sidebar";

function Dashboard() {
  return (
    <div>
      <Stats />
      <Row className="match-height my-4">
        <Col xl="4">
          <Clients />
        </Col>
        <Col xl="8">
          <FlightStatusTrackerTable />
        </Col>
      </Row>
      <RecentProductions />
      <HelpCenter />
    </div>
  );
}

export default Dashboard;
