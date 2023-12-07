import PropTypes from "prop-types";
import { Card, CardBody } from "reactstrap";
import { Info } from "react-feather";
import Image from "next/image";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const StatsHorizontal = ({
  icon,
  stats,
  renderStats,
  statTitle,
  statTooltip,
}) => {
  return (
    <Card className="bg-white rounded-lg shadow">
      <CardBody className="d-flex justify-content-between align-items-center">
        <div
          className="d-flex justify-content-between col-12"
          style={{ height: "60px" }}
        >
          <div>
            <div className="d-flex  align-items-center" style={{ gap: "5px" }}>
              <div className="d-flex align-items-center">
                <Image
                  src={icon}
                  alt=""
                  style={{ width: "20px", height: "20px" }}
                />
              </div>

              <div
                className="card-text m-auto"
                style={{
                  color: "#4C4C61",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                {statTitle}
              </div>
            </div>
            <div
              style={{
                marginTop: "10px",
                color: "#4C4C61",
                fontSize: "81.248px",
                lineHeight: "normal",
                letterSpacing: "0.812px",
              }}
            >
              {renderStats ? renderStats : <h1>{stats}</h1>}
            </div>
          </div>

          <div
            className="d-flex align-items-center"
            style={{ marginTop: "-47px", color: "#4C4C61" }}
          >
            <OverlayTrigger
              placement={"bottom"}
              overlay={
                <Tooltip bsPrefix="custom-tooltip">
                  <Card>
                    <div className="p-2 mt-1 gap-1 d-flex custom-tooltip-card">
                      <p>
                        {statTooltip}
                      </p>
                    </div>
                  </Card>
                </Tooltip>
              }
            >
              <Info size={14} className="cursor-pointer" />
            </OverlayTrigger>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

StatsHorizontal.propTypes = {
  stats: PropTypes.string,
  renderStats: PropTypes.any,
  className: PropTypes.string,
  icon: PropTypes.element.isRequired,
  color: PropTypes.string.isRequired,
  statTitle: PropTypes.string.isRequired,
  statsMargin: PropTypes.oneOf([
    "mb-0",
    "mb-25",
    "mb-50",
    "mb-75",
    "mb-1",
    "mb-2",
    "mb-3",
    "mb-4",
    "mb-5",
  ]),
};

export default StatsHorizontal;
