import { Col, Row } from "reactstrap";
import Stats from "components/Dashboard/Stats";
import Clients from "components/Dashboard/Clients";
import RecentProductions from "components/Dashboard/RecentProductions";
import FlightStatusTrackerTable from "components/Dashboard/FlightStatusTrackerTable";
import HelpCenter from "components/Dashboard/HelpCenter";

function Dashboard() {
    return (
        <div style={{ paddingRight: '45px' }}>
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
        </div>
    );
}

export default Dashboard;
