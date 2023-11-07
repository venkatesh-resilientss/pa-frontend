import { Col, Row } from "reactstrap";
import StatsHorizontal from "./Stats";
// ** Styles
import "@styles/react/apps/app-users.scss";
import { User, Users } from "react-feather";
import Stats from "./Stats";
import Clients from "./Clients";
import RecentProductions from "./RecentProductions";
import FlightStatusTrackerTable from "./FlightStatusTrackerTable";
import HelpCenter from "./HelpCenter";

function index() {
  return (
    <div style={{ fontFamily: "Segoe UI" }} className="text-black">
      <Stats />
      <Row className="mt-2">
        {" "}
        <Col xl="4">
          <Clients />
        </Col>
        <Col xl="8" className="my-auto">
          <FlightStatusTrackerTable />
        </Col>
      </Row>
      <RecentProductions />
      <HelpCenter />
    </div>
  );
}

export default index;
