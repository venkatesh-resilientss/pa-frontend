import { Col, Row } from "reactstrap";
import Stats from "./Stats";
import Clients from "./Clients";
import RecentProductions from "./RecentProductions";
import HelpCenter from "./HelpCenter";

function Dashboard() {
  return (
    <div>
      <Stats />
      <Row className="match-height my-4">
        <Col xl="12">
          <Clients />
        </Col>
      </Row>
      <RecentProductions />
      <HelpCenter />
    </div>
  );
}

export default Dashboard;
