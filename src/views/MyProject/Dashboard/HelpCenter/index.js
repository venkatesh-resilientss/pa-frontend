import { Col, Row } from "reactstrap";
import HelpCenterCard from "./HelpCenterCard";
import supportImage from "../../../../assets/MyImages/supportCenter.svg";
import KnowledgeImage from "../../../../assets/MyImages/knowledge.svg";
import feedbackImage from "../../../../assets/MyImages/feedbackImage.svg";

function HelpCenter() {
  return (
    <div>
      <div className="my-1" style={{ fontSize: "20px", fontWeight: "600" }}>
        Help Center
      </div>
      <Row>
        <Col xl="4">
          <HelpCenterCard
            title={"Support Center"}
            description={"Your direct line to our support team."}
            link={"Get Help"}
            image={supportImage}
          />
        </Col>

        <Col xl="4">
          <HelpCenterCard
            title={"Knowledgebase & Resources"}
            description={"Answers at your fingertips."}
            link={"Explore Resources"}
            image={KnowledgeImage}
          />
        </Col>

        <Col xl="4">
          <HelpCenterCard
            title={"Feedback and Feature Requests"}
            description={"Help shape the future of our software"}
            link={"Share Feedback"}
            image={feedbackImage}
          />
        </Col>
      </Row>
    </div>
  );
}

export default HelpCenter;
