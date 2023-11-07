import { Col, Row } from "reactstrap";
import StatsHorizontal from "./StatsHorizontol/index";
// ** Styles
import "@styles/react/apps/app-users.scss";
import { User, Users } from "react-feather";

function Stats() {
  return (
    <div className="rounded pt-2 px-1" style={{ backgroundColor: "#EAEDFF" }}>
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            statTitle="Total Clients"
            icon={<Users size={12} />}
            renderStats={<h2 className="fw-bolder mb-75  ">10</h2>}
          />
        </Col>

        <Col lg="3" sm="6">
          <StatsHorizontal
            statTitle="New Clients this Month"
            icon={<Users size={12} />}
            renderStats={<h2 className="fw-bolder mb-75  ">3</h2>}
          />
        </Col>

        <Col lg="3" sm="6">
          <StatsHorizontal
            statTitle="Active Projects"
            icon={<Users size={12} />}
            renderStats={<h2 className="fw-bolder mb-75  ">43</h2>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            statTitle="Outstanding Payments"
            icon={<Users size={12} />}
            renderStats={<h2 className="fw-bolder mb-75  ">$32,450</h2>}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Stats;
