import { ArrowRight } from "react-feather";
import { Card, CardBody, CardImg } from "reactstrap";

function HelpCenterCard({ image, title, description, link }) {
  return (
    <Card>
      <CardBody>
        <div className="d-flex  justify-content-center align-items-center">
          {" "}
          <img src={image} style={{ height: "100px" }} />
        </div>
        <div className="text-center">
          <div style={{ fontSize: "18px", fontWeight: "600" }}>{title}</div>
          <div style={{ fontSize: "14px" }}>{description}</div>
          <div className="text-info" style={{ fontSize: "12px" }}>
            {link} <ArrowRight size={12} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default HelpCenterCard;
