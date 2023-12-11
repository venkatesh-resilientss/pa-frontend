import Image from "next/image";
import { ArrowRight } from "react-feather";
import { Card, CardBody } from "reactstrap";

function HelpCenterCard({ image, title, description, link }) {
  return (
    <Card>
      <CardBody>
        <div className="d-flex  justify-content-center align-items-center">
          {" "}
          <Image src={image} style={{ height: "100px" }} alt={""} />
        </div>
        <div className="text-center">
          <div
            style={{ fontSize: "18px", fontWeight: "bold", color: "#030229" }}
          >
            {title}
          </div>
          <div style={{marginTop: "5px" }}>
            {description}
          </div>
          <div
            className="text-info"
            style={{ fontSize: "12px", marginTop: "5px" }}
          >
            <a href="#"><span style={{fontSize: "14px", color: "#223A7A", fontWeight: "bold" }}>{link}</span>{" "}
            <ArrowRight
              size={12}
              style={{ color: "#223A7A", fontWeight: "bold" }}
            /></a>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default HelpCenterCard;
